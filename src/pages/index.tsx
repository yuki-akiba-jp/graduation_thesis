"use client";
import { Link } from "@chakra-ui/react";
import React from "react";
export default function Home() {
  return (
    <>
      <div>
        <Link href="/enterNamePage" color="blue.400">
          enterNamePage
        </Link>

        <Link href="/selectTeamPage" color="red.100">
          selectTeamPage
        </Link>

        <Link href="/selectProblemFieldPage" color="blue.300">
          selectProblemFieldPage
        </Link>

        <Link href="/selectProblemPage">selectProblemPage</Link>

        <Link href="/problemPage">problemPage</Link>

        <Link href="/teamInfoPage">teamInfoPage</Link>

        <Link href="/rankingPage">rankingPage</Link>
      </div>
    </>
  );
}
