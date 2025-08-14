import React, { useState, useRef, useEffect } from "react";
import { mastraClient } from "../lib/mastra-client";
import { Message } from "../types/chat";
import "./ChatComponent.css";

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingMessageId, setStreamingMessageId] =
    useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    // 创建助手消息的初始状态
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    // 先添加空的助手消息
    setMessages((prev) => [...prev, assistantMessage]);
    setStreamingMessageId(assistantMessageId);

    try {
      // 获取智能体
      const agent = mastraClient.getAgent(
        "studyAssistantAgentDeepSeek"
      );

      // 流式响应
      const streamResponse = await agent.stream({
        messages: [
          {
            role: "user",
            content: userMessage.content,
          },
        ],
      });

      // 处理流式数据
      streamResponse.processDataStream({
        onTextPart: (text) => {
          console.log("收到文本:", text);
          // 更新 UI - 追加文本到当前消息
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + text }
                : msg
            )
          );
        },
        onToolCallPart: (toolCall) => {
          console.log("工具调用:", toolCall);
        },
      });
    } catch (err) {
      console.error("调用 Mastra API 失败:", err);
      setError("调用失败，请稍后重试");

      // 更新助手消息为错误信息
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content:
                  "抱歉，我遇到了一些问题，请稍后重试。",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setStreamingMessageId(null);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>学习助手聊天</h2>
        <button
          onClick={clearChat}
          className="clear-button"
        >
          清空聊天
        </button>
      </div>

      <div className="messages-container">
        {messages.length === 0 && !isLoading && (
          <div className="empty-state">
            <p>
              👋
              你好！我是你的学习助手，有什么问题可以问我。
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.role === "user"
                ? "user-message"
                : "assistant-message"
            }`}
          >
            <div className="message-content">
              {message.content}
            </div>
            <div className="message-timestamp">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {isLoading && !streamingMessageId && (
          <div className="message assistant-message">
            <div className="message-content">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">{error}</div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入你的问题..."
          disabled={isLoading}
          className="message-input"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="send-button"
        >
          {isLoading ? "发送中..." : "发送"}
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
