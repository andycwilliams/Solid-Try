import { useState } from "react";
import "./App.css";
import Login from "./components/Login";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h1>Solid Try</h1>
      <div>
        <p>Please sign in to your Solid account.</p>
        <p>Note: Provider must be solidcommunity.net</p>
        <Login />
        {/* <button>Sign In</button> */}
        
      </div>
      <div>
        <p>Here are the contents of your Solid account:</p>
        {isLoggedIn ? <p>Your content</p> : <p>Please log in first</p>}
      </div>
    </>
  );
};

export default App;
