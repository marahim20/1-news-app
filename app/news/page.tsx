"use client";

import React from "react";

export default function Home() {
  var prompt;
  var news;
  if (typeof window !== "undefined") {
    prompt = localStorage.getItem("prompt");
    news = localStorage.getItem("news");
  }
  const newsData = news ? JSON.parse(news) : null;
  const newsTitles = newsData?.articles.map((article: any) => article.title);
  return (
    <main className="flex bg-red-400 min-h-screen flex-col items-center justify-between p-24">
      <p className="text-4xl text-black">{prompt}</p>
      <ul className="list-disc list-inside">
        {newsTitles?.map((title: string, i: number) => (
          <li key={i} className="text-black">
            {title}
          </li>
        ))}
      </ul>
    </main>
  );
}
