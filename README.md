# HomeAway
A simple project that sets up a Django project with Docker support for learning. It will be added to intermittently to teach/demonstrate a topic.

COMPLETED TOPICS
- Django Project
- Docker Support
- Makefile
- GET, POST, PUT, DELETE Requests (No **PATCH** or **QUERY**)
- ~~REACT or~~ Next.js frontend
- uv integration
- Ruff integration

IN PROGRESS
- SSO
- IdP (Keycloak)
- Cookies

DESIRED TOPICS
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

## Package Management and Handling
We use uv as its Python package manager and handler, and npm for its JavaScript package manager. To add dependencies, go to `HomeAway/backend` and use  `uv add <package>`. A tag we may use is `--dev`, which means the package is a development dependency. 

## Project Standardization
We use Ruff linting and formatting in order to keep a standard formatting and structure of code. Now, Ruff automatically runs when a commit is attempted. If the code fails either test (structure (check) and format), the commit will fail and the files that failed will be updated by Ruff to pass the tests. 

You must install the pre-commit hook upon cloning the project in order for it to kick in:

```
uv run pre-commit install
```

Otherwise, you can call it manually:

```
uv run pre-commit run --all-files
```