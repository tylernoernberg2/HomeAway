COMPOSE_FILE := docker-compose.yml

.PHONY: help dc-up dc-down dc-logs dc-rebuild dc-rebuild-backend dc-rebuild-frontend secrets-decrypt secrets-encrypt locals

help: ## List available commands
	@echo "Makefile commands:"
	@echo "  make dc-up                         Start the local Docker Compose stack"
	@echo "    Example: make dc-up"
	@echo "  make dc-down                       Stop the local Docker Compose stack"
	@echo "    Example: make dc-down"


dc-up: ## Start the local Docker Compose stack
	docker compose -f $(COMPOSE_FILE) up -d --build

dc-down: ## Stop the local Docker Compose stack
	docker compose -f $(COMPOSE_FILE) down --rmi all --volumes

