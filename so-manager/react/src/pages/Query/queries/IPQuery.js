import React, { useState } from "react";

import { TextField, Select, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "25ch",
    },
  },
}));

function kibanaIndicator(ip) {
  return `https://so-sopoc.duckdns.org/app/kibana#/dashboard/68563ed0-34bf-11e7-9b32-bb903919ead9?_a=(query:(language:lucene,query:%22${ip}%22))`;
}

function isIP(input) {
  // From https://github.com/lukehaas/RegexHub
  const regex =
    "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";

  return RegExp(regex).test(input);
}

function IPQuery() {
  const classes = useStyles();

  var [parameters, setParameters] = useState({ ip: "" });
  var [result, setResult] = useState({});

  function handleSubmit(event) {
    if (isIP(parameters.ip)) {
      var tempResult = {};
      tempResult.kibanaIndicator = kibanaIndicator(parameters.ip);
      setResult(tempResult);
    } else {
      alert("Not a valid IPv4 address.");
    }

    event.preventDefault();
  }

  return (
    <React.Fragment>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>Single IP lookup</h2>
        <TextField
          required
          label="IP address"
          variant="outlined"
          value={parameters.ip}
          onChange={(event) =>
            setParameters({ ...parameters, ip: event.target.value })
          }
        />
      </form>

      {result.kibanaIndicator && (
        <div>
          <a href={result.kibanaIndicator}>Kibana indicator dashboard</a>
        </div>
      )}

      {JSON.stringify(result)}
    </React.Fragment>
  );
}

export default IPQuery;
