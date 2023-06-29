import React from "react";
import Lottie from "lottie-react";
import giraffe from "../62861-celebration-giraffe.json"; // Import your Lottie JSON file
import balloon from "../97078-ballooncelebration.json"; // Import your Lottie JSON file
import { Box } from "@chakra-ui/react";

const CelebrationIcon: React.FC = () => {
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
        zIndex: 30,
      }}
    >
      <Lottie animationData={giraffe} />
      <Lottie animationData={balloon} />
    </Box>
  );
};

export default CelebrationIcon;
