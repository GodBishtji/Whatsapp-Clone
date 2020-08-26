import React from "react";
import "../assets/css/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "../reducer";
function Login() {
  const [, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="loginContainer">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2018%2F01%2FWhatsApp-Logo.png&f=1&nofb=1"
          alt=""
        />
        <div className="loginText">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
