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

### MISP

MISP needs to know the external hostname. T
This is set in `MISP_BASEURL`, for example `misp-sopoc.duckdns.org`.

Edit `MISP_ADMIN_EMAIL` and `MISP_ADMIN_PASSPHRASE`.
Changing these values won't change the default login of `admin@admin.test` with password `admin`.
See further configuration instructions below.

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

## 4. MISP

### Misp instance

Misp starts with a default login, despite setting the email and password in the `.env` file.
- Open the MISP web interface
- Login with email `admin@admin.test` and password `admin`.
- Change password to the value of `MISP_ADMIN_PASSPHRASE`, set earlier in `.env`.
- Open the "Edit my profile" page.
- Change email to the value of `MISP_ADMIN_EMAIL`, set earlier in `.env`.
- Go to the "My profile" page.
- Copy the AuthKey, this is the api key used by securityonion-misp.

### Security Onion

Ssh into the Security Onion vm and clone the repository:
```
git clone https://github.com/weslambert/securityonion-misp
```

Apply a small patch and run the install script:
```
sed -i "s/is_ip() {/is_ip() {\nreturn 0/" securityonion-misp/so-misp-setup
sudo securityonion-misp/so-misp-setup
```
Follow the installation instructions:
- Enter the ip address and port of the MISP instance.
  The ip address is the SO vm's gateway. The port is exposed by the misp-proxy container.
  For example: `192.168.101.1:6000`
- Enter http as protocol
- Paste your api key and press enter, your input is hidden.
- Type `YES` for configuring NIDS rules.
- Type `YES` for configuring Zeek intel data.
- Type `YES` to confirm.

Finally update the ruleset:
```
sudo rule-update
```

NIDS rules are now synchronized daily with the MISP rule generator.