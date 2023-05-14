"use client";
import { Link } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { userIdStrage } from "@/const";

console.log(process.env.NEXT_PUBLIC_SERVER_URL);
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // if (localStorage.getItem(userIdStrage) !== null) {
    //   router.push("/selectTeamPage");
    // }
    router.push("/enterNamePage");
  }, []);
  return (
    <>
      <div>
        <Link href="/enterNamePage" color="blue.400">
          start app
        </Link>
      </div>
    </>
  );
}
