
import { Tweet } from "@/gql/graphql";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import Image from "next/image";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard = (props: FeedCardProps) => {
  const { data } = props;
  return (
    <article className="border-b border-gray-800/50 p-3 sm:p-4 lg:p-5 hover:bg-gray-900/50 transition-all duration-200 cursor-pointer group">
      <div className="flex gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {data.author?.profileImageUrl && (
            <Image
              src={data.author?.profileImageUrl}
              width={44}
              height={44}
              alt="avatar"
              className="rounded-full object-cover ring-2 ring-transparent group-hover:ring-gray-700 transition-all duration-200"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">

          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-semibold text-white text-sm sm:text-base truncate">
              {data.author?.firstName} {data.author?.lastName}
            </h2>
            <span className="text-gray-500 text-sm">·</span>
            <time className="text-gray-500 text-sm">2h</time>
          </div>

          {/* Tweet Content */}
          <div className="mb-3">
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed break-words">
              {data.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md">
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-full p-2 transition-all duration-200 group/btn">
              <MessageCircle size={18} className="group-hover/btn:scale-110 transition-transform duration-200" />
              <span className="text-xs sm:text-sm">12</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-green-400 hover:bg-green-400/10 rounded-full p-2 transition-all duration-200 group/btn">
              <Repeat2 size={18} className="group-hover/btn:scale-110 transition-transform duration-200" />
              <span className="text-xs sm:text-sm">8</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full p-2 transition-all duration-200 group/btn">
              <Heart size={18} className="group-hover/btn:scale-110 transition-transform duration-200" />
              <span className="text-xs sm:text-sm">24</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-full p-2 transition-all duration-200 group/btn">
              <Share size={18} className="group-hover/btn:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;