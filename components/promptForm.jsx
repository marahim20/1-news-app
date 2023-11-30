"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PromptForm() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const clickHandler = async () => {
    localStorage.setItem("prompt", input);
    const response = await fetch("/api/newsFetch?prompt=" + input, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    localStorage.setItem("news", JSON.stringify(data));
    router.push("/news");
  };
  return (
    <div className="grow flex gap-4 w-full rounded-xl items-center justify-center">
      <input
        type="text"
        name="prompt"
        placeholder="Enter a prompt"
        className="w-80 text-lg p-4 rounded-md outline-none text-black"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-red-500 h-fit w-fit border-white rounded-md p-4 px-6 text-lg italic"
        onClick={clickHandler}
      >
        Fetch News!
      </button>
    </div>
  );
}
