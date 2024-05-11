// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Showo^^e';
export const SITE_DESCRIPTION = 'Welcome to my website!';
export const SITE_URL = 'https://showonne.netlify.app';

export type ICategory = "工具" | "电子书" | "文章";

export const LINK_DATA_SOURCE: Record<ICategory, string[][]> = {
  工具: [
    ["正则", "https://regexper.com/#"],
    ["历史版本Chrome下载", "https://chromium.cypress.io/"],
    [
      "生成border-radius",
      "https://9elements.github.io/fancy-border-radius/full-control.html",
    ],
    ["画图用", "https://excalidraw.com/"],
    ["hex-rgb", "https://www.webfx.com/web-design/hex-to-rgb/"],
    ["渐变色", "https://uigradients.com/"],
  ],
  电子书: [
    ["ES6 入门教程", "https://es6.ruanyifeng.com/"],
    [
      "JavaScript Promise迷你书",
      "http://liubin.org/promises-book/#introduction",
    ],
  ],
  文章: [["build-your-own-react", "https://pomb.us/build-your-own-react/"]],
};