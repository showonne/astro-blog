---
title: "面试官：HTTP/2 有什么优点？别再说 Server Push 了"
pubDate: "Aug 22 2022"
description: "HTTP/2  Server Push 已凉"
---

2022年8月18日，Chrome 开发团队博客发布了“Removing HTTP/2 Server Push from Chrome”一文，表示 Chrome 106 和之后的版本将默认禁用 HTTP/2 Server Push 特性

## 为什么会被移除？

Server Push 允许网站主动推送页面所需的资源，而不是被动等待。但实际上很难以此实现性能提升，所以用这个特性的人并不多，使用了 HTTP/2 的站点中，仅有 1.25% 用了 Server Push。很多 HTTP/3 服务器和客户端都没实现 Push 功能，即使规范中规定了。对很多已经用上 HTTP/3 的 web 服务来说，PUSH 实际上已经过时了。

## HTTP/2 Server Push 的替代品

103 Early Hints 是个不错的选择，它有很多与 Push 相同的优点。与服务端推送资源不同，103 Early Hints 只向浏览器发送可能会立即请求的资源提示，并将请求资源的控制权交给浏览器--例如，如果HTTP缓存中已经有了这些资源，就不需要再向服务端发起请求

预加载(Preload)关键资源也是一种选择。它允许页面和浏览器一起工作，以便在页面加载早期优先加载关键资源。虽然这个方案需要页面自身先被加载，但它不会延迟关键资源加载

## Early Hints
现在的网站越来越复杂，服务器可能需要执行一些重要工作（比如连接数据库）来生成所请求的页面。但这种服务器的“思考时间”会在浏览器开始呈现页面前产生延迟。在服务器准备响应的的过程中，连接实际上一直处于空闲状态（图中灰色部分即为服务器“思考时间”）

![](https://wd.imgix.net/image/kheDArv5csY6rvQUJDbWRscckLr1/PlT26PkzghLo1EnoXSMI.png?auto=format&w=338)

Early Hints 是一个 HTTP 状态码，用于在最终响应前发送一个预请求。在服务器忙于生成主要资源（html文档）同时，允许服务器向浏览器发送当前页面可能使用的关键子资源（css，js）的提示，浏览器可以根据这些提示，在等待主资源同时，预连接，请求子资源。简单说，Early Hints 通过提前做一些工作来帮助浏览器利用上述的服务器“思考时间”，来加速页面加载速度

![](https://wd.imgix.net/image/kheDArv5csY6rvQUJDbWRscckLr1/jBvw3bncw5GZ9DcsH4jy.png?auto=format&w=385)

## Preload
Preload 则是一个新的控制特定资源如何加载的 Web 标准。通过 `<link ref="preload" />` 使用。通过 Preload 加载重要资源是个不错的选择。


## 结论
Web 技术需要尝试一些东西，并在不需要时丢弃。尽管 Push 听起来很有潜力，但实际使用中问题比预想的更多。Chrome 团队在设计 Push 过程中学到了很多关于 103 Early Hints 的内容，现在是时候放弃 Push 了

## 参考
- [Removing HTTP/2 Server Push from Chrome](https://developer.chrome.com/blog/removing-push/)
- [HTTP/2 push is tougher than I thought](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)
- [Faster page loads using server think-time with Early Hints](https://developer.chrome.com/blog/early-hints/)