resource "aws_ecs_task_definition" "web" {
  family                   = "${var.app_name}-web-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "${var.app_name}-web"
      image     = "${aws_ecr_repository.web.repository_url}:latest"
      essential = true
      
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
      
      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "NEXT_PUBLIC_API_URL"
          value = "https://${var.domain_name != "" ? var.domain_name : aws_lb.main.dns_name}/api"
        },
        {
          name  = "NEXT_PUBLIC_MCP_URL"
          value = "https://${var.domain_name != "" ? var.domain_name : aws_lb.main.dns_name}/mcp"
        }
      ]
      
      secrets = [
        {
          name      = "NEXTAUTH_SECRET"
          valueFrom = aws_secretsmanager_secret.nextauth_secret.arn
        }
      ]
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "web"
        }
      }
    }
  ])

  tags = {
    Name = "${var.app_name}-web-task-${var.environment}"
  }
}

resource "aws_ecs_service" "web" {
  name            = "${var.app_name}-web-service-${var.environment}"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.web.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private[*].id
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.web.arn
    container_name   = "${var.app_name}-web"
    container_port   = 3000
  }

  depends_on = [
    aws_lb_listener.https
  ]

  tags = {
    Name = "${var.app_name}-web-service-${var.environment}"
  }
}

resource "aws_ecs_task_definition" "api" {
  family                   = "${var.app_name}-api-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "${var.app_name}-api"
      image     = "${aws_ecr_repository.api.repository_url}:latest"
      essential = true
      
      portMappings = [
        {
          containerPort = 4000
          hostPort      = 4000
        }
      ]
      
      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "PORT"
          value = "4000"
        },
        {
          name  = "MCP_URL"
          value = "http://localhost:5000"
        },
        {
          name  = "CORS_ORIGINS"
          value = "https://${var.domain_name != "" ? var.domain_name : aws_lb.main.dns_name}"
        },
        {
          name  = "REDIS_URL"
          value = "redis://${aws_elasticache_cluster.main.cache_nodes.0.address}:6379"
        }
      ]
      
      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = aws_secretsmanager_secret.database_url.arn
        },
        {
          name      = "OPENAI_API_KEY"
          valueFrom = aws_secretsmanager_secret.openai_api_key.arn
        },
        {
          name      = "STRIPE_SECRET_KEY"
          valueFrom = aws_secretsmanager_secret.stripe_secret_key.arn
        },
        {
          name      = "STRIPE_WEBHOOK_SECRET"
          valueFrom = aws_secretsmanager_secret.stripe_webhook_secret.arn
        }
      ]
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "api"
        }
      }
    }
  ])

  tags = {
    Name = "${var.app_name}-api-task-${var.environment}"
  }
}

resource "aws_ecs_service" "api" {
  name            = "${var.app_name}-api-service-${var.environment}"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private[*].id
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "${var.app_name}-api"
    container_port   = 4000
  }

  depends_on = [
    aws_lb_listener_rule.api
  ]

  tags = {
    Name = "${var.app_name}-api-service-${var.environment}"
  }
}

resource "aws_ecs_task_definition" "mcp" {
  family                   = "${var.app_name}-mcp-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "${var.app_name}-mcp"
      image     = "${aws_ecr_repository.mcp.repository_url}:latest"
      essential = true
      
      portMappings = [
        {
          containerPort = 5000
          hostPort      = 5000
        }
      ]
      
      environment = [
        {
          name  = "NODE_ENV"
          value = var.environment
        },
        {
          name  = "PORT"
          value = "5000"
        },
        {
          name  = "ADAPTER_TYPE"
          value = var.environment == "production" ? "scraper" : "sandbox"
        }
      ]
      
      secrets = [
        {
          name      = "OPENAI_API_KEY"
          valueFrom = aws_secretsmanager_secret.openai_api_key.arn
        }
      ]
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "mcp"
        }
      }
    }
  ])

  tags = {
    Name = "${var.app_name}-mcp-task-${var.environment}"
  }
}

resource "aws_ecs_service" "mcp" {
  name            = "${var.app_name}-mcp-service-${var.environment}"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.mcp.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private[*].id
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.mcp.arn
    container_name   = "${var.app_name}-mcp"
    container_port   = 5000
  }

  depends_on = [
    aws_lb_listener_rule.mcp
  ]

  tags = {
    Name = "${var.app_name}-mcp-service-${var.environment}"
  }
}
