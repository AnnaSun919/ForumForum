import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authcontext";
import Backdrop from "../component/BackDrop/BackDrop";
import "./Topic.css";
import Navbar from "../component/NavBar/Navbar";
import NavItem from "../component/NavBar/NavItem";
import DropdownMenu from "../component/NavBar/DropdownMenu";
import Like from "../component/LikeButton/Like";

function Topic() {
  const context = useContext(AuthContext);
  const [posts, setContent] = useState([]);
  const [presentForm, setForm] = useState(null);
  const [selectedPostId, setselectedPostId] = useState(null);
  const [showSinglePost, setShowSinglePost] = useState(null);

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

  //function to sumbit and create a new post
  function sumbitPost(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;

    //The trim() method removes whitespace//
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
        creater{
          username
          _id
        }
        like{
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

  //function to fetch single post
  function fetchSinglepost(event, postId) {
    event.preventDefault();
    const requestBody = {
      query: `query 
      Singlpost($topicId: ID!) {
        singlePost(topicId:$topicId){
          _id
          title
          description
          creater{
            username
          }
          userComments{
            topicComment
            creater{
              username
            }
          } 
      }
    }`,
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
      .then((resData) => {
        setShowSinglePost(resData.data.singlePost);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //function to make comment
  function comment(event) {
    event.preventDefault();
    const postId = selectedPostId;
    const comment = event.target.comment.value;
    let requestBody = {
      query: `
      mutation CreateComment($topicId:ID! $topicComment: String!){
        createComment(topicId : $topicId, commentInput: {topicComment: $topicComment}){
          _id
          topicComment 
        }
      }`,
      variables: {
        topicComment: comment,
        topicId: postId,
      },
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
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
    <div>
      {presentForm && <Backdrop onCreate={showForm}></Backdrop>}

      {presentForm === "create" && (
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
      <div className="page">
        <div className="posts">
          <Navbar>
            <NavItem icon="🤣" name="Forum Forum">
              <DropdownMenu />
            </NavItem>
          </Navbar>
          <button
            className="btn"
            id="createButton"
            onClick={() => {
              setForm("create");
            }}
          >
            +
          </button>
          {posts.map((post) => (
            <>
              <div className="items" key={post._id}>
                <span className="username">
                  {post.creater.username} ❤️{post.like.length}
                </span>
                <span
                  className="title"
                  onClick={(event) => fetchSinglepost(event, post._id)}
                >
                  {post.title}
                </span>
                {context.userId === post.creater._id && (
                  <button
                    className="btn"
                    onClick={() => {
                      setselectedPostId(post._id);
                      setForm("delete");
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          ))}
        </div>

        <div className="singlePost">
          {showSinglePost && (
            <div>
              <button
                className="btn"
                onClick={() => {
                  setForm("comment");
                  setselectedPostId(showSinglePost._id);
                }}
              >
                Comment
              </button>
              <h1>{showSinglePost.title}</h1>
              <div className="origin">
                <span className="username">
                  #1 {showSinglePost.creater.username}
                </span>
                <span>{showSinglePost.description}</span>
                <br />
                <div className="likeButton">
                  <Like postId={showSinglePost._id} />
                </div>
              </div>
              {showSinglePost.userComments.map((usercomment, index) => (
                <div className="comment">
                  <span className="username">
                    # {+index + 2} {usercomment.creater.username}
                  </span>
                  <br />
                  {usercomment.topicComment}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {presentForm === "comment" && (
        <form className="addPost" onSubmit={comment}>
          <label htmlFor="comment">Comment</label>
          <input name="comment"></input>
          <button className="btn">Yes</button>
        </form>
      )}

      {presentForm === "delete" && (
        <form className="addPost">
          Are you sure that you want to Delete this post?
          <button className="btn" onClick={deletepost}>
            Yes
          </button>
        </form>
      )}
    </div>
  );
}

export default Topic;
