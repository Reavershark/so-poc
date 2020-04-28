import React, { useState } from "react";

import {
  TextField,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "25ch",
    },
  },
  card: {
    minWidth: 200,
    margin: 10,
    width: "fit-content",
  },
  actionArea: {
    height: "100%",
    width: "100%",
  },
}));

function isIP(input) {
  // From https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
  const regex =
    "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";

  return RegExp(regex).test(input);
}

function DataCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={3}>
      <CardContent>
        <Typography align="center" variant="h6">
          {props.name}
        </Typography>
        <Typography align="center" variant="body2">
          {props.data}
        </Typography>
      </CardContent>
    </Card>
  );
}

function LinkCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={3}>
      <CardActionArea className={classes.actionArea} href={props.link}>
        <CardContent>
          <Typography align="center" variant="h6">
            {props.name}
          </Typography>
          {props.data && (
            <Typography align="center" variant="body2">
              {props.data}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
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

    // Query api and add to result
    fetch(`/api/host/${parameters.ip}`)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        setResult((curr) => {
          return {
            ...curr,
            data: body,
          };
        });
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

      {result.show && result.links && <h3>Links</h3>}
      <Grid container spacing={1}>
        {result.show && result.links && result.links.kibanaIndicator && (
          <LinkCard
            name="Kibana indicator"
            link={result.links.kibanaIndicator}
          />
        )}

        {result.show && result.links && result.links.ntopHost && (
          <LinkCard name="Ntop host details" link={result.links.ntopHost} />
        )}
      </Grid>

      {result.show && result.data && <h3>Data</h3>}

      <Grid container spacing={1}>
        {result.show && result.data && result.data.firstSeen && (
          <DataCard name="First seen by ntop" data={result.data.firstSeen} />
        )}

        {result.show && result.data && result.data.lastSeen && (
          <DataCard name="Last seen by ntop" data={result.data.lastSeen} />
        )}

        {result.show && result.data && result.data.mispMatches && (
          <DataCard
            name="Attribute search matches in MISP"
            data={result.data.mispMatches}
          />
        )}

        {result.show &&
          result.data &&
          result.data.mispEvents &&
          result.data.mispEvents.map((event) => {
            return (
              <LinkCard
                name="Misp event"
                data={event}
                link={`https://misp-sopoc.duckdns.org/events/view/${event}`}
              />
            );
          })}

        {result.show &&
          result.data &&
          result.data.errors &&
          result.data.errors.map((err) => {
            return <DataCard name="Error" data={err} />;
          })}

        {result.show && result.data && result.data.statusMessage && (
          <DataCard name="Fetch error" value={result.data.statusMessage} />
        )}
      </Grid>

      {result.show && (
        <React.Fragment>
          <h3>JSON</h3>
          <xmp>{JSON.stringify(result, null, 2)}</xmp>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default IPQuery;
