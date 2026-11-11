# HomeAway
A simple project that sets up a Django project with Docker support for learning. It will be added to intermittently to teach/demonstrate a topic. 

COMPLETED TOPICS
- Django Project
- Docker Support
- Makefile

DESIRED TOPICS
- CELERY
- REACT or Node.js frontend
- Minikube+K8s deployment
- AWS deployment-ready components (maybe untestable)
- Logging
- GET, POST, PUT Practice

## Deployment
To deploy locally, use `make dc-up`. Do end and remove the compose stack, use `make dc-up`. When completely done, use `make dc-clean` to end and remove the compose stack as well as delete volumes and images.

## Branching Strategy
Since this is a small project, likely there will only be a main branch and its features. If the project bloats, I may add a development branch, but as for now, it will stay simple.

## Project Structure
Docker Compose spins up a local server at [localhost:8000](http://localhost.8000), which hosts two pages: home.html and away.html.