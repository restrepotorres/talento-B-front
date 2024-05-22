# Script gestor 


## How to run
### prerequisites
* Docker installed and running on your machine 
* The docker container with backend and database must be running on your localmachine, otherwise go to  [restrepotorres/talento-B-back](https://github.com/RestrepoTorres/talento-B-back) and follow the readme file in that repository.
### Step 1
Clone this repo

### Step 2
Navigate to the clone repository and open a command line

### Step 3
Run the following command to start the container

```bash
docker-compose up --build
```

### Step 4
Now you can access to the frontend 
[http://localhost:5173/](http://localhost:5173/)

As you can notice the front is serve on port 5173, so make sure this port is available 

## Alternative
If you not have docker on localmachine, but have npm 