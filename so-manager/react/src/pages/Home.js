import React from "react";

import {
  Typography,
  Link,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const services = [
  {
    category: "Security Onion",
    items: [
      {
        name: "Security Onion",
        description: "Security Onion homepage",
        url: "https://so-sopoc.duckdns.org"
      },
      {
        name: "Kibana",
        description: "NIDS, HIDS and Zeek log visualization",
        url: "https://so-sopoc.duckdns.org/app/kibana"
      },
      {
        name: "Squert",
        description: "IDS alert viewer",
        url: "https://so-sopoc.duckdns.org/squert/"
      },
      {
        name: "CyberChef",
        description: "Cyber Swiss Army Knife",
        url: "https://so-sopoc.duckdns.org/cyberchef/cyberchef.htm"
      }
    ]
  },
  {
    category: "TheHive",
    items: [
      {
        name: "TheHive",
        description: "Security incident response platform",
        url: "https://thehive-sopoc.duckdns.org"
      },
      {
        name: "Cortex",
        description: "Analysis and response engine",
        url: "https://cortex-sopoc.duckdns.org"
      }
    ]
  },
  {
    category: "Ntop",
    items: [
      {
        name: "Ntopng",
        description: "Complete traffic monitor",
        url: "https://ntopng-sopoc.duckdns.org/"
      }
    ]
  }
];

function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>Welcome</h1>

      {services.map(service => (
        <React.Fragment>
          <h2>{service.category}</h2>
          <Grid container spacing={1}>
            {service.items.map(item => (
              <Card className={classes.card} elevation={3}>
                <CardActionArea className={classes.actionArea} href={item.url}>
                  <CardContent>
                    <Typography align="center" variant="h6">
                      {item.name}
                    </Typography>
                    <Typography align="center" variant="body2">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

export default Home;
