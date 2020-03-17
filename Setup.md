# Setup

## 1. Preparation

Copy the `.env.example` file to a new `.env` file and update the values to suit your needs.

The following values will be generated while following the setup:
- CORTEX_API_KEY

### Networking

Optionally adjust `DOCKER_SUBNET` and `DOCKER_GATEWAY` if it overlaps with an external network.
Since docker-compose doesn't allow setting the gateway of a network's IPAM manually, `DOCKER_GATEWAY` must be set to the first address in the subnet.

### Security Onion

A Security Onion machine should available at `SO_ADDRESS` through an interface on the host with ip address `SO_GATEWAY`.

### Credentials

Set `AUTH_USER` and `AUTH_PASS` to secret values.
These are used for the MISP admin and HTTP basic auth.

### Https portal

The host device needs to be reachable over the internet to acquire https certificates.

### MISP

MISP needs to know the external hostname. T
This is set in `MISP_HOSTNAME`, for example `misp-sopoc.duckdns.org`.

### Ntop

Configure `CAPTURE_INTERFACE` to the sniffing interface and `HOME_NET` to a comma separated list of CIDR ranges representing local networks.

Ntop works out of the box, the runtime can be configured from the settings page.

## 2. Starting

After filling out `.env`, docker-compose can be started with the following command:
```
./compose up --build -d
```
The same command can be used to recreate services with updated config/environment.

Service status can be viewed with `./compose ps`, logs can be viewed with `./compose logs -t [service]`.

## 3. Thehive

Some configuration is required to fully setup TheHive.
- Wait until all services starting with "thehive-" are fully started. Check the logs for this. Elasticsearch takes the longest to initialize.
- Proceed with configuring Cortex, then TheHive.

### Cortex

- Open the Cortex web interface and press "Update database".
- Create an administrator account.
- Login with the newly created account.
- Create a new organisation in Corex named "thehive", description does not matter.
  - Add a user named "thehive" to the newly created organisation, full name does not matter. Make sure the user has the roles "read, analyze, orgadmin".
    - Set a password for the user thehive. Analysers can be added when logged in with this user.
    - Generate the api key for the user thehive.
      - Set `CORTEX_API_KEY`'s value in `.env` to the api key you just generated.
      - Run `./compose up -d` again to recreate the thehive container with the correct api key.
- Logout from the administrator account, login with the user thehive.
- Go to the "Organisation" page, then select the "Analysers" tab.
  - Enable some analysers:
    - Most analysers require an api key to use, but some are free.
    - There's no limit on how many can be active.
    - List of analysers that do not require configuration:
      - Abuse Finder, Crt sh Transparency Logs, CyberCrime-Tracker, Cyberprotect ThreatScore, DShield lookup, EmlParser, FileInfo, Fortiguard URLCategory, GoogleDNS resolve, HIBP Query, MaxMind GeoIP, Mnemonic pDNS Public, Msg Parser, Robtex Forward PDNS Query, Urlscan io Search, Virusshare.


### TheHive

- Open the TheHive web interface and press "Update database".
- Create an administrator account.
- Login with the newly created account.
- Cortex connectivity works if the "About" page shows "cortex1 - 2.x.x-x (OK)".
- Go to users, add a new user named "security-onion".
  - Enable read/write for this user and enable alert creation.
  - Generate the api key for the user security-onion.
  - This is the api key used in ElastAlert rules with the hivealerter alert system.
- Open the "Admin" menu, go to the "Report templates" page.
  - Download the zip https://dl.bintray.com/thehive-project/binary/report-templates.zip locally.
  - Upload the zip with the "Import templates" dialog.

### Security Onion

Edit `/etc/elastalert/conf/elastalert_config.yaml`, at the bottom add:
```
# TheHive connection
hive_connection:
  hive_host: https://thehive-sopoc.example.com
  hive_apikey: apikey
```
Using the correct url and the newly generated api key for the user security-onion.


## 4. MISP

### Misp instance

Misp starts with a default login:
- Open the MISP web interface
- Login with email `admin@admin.test` and password `admin`.
- Change password to the value of `AUTH_PASS`, set earlier in `.env`.
- Open the "Edit my profile" page.
- Change email to "`AUTH_USER`@`MISP_HOSTNAME`", both set earlier in `.env`.
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