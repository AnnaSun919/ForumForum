import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/authcontext";

function Like(props) {
  const [like, updateLike] = useState(0);
  const context = useContext(AuthContext);
  const [likeId, updateLikeId] = useState(null);

  useEffect(() => {
    fetchLike();
  }, []);

  // const [dislike, updateDislike] = useState(0);

  const clickLike = () => {
    const postId = props.postId;
    if (context) {
      updateLike(like + 1);
    }

    let requestBody = {
      query: `
      mutation LikeTopic($topicId:ID!){
     likeTopic(topicId : $topicId){
          _id
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
  };

  function fetchLike() {
    const postId = props.postId;

    const requestBody = {
      query: `query
      Like($topicId: ID!) {
        like(topicId:$topicId){
          _id

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
      .then((res) => {
        updateLike(res.data.like.length);
        updateLikeId(res.data.like);
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <div>
      <button onClick={clickLike}>{like} 👍</button>
    </div>
  );
}

export default Like;
