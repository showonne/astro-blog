import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { ImageResponse } from '@vercel/og';
import { getCollection } from "astro:content";
import { generatePostOG } from "./image";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs'

function getDirnameAndFilename(importMetaUrl: string) {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = dirname(__filename);
  
  return { __dirname, __filename };
}

// 使用时，把`import.meta.url`传给这个函数
const { __dirname, __filename } = getDirnameAndFilename(import.meta.url);

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;

  const html = generatePostOG(post)

  return new ImageResponse(html, {
    width: 1200,
    height: 600
  });
}

export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');
  return blogPosts.map((post) => ({
    params: { slug: post?.slug },
    props: { post },
  }));
}