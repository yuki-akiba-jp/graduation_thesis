"use client";
import { Link } from "@chakra-ui/react";
import React from "react";
export default function Home() {
  return (
    <>
      <div>
        <div>click below</div>
        <Link href="/enterNamePage" color="blue.400">
          enterNamePage
        </Link>
        <div>click below</div>
        <Link href="/selectTeamPage">selectTeamPage</Link>
        <div>click below</div>
        <Link href="/selectProblemFieldPage">selectProblemFieldPage</Link>
        <div>click below</div>
        <Link href="/selectProblemPage">selectProblemPage</Link>
        <div>click below</div>
        <Link href="/problemPage">problemPage</Link>
        <div>click below</div>
        <Link href="/teamInfoPage">teamInfoPage</Link>
        <div>click below</div>
        <Link href="/rankingPage">rankingPage</Link>
      </div>
    </>
  );
}