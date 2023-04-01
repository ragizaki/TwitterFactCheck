export const factCheckTweet = async (
  tweet: string
): Promise<[string, string]> => {
  const messages = [
    {
      role: "system",
      content:
        "You are a fact-checking assistant. Please fact-check the following messages to the best of your ability. Please keep your response to 40 words. Can you please categorize the tweet into one of three categories: true, false or unverifiable. Please ensure that the first word of your response is one of the categories, followed by a space, and then your reasoning.",
    },
    { role: "user", content: tweet },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
    }),
  });

  const data = await res.json();
  const openaiResponse = data.choices[0].message.content;
  console.log("initial response", openaiResponse);
  const category = getFirstWord(openaiResponse).toLowerCase();
  const parsedOpenaiResponse = removeFirstWord(openaiResponse);
  return [parsedOpenaiResponse, category];
};

const getFirstWord = (text: string): string => {
  const words = text.split(" ");
  return words[0];
};

const removeFirstWord = (text: string): string => {
  return text.split(" ").slice(1).join(" ");
};

export const getToastStatus = (text: string): "success" | "error" | "info" => {
  if (text.includes("true")) {
    return "success";
  } else if (text.includes("false")) {
    return "error";
  } else if (text.includes("unverifiable")) {
    return "info";
  }
  return "info";
};
