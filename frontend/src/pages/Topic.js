import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authcontext";

import Backdrop from "../component/BackDrop/BackDrop";
import "./Topic.css";

function Topic() {
  const context = useContext(AuthContext);

  const [presentForm, setForm] = useState(null);
  const [posts, setContent] = useState([]);
  const [selectedPostId, setselectedPostId] = useState(null);

  //to loan all posts
  useEffect(() => {
    fetchTopic();
  }, []);

  //function to show create post form
  function showForm() {
    setForm((prevState) => {
      return !prevState;
    });
  }

  function comment(event) {
    event.preventDefault();
    console.log(event);
  }

  //function to sumbit and create a new post
  function sumbitPost(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;

    //The trim() method removes whitespace from both ends of a string.//
    if (title.trim().length === 0 && description.trim().length === 0) {
      return;
    }

    let requestBody = {
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
        setForm(false);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function to get posts from database
  function fetchTopic() {
    const requestBody = {
      query: `query {
      posts {
        _id
        title 
        description 
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
      .then((resData) => {
        const posts = resData.data.posts;
        setContent(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function to delete post

  function deletepost() {
    const postId = selectedPostId;
    let requestBody = {
      query: `mutation 
        DeleteTopic($topicId: ID!) {
        deleteTopic(topicId: $topicId){
          _id
          title
        }}`,
      variables: {
        topicId: postId,
      },
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
      .catch((err) => {
        throw err;
      });
  }

  return (
    <>
      <div>
        <h1>home</h1>

        <button
          className="btn"
          onClick={() => {
            setForm("create");
          }}
        >
          +
        </button>

        {presentForm === "create" && <Backdrop onCreate={showForm}></Backdrop>}

        {presentForm && (
          <>
            <form className="addPost" onSubmit={sumbitPost}>
              <label htmlFor="title">Title</label>
              <input name="title" />

              <label htmlFor="description">Description</label>
              <input name="description" />
              <button className="btn">Submit</button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setForm(null);
                }}
              >
                Cancel
              </button>
            </form>
          </>
        )}

        <div>
          {posts.map((post) => (
            <>
              <div key={post._id}>
                <span>Title : {post.title}</span>

                <button
                  onClick={() => {
                    comment(post._id);
                  }}
                >
                  Details
                </button>
                <button
                  onClick={() => {
                    setselectedPostId(post._id);
                    setForm("delete");
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          ))}
        </div>

        <form className="addComment">
          <label htmlFor="comment">Comment</label>
          <input name="comment"></input>
          <button className="btn">Yes</button>
        </form>

        {presentForm && <Backdrop onCreate={showForm}></Backdrop>}

        {presentForm === "delete" && (
          <form className="addPost">
            Are you sure that you want to Delete this post?
            <button className="btn" onClick={deletepost}>
              Yes
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Topic;
