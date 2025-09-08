# Abogado Virtual Chile

Una aplicación web moderna para proporcionar asistencia legal virtual a usuarios en Chile.

## Descripción

Abogado Virtual Chile es una plataforma que utiliza inteligencia artificial para proporcionar asistencia legal a usuarios en Chile. La plataforma permite a los usuarios realizar consultas legales, obtener información sobre diversos aspectos del derecho chileno y generar documentos legales básicos.

## Tecnologías

Este proyecto utiliza las siguientes tecnologías:

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Base de datos**: PostgreSQL
- **Autenticación**: NextAuth.js
- **Procesamiento de lenguaje natural**: OpenAI API
- **Contenedores**: Docker, Docker Compose
- **Infraestructura**: AWS y Azure (mediante Terraform)
- **CI/CD**: GitHub Actions
- **Monitoreo**: OpenTelemetry, Prometheus

## Estructura del Proyecto

Este proyecto está estructurado como un monorepo utilizando pnpm workspaces y Turborepo:

```
/
├── apps/
│   ├── web/              # Aplicación web Next.js
│   ├── api/              # API NestJS
│   └── mcp/              # Servidor Model Context Protocol
├── packages/
│   ├── ui/               # Componentes UI compartidos (shadcn/ui)
│   ├── config/           # Configuraciones compartidas (TypeScript, ESLint, etc.)
│   ├── eslint/           # Configuraciones de ESLint
│   └── database/         # Cliente de base de datos compartido (Prisma)
├── infra/
│   ├── aws/              # Configuración de Terraform para AWS
│   └── azure/            # Configuración de Terraform para Azure
├── .devcontainer/        # Configuración de dev container
├── .vscode/              # Configuración de VS Code
├── docker-compose.yml    # Configuración de Docker Compose
└── package.json          # Configuración del monorepo
```

## Funcionalidades Principales

- **Consultas legales**: Chat interactivo con IA especializada en derecho chileno
- **Generación de documentos**: Creación asistida de documentos legales básicos
- **Revisión de documentos**: Análisis de documentos legales subidos por el usuario
- **Gestión de documentos**: Crear, editar, eliminar y compartir documentos legales
- **Gestión de consultas**: Historial y seguimiento de consultas anteriores
- **Planes de suscripción**: Diferentes niveles de acceso según necesidades del usuario

## Instalación

### Requisitos Previos

- Node.js (v18 o superior)
- pnpm (v8 o superior)
- Docker y Docker Compose
- Visual Studio Code (recomendado)

### Pasos para Instalar

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/virtual-attorney.git
   cd virtual-attorney
   ```

2. Inicia el entorno de desarrollo con Dev Container:
   - Abre el proyecto en VS Code
   - Instala la extensión "Remote - Containers" si aún no la tienes
   - Presiona F1 y selecciona "Dev Containers: Open Folder in Container..."

3. Alternativamente, instala las dependencias manualmente:
   ```bash
   pnpm install
   ```

4. Configura las variables de entorno:
   ```bash
   cp .env.example .env
   # Edita .env con tus valores
   ```

   Variables de entorno importantes:
   ```
   # Autenticación
   JWT_SECRET=your-jwt-secret-key
   
   # OpenAI API (para el chat)
   OPENAI_API_KEY=your-openai-api-key
   
   # Base de datos (cuando se migre de mock a real)
   DATABASE_URL=postgresql://user:password@localhost:5432/virtual-attorney
   
   # Stripe (para pagos)
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
   ```

5. Inicia la base de datos y servicios:
   ```bash
   docker-compose up -d
   ```

6. Inicializa la base de datos:
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

7. Ejecuta el proyecto en modo desarrollo:
   ```bash
   pnpm dev
   ```

La aplicación estará disponible en `http://localhost:3000`.

## Guía de Uso: Sistema de Gestión de Documentos

El sistema de gestión de documentos permite a los usuarios crear, editar, visualizar y eliminar documentos legales.

### Acceso al Sistema de Documentos

1. Inicia sesión en la aplicación
2. Navega a la sección "Documentos" desde el menú principal

### Crear un Nuevo Documento

1. Haz clic en el botón "Nuevo Documento"
2. Completa el formulario con:
   - Título del documento
   - Contenido del documento
3. Haz clic en "Guardar" para crear el documento

### Gestión de Documentos

- **Ver documentos**: Todos tus documentos se mostrarán en una cuadrícula o lista
- **Cambiar vista**: Puedes alternar entre vista de cuadrícula y lista con el botón correspondiente
- **Abrir documento**: Haz clic en "Abrir" en cualquier documento para ver su contenido completo
- **Editar documento**: En la vista de documento, haz clic en "Editar" para modificar su contenido
- **Eliminar documento**: En la vista de documento, haz clic en "Eliminar" para borrarlo permanentemente

### Características Avanzadas (Próximamente)

- **Plantillas**: Selección de plantillas predefinidas para documentos legales comunes
- **Exportación**: Exportar documentos en formatos PDF, Word o texto plano
- **Compartir**: Compartir documentos con otros usuarios o por correo electrónico
- **Control de versiones**: Seguimiento de cambios y restauración de versiones anteriores

## Contribución

Si deseas contribuir a este proyecto, por favor:

1. Crea un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios y haz commit (`git commit -m 'feat: add amazing feature'`)
4. Empuja tus cambios a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Prácticas de Desarrollo

Este proyecto sigue las siguientes prácticas de desarrollo:

1. **Conventional Commits**: Todos los commits deben seguir la especificación de [Conventional Commits](https://www.conventionalcommits.org/).
2. **Pruebas Unitarias**: Cada funcionalidad debe tener pruebas unitarias asociadas.
3. **Revisión de Código**: Todos los Pull Requests requieren al menos una revisión antes de ser fusionados.
4. **CI/CD**: Integración y despliegue continuos mediante GitHub Actions.
5. **Documentación**: Todas las funcionalidades deben estar documentadas.

## Estructura de la Aplicación Web

La aplicación web está organizada de la siguiente manera:

```
/apps/web/
├── public/            # Archivos estáticos
├── src/
│   ├── app/          # Estructura de rutas de Next.js App Router
│   │   ├── api/      # Rutas de API
│   │   ├── auth/     # Rutas de autenticación
│   │   ├── chat/     # Funcionalidad de chat con IA
│   │   ├── documents/# Gestión de documentos
│   │   └── pricing/  # Planes y precios
│   ├── components/   # Componentes React reutilizables
│   ├── lib/         # Utilidades y servicios
│   ├── hooks/       # Hooks personalizados
│   └── types/       # Definiciones de tipos
```

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Arquitectura Técnica

### Frontend

- **Next.js App Router**: Para ruteo y renderizado del lado del servidor
- **React**: Biblioteca para construir interfaces de usuario
- **shadcn/ui**: Componentes reutilizables basados en Radix UI
- **Tailwind CSS**: Framework CSS utility-first para estilos
- **TypeScript**: Superset tipado de JavaScript
- **SWR**: Para manejo de solicitudes y caché de datos

### Backend

- **Next.js API Routes**: Para endpoints de API
- **JWT**: Para autenticación segura
- **Zod**: Para validación de esquemas
- **Mock Services**: Implementación temporal para desarrollo (reemplazable por servicios reales)

### Flujo de Datos

1. **Cliente**: El usuario interactúa con la interfaz de usuario
2. **API Routes**: Las solicitudes se envían a las rutas de API
3. **Middleware**: Verifica la autenticación mediante JWT
4. **Servicios**: Procesan la lógica de negocio
5. **Almacenamiento**: Guarda/recupera datos (actualmente mockup, eventualmente base de datos)
6. **Respuesta**: Los datos se envían de vuelta al cliente

## API Reference

### Autenticación

```
POST /api/auth/login
POST /api/auth/register
GET /api/auth/me
POST /api/auth/logout
```

### Chat

```
POST /api/chat
```

### Documentos

```
GET /api/documents
POST /api/documents
GET /api/documents/:id
PUT /api/documents/:id
DELETE /api/documents/:id
```

## Contacto

Para cualquier consulta, puedes contactar a `admin@abogadovirtual.cl`.
