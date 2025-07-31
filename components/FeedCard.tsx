import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import Image from "next/image";

const FeedCard = () => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-gray-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1 ">
          <Image
            src="https://avatars.githubusercontent.com/u/156903120?s=96&v=4"
            width={50}
            alt="avatar"
            height={50}
            className="rounded-full object-fill"
          />
        </div>
        <div className="col-span-11 ">
          <h1>Rupamjit Ghosh</h1>
          <pre></pre>
          <p>
            🚨Trump ignited a trade war. India activated its strategic playbook.
            → 25% blanket tariffs. → An undefined Russia penalty. → No deal
            after 5 rounds of negotiation. Most countries would retaliate in
            rage. India chose restraint and strategy. With $702B in forex, FTAs
            across 3
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
