# Redis Cache
resource "azurerm_redis_cache" "main" {
  name                = "${var.app_name}-${var.environment}-redis"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  capacity            = 1
  family              = "C"
  sku_name            = var.environment == "production" ? "Standard" : "Basic"
  enable_non_ssl_port = false
  minimum_tls_version = "1.2"

  redis_configuration {
    maxmemory_reserved = 50
    maxmemory_delta    = 50
    maxmemory_policy   = "volatile-lru"
  }

  tags = local.tags
}

# Private Endpoint for Redis
resource "azurerm_private_endpoint" "redis" {
  name                = "${var.app_name}-${var.environment}-redis-endpoint"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  subnet_id           = azurerm_subnet.redis.id

  private_service_connection {
    name                           = "${var.app_name}-${var.environment}-redis-connection"
    is_manual_connection           = false
    private_connection_resource_id = azurerm_redis_cache.main.id
    subresource_names              = ["redisCache"]
  }

  tags = local.tags
}
