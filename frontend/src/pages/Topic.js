import React, { useContext, useState } from "react";
import AuthContext from "../context/authcontext";

function Topic() {
  const context = useContext(AuthContext);

  const [isCreating, setCreating] = useState(false);

  function createTopic() {
    setCreating(true);
  }

  return (
    <>
      <div>
        <h1>home</h1>
        <button onClick={createTopic}>Create Topic </button>
        {isCreating && <form>Hello</form>}
      </div>
    </>
  );
}

export default Topic;
