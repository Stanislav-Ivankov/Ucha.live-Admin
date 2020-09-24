#!/bin/bash

npm install
if [ "$ENV" = "dev" ]; then
	echo 'Running DEV Build...'
	npm run build:dev
elif [ "$ENV" = "prod" ]; then
	echo 'Running PROD Build...'
	npm run build:prod
elif [ "$ENV" = "stage" ]; then
	echo 'Running STAGE Build...'
	npm run build:stage
else
	echo 'Running Local Build...'
	npm run build
fi