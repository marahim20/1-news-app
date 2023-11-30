"use client";

import React from "react";

export default function Home() {
  const prompt = localStorage.getItem("prompt");
  const news = localStorage.getItem("news");
  const newsData = news ? JSON.parse(news) : null;
  const newsTitles = newsData?.articles.map((article: any) => article.title);
  return (
    <main className="flex bg-red-400 min-h-screen flex-col items-center justify-between p-24">
      <p className="text-4xl text-black">{prompt}</p>
      <ol>
        {newsTitles?.map((title: string, i: number) => (
          <li key={i} className="text-black">
            {title}
          </li>
        ))}
      </ol>
    </main>
  );
}
