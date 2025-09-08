output "web_url" {
  description = "URL of the web application"
  value       = "https://${var.domain_name != "" ? var.domain_name : azurerm_app_service.web.default_site_hostname}"
}

output "api_url" {
  description = "URL of the API"
  value       = "https://${azurerm_app_service.api.default_site_hostname}"
}

output "mcp_url" {
  description = "URL of the MCP server"
  value       = "https://${azurerm_app_service.mcp.default_site_hostname}"
}

output "postgres_server_name" {
  description = "Name of the PostgreSQL server"
  value       = azurerm_postgresql_server.main.name
}

output "postgres_fqdn" {
  description = "FQDN of the PostgreSQL server"
  value       = azurerm_postgresql_server.main.fqdn
}

output "redis_hostname" {
  description = "Hostname of the Redis cache"
  value       = azurerm_redis_cache.main.hostname
}

output "storage_account_name" {
  description = "Name of the storage account"
  value       = azurerm_storage_account.main.name
}

output "application_insights_instrumentation_key" {
  description = "Instrumentation key for Application Insights"
  value       = azurerm_application_insights.main.instrumentation_key
  sensitive   = true
}

output "key_vault_name" {
  description = "Name of the Key Vault"
  value       = azurerm_key_vault.main.name
}
