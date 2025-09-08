resource "aws_secretsmanager_secret" "database_url" {
  name        = "${var.app_name}-database-url-${var.environment}"
  description = "Database connection URL"

  tags = {
    Name = "${var.app_name}-database-url-${var.environment}"
  }
}

resource "aws_secretsmanager_secret_version" "database_url" {
  secret_id     = aws_secretsmanager_secret.database_url.id
  secret_string = "postgres://${var.db_username}:${var.db_password}@${aws_db_instance.main.endpoint}/${var.db_name}"
}

resource "aws_secretsmanager_secret" "openai_api_key" {
  name        = "${var.app_name}-openai-api-key-${var.environment}"
  description = "OpenAI API key"

  tags = {
    Name = "${var.app_name}-openai-api-key-${var.environment}"
  }
}

resource "aws_secretsmanager_secret" "nextauth_secret" {
  name        = "${var.app_name}-nextauth-secret-${var.environment}"
  description = "NextAuth secret"

  tags = {
    Name = "${var.app_name}-nextauth-secret-${var.environment}"
  }
}

resource "aws_secretsmanager_secret" "stripe_secret_key" {
  name        = "${var.app_name}-stripe-secret-key-${var.environment}"
  description = "Stripe secret key"

  tags = {
    Name = "${var.app_name}-stripe-secret-key-${var.environment}"
  }
}

resource "aws_secretsmanager_secret" "stripe_webhook_secret" {
  name        = "${var.app_name}-stripe-webhook-secret-${var.environment}"
  description = "Stripe webhook secret"

  tags = {
    Name = "${var.app_name}-stripe-webhook-secret-${var.environment}"
  }
}
