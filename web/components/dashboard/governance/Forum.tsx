import React, { useState, useEffect, useRef } from "react";

import { useOrbis } from "../../../context/orbis";
import Spinner from "../../Spinner";

interface IPosts {
  data: [];
  error: string;
  status: number;
}
enum ForumState {
  done = "done",
  posting = "posting",
}

export default function Forum() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState({} as IPosts);
  const { orbis } = useOrbis();

  const groupId = process.env.NEXT_PUBLIC_ORBIS_GROUP_ID;
  const [forumState, setForumState] = useState<ForumState>(ForumState.done);

  useEffect(() => {
    const getPosts = async () => {
      if (user && groupId) {
        const posts = await orbis.getPosts({
          context: groupId,
        });
        console.log({ posts });
        return posts;
      } else {
        console.log("need to connect to orbis");
        return [];
      }
    };
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, [groupId, orbis, user]);

  const deletePost = async (stream_id: string) => {
    let res = await orbis.isConnected();
    if (res.status == 200) {
      let post = await orbis.deletePost(stream_id);
      console.log(post);
    } else {
      console.log("need to connect to orbis");
    }
  };

  const newPost = async (e: any) => {
    e.preventDefault();
    setForumState(ForumState.posting);
    const res = await orbis.isConnected();
    if (res.status == 200) {
      let title = e.target.title.value;
      let description = e.target.description.value;

      const post = await orbis.createPost({
        title: title,
        body: description,
        context: groupId,
      });
      console.log(post);
    } else {
      console.log("need to connect to orbis");
    }
    setForumState(ForumState.done);
  };
  useEffect(() => {
    (async () => {
      const connectedRes = await orbis.isConnected();
      if (connectedRes.status === 200) {
        setUser(connectedRes.did);
      } else {
        const res = await orbis.connect();
        if (res.status == 200) {
          setUser(res.did);
        } else {
          console.log("Error connecting to Orbis: ", res);
        }
      }
    })();
  }, [orbis]);

  return (
    <>
      <div>
        <div className="p-5">
          <form
            onSubmit={(event) => {
              newPost(event);
            }}
          >
            <input type={"text"} placeholder={"Title"} name="title" />
            <input
              type={"text"}
              placeholder={"Description"}
              name="description"
            />
            <button>Submit</button>
          </form>
        </div>

        <div className="p-5 text-start">
          <div className="flex bg-table-header-blue px-4 rounded-lg h-8 items-center">
            <div className="w-3/12">Topic</div>
            <div className="w-3/12">Description</div>
            <div className="w-1/12">Author</div>
          </div>
          {forumState === ForumState.done ? (
            <>
              {!posts || !posts.data || !posts.data.length ? (
                <p className="text-center m-auto my-7">No posts found</p>
              ) : (
                posts.data.map((post: any) => {
                  return (
                    <div key={post.timestamp} className="flex p-5 w-stretch">
                      <div className="w-3/12">{post.content.title}</div>
                      <div className="w-3/12">{post.content.body ?? ""}</div>
                      <div className="w-5/12 truncate">
                        {post.creator_details.metadata?.ensName ??
                          post.creator_details.metadata?.address ??
                          ""}
                      </div>
                      <button
                        className="w-1/12 text-red-600 px-3"
                        onClick={() => {
                          deletePost(post.stream_id);
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                })
              )}
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
}
//
