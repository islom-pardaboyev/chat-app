import { FormEvent } from "react";
import { Button } from "./components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { useAxios } from "./hook/useAxios";

function App() {
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    if (target.messageContext.value) {
      const message = target.messageContext.value;
      useAxios()
        .post("", {
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        })
        .then((res) => console.log(res.data));
    }
  }
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <form
        action=""
        onSubmit={(e) => handleFormSubmit(e)}
        className="p-10 border-2 rounded-lg shadow-lg"
      >
        <div className="flex">
          <Textarea
            name="messageContext"
            className="resize-none"
            placeholder="Message"
          />
          <Button>
            <Send />
          </Button>
        </div>
      </form>
    </section>
  );
}

export default App;
