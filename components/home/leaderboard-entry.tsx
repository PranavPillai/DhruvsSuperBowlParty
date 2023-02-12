import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { LeaderboardEntry } from "@/lib/constants";
import Image from "next/image";

const iconPaths = {
    correct: "/check.png",
    incorrect: "/close.png",
    unanswered: "/question.png"
}


export default function LeaderboardEntryComponent({
    leaderboardEntry,
    rank
}: {
    leaderboardEntry: LeaderboardEntry,
    rank: number
}) {

    const iconSize = 15
    const iconComponents = leaderboardEntry.answers.map((entry, inx) => {
    const iconPath = entry.correct ? iconPaths.correct
                : !entry.answered ? iconPaths.unanswered
                : iconPaths.incorrect
    return (
        <div className="mr-4" key={inx}>
            <Image alt="icon" src={iconPath} width={iconSize} height={iconSize} />
        </div>
    )
  })

  return (
    // <div className="relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">

    // </div>
    <div className="leaderboard-entry relative col-span-1 h-30 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md m-4">
        <div className="flex h-20 items-center justify-center">
            <div className="mx-10 flex w-full justify-between text-center bg-gradient-to-br from-black to-stone-500 bg-clip-text text-xl text-transparent md:text-3xl md:font-normal">
                <div className="flex">
                    <div className="rank mr-4 font-bold">{rank + 1}</div>
                    <div className="font-light">{leaderboardEntry.name}</div>
                </div>
                <div className="num-correct">{leaderboardEntry.num_correct} / {leaderboardEntry.num_answered}</div>
            </div>
        </div>
        <div className="mx-10 mb-4 flex w-full">
            {iconComponents}
        </div>
    </div>
  );
}