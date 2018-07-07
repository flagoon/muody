<!-- Command: muody -l start -b branch -->

# start the project

-   check if it's a git repo by git status...
    -   if it's not a git repo, throw
    -   if there are Untracked files, throw an error
    -   any other error, throw
    -   if no errors, check branch name, and skip git checkout if it's the same name.
-   go to given branch, default master
    -   uncommited changes should throw an error
    -   branch not existing should throw an error
    -   if everything is OK, then go to that branch
-   make git pull on that branch
    -

# Commands

-   muody - check if git repo, git pull, rm dist, check if there is crud and remove it, check if components and remove it, npm i, yarn build, start docker, if error, docker stop, docker rm, docker rmi, start docker
-   muody -b branch - same, but go to existing branch, throw if it's not exisiting)
-   muody -d components -
