import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { LeaderboardEntry } from "@/lib/constants";


export default function LeaderboardEntryComponent({
    leaderboardEntry,
    rank
}: {
    leaderboardEntry: LeaderboardEntry,
    rank: number
}) {
  return (
    <div className="leaderboard-entry relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="flex h-60 items-center justify-center">
            <div className="flex mx-auto max-w-md text-center bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
                <div className="rank">{rank + 1}</div>
                <div className="name">{leaderboardEntry.name}</div>
                <div className="num-correct">{leaderboardEntry.num_correct} / {leaderboardEntry.num_answered}</div>
            </div>
        </div>
    </div>
  );
}
