#!/bin/bash

# When copying files, it will copy hidden as well.
shopt -s dotglob

ERROR='\033[0;31m'
SUCCESS='\033[0;32m'
WARNING='\033[0;33m'
MESSAGE='\033[0;36m'
NC='\033[0m'

SHOW_ERROR () {
  echo -e "${ERROR}ERROR: $1 ${NC}" && exit 1
}

SHOW_WARNING () {
  echo -e "${WARNING}WARNING: $1 ${NC}" && read -p "Press enter to continue or ctrl+c to stop"
}

SHOW_SUCCESS () {
  echo -e "${SUCCESS}$1 ${NC}"
}

SHOW_H1 () {
  printf "\n\n${MESSAGE}### $1${NC}\n"
}

SHOW_H1 "Checking for docker..."
if docker --version; then
  SHOW_SUCCESS "I can feel the presence of docker!"
else
  SHOW_ERROR "You should install docker first!"
fi

SHOW_H1 "Cleaning docker containers..."
if (docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)); then
  SHOW_SUCCESS "All clean!"
fi

SHOW_H1 "Building api images..."
if docker build -t nodejs-knex api/ ; then
  SHOW_SUCCESS "API image build done!"
else
  SHOW_ERROR "I was not able to build the api image"
fi

SHOW_H1 "Building spa images..."
if docker build -t nodejs-react spa/ ; then
  SHOW_SUCCESS "SPA image build done!"
else
  SHOW_ERROR "I was not able to build the api image"
fi

echo -e '\n'
SHOW_WARNING "
Please, add the lines below in your /etc/hosts file (Mac and Linux) (superuser will be necessary):  \n
127.0.0.1   proxy.local.project.com \n
127.0.0.1   pg.local.project.com \n
127.0.0.1   api.local.project.com \n
127.0.0.1   spa.local.project.com \n
"

if [ ! -f .env ]; then
  SHOW_H1 "Creating .env file"
  if (cp .env.exemple .env) ; then
    SHOW_SUCCESS ".env file successfully created!"
  else
    SHOW_ERROR "I was not able to create the .env file, plese check the errors above!"
  fi

  SHOW_WARNING "Some variables in the .env files should be filled, please take a look at that."
fi

SHOW_H1 "Creating database (it may take a moment, wait please!)..."
if (docker-compose up -d db && sleep 20s && docker exec -it pg.local.project.com /bin/sh -c "psql -U postgres -c 'CREATE DATABASE gql_db'") ; then
  SHOW_SUCCESS "Database gql_db successfully created!"
else
  SHOW_WARNING "I was not able to create the database, plese check the errors above!"
fi

SHOW_H1 "Starting all containers..."
if docker-compose up; then
  SHOW_SUCCESS "Online!"
else
  SHOW_WARNING "Something went wrong!"
fi