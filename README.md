# DreamYou Website

梦友 / 梦貘儿童睡眠监护灯宣传网站。

这是我在 **2025 年 3 月 - 4 月** 完成的软硬件结合产品 Demo 配套官网，用于在课程汇报前快速介绍产品概念、展示宣传视频，并提供 App 安装包下载入口。

> 项目定位：课程产品 Demo / 宣传展示页原型，不是医疗诊断系统。

## 项目简介

梦友是一款以中国神兽“梦貘”为概念的儿童床头灯产品。它在白天作为普通床头灯使用，夜间进入睡眠呵护模式，通过柔和的灯光与声音引导孩子入睡，并结合温湿度、噪声、红外、雷达、振动、触摸等传感器数据，辅助家长理解孩子的睡眠状态和异常情况。

这个仓库是 DreamYou 项目的官网展示端，重点不是承载复杂业务逻辑，而是把产品 Demo 以更直观的方式展示出来：

- 展示 DreamPal / 梦友产品视觉与日夜两种使用场景
- 播放产品概念视频，帮助快速理解完整体验
- 提供 Android APK 下载入口，方便汇报或演示时分发
- 通过明亮 / 夜间主题切换呼应产品的白天与夜晚模式
- 与移动端 App、后端服务仓库形成完整作品集入口

## 配套仓库

| 仓库 | 内容 | 说明 |
| --- | --- | --- |
| [dreamyou_backend](https://github.com/jsfsds/dreamyou_backend) | 后端服务 | Spring Boot 后端，负责用户认证、设备数据、睡眠记录、异常模拟、AI 问答等能力 |
| [dreamyou_frontend_expo](https://github.com/jsfsds/dreamyou_frontend_expo) | App 前端 | Expo / React Native 移动端工程，用于家长查看睡眠状态、记录、知识科普和设备设置 |
| [dreamyou_website](https://github.com/jsfsds/dreamyou_website) | 宣传官网 | 当前仓库，负责产品展示、视频播放和 APK 下载 |

三部分共同表达的产品链路是：

```text
ESP32 / 传感器硬件
        |
        | MQTT 上报环境与人体状态数据
        v
Spring Boot 后端
        |
        | RESTful API / SSE
        v
Expo 移动端 App
        |
        | 作品展示与安装包分发
        v
Next.js 宣传官网
```

## 技术栈

| 分类 | 技术 |
| --- | --- |
| Web 框架 | Next.js 15, App Router |
| UI 语言 | React 19, TypeScript |
| 样式 | Tailwind CSS 4, CSS Variables |
| 主题 | React Context, localStorage, `prefers-color-scheme` |
| 静态资源 | `next/image`, HTML5 video, SVG React Components |
| 工程化 | npm, ESLint, TypeScript config |

配套系统技术栈包括 Spring Boot 3.4.4、Java 17、MySQL、Spring Security/JWT、MQTT、SSE、SiliconFlow + DeepSeek、PubMed MCP，以及 Expo 53 / React Native 0.79。

## 页面功能

| 模块 | 功能 |
| --- | --- |
| 产品标识 | 展示 DreamPal 品牌图与产品主视觉 |
| 日夜主题 | 根据主题切换白天 / 夜间设备图片、背景渐变和下载按钮样式 |
| 主题记忆 | 首次进入时读取系统深浅色偏好，之后使用 localStorage 保存选择 |
| 宣传视频 | 使用 HTML5 video 播放产品 Demo 视频，并提供封面图 |
| APK 下载 | 通过静态资源链接下载 Android 安装包 |
| 移动端适配 | 小屏下将“下载”和“视频”拆成底部切换视图，减少页面拥挤 |

## 项目架构

```text
dreampal_2
├── public
│   └── ASSETS
│       ├── png              # 产品图、日夜模式图、视频封面
│       ├── download         # Android APK 安装包
│       └── video.mp4        # 产品宣传视频
├── src
│   ├── app
│   │   ├── layout.tsx       # 根布局、字体、ThemeProvider 注入
│   │   ├── page.tsx         # 单页宣传站主体
│   │   └── globals.css      # Tailwind 入口、主题变量、动效
│   ├── components
│   │   ├── ThemeToggleButton.tsx
│   │   └── icons            # 主题切换与下载按钮 SVG 组件
│   └── context
│       └── ThemeContext.tsx # light / dark 主题状态管理
├── package.json
├── next.config.ts
└── tsconfig.json
```

整体是一个单页展示站：

```text
RootLayout
  └── ThemeProvider
      └── Home Page
          ├── ThemeToggleButton
          ├── Product Logo
          ├── Day / Night Product Image
          ├── APK Download Button
          ├── Product Video
          └── Mobile Bottom Switcher
```

## API 核心功能

当前官网仓库本身不直接请求后端 API，它更像是整个 DreamYou Demo 的展示与分发入口。完整业务 API 由 [dreamyou_backend](https://github.com/jsfsds/dreamyou_backend) 提供，移动端 App 通过 RESTful API 和 SSE 调用。

核心 API 能力与其他仓库保持一致：

| 模块 | 能力 |
| --- | --- |
| 认证 | 用户注册、登录、创建演示用临时用户，返回 JWT |
| 用户设置 | 获取 / 更新当前用户资料、儿童信息、设备绑定和睡眠呵护时间段 |
| 设备数据 | 查询指定设备最新温度、湿度、噪声等传感器数据 |
| 睡眠记录 | 分页查看历史记录、查询指定日期记录、查询最近 N 天记录 |
| 睡眠事件 | 查看夜间醒来、轻度异态、梦游、夜惊等事件 |
| 演示模拟 | 开始 / 结束睡眠模拟、更新睡眠状态、触发异常警报、获取当前模拟状态 |
| AI 问答 | 创建会话、查看历史消息，通过 SSE 获取 DeepSeek 流式回答 |

主要接口包括：

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/registerTemporary

GET  /api/users/me
PUT  /api/users/profile
PUT  /api/users/settings

GET  /api/device/latestSensorData/{deviceUuid}

GET  /api/sleep-records
GET  /api/sleep-records/date/{date}
GET  /api/sleep-records/recent?days=7
GET  /api/sleep-events/user/{userId}

POST /api/simulation/start/{userId}
POST /api/simulation/end/{userId}
POST /api/simulation/updateState/{userId}
POST /api/simulation/triggerAlert/{userId}/{alertType}
GET  /api/simulation/status/{userId}

POST /api/ai/conversations
GET  /api/ai/conversations
GET  /api/ai/conversations/{conversationUuid}/messages
GET  /api/ai/chat/stream/{conversationUuid}?userInput=...
```

后端默认端口为 `8082`，Swagger UI 地址：

```text
http://localhost:8082/swagger-ui/index.html
```

## 本地运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问：

```text
http://localhost:3000
```

### 3. 构建生产版本

```bash
npm run build
npm run start
```

## 项目状态

这是 2025 年 3 月 - 4 月完成的 DreamYou 产品 Demo 宣传官网。当前仓库保留了当时用于汇报和传播的核心展示页，适合作为作品集中的项目入口；后续如果继续完善，可以增加在线 Demo 部署、更多产品说明页、硬件原型图、App 截图墙和与后端 API 的实时演示联动。
