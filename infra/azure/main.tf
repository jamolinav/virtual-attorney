terraform {
  required_version = ">= 1.0.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "terraform-state"
    storage_account_name = "virtualattorneystate"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

locals {
  tags = {
    Environment = var.environment
    Project     = "virtual-attorney"
    ManagedBy   = "terraform"
  }
}
