"use client";
import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import SideBar from "@/components/SideBar";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { Image as Image1 } from "lucide-react";

export default function Home() {
  const { user } = useCurrentUser();
  console.log(user);

  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      try {
        const googleToken = cred.credential;
        if (!googleToken) {
          toast.error("Google token not found");
          return;
        }
        const { verifyGoogleToken } = await graphqlClient.request(
          verifyUserGoogleTokenQuery,
          { token: googleToken }
        );
        toast.success("Verified Success");
        if (verifyGoogleToken) {
          window.localStorage.setItem("__quizz__token", verifyGoogleToken);
          // @ts-ignore
          await queryClient.invalidateQueries(["current-user"]);
        } else {
          toast.error("No token received");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed");
      }
    },
    []
  );

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-20">
        <SideBar userDetails={user} />
        <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-800">
          {/* tweet modal */}
          <div>
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1 ">
                  {user?.profileImageUrl && (
                    <Image
                      src={user?.profileImageUrl}
                      width={50}
                      alt="avatar"
                      height={50}
                      className="rounded-full object-fill"
                    />
                  )}
                </div>
                <div className="col-span-11 ">
                  <textarea
                    placeholder="What's happening?"
                    className="text-xl px-3 w-full outline-none  bg-transparent border-b border-slate-800"
                    name=""
                    rows={3}
                    id=""
                  ></textarea>
                  <div className="text-blue-500 mt-2 flex  justify-between items-center">
                    <Image1 onClick={handleSelectImage} size={20} />
                    <button className="bg-white text-sm text-black mx-3 font-semibold py-2 px-3 cursor-pointer rounded-full ">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          {!user && (
            <div className=" p-5 rounded-lg bg-slate-700 text-center">
              <h1 className="my-2 text-2xl font-semibold">New To Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
