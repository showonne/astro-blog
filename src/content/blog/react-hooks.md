---
title: '关于 React Hooks'
pubDate: 'Aug 15 2022'
description: "React Hooks 学习笔记"
---

## P1. 个人总结

React Hooks 是 React 团队在“复用”上最新的探索，在 React Hooks 出现之前，开发者一般通过 mixins，高阶组件（HOC），Render Props 等方式进行逻辑复用，但这些方法都有一些缺点：（❌表示它们没有解决的问题，分享一个[我对这些复用方案的总结](https://slides.com/showonne/react-hooks)）

|    | mixins  | HOC | Render Props |
|  ----  | ----  | ---- | ---- |
| 数据来源不清晰  | ❌ | ❌ | ✅ |
| 命名空间冲突  | ❌ | ❌ | ✅ |
| ES6 不支持  | ❌ | ✅ | ✅ |
| 难扩展  | ❌ | ❌ | - |
| Wrapper/callback hell  | ✅ | ❌ | ✅|

除了逻辑复用方式，React 团队在 React Conf 2018 上还提出了当时 React 存在的其他问题：
1. 当组件变得巨大时，被生命周期分割的复用逻辑变得难以追踪
2. 晦涩的 Class 语法（不仅对人，对编译器来说也是）

举个例子，在 Class Component 中加载 sdk，通常会在 `componentDidMount` 中做订阅操作，在 `componentWillUnmount` 中做取消订阅操作：

```jsx 
class App extends React.Component {
    componentDidMount() {
        sdk.subscribe()
    },
    componentWillUnmount() {
        sdk.unsubscribe()
    }
}
```

但随着sdk的增多，这些代码就会显得非常割裂：

```jsx 
class App extends React.Component {
    componentDidMount() {
        sdk1.subscribe()
        sdk2.subscribe()
        sdk3.subscribe()
        // etc...
    },
    componentWillUnmount() {
        sdk1.unsubscribe()
        sdk2.unsubscribe()
        sdk3.unsubscribe()
        // etc...
    }
}
```
后续维护的过程中，无论是有某个sdk的用法需要改动，还是去除sdk相关代码，都要在不同生命周期中查找

Class Component 自身也有一些问题：
1. 必须调用 `super(props)`，很烦
2. 方法需要手动 bind this，更烦
3. 在编译层面，Class 在 Babel 编译后代码量剧增

因此随着 React 的发展，React 团队更倾向于让开发者 从 Class Component 转向 Function Component，不过起初的 Function Component 不支持 state，也不支持生命周期，很难满足实际的开发需求， React Hooks 应运而生

官网对 Hooks 的介绍如下：

Hooks are a new addition in React 16.8. They let you use state and other React features **without writing a class**. 从后半句的 `without writing a class` 多少可以看出 React 团队对 Function Component 的态度

Hooks 的基本用法这里不多介绍，使用 Function Component + Hooks 的组合可以告别烦人的 super 和 this 问题，而且对于 Class Component 生命周期割裂问题，也可以通过自定义 Hook 优雅解决：

```jsx 
// 复用逻辑通过自定义 hook 封装
function useSDK1() {
    useEffect(() => {
        sdk1.subscribe()

        return () => sdk1.unsubscribe()
    }, [])
}

function useSDK2() {
    useEffect(() => {
        sdk2.subscribe()

        return () => sdk2.unsubscribe()
    }, [])
}

function App() {
    // use sdk
    useSDK1()
    useSDK2()
}
```

同时对于编译器来说，函数组件都是函数，方便编译器优化

当然 React Hooks 也有缺点：
1. 只能在 Function Component 中使用
2. 只能在顶层使用 hooks
3. 对于有 deps 的 hook，比如 useEffect, useCallback 等，必须正确处理 deps，否则会出现问题

关于 React Hooks 的缺点，Dan 在 [Why Do React Hooks Rely on Call Order?](https://overreacted.io/why-do-hooks-rely-on-call-order/) 一文中表示：“Hooks 也不是完美的，但它是我们发现的能解决这些问题的最佳折衷方案”。而且针对 React 需要手动写大量 memo 代码提升性能的问题，React 团队在 React Conf 2021 上分享了 React Forget 项目，通过在编译阶段发现需要优化的地方，自动添加 memo，相信 React 团队会让 hooks 越来越好

## P2. 面试相关
React 的 Fiber 和 Hooks 是面试中必考的点，diff 算法紧随其后。针对 Hooks，面试官一般会先问 Hooks 解决了那些问题，可以从两个方面回答：
1. 弥补了 Function Component 相较 Class Component 缺少的 state 和 lifecycle 机制
2. 代码复用方面，解决了其他复用方案存在的问题（wrapper/callback hell，生命周期割裂）
3. 方便测试也是一个点，可以提一下

如果面试官问 Hooks 有哪些缺点，可以说一下 Hooks 在使用上的限制：
1. 只能在 Function Component 中使用
2. 只能在顶层使用 hooks
最后可以再补充一下，为什么会有这些问题，React 团队在 Hooks 设计上的思考，包括针对这些问题 React 团队的一些优化动作，这些都会是加分项

## P3. 参考资料
- [React 进化进化再进化](https://slides.com/showonne/react-hooks)
- [React without memo](https://www.youtube.com/watch?v=lGEMwh32soc)
- [React Today and Tomorrow and 90% Cleaner React With Hooks](https://www.youtube.com/watch?v=dpw9EHDh2bM&t=1538s)