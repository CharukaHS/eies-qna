import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import LoginView from "./views/Login";

function App() {
  return (
    <>
      <ChakraProvider>
        <LoginView />
      </ChakraProvider>
    </>
  );
}

export default App;
