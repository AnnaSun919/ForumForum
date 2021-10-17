import React, { useContext, useState } from "react";

function Like() {
  const [like, updateLike] = useState(null);
  const [dislike, updateDislike] = useState(null);

  function clickLike() {
    console.log("like");
  }

  return (
    <div>
      <button onClick={clickLike}>Like</button>
      <button>Dislike</button>
    </div>
  );
}

export default Like;
