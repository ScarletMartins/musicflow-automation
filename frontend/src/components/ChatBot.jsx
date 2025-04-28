import { useEffect } from "react";

export default function ChatBot() {
  useEffect(() => {
    if (!document.getElementById("dialogflow-messenger")) {
      const script = document.createElement("script");
      script.id = "dialogflow-messenger";
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="MusicFlowBot"
      agent-id="338b5ae5-22c2-4bd9-9769-a402eaec99e5"
      language-code="pt-br"
    >
    </df-messenger>
  );
}
