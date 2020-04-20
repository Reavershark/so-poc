import React, { useState } from "react";

import { TextField, Select, FormControl, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { IPQuery, DNSQuery } from "./queries";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Query() {
  const classes = useStyles();

  const [queryType, setQueryType] = useState("ip");

  return (
    <React.Fragment>
      <h1>Query</h1>
      <FormControl className={classes.formControl}>
        <InputLabel>Query type</InputLabel>
        <Select
          native
          value={queryType}
          onChange={(event) => {
            setQueryType(event.target.value);
          }}
        >
          <option value={"ip"}>IP</option>
          <option value={"dns"}>Domain</option>
        </Select>
      </FormControl>

      {queryType === "ip" && <IPQuery />}
      {queryType === "dns" && <DNSQuery />}
    </React.Fragment>
  );
}

export default Query;
