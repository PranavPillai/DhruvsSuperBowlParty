import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS, getAnswersFromAirtableRes, getLeaderboardEntriesFromAirtableRes, LeaderboardEntry } from "@/lib/constants";
import LeaderboardEntryComponent from "@/components/home/leaderboard-entry";
import { useState, useEffect } from 'react';

export default function Home() {

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if(!dataLoaded) {
      setDataLoaded(true);
      fetch(
        "https://api.airtable.com/v0/appFfxMKHMojEes0m/Responses?maxRecords=500&view=Grid%20view",
        {
          method: "GET",
          headers: new Headers({
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`
          })
        }
      ).then((res) => res.json())
      .then((responseData) => {
        console.log(responseData)
        fetch(
          "https://api.airtable.com/v0/appFfxMKHMojEes0m/Answers?maxRecords=500&view=Grid%20view",
          {
            method: "GET",
            headers: new Headers({
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`
            })
          }
        ).then((res) => res.json())
        .then((answersData) => {
          const answersObjects = getAnswersFromAirtableRes(answersData);
          const leaderboardObjects = getLeaderboardEntriesFromAirtableRes(responseData, answersObjects);
          
          setLeaderboardEntries(leaderboardObjects);
          setLoading(false)
        })
      })
    }
  }, [leaderboardEntries, loading, dataLoaded])

  return (
    <Layout>
      <motion.div
        className="max-w-xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>{`Dhruv's Super Bowl Party 2023`}</Balancer>
        </motion.h1>
      </motion.div>
      <div className="mt-10 relative col-span-1 h-30 rounded-xl border border-gray-200 bg-white shadow-md m-4">
        <button onClick={() => window.open("https://airtable.com/shrv9KqNoySeI6ZpZ", "_blank")} className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
          Enter Prop Bets
        </button>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out]">
        <motion.h1
          className="mx-5 bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-2xl tracking-[-0.02em] text-transparent drop-shadow-sm md:text-5xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Prop Bets Leaderboard</Balancer>
        </motion.h1>
        {
          leaderboardEntries && leaderboardEntries.map((entry, inx) => <LeaderboardEntryComponent key={inx} leaderboardEntry={entry} rank={inx}/>)
        }
      </div>
      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      {/* <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0"> */}
        {/* {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))} */}
      {/* </div> */}
    </Layout>
  );
}

const features = [
  // {
  //   title: "Beautiful, reusable components",
  //   description:
  //     "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
  //   large: true,
  // },
  // {
  //   title: "Performance first",
  //   description:
  //     "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
  //   demo: <WebVitals />,
  // },
  // {
  //   title: "One-click Deploy",
  //   description:
  //     "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
  //   demo: (
  //     <a href={DEPLOY_URL}>
  //       {/* eslint-disable-next-line @next/next/no-img-element */}
  //       <img
  //         src="https://vercel.com/button"
  //         alt="Deploy with Vercel"
  //         width={120}
  //       />
  //     </a>
  //   ),
  // },
  // {
  //   title: "Built-in Auth + Database",
  //   description:
  //     "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/)",
  //   demo: (
  //     <div className="flex items-center justify-center space-x-20">
  //       <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
  //     </div>
  //   ),
  // },
  // {
  //   title: "Hooks, utilities, and more",
  //   description:
  //     "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
  //   demo: (
  //     <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
  //       <span className="font-mono font-semibold">useIntersectionObserver</span>
  //       <span className="font-mono font-semibold">useLocalStorage</span>
  //       <span className="font-mono font-semibold">useScroll</span>
  //       <span className="font-mono font-semibold">nFormatter</span>
  //       <span className="font-mono font-semibold">capitalize</span>
  //       <span className="font-mono font-semibold">truncate</span>
  //     </div>
  //   ),
  // },
];
