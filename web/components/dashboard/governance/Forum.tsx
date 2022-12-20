import React, { useState, useEffect } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";

export default function Forum() {
  let orbis = new Orbis();

  const [user, setUser] = useState();
  
  async function connect() {
    let res = await orbis.connect();
    
    if (res.status == 200) {
      setUser(res.did);
      console.log(res)
    } else {
      console.log("Error connecting to Ceramic: ", res);
      alert("Error connecting to Ceramic.");
    }
  }

  return (
    <div>
			{user ?
				<p>Connected with: {user}</p>
			:
				<button onClick={() => connect()}>Connect</button>
			}
		</div>
  );
}
