import React from "react";

import Iframe from "react-iframe";

function Home() {
  return (
    <React.Fragment>
      <h1>Welcome</h1>
      <Iframe
        url="https://127.0.0.1:4430/app/kibana"
        width="100%"
        height="600px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        style={{ padding: 20 }}
      />
    </React.Fragment>
  );
}

export default Home;
