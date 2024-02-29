import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
// eslint-disable-next-line import/no-extraneous-dependencies
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_OPENAI_SECRET;

function ChatBot() {
  const [messages, setMessages] = useState<any>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message: string) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages: any) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages: any) {
    const apiMessages = chatMessages.map((messageObject: any) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });
    console.log({ response });
    return response.json();
  }

  return (
    <div className="">
      <div style={{ position: "relative", height: "500px", width: "100%" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message: any) => {
                console.log(message);
                return <Message key={`${message}`} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Send a Message"
              onSend={handleSendRequest}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default ChatBot;
