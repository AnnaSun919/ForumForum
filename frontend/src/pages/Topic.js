import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authcontext";
import Backdrop from "../component/BackDrop/BackDrop";
import "./Topic.css";
import Navbar from "../component/NavBar/Navbar";
import NavItem from "../component/NavBar/NavItem";
import DropdownMenu from "../component/NavBar/DropdownMenu";
import Like from "../component/LikeButton/Like";
import DropdownItem from "../component/DropdownMenu/DropdownItem";
import Dropdown from "../component/DropdownMenu/DropDown";

function Topic() {
  const context = useContext(AuthContext);
  const [posts, setContent] = useState([]);
  const [presentForm, setForm] = useState(null);
  const [selectedPostId, setselectedPostId] = useState(null);
  const [showSinglePost, setShowSinglePost] = useState(null);
  const [open, setOpen] = useState(false);
  const [n, setn] = useState({ first: 0, second: 10 });
  const [pageArray, setPageArray] = useState([]);

  //to loan all posts
  useEffect(() => {
    fetchTopic();
  }, [n]);

  const forOpen = () => {
    setOpen(!open);
  };

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
  function deletepost(event) {
    event.preventDefault();
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
        setForm(null);
        fetchTopic();
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
        pageArr(resData.data.singlePost.userComments.length);
        pageHelper(resData.data.singlePost.userComments);
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
        setForm(false);
        fetchSinglepost(event, postId);
        return res.json();
      })
      .catch((err) => {
        throw err;
      });
  }

  const page = [];

  const pageArr = (elem) => {
    if (elem > 9) {
      const pageNo = Math.ceil((elem - 9) / 10) + 1;
      console.log(pageNo);
      for (let i = 1; i <= pageNo; i++) {
        page.push(i);
      }
    }
    setPageArray(page);
  };

  const pageHelper = (e, elem) => {
    if (elem) {
      setn({ first: elem * 10 - 10, second: elem * 10 });
    }
  };

  console.log("show n " + n.first);

  return (
    <div>
      {presentForm && <Backdrop onCreate={showForm}></Backdrop>}

      {presentForm === "create" && (
        <>
          <form className="addPost" onSubmit={sumbitPost}>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input maxlength="80" name="title" />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                maxlength="1000"
                className="description"
                name="description"
              />
            </div>
            <div className="form-actions">
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
            </div>
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
          {context.userId && (
            <button
              className="btn"
              id="createButton"
              onClick={() => {
                setForm("create");
              }}
            >
              Add Post
            </button>
          )}
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
                <div className="form-actions">
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
              </div>
            </>
          ))}
        </div>

        <div className="singlePost">
          {showSinglePost && (
            <DropdownItem onOpen={forOpen} open={open}>
              <Dropdown
                pageArray={pageArray}
                onPage={pageHelper}
                onOpen={forOpen}
              />
            </DropdownItem>
          )}

          {showSinglePost && (
            <div>
              {context.userId && (
                <button
                  className="btn"
                  onClick={() => {
                    setForm("comment");
                    setselectedPostId(showSinglePost._id);
                  }}
                >
                  Comment
                </button>
              )}
              <div className="topictitle">
                <h1>{showSinglePost.title}</h1>
              </div>

              {n.first === 0 ? (
                <div className="origin">
                  <span className="username">
                    {showSinglePost.creater.username}
                  </span>
                  <span className="content">{showSinglePost.description}</span>
                  <br />
                  <div className="likeButton">
                    <Like postId={showSinglePost._id} />
                  </div>
                </div>
              ) : (
                ""
              )}
              {showSinglePost.userComments
                .slice(n.first, n.second)
                .map((usercomment, index) => (
                  <div className="comment">
                    <span className="username">
                      # {n.first + index + 1} {usercomment.creater.username}
                    </span>
                    <br />
                    <span className="content">{usercomment.topicComment}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {presentForm === "comment" && (
        <form className="addPost" onSubmit={comment}>
          <div className="form-control">
            <label htmlFor="comment">Comment</label>
            <textarea maxlength="1000" name="comment"></textarea>
          </div>
          <div className="form-actions">
            <button className="btn">Add Comment</button>
          </div>
        </form>
      )}

      {presentForm === "delete" && (
        <form className="addPost">
          <div className="form-control">
            Are you sure that you want to Delete this post?
          </div>
          <div className="form-actions">
            <button
              className="btn"
              onClick={(event) => {
                deletepost(event);
              }}
            >
              Yes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Topic;
