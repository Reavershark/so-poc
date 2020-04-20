import React from "react";

import { Typography, Card, CardContent, CardActionArea, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import services from "./data/services";

const useStyles = makeStyles({
  card: {
    width: 200,
    minHeight: 100,
    marginRight: 20
  },
  actionArea: {
    height: "100%"
  }
});

function ServiceCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={3}>
      <CardActionArea className={classes.actionArea} href={props.item.url}>
        <CardContent>
          <Typography align="center" variant="h6">
            {props.item.name}
          </Typography>
          <Typography align="center" variant="body2">
            {props.item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function Home() {
  return (
    <React.Fragment>
      <h1>Services</h1>
      {services.map(service => (
        <React.Fragment>
          <h2>{service.category}</h2>
          <Grid container spacing={1}>
            {service.items.map(item => (
              <ServiceCard item={item} />
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default Home;
