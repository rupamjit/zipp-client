"use client";
import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import SideBar from "@/components/SideBar";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const {user} = useCurrentUser()
  console.log(user)

  const queryClient = useQueryClient()

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
          await queryClient.invalidateQueries(['current-user'])
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
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-20">
        <SideBar userDetails={user}/>
        <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-800">
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
          {!user &&
            <div className=" p-5 rounded-lg bg-slate-700 text-center">
            <h1 className="my-2 text-2xl font-semibold">New To Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
          }
        </div>
      </div>
    </div>
  );
}
