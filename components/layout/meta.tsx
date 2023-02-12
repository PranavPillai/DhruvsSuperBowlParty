import Head from "next/head";

const DOMAIN = "https://precedent.dev";

export default function Meta({
  title = "dhruvssuperbowlparty.com",
}: {
  title?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/dhruv.png" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:logo" content={`${DOMAIN}/dhruv.png`}></meta>
      <meta property="og:title" content={title} />
    </Head>
  );
}
