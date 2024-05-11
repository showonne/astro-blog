---
title: '博客迁移到 Astro'
pubDate: 'May 11 2024'
description: "新框架尝鲜"
---
## 起因
最近刷推经常看到大家把博客迁移到 Astro, 所以我也想尝试一下，学习下新框架，水一篇博客。

## Astro 的优点
对我来说，Astro 最大的优点就是它设计原则中的第一条：“内容驱动”，这对博客，落地页等场景非常重要，SEO友好，而且性能优秀。

## 上手体验
直接跟着官网的 Getting Started 初始化一个基于 blog 模板的项目，项目结构和其他的应用级框架差不多，pages 目录下是页面，支持基于文件名的路由，public 放静态资源，还有一些配置文件。`src/content/blog` 目录用来存放博客文件。

Astro 特有的模板文件以 `.astro` 结尾，顶部可以定义本地变量，在模板中可以用花括号引用变量，变量部分使用两个 `---` 包裹：

```astro
---
const name = "Astro";
---
<div>
  <h1>Hello {name}!</h1>  <!-- Outputs <h1>Hello Astro!</h1> -->
</div>
```

模板部分和 JSX 有点像，可以使用 `&&`, 三元表达式等运算符，但 Astro 更倾向于 HTML 的语法，类名使用 `class` 而不是 `className`，其他属性也采用 `kebab-case` 而不是 `camelCase`。模板中可以直接使用 `style` 标签编写样式，而且 Astro 会自动为样式加上 scope，避免样式冲突，编写全局样式请前往 `global.css`。

Astro 的 `Endpoints` 可以用来处理任何类型的数据，跟着网上的教程，使用 `Endpoints` + `@vercel/og` 支持了博客的 `Open Graph images`。本质上是通过 `Endpoints` 作为 API Route 响应了一个 GET 请求，在静态生成的站点中，Astro 会在编译阶段调用 endpoints，生成静态文件，再在页面中引入对应的图片即可。需要注意的是，endpoint 在构建阶段会移除掉`.ts`, `.js`的后缀，所以 endpoint 的文件名需要包含你想要创建的文件类型的后缀，比如想要创建 `.png` 图片，文件名应该为 `pg.png.ts`，endpoint 内容很简单，generatePostOG 是一个普通的 jsx 组件：

```ts
// [slug]/og.png.ts
import { ImageResponse } from '@vercel/og';

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;

  const html = generatePostOG(post)

  return new ImageResponse(html, {
    width: 1200,
    height: 600
  });
}
```

```jsx
// generatePostOG.tsx
export function generatePostOG (post: CollectionEntry<"blog">) {
  return (
    <div tw="w-full h-full flex flex-col bg-[#283d47] text-white p-6 pt-12 rounded-2xl shadow-lg mx-auto justify-between">
      <h1 tw="text-8xl font-extrabold mb-0">{post.data.title}</h1>
      <div tw="flex flex-col">
        <p tw="text-6xl">{post.data?.description}</p>
        <div tw="flex items-center justify-between p-4 bg-[#ffc408] rounded-lg mb-[64px]">
          <span tw="text-lg text-black text-2xl">{SITE_URL.replace('https://', '')}</span>
          <ArrowRightIcon tw="w-8 h-8 text-gray-800" />
        </div>
      </div>
    </div>
  );
};
```

这样在构建时，dist/blog 下除了 `index.html` 还会额外生成一个 `og.png` 文件，最后在页面中引入即可：
```html
// BlogPost.astro
---
const { title, description, pubDate, updatedDate } = Astro.props;
// 生成 Open Graph images 的 url
const image = `${Astro.url}og.png`
---
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={Astro.url} />
<meta property="og:image" content={image} />
<meta property="og:type" content="article" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta name="twitter:image" content={image} />
```

## 部署
Astro 的静态站点部署到 Netlify 无序任何额外配置，关联项目直接发布即可。同时因为一些不可抗因素，我即将痛失公司给配的电脑，所以我直接用 `MarsCode` 来写博客了，这篇文章还有博客样式的一些微调都是在 `MarsCode` 上完成的，体验很好👍🏻。

## 最后
Astro 模板市场里好看的主题很多，在选择主题时看到头晕，最后还是一个都没用，选了个自己喜欢的配色，简单调整下布局就完事了。希望以后能多写一些博客，产出一些新内容。

## 参考
- [Astro官网](https://docs.astro.build/en/getting-started/)
- [Generating static Open Graph (OG) images in Astro using @vercel/og](https://www.kozhuhds.com/blog/generating-static-open-graph-og-images-in-astro-using-vercel-og/)