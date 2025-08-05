"use client";
import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import SideBar from "@/components/SideBar";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Image as Image1, Menu, X } from "lucide-react";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  
  const [content, setContent] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const queryClient = useQueryClient();

  const handleCreatePost = useCallback(() => {
    if (content.length <= 0) {
      toast.error("Post cannot be empty");
      return;
    }
    mutate({
      content,
    });
    setContent("");
  }, [content, mutate]);

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
          await queryClient.invalidateQueries({ queryKey: ["current-user"] });
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
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image1 size={28} className="text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Quizz
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <SideBar userDetails={user} />

        {/* Main Content */}
        <main className="flex-1 lg:max-w-2xl h-screen overflow-scroll xl:max-w-3xl border-x border-gray-800/50 min-h-screen">
          {/* Header for larger screens */}
          <div className="hidden lg:block sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800/50 p-4">
            <h1 className="text-xl font-bold">Home</h1>
          </div>

          {/* Tweet Composer */}
          <div className="border-b border-gray-800/50 p-4 lg:p-5">
            <div className="flex gap-3 lg:gap-4">
              <div className="flex-shrink-0">
                {user?.profileImageUrl && (
                  <Image
                    src={user?.profileImageUrl}
                    width={44}
                    height={44}
                    alt="avatar"
                    className="rounded-full object-cover ring-2 ring-gray-700"
                  />
                )}
              </div>
              <div className="flex-1">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full bg-transparent text-lg lg:text-xl placeholder-gray-500 resize-none outline-none min-h-[80px] lg:min-h-[100px]"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={handleSelectImage}
                    className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-all duration-200"
                  >
                    <Image1 size={20} />
                  </button>
                  <button
                    onClick={handleCreatePost}
                    disabled={content.length <= 0}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-full transition-all duration-200 text-sm lg:text-base"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="divide-y divide-gray-800/50">
            {tweets?.map((tweet) =>
              tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 p-4 lg:p-6">
          {!user && (
            <div className="sticky top-4 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl">
              <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                New To Quizz?
              </h2>
              <p className="text-gray-400 text-center mb-6 text-sm lg:text-base">
                Join today and connect with the world
              </p>
              <div className="flex justify-center">
                <GoogleLogin onSuccess={handleLoginWithGoogle} />
              </div>
            </div>
          )}

       
        </aside>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="bg-black w-80 h-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            {/* Mobile navigation items would go here */}
          </div>
        </div>
      )}
    </div>
  );
}