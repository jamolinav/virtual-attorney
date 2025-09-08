variable "location" {
  description = "Azure region to deploy resources"
  type        = string
  default     = "West US 2"
}

variable "environment" {
  description = "Environment name (development, staging, production)"
  type        = string
  default     = "development"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "virtual-attorney"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "virtual_attorney"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "postgres"
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = ""
}

variable "enable_https" {
  description = "Enable HTTPS"
  type        = bool
  default     = true
}
