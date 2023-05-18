"use client";
import { Button, Link } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { userIdStrage } from "@/const";
import { server_url } from "@/const";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // if (localStorage.getItem(userIdStrage) !== null) {
    //   router.push("/selectTeamPage");
    // }
    // router.push("/enterNamePage");
  }, []);
  return (
    <>
      <div>
        <Link href="/enterNamePage" color="blue.400" colorScheme="teal">
          start app
        </Link>
        <Button
          colorScheme="orange"
          onClick={async () => {
            const del = await axios.delete(`${server_url}/api/deletes`);
            const res = await axios.post(
              `${server_url}/api/problems/addProblemsArray`
            );
          }}
        >
          init
        </Button>
      </div>
    </>
  );
}
