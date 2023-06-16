import { Button, Link } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { userIdStrage } from "@/const";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router]);
  return (
    <>
      <div>
        <Button
          colorScheme="orange"
          onClick={async () => {
            const del = await axios.delete(`/api/deletes`);
            // const res = await axios.post(`/api/problems/addProblemsArray`);
          }}
        >
          init
        </Button>
      </div>
    </>
  );
}
