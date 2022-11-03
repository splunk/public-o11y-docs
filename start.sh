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

docker-compose down 

rm -f _build/.DS_Store
rm -f _build/html/.DS_Store
rm -rf _build/*

docker-compose build

docker-compose up -d

printf "\rDocker container built.              "
sleep .5
# Show instructions and enter the container's shell
echo ""
echo ""
echo "This Docker container lets you build and test the docs locally."
echo "Do not build the docs outside of the container."
echo ""
printf "${bold}Instructions:\n${normal}"
echo ""
echo " 1. Run 'make clean html' or 'make html' to build the docs."
echo " 2. Browse http://localhost:9999 to see the local build of the docs."
echo " 3. Browse http://localhost:8888 when using 'make livehtml'."
echo " 4. Enter 'exit' when you're done."
echo ""
printf "${bold}Note: Don't run git commands inside the container.${normal} "
echo "To run git commands while using"
echo "the testing container, open a separate terminal window or tab."
echo ""

docker exec -it  sphinx bash