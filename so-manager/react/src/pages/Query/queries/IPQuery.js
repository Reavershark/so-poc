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

function isIP(input) {
  // From https://github.com/lukehaas/RegexHub
  const regex =
    "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";

  return RegExp(regex).test(input);
}

function IPQuery() {
  const classes = useStyles();

  var [parameters, setParameters] = useState({ ip: "" });
  var [result, setResult] = useState({ show: false });

  function query() {
    // Show result section/title
    setResult({
      show: true,
    });

    // Instantly generate links
    setResult((curr) => {
      return {
        ...curr,
        links: {
          kibanaIndicator: `https://so-sopoc.duckdns.org/app/kibana#/dashboard/68563ed0-34bf-11e7-9b32-bb903919ead9?_a=(query:(language:lucene,query:%22${parameters.ip}%22))`,
          ntopHost: `https://ntopng-sopoc.duckdns.org/lua/host_details.lua?host=${parameters.ip}`,
        },
      };
    });
  }

  function handleSubmit(event) {
    if (isIP(parameters.ip)) {
      query();
    } else {
      alert("Not a valid IPv4 address.");
    }

    event.preventDefault();
  }

  return (
    <React.Fragment>
      {/* Query form */}
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

      {/* Result */}
      {result.show && <h2>Result</h2>}

      {result.show && result.links.kibanaIndicator && (
        <div>
          <a href={result.links.kibanaIndicator}>Kibana indicator dashboard</a>
        </div>
      )}
      {result.show && result.links.ntopHost && (
        <div>
          <a href={result.links.ntopHost}>Ntop host details</a>
        </div>
      )}
      {result.show && JSON.stringify(result)}
    </React.Fragment>
  );
}

export default IPQuery;
