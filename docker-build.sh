#!/bin/sh
docker container stop client
docker container rm client
yarn build
docker build . --build-arg PORT=3000 -t client
echo
echo
echo "To run the docker container execute:"
echo "    $ docker run -p 8080:8080 client "