import {
  Bell,
  Bookmark,
  CircleEllipsis,
  Dribbble,
  Mail,
  Search,
  User,
} from "lucide-react";
import { House } from "lucide-react";

interface SidebarItemsTypes {
  title: string;
  icon: React.ReactNode;
}

const SidebarItems: SidebarItemsTypes[] = [
  {
    title: "Home",
    icon: <House />,
  },
  {
    title: "Explore",
    icon: <Search />,
  },
  {
    title: "Notifications",
    icon: <Bell />,
  },
  {
    title: "Messages",
    icon: <Mail />,
  },
  {
    title: "Bookmarks",
    icon: <Bookmark />,
  },
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "More",
    icon: <CircleEllipsis />,
  },
];

const SideBar = () => {
  return (
    <div className="col-span-3 pt-8 px-3">
      <div className="flex  h-fit items-center gap-1 cursor-pointer">
        <Dribbble size={50} className=" text-blue-600" />
        <span className="text-5xl font-extrabold">Quizz</span>
      </div>
      <div className="mt-4 text-2xl  font-bold">
        <ul>
          {SidebarItems.map((item, _idx) => (
            <li
              className="flex justify-start hover:bg-neutral-700 cursor-pointer w-fit rounded-4xl px-4 py-3  items-center gap-5"
              key={_idx}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center mt-4 ">
        <button className="bg-white w-full text-2xl text-black mx-3 font-semibold py-3 cursor-pointer rounded-full ">
          Post
        </button>
      </div>
    </div>
  );
};

export default SideBar;
