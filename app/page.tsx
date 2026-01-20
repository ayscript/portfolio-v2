import ChatWidget from "@/components/chatWidget";
import { PortfolioContent } from "@/components/portfolio-content";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(0,255,255,0.1),transparent)]"></div>
      </div>

      <main className="flex-1">
        <PortfolioContent />
        <ChatWidget />
      </main>
    </div>
  );
}