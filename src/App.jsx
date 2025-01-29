import { useEffect, useState } from "react";
import { Session } from "@inrupt/solid-client-authn-browser";
// import "./App.css";
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
      <h1>Solid Try</h1>
      <div>
        <Login session={session} setIsLoggedIn={setIsLoggedIn} />
      </div>
      {/* <div>
        <p>Here are the contents of your Solid account:</p>
        <PodContents session={session} />
      </div> */}

      {isSessionReady && isLoggedIn && (
        <div>
          <p>Here are the contents of your Solid account:</p>
          <PodContents session={session} />
        </div>
      )}
    </>
  );
};

export default App;
