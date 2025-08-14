# Mastra 聊天前端

这是一个基于 React 和 TypeScript 的聊天前端应用，用于与 Mastra AI 智能体进行交互。

## 功能特性

- 💬 实时聊天界面
- 🤖 与 Mastra 智能体交互
- 📱 响应式设计，支持移动端
- ⚡ 现代化的 UI 设计
- 🔄 自动滚动到最新消息
- 🎨 优雅的加载动画
- 🗑️ 清空聊天记录功能

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **@mastra/client-js** - Mastra 客户端 SDK
- **CSS3** - 样式和动画

## 项目结构

```
src/
├── components/
│   ├── ChatComponent.tsx    # 聊天组件
│   └── ChatComponent.css    # 聊天组件样式
├── lib/
│   └── mastra-client.ts     # Mastra 客户端配置
├── types/
│   └── chat.ts             # 类型定义
├── App.tsx                 # 主应用组件
└── App.css                 # 应用样式
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

### 3. 确保 Mastra 后端运行

确保你的 Mastra 后端服务器在 `http://localhost:4112` 运行：

```bash
# 在 mastra-chat-cf 目录中
npm run dev
```

## 配置

### Mastra 服务器地址

在 `src/lib/mastra-client.ts` 中配置你的 Mastra 服务器地址：

```typescript
export const mastraClient = new MastraClient({
  baseUrl: "http://localhost:4112", // 修改为你的服务器地址
  retries: 3,
  backoffMs: 300,
  maxBackoffMs: 5000,
});
```

### 智能体名称

在 `src/components/ChatComponent.tsx` 中修改智能体名称：

```typescript
const agent = mastraClient.getAgent(
  "studyAssistantAgentDeepSeek"
); // 修改为你的智能体名称
```

## 使用方法

1. 打开应用后，你会看到一个聊天界面
2. 在输入框中输入你的问题
3. 点击"发送"按钮或按回车键
4. 等待智能体回复
5. 可以点击"清空聊天"按钮清除所有消息

## 开发

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm test
```

## 故障排除

### 连接问题

如果遇到连接问题，请检查：

1. Mastra 后端服务器是否正在运行
2. 服务器地址配置是否正确
3. 端口是否被占用
4. 网络连接是否正常

### CORS 问题

如果遇到 CORS 错误，确保 Mastra 服务器配置了正确的 CORS 设置。

## 自定义

### 修改样式

编辑 `src/components/ChatComponent.css` 来自定义聊天界面样式。

### 添加新功能

- 在 `src/components/` 中添加新组件
- 在 `src/types/` 中添加新的类型定义
- 在 `src/lib/` 中添加新的工具函数

## 许可证

MIT License
