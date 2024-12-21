import { Fragment, useState } from "react";
import { Button } from "./components/ui/button";
import { Copy, Send } from "lucide-react";
import { useSendMessageMutation } from "./store/api/sen-message-api";
import { Input } from "./components/ui/input";
import { useForm } from "react-hook-form";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { tailspin } from "ldrs";
import { Chats } from "./utils";

tailspin.register();

type FormValue = {
  message: string;
};

function App() {
  const [messages, setMessages] = useState<Chats[]>();
  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const { register, handleSubmit, reset } = useForm<FormValue>();
  const formSubmit = (data: FormValue) => {
    const { message } = data;
    if (message) {
      
      const data = {
        role: "user",
        avatar: "https://github.com/shadcn.png",
        message,
        date: new Date().toISOString(),
      };
      setMessages((prev) => (prev ? [...prev, data] : [data]));
      sendMessage({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }).then((res) => {
        const data = {
          role: "chat",
          avatar:
            "https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg",
          message: res.data.candidates[0].content.parts[0].text,
          date: new Date().toISOString(),
        };

        setMessages((prev) => (prev ? [...prev, data] : [data]));
        reset();
      });
    }
  };

  return (
    <main className="flex flex-col h-screen bg-primary justify-between">
      <header className="bg-white px-2 md:px-0">
        <div className="container py-3">
          <h1 className="text-3xl font-consolas font-bold">ChatGPT</h1>
        </div>
      </header>
      {messages && (
        <section className="h-full p-5 flex flex-col gap-5 md:gap-0 overflow-y-auto">
          {messages.map((message, inx) => {
            if (message.role === "chat") {
              return (
                <div
                  key={inx}
                  className="bg-white p-3 border rounded-lg md:w-[30vw] w-[80vw] flex gap-2"
                >
                  <Avatar>
                    <AvatarImage
                      width={100}
                      className="rounded-full min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] object-cover"
                      src={message.avatar}
                    />
                  </Avatar>
                  <div className="">
                    {message.message.split("\n").map((line: any, inx: any) => (
                      <Fragment key={inx}>
                        {line.trim().startsWith("*") ? (
                          <li>
                            {line
                              .split("**")
                              .map((part: any, partIndex: any) =>
                                partIndex % 2 === 1 ? (
                                  <b key={partIndex}>{part}</b>
                                ) : (
                                  part
                                )
                              )}
                          </li>
                        ) : line.trim().startsWith("**") ? (
                          <p>
                            {line
                              .split("**")
                              .map((part: any, partIndex: any) =>
                                partIndex % 2 === 1 ? (
                                  <b key={partIndex}>{part}</b>
                                ) : (
                                  part
                                )
                              )}
                          </p>
                        ) : (
                          <p>{line}</p>
                        )}
                        <br />
                      </Fragment>
                    ))}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={inx} className="ml-auto group md:w-[30vw] w-[80vw] ">
                  <div className="flex p-3 text-white justify-between bg-sky-500 rounded-lg ">
                    <p>{message.message}</p>
                    <Avatar>
                      <AvatarImage
                        className="rounded-full min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] object-cover"
                        src={message.avatar}
                      />
                    </Avatar>
                  </div>
                  <div className="px-3 opacity-0 group-hover:opacity-100 py-1">
                    <Copy onClick={() => navigator.clipboard.writeText(message.message)} className="cursor-pointer" size={10} color="gray"/>
                  </div>
                </div>
              );
            }
          })}
        </section>
      )}
      <form
        action=""
        onSubmit={handleSubmit(formSubmit)}
        className="p-4 border-y flex gap-x-3"
      >
        <Input
          {...register("message")}
          className="bg-white p-5"
          placeholder="Message..."
        />
        <Button className="h-full" disabled={isLoading}>
          {isLoading ? (
            <l-tailspin
              size="20"
              stroke="5"
              speed="0.9"
              color="white"
            ></l-tailspin>
          ) : (
            <Send />
          )}
        </Button>
      </form>
    </main>
  );
}

export default App;
