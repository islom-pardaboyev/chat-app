import { FormEvent, Fragment, useState } from "react";
import { Button } from "./components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { useSendMessageMutation } from "./store/api/sen-message-api";

function App() {
  const [sendMessage, { data, isLoading }] = useSendMessageMutation();
  const [message, setMessage] = useState("");

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (message.trim()) {
      
      sendMessage({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      });
      setMessage("")
    }
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="p-10 border-2 rounded-lg shadow-lg"
      >
        <div className="flex items-center">
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="resize-none"
            placeholder="Type your message..."
          />
          <Button type="submit" disabled={isLoading} className="ml-2">
            {isLoading ? (
              <span className="spinner"></span> 
            ) : (
              <Send />
            )}
          </Button>
        </div>
      </form>

      
      <div className="mt-6 h-[50vh] overflow-y-auto">
        {data && data.candidates[0].content.parts[0].text.split("\n").map((line:any, index:any) => (
          <Fragment key={index}>
            {line.trim().startsWith("*") ? (
              <li>
                {line.split("**").map((part:any, partIndex:any) =>
                  partIndex % 2 === 1 ? (
                    <b key={partIndex}>{part}</b>
                  ) : (
                    part
                  )
                )}
              </li>
            ) : line.trim().startsWith("**") ? (
              <p>
                {line.split("**").map((part:any, partIndex:any) =>
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
    </section>
  );
}

export default App;