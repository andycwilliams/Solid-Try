import { useEffect, useMemo, useState } from "react";
import { Session } from "@inrupt/solid-client-authn-browser";

const Login = () => {
  const [checkIsLoggedIn, setCheckIsLoggedIn] = useState(false);
  const [webId, setWebId] = useState("");
  const session = useMemo(() => new Session(), []);

  const handleLogin = async () => {
    const identityProvider = "https://solidcommunity.net/";

    await session.login({
      oidcIssuer: identityProvider,
      redirectUrl: window.location.href,
      clientName: "Solid Try",
    });
  };

  useEffect(() => {
    const checkSession = async () => {
      if (window.location.href.includes("code=")) {
        await session.handleIncomingRedirect(window.location.href);
        if (session.info.isLoggedIn) {
          setCheckIsLoggedIn(true);
          setWebId(session.info.webId);
          console.log(`Logged in as ${session.info.webId}`);
        }
      } else {
        await session.handleIncomingRedirect();
        if (session.info.isLoggedIn) {
          setCheckIsLoggedIn(true);
          setWebId(session.info.webId);
          console.log(`Session restored: Logged in as ${session.info.webId}`);
        }
      }
    };

    checkSession();
  }, [session]);

  return (
    <div>
      <button onClick={handleLogin} disabled={checkIsLoggedIn}>
        {checkIsLoggedIn ? `Logged in as ${webId}` : "Log in"}
      </button>
    </div>
  );
};

export default Login;
