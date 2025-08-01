"use client";
import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import SideBar from "@/components/SideBar";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) toast.error("Google token not found");
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken! }
      );

      toast.success("Verified Success");
      if (verifyGoogleToken)
        window.localStorage.setItem("__quizz__token", verifyGoogleToken);
      console.log(verifyGoogleToken);
    },
    []
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-20">
        <SideBar />
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
          <div className=" p-5 rounded-lg bg-slate-700 text-center">
            <h1 className="my-2 text-2xl font-semibold">New To Twitter?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}
