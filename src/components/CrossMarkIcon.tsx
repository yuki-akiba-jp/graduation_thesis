import React from "react";
import Lottie from "lottie-react";
import animationData from "../75376-cross-mark-animarion.json"; // Import your Lottie JSON file
import { Box } from "@chakra-ui/react";

const CrossMarcIcon: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={0}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        opacity: 0.3,
        zIndex: 30,
      }}
    />
  );
};

export default CrossMarcIcon;
