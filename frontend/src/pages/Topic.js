import React from "react";
import AuthContext from "../context/authcontext";

function Topic() {
  const contextType = AuthContext;

  console.log(contextType);
  return (
    <div>
      <h1>home</h1>
    </div>
  );
}

export default Topic;
