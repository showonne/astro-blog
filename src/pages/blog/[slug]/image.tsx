import type { CollectionEntry } from "astro:content";
import { SITE_TITLE } from "../../../consts";

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
    <div tw="flex flex-col bg-[#283d47] text-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto">
      <h1 tw="text-3xl font-bold mb-2">{post.data.title}</h1>
      <div tw="flex items-center justify-between p-4 bg-[#ffc408] rounded-lg">
        <span tw="text-lg text-black">showonne.netlify.app</span>
        <ArrowRightIcon tw="w-6 h-6 text-gray-800" />
      </div>
    </div>
  );
};