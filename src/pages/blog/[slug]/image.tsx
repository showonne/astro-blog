import type { CollectionEntry } from "astro:content";
import { SITE_TITLE, SITE_URL } from "../../../consts";

function ArrowRightIcon(props: { tw: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function generatePostOG (post: CollectionEntry<"blog">) {
  return (
    <div tw="w-full h-full flex flex-col bg-[#283d47] text-white p-6 rounded-2xl shadow-lg mx-auto justify-end">
      <h1 tw="text-8xl font-extrabold mb-0">{post.data.title}</h1>
      <p tw="text-6xl mb-10">{post.data?.description}</p>
      <div tw="flex items-center justify-between p-4 bg-[#ffc408] rounded-lg mb-[100px]">
        <span tw="text-lg text-black text-2xl">{SITE_URL.replace('https://', '')}</span>
        <ArrowRightIcon tw="w-8 h-8 text-gray-800" />
      </div>
    </div>
  );
};