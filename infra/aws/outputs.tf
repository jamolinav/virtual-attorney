output "web_url" {
  description = "URL of the web application"
  value       = var.domain_name != "" ? "https://${var.domain_name}" : "http://${aws_lb.main.dns_name}"
}

output "api_url" {
  description = "URL of the API"
  value       = var.domain_name != "" ? "https://${var.domain_name}/api" : "http://${aws_lb.main.dns_name}/api"
}

output "mcp_url" {
  description = "URL of the MCP server"
  value       = var.domain_name != "" ? "https://${var.domain_name}/mcp" : "http://${aws_lb.main.dns_name}/mcp"
}

output "database_endpoint" {
  description = "Endpoint of the RDS database"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}

output "redis_endpoint" {
  description = "Endpoint of the Redis cache"
  value       = aws_elasticache_cluster.main.cache_nodes.0.address
  sensitive   = true
}

output "s3_bucket" {
  description = "Name of the S3 bucket for storage"
  value       = aws_s3_bucket.storage.id
}

output "ecr_repository_web" {
  description = "ECR repository URL for web app"
  value       = aws_ecr_repository.web.repository_url
}

output "ecr_repository_api" {
  description = "ECR repository URL for API"
  value       = aws_ecr_repository.api.repository_url
}

output "ecr_repository_mcp" {
  description = "ECR repository URL for MCP server"
  value       = aws_ecr_repository.mcp.repository_url
}

output "ecr_repository_worker" {
  description = "ECR repository URL for worker"
  value       = aws_ecr_repository.worker.repository_url
}

output "cloudwatch_log_group" {
  description = "CloudWatch log group for ECS services"
  value       = aws_cloudwatch_log_group.ecs.name
}
