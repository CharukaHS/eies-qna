import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import LoginView from "./views/Login";
import HomeView from "./views/Index";

import Overlay from "./components/overlay";

function App() {
  const [authed, setauthed] = useState<Boolean>(false);
  onAuthStateChanged(auth, (user) => {
    setauthed(!!user);
  });

  return (
    <>
      <ChakraProvider>
        <Overlay>{authed ? <HomeView /> : <LoginView />}</Overlay>
      </ChakraProvider>
    </>
  );
}

export default App;
