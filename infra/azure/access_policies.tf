# Key Vault Access Policy for Web App
resource "azurerm_key_vault_access_policy" "web" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = azurerm_app_service.web.identity[0].tenant_id
  object_id    = azurerm_app_service.web.identity[0].principal_id

  secret_permissions = [
    "Get"
  ]
}

# Key Vault Access Policy for API App
resource "azurerm_key_vault_access_policy" "api" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = azurerm_app_service.api.identity[0].tenant_id
  object_id    = azurerm_app_service.api.identity[0].principal_id

  secret_permissions = [
    "Get"
  ]
}

# Key Vault Access Policy for MCP App
resource "azurerm_key_vault_access_policy" "mcp" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = azurerm_app_service.mcp.identity[0].tenant_id
  object_id    = azurerm_app_service.mcp.identity[0].principal_id

  secret_permissions = [
    "Get"
  ]
}
