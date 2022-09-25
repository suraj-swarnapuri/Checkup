# Checkup
DFW Hackathon project

## Discord
https://discord.gg/MagGQBwk

## Local Dev
To set up local dev environment you need to have the docker runtime active
in the root run 
 - `docker build -t devcontainer .`

To run the backend docker instance
 - `docker run -d -p 5000:5000 checkup-backend`
 - `docker -d -p {targetPort:port} -it {containerName} bash`

Check with Docker Desktop to see if container is running. \
Open up VsCode and connect to running container

## Deploy to Heroku
1. Download heroku cli
1. Create a heroku app on heroku.com
1. Login to heroku `heroku login`
1. Connect to heroku container registry `heroku container:login`
1. Navigate to back-end folder and build with docker
1. Push to container registry `heroku container:push web -a {heroku app name}`
1. Deploy container to app `heroku container:release web -a {heroku app name}`
