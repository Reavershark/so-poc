# Setup

## 1. Preparation

Copy the `.env.example` file to a new `.env` file and update the values to suit your needs.

The following values will be generated while following the setup:
- CORTEX_API_KEY

### Networking
Optionally adjust `DOCKER_SUBNET` and `DOCKER_GATEWAY` if it overlaps with an external network.
Since docker-compose doesn't allow setting the gateway of a network's IPAM manually, `DOCKER_GATEWAY` must be set to the first address in the subnet.

### Https portal

Set the `HTTP_BASIC_AUTH` env to configure authentication for some web interfaces.

The host device needs to be reachable over the internet to request https certificates.

### Ntop

Configure `CAPTURE_INTERFACE` to the sniffing interface and `HOME_NET` to a comma separated list of CIDR ranges representing local networks.

Ntop works out of the box, the runtime can be configured from the settings page.

## 2. Starting

After filling in .env, docker-compose can be started with the following command:
```
./compose up --build -d
```
The same command can be used to recreate services with updated config/environment.

Service status can be viewed with `./compose ps`, logs can be viewed with `./compose logs -t [service]`.

## 3. Thehive

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