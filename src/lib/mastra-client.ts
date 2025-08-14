import { MastraClient } from "@mastra/client-js";

export const mastraClient = new MastraClient({
  baseUrl: "http://localhost:4111", // 根据你的 Mastra 服务器端口
  retries: 3,
  backoffMs: 300,
  maxBackoffMs: 5000,
});
