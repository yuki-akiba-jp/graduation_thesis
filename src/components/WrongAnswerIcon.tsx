import React from "react";
import Lottie from "lottie-react";
import sadBoy from "../39138-morty-cry-loader.json"; // Import your Lottie JSON file
import { Box } from "@chakra-ui/react";

const WrongAnswerIcon: React.FC = () => {
  return (
    <Box
      height={20}
      width={20}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        opacity: 0.3,
        zIndex: 30,
      }}
    >
      <Lottie animationData={sadBoy} />
    </Box>
  );
};

export default WrongAnswerIcon;
