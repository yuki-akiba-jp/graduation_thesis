import _ from "lodash";
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
  Text,
} from "@chakra-ui/react";
import { AnswerTutorialButton } from "@/components/AnswerTutorialButton";
import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { useRouter } from "next/router";

import CelebrationIcon from "@/components/CelebrationIcon";
import WrongAnswerIcon from "@/components/WrongAnswerIcon";
import { ITutorialProblem } from "../hooks/useTutorialPage";

export function SubmitTutorialAnswerModal({
  problem,
  setProblem,
}: {
  problem: ITutorialProblem;
  setProblem: React.Dispatch<React.SetStateAction<ITutorialProblem>>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <HStack justifyContent={"center"}>
        <Button
          colorScheme="blue"
          zIndex={300}
          w="30%"
          type="button"
          onClick={() => {
            router.push({
              pathname: "/",
            });
          }}
          isTruncated
        >
          トップページへ
        </Button>
        {problem?.selectedChoice === problem?.answer && isOpen && (
          <CelebrationIcon />
        )}

        {problem?.answerCount >= problem?.answerCountLimit &&
          problem?.selectedChoice !== problem?.answer &&
          isOpen &&
          problem?.answer !== problem?.selectedChoice && <WrongAnswerIcon />}
        {canAnswer(problem) && (
          <AnswerTutorialButton
            onOpen={onOpen}
            setProblem={setProblem}
            problem={problem}
          />
        )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>RESULT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {problem?.selectedChoice === problem?.answer ? (
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                正解です😁
              </Text>
            ) : (
              <div>
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                  不正解です😭
                </Text>
                {problem?.answerCount === problem?.answerCountLimit && (
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    正解は [{problem?.answer}]です
                  </Text>
                )}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            {problem?.answer === problem?.selectedChoice ||
            problem?.answerCountLimit === problem?.answerCount ? (
              <Button
                zIndex={99999}
                colorScheme="orange"
                mr={3}
                onClick={() => {
                  onClose();
                  router.push({
                    pathname: "/",
                  });
                }}
              >
                トップページへ
              </Button>
            ) : (
              <Button
                zIndex={99999}
                colorScheme="orange"
                mr={3}
                onClick={() => {
                  onClose();
                }}
              >
                もう一回
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function canAnswer(problem: ITutorialProblem): boolean {
  if (problem?.answerCount < problem?.answerCountLimit) return true;
  return false;
}

export default SubmitTutorialAnswerModal;
