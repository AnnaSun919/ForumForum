import React from "react";
import { useState, useEffect } from "react";

function User() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    const requestBody = {
      query: `query {
    users {
      _id
       username
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
        console.log(resData);
        setUsers(resData.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {users &&
        users.map((user) => (
          <>
            <p>{user.username}</p>
          </>
        ))}
    </div>
  );
}

export default User;
