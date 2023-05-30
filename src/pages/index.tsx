"use client";
import { Button, Link } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { userIdStrage } from "@/const";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    if (!localStorage.getItem(userIdStrage)) {
      router.push("/enterNamePage");
      return;
    } else {
      router.push("/selectProblemPage");
      return;
    }
  }, [router]);
  return (
    <>
      <div>
        <Link href="/enterNamePage" color="blue.400" colorScheme="teal">
          start app
        </Link>
        <Button
          colorScheme="orange"
          onClick={async () => {
            const del = await axios.delete(`/api/deletes`);
            const res = await axios.post(`/api/problems/addProblemsArray`);
          }}
        >
          init
        </Button>
      </div>
    </>
  );
}
