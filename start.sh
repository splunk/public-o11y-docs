#!/bin/bash
NOW=$(date +"%m-%d-%Y")
echo "Date: $NOW"
echo "----------------------- Attempting to shut down running sphinx docs container ---------"
docker-compose down
echo "----------------------- Build Started -------------------------"
docker-compose build
echo "----------------------- Build Complete -----------------------"
echo "----------------------- sphinx docs service Starting -------------------------"
docker-compose up -d
echo "----------------------- sphinx docs service started -----------------------\n\n"
echo $'\e[1;33m'*********************************************************************************************$'\e[0m'
echo $'\e[1;33m'*********************************************************************************************$'\e[0m'
echo $'\e[1;33m'      $'\e[0m'
echo $'\e[1;33m'  -1:     Now you landed on Sphinx box   - you see like root@xyz:/docs#   $'\e[0m'
echo $'\e[1;33m'  -2:     make html   - execute the command to build html  $'\e[0m'
echo $'\e[1;33m'  -3:     It generates html files in _build folder      $'\e[0m'
echo $'\e[1;33m'  -4:     Can view html content on http://localhost:9999 - hard refresh to flush browser cache    $'\e[0m'
echo $'\e[1;34m'Note: Repeat step 2 and 4 whenever you want to do any code change  $'\e[0m'
echo $'\e[1;34m      'Olly folder structure mounted as it is to docker container, changes reflects automatically  $'\e[0m'
echo $'\e[1;34m      'type: exit - to come out from Sphinx box i.e root@xyz:/docs#    $'\e[0m'
echo $'\e[1;34m      '   $'\e[0m'
echo $'\e[1;33m'*********************************************************************************************$'\e[0m'
echo $'\e[1;33m'*********************************************************************************************$'\e[0m'

docker exec -it  sphinx bash