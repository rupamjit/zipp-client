import SideBar from "@/components/SideBar"

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-20">
        <SideBar/>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-gary-400"></div>
      </div>
    </div>
  );
}
