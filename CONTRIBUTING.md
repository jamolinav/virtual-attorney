# Guía de Contribución

¡Gracias por tu interés en contribuir a Abogado Virtual! Esta guía te ayudará a establecer un entorno de desarrollo y a comprender nuestros procesos para contribuir al proyecto.

## Código de Conducta

Este proyecto y todos los participantes están regidos por nuestro [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que respetes este código.

## Configuración del Entorno de Desarrollo

1. **Requisitos previos**
   - Node.js (v18 o superior)
   - pnpm (v8 o superior)
   - Git
   - Docker y Docker Compose (opcional, para servicios locales)
   - Un editor de código (recomendamos VS Code)

2. **Configuración inicial**
   ```bash
   # Clonar el repositorio
   git clone https://github.com/tu-usuario/virtual-attorney.git
   cd virtual-attorney
   
   # Instalar dependencias
   pnpm install
   
   # Configurar variables de entorno
   cp .env.example .env
   # Editar .env con tus valores
   
   # Iniciar en modo desarrollo
   pnpm dev
   ```

## Estructura del Proyecto

Consulta el archivo README.md para ver la estructura detallada del proyecto.

## Proceso de Contribución

1. **Encuentra o crea un issue**
   - Busca un issue existente o crea uno nuevo describiendo el problema o la característica
   - Comenta en el issue para que sepamos que estás trabajando en él

2. **Crea una rama**
   ```bash
   git checkout -b tipo/descripcion-corta
   ```
   Donde `tipo` puede ser:
   - `feature` para nuevas características
   - `fix` para correcciones de errores
   - `docs` para mejoras en la documentación
   - `refactor` para mejoras en el código sin cambiar funcionalidad

3. **Haz tus cambios**
   - Escribe código que siga nuestras [pautas de estilo](#pautas-de-estilo)
   - Agrega pruebas para la nueva funcionalidad o el error solucionado
   - Asegúrate de que todas las pruebas pasen

4. **Commits**
   - Usa [Conventional Commits](https://www.conventionalcommits.org/) para tus mensajes de commit
   - Ejemplos:
     ```
     feat: agregar sistema de plantillas para documentos
     fix: corregir validación en formulario de registro
     docs: actualizar guía de instalación
     ```

5. **Envía un Pull Request**
   - Haz push de tu rama: `git push origin tipo/descripcion-corta`
   - Crea un Pull Request a través de GitHub
   - Proporciona una descripción clara de los cambios y enlaza al issue relacionado

6. **Revisión de código**
   - Un mantenedor revisará tu PR
   - Es posible que se soliciten cambios o mejoras
   - Una vez aprobado, tu código se fusionará con la rama principal

## Pautas de Estilo

### JavaScript/TypeScript
- Usamos [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/)
- El proyecto tiene configuraciones predefinidas
- Ejecuta `pnpm lint` antes de enviar tu PR

### Pruebas
- Escribe pruebas para toda la funcionalidad nueva
- Asegúrate de que las pruebas existentes sigan pasando
- Ejecuta `pnpm test` para ejecutar las pruebas

### Documentación
- Documenta todas las funciones públicas
- Mantén actualizado el archivo README.md con cualquier cambio importante

## Informar Errores

- Usa el rastreador de problemas de GitHub
- Incluye pasos detallados para reproducir el error
- Incluye capturas de pantalla si es posible
- Menciona tu entorno (sistema operativo, navegador, etc.)

## Solicitar Características

- Usa el rastreador de problemas de GitHub con la etiqueta "enhancement"
- Describe claramente la característica y por qué sería beneficiosa
- Considera si se alinea con la visión del proyecto

---

¡Gracias por tu contribución! Tu tiempo y esfuerzo ayudan a mejorar Abogado Virtual para todos.
