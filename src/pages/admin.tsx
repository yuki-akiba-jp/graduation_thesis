import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Admin() {
  const router = useRouter();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);

  const handlePasswordCheck = () => {
    //write your logic here
    // const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    //
    // if (password === adminPassword) {
    //   setIsModalOpen(false);
    // } else {
    //   toast({
    //     title: "Incorrect password.",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
    return true;
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Password Check</ModalHeader>
          <ModalBody>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handlePasswordCheck}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div>
        <Button
          colorScheme="orange"
          onClick={async () => {
            await axios.delete(`/api/deletes`);
          }}
        >
          init
        </Button>
      </div>
    </>
  );
}
