import { Button, useToast } from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon, InfoIcon } from "@chakra-ui/icons";
import { getToastStatus } from "./openai";

interface TruthButtonProps {
  category: string;
  openaiResponse: string;
}

export default function TruthButton({
  category,
  openaiResponse,
}: TruthButtonProps) {
  const toast = useToast();
  const toastId = "fact-check-toast";

  const onClick = () => {
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        status: getToastStatus(category),
        title: `This tweet is ${category}`,
        description: openaiResponse,
        position: "top-right",
        isClosable: true,
        duration: 10000,
      });
    }
  };

  if (category.includes("true")) {
    return (
      <Button
        leftIcon={<CheckCircleIcon />}
        colorScheme="green"
        onClick={onClick}
      >
        True
      </Button>
    );
  }
  if (category.includes("false")) {
    return (
      <Button leftIcon={<WarningIcon />} colorScheme="red" onClick={onClick}>
        False
      </Button>
    );
  }
  return (
    <Button leftIcon={<InfoIcon />} colorScheme="blue" onClick={onClick}>
      Unverifiable
    </Button>
  );
}
