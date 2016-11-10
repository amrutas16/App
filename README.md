# MileStone3
Devops MileStone3

### Setup

* We have used digitalocean droplets to host our servers.
* We have seperate droplets to host the below servers/environment
  1) Production server
  2) Canary server
  3) Proxy server and Redis global store

### Tasks
<hr>
#### The ability to deploy software to the production environment triggered after build, testing, and analysis stage is completed. The deployment needs to occur on actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.
* For hosting the production environment we have a droplet, which runs the application using the bare repository configured on it.
* We have used jenkins to perform builds along with testing and static analysis
* For unit testing we have used the Mocha framework for testing javascript applications.
* We have used PMD for static analysis
* The build is triggered on a git commit. After the build is successful, we trigger a push to our local repository as well to the bare repository.
* After each build, the latest version of the software runs in production environment.
