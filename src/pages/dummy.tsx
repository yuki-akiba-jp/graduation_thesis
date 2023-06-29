import React from "react";
import Lottie from "lottie-react";
import animationData from "../33886-check-okey-done.json"; // Import your Lottie JSON file
import { Box } from "@chakra-ui/react";


const App: React.FC = () => {
  return (
    <Box height={20} width={20}>
      <Lottie animationData={animationData} height={500} width={1000} />
    </Box>
  );
};

export default App;
