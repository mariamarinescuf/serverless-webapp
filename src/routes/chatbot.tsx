import { createFileRoute } from "@tanstack/react-router";
import ChatBotWidget from "../modules/chatBot/ChatBot";

export const Route = createFileRoute("/chatbot" as never)({
  component: ChatBot,
});

function ChatBot() {
  return <ChatBotWidget />;
}
