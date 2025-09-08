# Key Vault
resource "azurerm_key_vault" "main" {
  name                        = "${var.app_name}-${var.environment}-kv"
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = var.environment == "production"
  sku_name                    = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge", "Recover"
    ]
  }

  network_acls {
    default_action             = "Deny"
    bypass                     = "AzureServices"
    virtual_network_subnet_ids = [azurerm_subnet.app_service.id]
    ip_rules                   = []
  }

  tags = local.tags
}

# Secrets
resource "azurerm_key_vault_secret" "database_url" {
  name         = "database-url"
  value        = "postgres://${var.db_username}:${var.db_password}@${azurerm_postgresql_server.main.fqdn}:5432/${var.db_name}"
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "redis_connection_string" {
  name         = "redis-connection-string"
  value        = azurerm_redis_cache.main.primary_connection_string
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "openai_api_key" {
  name         = "openai-api-key"
  value        = "placeholder-replace-with-real-key" # Replace with real key in production
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "nextauth_secret" {
  name         = "nextauth-secret"
  value        = "placeholder-replace-with-real-secret" # Replace with real secret in production
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "stripe_secret_key" {
  name         = "stripe-secret-key"
  value        = "placeholder-replace-with-real-key" # Replace with real key in production
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_key_vault_secret" "stripe_webhook_secret" {
  name         = "stripe-webhook-secret"
  value        = "placeholder-replace-with-real-secret" # Replace with real secret in production
  key_vault_id = azurerm_key_vault.main.id
}

data "azurerm_client_config" "current" {}
