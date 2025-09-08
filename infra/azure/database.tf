# PostgreSQL Server
resource "azurerm_postgresql_server" "main" {
  name                = "${var.app_name}-${var.environment}-psql"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  administrator_login          = var.db_username
  administrator_login_password = var.db_password

  sku_name   = var.environment == "production" ? "GP_Gen5_2" : "B_Gen5_1"
  version    = "11"
  storage_mb = var.environment == "production" ? 51200 : 5120

  backup_retention_days        = var.environment == "production" ? 7 : 7
  geo_redundant_backup_enabled = var.environment == "production"
  auto_grow_enabled            = true
  
  public_network_access_enabled = false
  ssl_enforcement_enabled       = true

  tags = local.tags
}

# PostgreSQL Database
resource "azurerm_postgresql_database" "main" {
  name                = var.db_name
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_postgresql_server.main.name
  charset             = "UTF8"
  collation           = "en-US"
}

# Private Endpoint for PostgreSQL
resource "azurerm_private_endpoint" "postgres" {
  name                = "${var.app_name}-${var.environment}-psql-endpoint"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  subnet_id           = azurerm_subnet.database.id

  private_service_connection {
    name                           = "${var.app_name}-${var.environment}-psql-connection"
    is_manual_connection           = false
    private_connection_resource_id = azurerm_postgresql_server.main.id
    subresource_names              = ["postgresqlServer"]
  }

  tags = local.tags
}
