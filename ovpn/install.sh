# https://github.com/kylemanna/docker-openvpn?tab=readme-ov-file
# Gen config (fill in your server ip or domain name after udp://)
docker compose run --rm ovpn ovpn_genconfig -u udp://34.124.125.71

# Setup CA
docker compose run --rm ovpn ovpn_initpki

# Run Server
docker compose up -d

# Build Client CA (lazyshout is client name)
docker compose run --rm ovpn easyrsa build-client-full lazyshout nopass

# Export Client CA
docker compose run --rm ovpn ovpn_getclient "lazyshout" > "lazyshout.ovpn"

# Download OpenVPN client and import local file to connect to server
# https://openvpn.net/downloads/openvpn-connect-v2-windows.msi
# note that, don't download v3 client, since there's some problem with local file format.
