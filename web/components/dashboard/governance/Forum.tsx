import React, { useState, useEffect, useRef } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";

export default function Forum() {
  let orbis = new Orbis();

  const [user, setUser] = useState();

  const newPost = async (e: any) => {
    e.preventDefault();
    // console.log(e.target.title.value);
    let res = await orbis.isConnected();
    if (res.status == 200) {
      let title = e.target.title.value;
      let description = e.target.description.value;

      let post = await orbis.createPost({
        "title": title, 
        "body": description
      });
      console.log(post);
    } else {
      await connect();
    }
  }

  async function connect() {
    let res = await orbis.connect();

    if (res.status == 200) {
      setUser(res.did);
      console.log(res);
    } else {
      console.log("Error connecting to Ceramic: ", res);
      alert("Error connecting to Ceramic.");
    }
  }

  return (
    <div>
      {user ? (
        <p>Connected with: {user}</p>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}

      <div className="p-5">
        <form onSubmit={newPost}>
        <input type={"text"} placeholder={"Title"} name="title" />
        <input type={"text"} placeholder={"Description"} name="description" />
        <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
//
