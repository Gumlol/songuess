#!/bin/bash

DIRECTORY=/opt/songuess;

cd $DIRECTORY;

docker build -t songuess_frontend $DIRECTORY

docker rm -f songuess_frontend

docker run -d --name songuess_frontend -p 3000:3000 songuess_frontend