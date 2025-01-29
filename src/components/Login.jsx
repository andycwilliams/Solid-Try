import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Login = ({ session, setIsLoggedIn }) => {
  const [webId, setWebId] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    const identityProvider = "https://solidcommunity.net/";

    try {
      setLoginError("");
      await session.login({
        oidcIssuer: identityProvider,
        redirectUrl: window.location.href,
        clientName: "Solid Try",
      });
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    await session.logout();
    setIsLoggedIn(false);
    setWebId("");
  };

  useEffect(() => {
    const checkSession = async () => {
      await session.handleIncomingRedirect();
      if (session.info.isLoggedIn) {
        setIsLoggedIn(true);
        setWebId(session.info.webId);
        console.log(`Logged in as ${session.info.webId}`);
      }
    };

    checkSession();
  }, [session, setIsLoggedIn]);

  return (
    <div>
      {session.info.isLoggedIn ? (
        <div>
          <p>Logged in as: {webId.replace("profile/card#me", "")}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>Log in to see your Pod&apos;s contents</p>
          <button onClick={handleLogin}>Log In</button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </div>
      )}
      <p>Note: Provider must be solidcommunity.net</p>
    </div>
  );
};

Login.propTypes = {
  session: PropTypes.object.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
