import {
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Modal,
  Button,
  HStack,
} from "@chakra-ui/react";
export const AnswerTutorialButton = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Button
      colorScheme="teal"
      w="30%"
      type="button"
      onClick={async () => {
        onOpen();
      }}
      isTruncated
    >
      解答
    </Button>
  );
};
