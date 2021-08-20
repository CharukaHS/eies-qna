import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import LoginView from "./views/Login";
import Overlay from "./components/overlay";

function App() {
  return (
    <>
      <ChakraProvider>
        <Overlay>
          <LoginView />
        </Overlay>
      </ChakraProvider>
    </>
  );
}

export default App;
