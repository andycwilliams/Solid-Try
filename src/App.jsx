import { useEffect, useState } from "react";
import { Session } from "@inrupt/solid-client-authn-browser";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import PodContents from "./components/PodContents";

const session = new Session(); // Create session once

const App = () => {
  // const session = useMemo(() => new Session(), []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);
  // const [isSessionChecked, setIsSessionChecked] = useState(false);

  // useEffect(() => {
  //   const restoreSession = async () => {
  //     await session.handleIncomingRedirect();
  //     setIsSessionReady(true);
  //   };

  //   restoreSession();
  // }, []);

  useEffect(() => {
    const restoreSession = async () => {
      await session.handleIncomingRedirect();
      if (session.info.isLoggedIn) {
        setIsLoggedIn(true);
      }
      setIsSessionReady(true);
    };

    restoreSession();
  }, []);

  return (
    <>
      <Header />

      <Login session={session} setIsLoggedIn={setIsLoggedIn} />

      {isSessionReady && isLoggedIn && <PodContents session={session} />}

      <Footer />
    </>
  );
};

export default App;
