import React from "react";

import Iframe from "react-iframe";
import { Link } from '@material-ui/core';

function Home() {
  return (
    <React.Fragment>
      <h1>Welcome</h1>
      <Link href="https://so-sopoc.duckdns.org/app/kibana">
        Kibana
      </Link>
      <Iframe
        url="/so/app/kibana"
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
