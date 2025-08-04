import { Tweet } from "@/gql/graphql";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import Image from "next/image";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard = ( props : FeedCardProps ) => {
  const {data} = props
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1 ">
          {data.author?.profileImageUrl && (
            <Image
              src={data.author?.profileImageUrl}
              width={50}
              alt="avatar"
              height={50}
              className="rounded-full object-fill"
            />
          )}
        </div>
        <div className="col-span-11 ">
          <h1>{data.author?.firstName} {data.author?.lastName}</h1>
          <pre></pre>
          <p>
            {data.content}
          </p>
          <div className="flex justify-between text-xl mt-5  items-center ">
            <div>
              <MessageCircle size={20} />
            </div>
            <div>
              <Heart size={20} />
            </div>
            <div>
              <Repeat2 size={20} />
            </div>
            <div>
              <Share size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
