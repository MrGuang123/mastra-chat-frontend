# Mastra 聊天前端

这是一个基于 Vite + React + TypeScript 的聊天前端应用。

## 技术栈

- **构建工具**: Vite
- **框架**: React 19
- **语言**: TypeScript
- **测试**: Vitest
- **客户端**: @mastra/client-js

## 环境配置

项目会自动根据环境选择服务器地址：

- **开发环境** (`npm run dev`): 使用 `http://localhost:4111`
- **生产环境** (`npm run build`): 使用 `https://your-production-server.com`

如需修改生产环境地址，请编辑 `src/lib/mastra-client.ts` 文件中的 `baseUrl` 配置。

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将在 http://localhost:3000 启动。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 运行测试

```bash
npm test
```

## 项目结构

```
src/
├── components/     # React 组件
├── lib/           # 工具库和客户端
├── types/         # TypeScript 类型定义
├── App.tsx        # 主应用组件
└── index.tsx      # 应用入口
```

## 从 Create React App 迁移

本项目已从 Create React App 迁移到 Vite，主要变化：

- 更快的开发服务器启动和热重载
- 更快的构建速度
- 更现代的构建工具链
- 使用 Vitest 替代 Jest 进行测试

## 部署

1. 修改 `src/lib/mastra-client.ts` 中的生产环境地址
2. 运行 `npm run build` 构建生产版本
3. 将 `build` 目录部署到您的 Web 服务器
