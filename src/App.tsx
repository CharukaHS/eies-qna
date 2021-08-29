import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import LoginView from "./views/Login";
import HomeView from "./views/Index";
import SplashView from "./views/Splash";

import Overlay from "./components/overlay";

function App() {
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [authed, setauthed] = useState<Boolean>(false);
  onAuthStateChanged(auth, (user) => {
    if (isLoading) setisLoading(false);
    setauthed(!!user);
  });

  return (
    <>
      <ChakraProvider>
        {isLoading ? (
          <SplashView />
        ) : (
          <Overlay>{authed ? <HomeView /> : <LoginView />}</Overlay>
        )}
      </ChakraProvider>
    </>
  );
}

export default App;
