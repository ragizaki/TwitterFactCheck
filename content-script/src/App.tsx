/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { Button } from "@chakra-ui/react";
import { factCheckTweet } from "./openai";
import { useState } from "react";
import TruthButton from "./TruthButton";

interface AppProps {
  tweetText: string;
}

export default function App({ tweetText }: AppProps) {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isTweetFactChecked, setIsTweetFactChecked] = useState(false);
  const [openaiResponse, setOpenaiResponse] = useState("");
  const [category, setCategory] = useState("");

  const handleButtonClick = async () => {
    setIsButtonLoading(true);
    const [response, category] = await factCheckTweet(tweetText);
    setOpenaiResponse(response);
    setCategory(category);
    setIsButtonLoading(false);
    setIsTweetFactChecked(true);
  };

  return (
    <div className="App">
      {isTweetFactChecked ? (
        <TruthButton category={category} openaiResponse={openaiResponse} />
      ) : (
        <Button
          colorScheme="blue"
          onClick={handleButtonClick}
          isLoading={isButtonLoading}
          loadingText="Fact-Checking..."
          spinnerPlacement="end"
        >
          Fact-Check
        </Button>
      )}
    </div>
  );
}
