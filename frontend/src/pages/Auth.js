import React, { useContext } from "react";
import authContext from "../context/authcontext";
import "./Auth.css";

function Auth(props) {
  const context = useContext(authContext);

  function submitHandler(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
          query Login ($username: String!, $password: String!){
            login (username: $username, password : $password){
            userId
            token
            tokenExpiration
          }
        }`,
      variables: {
        username: username,
        password: password,
      },
    };

    if (props.name != "Sign in") {
      requestBody = {
        query: `
          mutation CreateUser ($username: String!, $ password: String!) {
            createUser(userInput: {username: $username, password: $password}) {
              _id
              username
            }
          }
          `,
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
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          context.login(resData.data.login.token, resData.data.login.userId);
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
          <label htmlFor="username">username</label>
          <input name="username" />
        </div>
        <div className="form-control">
          <label htmlFor="username">password</label>
          <input name="password" type="password" />
        </div>

        <div className="form-actions">
          <button type="submit">{props.name}</button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
