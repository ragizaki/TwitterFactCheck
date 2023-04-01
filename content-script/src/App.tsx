/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { Button, useToast } from "@chakra-ui/react";
import { factCheckTweet, getToastStatus } from "./openai";
import { useState } from "react";

interface AppProps {
  tweetText: string;
}

function App({ tweetText }: AppProps) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const toast = useToast();
  const toastId = "fact-check-toast";

  const handleButtonClick = async () => {
    setIsButtonLoading(true);
    const [response, category] = await factCheckTweet(tweetText);
    setIsButtonLoading(false);

    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        status: getToastStatus(category),
        title: `This tweet is ${category}`,
        description: response,
        position: "top-right",
        isClosable: true,
        duration: 10000,
      });
    }
  };

  return (
    <div className="App">
      <Button
        colorScheme="blue"
        onClick={handleButtonClick}
        isLoading={isButtonLoading}
        loadingText="Fact-Checking..."
      >
        Fact-Check
      </Button>
    </div>
  );
}

export default App;
