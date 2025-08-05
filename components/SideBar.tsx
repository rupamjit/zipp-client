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
import Image from "next/image";

interface SidebarItemsTypes {
  title: string;
  icon: React.ReactNode;
}

export interface UserProps {
  id: string;
  profileImageUrl?: string;
  email: string;
  firstName: string;
  lastName?: string;
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

const SideBar = ({ userDetails }: { userDetails: UserProps }) => {
  return (
    <div className="hidden lg:flex lg:col-span-3 xl:col-span-2 pt-4 lg:pt-8 px-2 lg:px-3 relative flex-col min-h-screen">
      {/* Logo */}
      <div className="flex h-fit items-center gap-1 lg:gap-2 cursor-pointer mb-4 lg:mb-6 hover:bg-gray-800/50 rounded-xl p-2 transition-all duration-200">
        <Dribbble size={40} className="lg:hidden xl:block text-blue-500" />
        <Dribbble size={50} className="hidden lg:block xl:hidden text-blue-500" />
        <span className="hidden xl:block text-3xl lg:text-4xl xl:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Quizz
        </span>
      </div>

      {/* Navigation Items */}
      <div className="flex-1">
        <nav className="space-y-1 lg:space-y-2">
          {SidebarItems.map((item, _idx) => (
            <div
              className="flex justify-start hover:bg-gray-800/70 active:scale-95 cursor-pointer rounded-xl lg:rounded-2xl px-2 lg:px-4 py-2 lg:py-3 items-center gap-3 lg:gap-5 transition-all duration-200 group"
              key={_idx}
            >
              <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                {item.icon}
              </span>
              <span className="hidden xl:block text-lg lg:text-xl xl:text-2xl font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                {item.title}
              </span>
            </div>
          ))}
        </nav>

        {/* Post Button */}
        <div className="mt-6 lg:mt-8">
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg lg:text-xl xl:text-2xl font-semibold py-2 lg:py-3 cursor-pointer rounded-full transition-all duration-200 shadow-lg hover:shadow-blue-500/25 active:scale-95">
            <span className="xl:hidden">+</span>
            <span className="hidden xl:block">Post</span>
          </button>
        </div>
      </div>

      {/* User Profile */}
      {userDetails && userDetails.profileImageUrl && (
        <div className="mt-auto mb-4 lg:mb-8 p-2 lg:p-3 hover:bg-gray-800/70 rounded-xl lg:rounded-2xl transition-all duration-200 cursor-pointer">
          <div className="flex gap-2 lg:gap-3 items-center">
            <Image
              className="rounded-full ring-2 ring-gray-700 hover:ring-blue-500 transition-all duration-200"
              src={userDetails?.profileImageUrl}
              alt="profile-image"
              height={40}
              width={40}
            />
            <div className="hidden xl:block">
              <h3 className="font-semibold text-white text-sm lg:text-base">
                {userDetails.firstName} {userDetails.lastName}
              </h3>
              <p className="text-gray-400 text-xs lg:text-sm">@{userDetails.firstName.toLowerCase()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
