import Head from "next/head";
import {useEffect, useState} from "react";

export async function postRequest<T>(url: RequestInfo, body: T) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

export default function Add() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("kqq-token");
      if (token) {
        setToken(token);
      }
    }
  }, []);

  async function confirm() {
    if (!url || !slug || !token) {
      return;
    }

    await postRequest("/api", {
      url,
      name: slug,
      token,
    });

    setSlug("");
    setUrl("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Url Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="font-bold text-3xl mb-2 text-center">Add</div>

      <div className="flex flex-col space-y-2">
        <input
          className="border p-2 rounded"
          type="text"
          name="slug"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="Slug"
        />
        <input
          className="border p-2 rounded"
          type="text"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Url"
        />
        <input
          className="border p-2 rounded"
          type="text"
          name="token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Token"
        />
        <button
          className="bg-black text-white rounded px-4 py-1"
          onClick={confirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
