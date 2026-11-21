## Docker
Docker is used to **containerize** individual apps and their dependencies. An **image** bundles/packages everything that a specific software needs to run. For example, our backend image could bundle Django 4.2 with a Linux server and all of the backend code. A container is then built based on the image.

### How do this work?
Dockerfile is used to define an image. We can then build the image by running the Dockerfile. We can create and run a container by using an image.

We use a dockerfile to build an image, then use an image to create a container. If an image is the blueprint of a container, then the dockerfile is a blueprint of a blueprint. The verbs are precise. We don't build a container, even though it sounds cool.

### What is YAML?
YAML stands for "Yet Another Markup Language" and "YAML Ain't Markup Language." For file types, we say .yaml or .yml. Technicality note: Generally it doesn't matter which standard you take, .yaml or .yml, but Helm seeks chart.yaml, NOT chart.yml, by default.

### Docker Compose
To run things locally, we use docker-compose.yml files, which are essentially a set of instructions for how to build images with a dockerfiles and how to run their respective containers. It comes in handy for local deployment of multiple interdependent containers. For example, a frontend container relies on a backend container's API, so using docker-compose to determine how containers run and are connected is valuable. A system of interdependent containers defined by a docker-compose.yml file is called a Docker Compose stack.

## Django
Django is a **Python web framework**. Django commonly uses a Model-View-Template (MVT) pattern. More on Models and Views later. We won't use templates since we utilize Next.js as a frontend, but they are reusable files (generally HTML) that are used to generate dynamic web pages. We use Django in this project as a backend API.

Django is a preferred backend because of its strong security options.

### What is a backend?
A backend is the **server-side** layer of a website or app that stores data, runs business logic, handles user authentication, and responds to requests from the visible front end. - that's google, baby

It is the behind-the-scenes of a web application. We don't need heavy logic or authentication to happen on the frontend for anyone to see. This is the basic idea of backends.

## Framework > Library > Package > Module
- Module: A single file containing functions, classes, or variables. Example: math - math.sqrt(16)
- Package: A bundle of modules and metadata. Example: boto3
- Library: A collection of packages and/or modules designed to solve a set of specific problems. Example: NumPy
- Framework: A framework is a comprehensive system of libraries and rules that dictate how a full project would function and be built.

The hierarchy is not strict, as there is overlap. A nice thing to remember is "Code calls the library, the framework calls the code."

## Next.js
Next.js is a **full-stack React framework**; though, we use it for its frontend and proxy capabilities.

### What is a proxy?
A proxy is an intermediary that receives a request and forwards it to another server. More to come...

### What is a frontend?
A frontend is the *client-side*, user-facing layer of a website or app that clients see and interact with directly. - that's google, baby

Note: It runs on top of Node.js

### React
React is a JavaScript library used for building interfaces with reusable components.

### Node.js
Node.js is a JavaScript runtime environment that lets developers run JavaScript code outside of a web browser. - that's google, baby (I think w3schools)

#### What is JavaScript code for?
JavaScript makes pages interactive. It can send and recieve JSON(JavaScript Object Notation) to and from Django to update the page with.

## Makefile
A Makefile is a special file used for automation. Pretty neat. We use it for simple tasks like starting and stopping a Docker Compose stack.

## Http request methods (w/ responses!)
An Http request is a client talking to a server. In our project, this looks like our frontend requesting something from our backend. The goal is just to tell our backend something, so the effects of a request could be many things.

### Common HTTP requests
- GET: Get data from the server
- POST: Create data on the server
- PUT: Change a full data entry on the server
- PATCH: Change some of a data entry on the server
- DELETE: Delete something on the server 
- QUERY: (New*) Kinda like GET...

### Anatomy of a request/response
- 1. Target (Request Only): Where the request is sent
- 1. Status (Response Only): The protocol and status of the request
- 2. Header: The metadata of a request/response
- 3. Body: Carries information to the server/client

Example request: 
```text
POST http://foresight/v1/api/messages/14    <- Target is foresight/... 
Content-Type: application/json              <- Header is the type of body

{                                           <- Body is JSON object
    "title": "This is a title",
    "message": "This is a message"
}
```

Example response:
```text
HTTP/1.1 201 Created                                <- Status is 201, protocol is HTTP/1.1
Content-Type: application/json                      <- Header is Content-Type and from location
Location: http://foresight/v1/api/messages/14 

{                                                   <- JSON response
    "message": "new message created",
    "celebration": "true"
}
```

### Common response statuses
- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 500 Internal Server Error


## MORE TO COME
- DOCKER
    - Localhost
    - Volumes
    - Mounts
- pip vs uv
- React
    - State
    - UseEffect
- Serialization
- Environment Variables
- Routing
- Error Handling
- More on Proxying and CORS






## Anatomy of Span
```text
{
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",   <- The trace id
  "span_id": "00f067aa0ba902b7",                    <- This span's id
  "parent_span_id": "7a2c...",                      <- Previous span's id
  "name": "POST /feedback",                         <- Cause for span
  "kind": "SERVER",                                 <- Span cause's role
  "start_time": "2026-11-20T23:30:00.123Z",         <- Start of span
  "duration": "42ms",                               <- Duration of span
  "status": {                                       <- Status of cause
    "code": "OK"
  },
  "attributes": {                                   <- Metadata
    "http.method": "POST",
    "http.route": "/feedback",
    "http.status_code": 200,
    "service.name": "foresight-backend"
  },
  "events": [                                       <- Timestamped points within the span
    {
      "name": "exception",
      "time": "..."
    }
  ],
  "links": [],                                      <- Rleationsihp to other traces or spans, not parent/child
  "resource": {                                     <- Describes process or service emitting the span
    "service.name": "foresight-backend",
    "deployment.environment": "dev"
  }
}
```


## uv vs pip

### pip
pip is Python's traditional **package installer**. For example, `pip install Django`. We also use it in Dockerfiles, i.e. `RUN pip install -r requirements.txt`. When running local servers without containerization, we also like to create environments so our installed packages don't affect other projects. We have to set this environment up separately. Additionally, when we run something like a Django server in the environment, we do these things independently of pip as well. 

### uv
uv is a **project and package manager**. It handles both environment and dependencies. It is also faster than pip, which is just the cherry on top. 

### requirements.txt vs
With pip, we generally put the dependencies of a project in a requirements.txt file which states the dependency as well as its version (i.e. `Django==4.2`). For uv, instead of requirements.txt, we use pyproject.toml. We then call uv.lock to create track all "trickle" dependencies (dependencies that another dependency might need). I reads the pyproject.toml, and "locks in" the current environment. This makes the environments easy to "sync up" using uv.sync.