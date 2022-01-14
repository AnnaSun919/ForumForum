import React, { useContext, useState } from "react";
import authContext from "../context/authcontext";
import "./Auth.css";

function Auth(props) {
  const context = useContext(authContext);
  const [error, setError] = useState(null);

  function submitHandler(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {};
    if (props.name === "Sign up") {
      requestBody = {
        query: `mutation CreateUser($username: String!, $password: String!) {
      createUser(userInput: {username: $username, password: $password}) {
        _id
        username
      }
    }`,
        variables: {
          username: username,
          password: password,
        },
      };
    }
    if (props.name === "Sign in") {
      requestBody = {
        query: `
          query Login ($username: String!, $password: String!){
            login (username: $username, password : $password){
            userId
            token
            userName
            tokenExpiration
          }
        }`,
        variables: {
          username: username, // right one const
          password: password,
        },
      };
    }

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // if (res.status !== 200 && res.status !== 201) {
        // }

        return res.json();
      })
      .then((resData) => {
        if (resData.errors) {
          setError(
            resData.errors.map((item) => {
              return item.message;
            })
          );
        }
        if (resData.data.login) {
          context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.userName
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form className="auth-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input name="username" />
        </div>
        <div className="form-control">
          <label htmlFor="username">Password</label>
          <input name="password" type="password" />
        </div>

        <div className="form-actions">
          <button type="submit">{props.name}</button>

          {props.name === "Sign up" ? (
            <a id="btn" href="./signin">
              Switch to Sign In
            </a>
          ) : (
            <a id="btn" href="./signup">
              Switch to Sign up
            </a>
          )}
        </div>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}

export default Auth;
