import React, { useState, useEffect, useRef } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";

let orbis = new Orbis();

interface IPosts {
  data: [],
  error: string,
  status: number
}
  


export default function Forum() {

  const [user, setUser] = useState();
  const [posts, setPosts] = useState({} as IPosts);
  
  useEffect(() => {
    const getPosts = async () => {
      let res = await orbis.isConnected();
      if (res.status == 200) {
        let posts = await orbis.getPosts({
          did: res.did,
        });
        return posts;
      } else {
        console.log("need to connect to orbis");
        return [];
      }
    };
    
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);

  const newPost = async (e: any) => {
    e.preventDefault();
    // console.log(e.target.title.value);
    let res = await orbis.isConnected();
    if (res.status == 200) {
      let title = e.target.title.value;
      let description = e.target.description.value;

      let post = await orbis.createPost({
        title: title,
        body: description,
      });
      console.log(post);
    } else {
      console.log("need to connect to orbis");
    }
  };

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

      <div className="p-5">
        <h1>My Posts</h1>
        <>
        {
          !posts || !posts.data ? (
            <p>No posts found</p>
          ) : (
            posts.data.map((post: any) => {
              console.log(post)
              return (                
                <div key={post.timestamp} className="p-5">
                  <h1>{post.content.title}</h1>
                  <h2>{post.content.body}</h2>                
                </div>
              );
            })
          )                    
        }
        </>
      </div>
    </div>
  );
}
//
