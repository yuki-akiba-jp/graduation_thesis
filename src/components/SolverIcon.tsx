import React from "react";
import Lottie from "lottie-react";
import animationData from "../74828-ok-check-website.json"; // Import your Lottie JSON file
import { Box } from "@chakra-ui/react";

const SolvedIcon: React.FC = () => {
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
        opacity: 0.8,
      }}
    >
      <Lottie animationData={animationData} loop={0} />
    </Box>
  );
};

export default SolvedIcon;
