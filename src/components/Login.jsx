import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Login = ({ session }) => {
  const [checkIsLoggedIn, setCheckIsLoggedIn] = useState(false);
  const [webId, setWebId] = useState("");

  const handleLogin = async () => {
    const identityProvider = "https://solidcommunity.net/";

    await session.login({
      oidcIssuer: identityProvider,
      redirectUrl: window.location.href,
      clientName: "Solid Try",
    });
  };

  const handleLogout = async () => {
    await session.logout();
    window.location.reload();
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
      {checkIsLoggedIn ? (
        <div>
          <p>Logged in as: {webId.replace("profile/card#me", "")}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>Log in to see your Pod&apos;s contents</p>
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
      <p>Note: Provider must be solidcommunity.net</p>
    </div>
  );
};

Login.propTypes = {
  session: PropTypes.object.isRequired,
};

export default Login;
