import React, { useEffect, useState } from "react";

function Comment(props) {
  useEffect(() => {
    fetchComment();
  }, []);

  function fetchComment() {
    let requestBody = {
      query: `
      query {
        comments{
          _id
          topicComment
          relatedTopic{
            _id
          }
        }
      }`,
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}

export default Comment;
