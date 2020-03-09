import React from "react";

import { Typography, Link, Card, CardHeader, CardContent, CardActions, Grid } from "@material-ui/core";

const services = [
  { name: "Security Onion", url: "https://so-sopoc.duckdns.org" },
  { name: "CyberChef", url: "https://so-sopoc.duckdns.org/cyberchef/cyberchef.htm" },
  { name: "Squert", url: "https://so-sopoc.duckdns.org/squert/" },
  { name: "Ntopng", url: "https://ntopng-sopoc.duckdns.org/" },
  { name: "TheHive", url: "https://thehive-sopoc.duckdns.org" },
  { name: "Cortex", url: "https://cortex-sopoc.duckdns.org" }
];

function Home() {
  return (
    <React.Fragment>
      <h1>Welcome</h1>
      {services.map(service => (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography>
                  <Link href={service.url}>{service.name}</Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
}

export default Home;
