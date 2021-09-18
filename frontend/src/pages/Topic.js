import React, { useContext, useState } from "react";
import AuthContext from "../context/authcontext";

function Topic() {
  const context = useContext(AuthContext);

  console.log(context.token);

  const [isCreating, setCreating] = useState(false);

  function createTopic() {
    setCreating((prevState) => {
      console.log(prevState);
      return !prevState;
    });
  }

  function sumbitPost(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;

    //The trim() method removes whitespace from both ends of a string.//
    if (title.trim().length === 0 && description.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
          mutation CreateTopic($title: String!, $desc: String!) {
            createTopic(topicInput: {title: $title, description: $desc}) {
              _id
              title
              description
          
            }
          }
        `,
      variables: {
        title: title,
        desc: description,
      },
    };

    let token = context.token;

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        console.log("created");
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div>
        <h1>home</h1>
        <button className="btn" onClick={createTopic}>
          Create new post
        </button>
        {isCreating && (
          <form onSubmit={sumbitPost}>
            <label htmlFor="title">Title</label>
            <input name="title" />

            <label htmlFor="description">Description</label>
            <input name="description" />
            <button className="btn">Submit</button>
            <button className="btn" type="button" onClick={createTopic}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Topic;
