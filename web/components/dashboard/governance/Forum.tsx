import React, { useState, useEffect, useRef } from "react";

import { useOrbis } from "../../../context/orbis";

interface IPosts {
  data: [],
  error: string,
  status: number
}
  

export default function Forum() {

  const [user, setUser] = useState();
  const [posts, setPosts] = useState({} as IPosts);
  const { orbis } = useOrbis();
  
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

  const deletePost = async (stream_id: string) => {
    let res = await orbis.isConnected();
    if (res.status == 200) {
      let post = await orbis.deletePost(stream_id);
      console.log(post);
    } else {
      console.log("need to connect to orbis");
    }
  }

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
    } else {
      console.log("Error connecting to Ceramic: ", res);      
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
              return (                
                <div key={post.timestamp} className="p-5">
                  <h1>Title: {post.content.title}</h1>
                  <h2>Body: {post.content.body}</h2>
                  <button onClick={() => {
                    deletePost(post.stream_id);
                  }}><p className="text-red-600">Delete</p></button> 
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
