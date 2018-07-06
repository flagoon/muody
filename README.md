# Muody CLI

This is, as for now, a simple doc for my CLI. I will write here what should be done and how. Just to keep order in what to do.

## GIT commands

### Work on a different branch

-   _user needs to check out, but what if he/she has uncommited stuff?_
-   use git fetch first, to be sure that all branches are available.
-   git checkout to the branch.
    -   **throw an error, when branch to checkout is not provided**
    -   **throw an error, when branch to checkout is not available**

### git pull origins "branch"

-   if branch is not provided, assume it's master
-   if branch don't exists, stop everything
-   if branch exists, but throws an error, stop everything
-   if branch exists and no errors, go further

## Docker commands (optional, app called with arguments, available to run just this commands) 'muody -d'

### stop all dockers (docker stop \`docker ps -qa\`) - maybe

-   check if docker is running, if no, throw and error
-   if docker is running, tries to stop all containers
-   move to next step

### remove all container (docker rm \`docker ps -qa\`)

-   docker ps -qa can throw an error, when no containers are running, ignore the error, and skip this command
-   if containers are removed, proceed to next step

### remove all images (docker rmi \`docker images -qa\`)

-   if no docker images, skip this action
-   if images are removed, show message in console, that everything is OK.
    -   maybe add option to start the docker

## System commands

### remove components

### remove crud

### remove dist

## NPM commands

### npm install

### npm run build

### npm run start
