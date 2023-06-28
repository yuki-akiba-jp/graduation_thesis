import React from "react";
import Lottie from "lottie-react";
import animationData from "../98571-testing-checking-animation.json"; // Import your Lottie JSON file
import { Box } from "@chakra-ui/react";

interface LottieOptions {
  loop: boolean;
  autoplay: boolean;
  animationData: any; // The Lottie JSON
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

const App: React.FC = () => {
  return (
    <Box height={20} width={20}>
      <Lottie animationData={animationData} height={500} width={1000} />
    </Box>
  );
};

export default App;
