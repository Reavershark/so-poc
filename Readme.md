# Security Onion Proof of Concept

This repository includes all services running on my network monitoring machine

## Environment

Copy the `.env.example` file to a new `.env` file and update the values to suit your needs.

## Thehive

Special configuration is required for setting up TheHive.
- Wait until all services starting with "thehive-" are fully started. Check the logs for this. Elasticsearch takes the longest to initialize.
- Proceed with configuring Cortex, then TheHive.

### Cortex

- Open the Cortex web interface and press "Update database".
- Create an administrator account.
- Login with the newly created account.
- Create a new organisation in Corex named "thehive", description does not matter.
- Add a user named "thehive" to the newly created organisation, full name does not matter. Make sure the user has the roles "read, analyze, orgadmin".
- Generate the api key for the user thehive.
- Set `CORTEX_API_KEY`'s value in `.env` to the api key you just generated.
- Running `./compose up -d` again recreates the thehive container with the correct api key.

### TheHive

- Open the TheHive web interface and press "Update database".
- Create an administrator account.
- Login with the newly created account.
- Cortex connectivity works if the about page shows "cortex1 - 2.x.x-x (OK)".
- Go to users, add a new user named "security-onion".
- Enable read/write for this user and enable alert creation.
- Generate the api key for the user security-onion.
- This is the api key used in ElastAlert rules with the hivealerter alert system.