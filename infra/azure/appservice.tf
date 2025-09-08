# App Service Plan
resource "azurerm_app_service_plan" "main" {
  name                = "${var.app_name}-${var.environment}-asp"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = var.environment == "production" ? "PremiumV2" : "Standard"
    size = var.environment == "production" ? "P1v2" : "S1"
  }

  tags = local.tags
}

# Web App
resource "azurerm_app_service" "web" {
  name                = "${var.app_name}-${var.environment}-web"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id
  https_only          = true

  site_config {
    linux_fx_version = "NODE|16-lts"
    always_on        = true
    ftps_state       = "Disabled"
    min_tls_version  = "1.2"
    cors {
      allowed_origins = ["https://${var.domain_name}"]
    }
  }

  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = "~16"
    "WEBSITE_RUN_FROM_PACKAGE"     = "1"
    "NODE_ENV"                     = var.environment
    "NEXT_PUBLIC_API_URL"          = "https://${azurerm_app_service.api.default_site_hostname}/api"
    "NEXT_PUBLIC_MCP_URL"          = "https://${azurerm_app_service.mcp.default_site_hostname}/mcp"
    "NEXTAUTH_URL"                 = "https://${var.domain_name != "" ? var.domain_name : azurerm_app_service.web.default_site_hostname}"
    "NEXTAUTH_SECRET"              = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.nextauth_secret.versionless_id})"
    
    # Application Insights
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.main.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.main.connection_string
  }

  identity {
    type = "SystemAssigned"
  }

  tags = local.tags
}

# API App Service
resource "azurerm_app_service" "api" {
  name                = "${var.app_name}-${var.environment}-api"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id
  https_only          = true

  site_config {
    linux_fx_version = "NODE|16-lts"
    always_on        = true
    ftps_state       = "Disabled"
    min_tls_version  = "1.2"
    cors {
      allowed_origins     = ["https://${var.domain_name != "" ? var.domain_name : azurerm_app_service.web.default_site_hostname}"]
      support_credentials = true
    }
  }

  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = "~16"
    "WEBSITE_RUN_FROM_PACKAGE"     = "1"
    "NODE_ENV"                     = var.environment
    "PORT"                         = "8080"
    "DATABASE_URL"                 = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.database_url.versionless_id})"
    "REDIS_URL"                    = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.redis_connection_string.versionless_id})"
    "OPENAI_API_KEY"               = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.openai_api_key.versionless_id})"
    "STRIPE_SECRET_KEY"            = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.stripe_secret_key.versionless_id})"
    "STRIPE_WEBHOOK_SECRET"        = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.stripe_webhook_secret.versionless_id})"
    "MCP_URL"                      = "https://${azurerm_app_service.mcp.default_site_hostname}"
    "CORS_ORIGINS"                 = "https://${var.domain_name != "" ? var.domain_name : azurerm_app_service.web.default_site_hostname}"
    "STORAGE_PROVIDER"             = "azure_blob"
    "AZURE_STORAGE_CONNECTION_STRING" = azurerm_storage_account.main.primary_connection_string
    "AZURE_STORAGE_CONTAINER"      = azurerm_storage_container.documents.name
    
    # Application Insights
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.main.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.main.connection_string
  }

  identity {
    type = "SystemAssigned"
  }

  tags = local.tags
}

# MCP App Service
resource "azurerm_app_service" "mcp" {
  name                = "${var.app_name}-${var.environment}-mcp"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id
  https_only          = true

  site_config {
    linux_fx_version = "NODE|16-lts"
    always_on        = true
    ftps_state       = "Disabled"
    min_tls_version  = "1.2"
    cors {
      allowed_origins = ["https://${var.domain_name != "" ? var.domain_name : azurerm_app_service.web.default_site_hostname}"]
    }
  }

  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = "~16"
    "WEBSITE_RUN_FROM_PACKAGE"     = "1"
    "NODE_ENV"                     = var.environment
    "PORT"                         = "8080"
    "OPENAI_API_KEY"               = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.openai_api_key.versionless_id})"
    "ADAPTER_TYPE"                 = var.environment == "production" ? "scraper" : "sandbox"
    "AZURE_STORAGE_CONNECTION_STRING" = azurerm_storage_account.main.primary_connection_string
    "AZURE_STORAGE_CONTAINER"      = azurerm_storage_container.documents.name
    
    # Application Insights
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.main.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.main.connection_string
  }

  identity {
    type = "SystemAssigned"
  }

  tags = local.tags
}
