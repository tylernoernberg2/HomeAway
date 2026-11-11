COMPOSE_FILE := docker-compose.yml

.PHONY: help dc-up dc-down dc-clean dc-logs dc-rebuild dc-rebuild-backend dc-rebuild-frontend secrets-decrypt secrets-encrypt locals

help: ## List available commands
	@echo "Makefile commands:"
	@echo "  make dc-up                         Start the local Docker Compose stack"
	@echo "    Example: make dc-up"
	@echo "  make dc-down                       Stop the local Docker Compose stack"
	@echo "    Example: make dc-down"
	@echo "  make dc-clean                      Stop the stack and remove its images and volumes"
	@echo "    Example: make dc-clean"


dc-up: ## Start the local Docker Compose stack
	docker compose -f $(COMPOSE_FILE) up -d --build

dc-down: ## Stop the local Docker Compose stack
	docker compose -f $(COMPOSE_FILE) down

dc-clean: ## Stop the stack and remove its images and volumes
	docker compose -f $(COMPOSE_FILE) down --rmi all --volumes
