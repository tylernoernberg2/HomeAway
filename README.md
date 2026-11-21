# HomeAway
A simple project that sets up a Django project with Docker support for learning. It uses uv as its Python package manager and handler, and npm for its JavaScript package manager. It will be added to intermittently to teach/demonstrate a topic. 

COMPLETED TOPICS
- Django Project
- Docker Support
- Makefile
- GET, POST, PUT, DELETE Requests (No **PATCH** or **QUERY**)
- ~~REACT or~~ Next.js frontend
- uv integration

IN PROGRESS
- Ruff linting

DESIRED TOPICS
- SSO
- IDP
- Cookies
- CELERY
- Minikube+K8s deployment
- AWS deployment-ready components (maybe untestable)
- Logging
- Databases
- Roles and permissions
- Testing
- Beautify frontend

## Deployment
To deploy locally, use `make dc-up`. Do end and remove the compose stack, use `make dc-up`. When completely done, use `make dc-clean` to end and remove the compose stack as well as delete volumes and images.

## Branching Strategy
Since this is a small project, likely there will only be a main branch and its features. If the project bloats, I may add a development branch, but as for now, it will stay simple.

## Project Structure
Docker Compose spins up a Django backend at [localhost:8000](http://localhost.8000), which is mostly used as for api calls, and a Next.js frontend at [localhost:3000](http://localhost.3000).

## Project Standardization
We use Ruff linting and formatting in order to keep a standard formatting and structure of code. 