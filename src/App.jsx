import { useMemo } from "react";
import { Session } from "@inrupt/solid-client-authn-browser";
// import "./App.css";
import Login from "./components/Login";
import PodContents from "./components/PodContents";

const App = () => {
  const session = useMemo(() => new Session(), []);

  return (
    <>
      <h1>Solid Try</h1>
      <div>
        <Login session={session} />
        {/* <Logout session={session} /> */}
      </div>
      <div>
        <p>Here are the contents of your Solid account:</p>
        <PodContents session={session} />
      </div>
    </>
  );
};

export default App;
