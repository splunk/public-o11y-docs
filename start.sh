#!/bin/bash

# Clear screen and show banner
clear
echo ""
echo "**********************************************************************"
echo "*                                                                    *"
echo "*       Splunk Observability Cloud Docs :: Docker container          *"
echo "*                                                                    *"
echo "**********************************************************************"
echo ""

# Variables for showing CLI output and spinner animation
bold=$(tput bold)
normal=$(tput sgr0)
spin='-\|/'
cleanmsg='Cleaning up... '
buildmsg='Starting Docker container... '

# Run Docker commands to build the container with no CLI noise
docker-compose down > /dev/null 2> /dev/null &
pid=$! # Process Id of the previous running command
i=0
while kill -0 $pid 2>/dev/null
do
    i=$(( (i+1) %4 ))
    printf "\r${cleanmsg}${spin:$i:1}"
    sleep .1
done

docker-compose build > /dev/null 2> /dev/null &
pid=$! # Process Id of the previous running command
i=0
while kill -0 $pid 2>/dev/null
do
    i=$(( (i+1) %4 ))
    printf "\r${buildmsg}${spin:$i:1}"
    sleep .1
done

docker-compose up -d > /dev/null 2> /dev/null

printf "\rDocker container built.              "
sleep .5
# Show instructions and enter the container's shell
echo ""
echo ""
echo "This Docker container lets you build and test the docs locally."
echo ""
printf "${bold}Don't run git commands inside the container.${normal}"
echo "To run git commands while using"
echo "the testing container, open a separate terminal window or tab."
echo ""
printf "${bold}Instructions:\n${normal}"
echo ""
echo " 1. Run 'make clean html' or 'make html' to build the docs."
echo " 2. Browse http://localhost:9999 to see the local build of the docs."
echo " 3. Enter 'exit' when you're done."
echo ""
printf "${bold}Note:${normal} When running 'make livehtml', browse http://localhost:8888 instead.\n"
echo ""

docker exec -it  sphinx bash