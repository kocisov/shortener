import Head from "next/head";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Url Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-bold text-3xl mb-2 text-center">Url Shortener</div>

      <div className="bg-gray-200 rounded px-4 py-1 text-center">
        https://kqq.cz/<strong>:slug</strong>
      </div>
    </div>
  );
}
