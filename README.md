# Mi Venta

Mi Venta es una aplicación web para la gestión de ventas, clientes y productos, desarrollada con React, TypeScript y Vite en el frontend, y un backend desacoplado (no incluido en este repositorio) que se comunica mediante una API REST.

## Arquitectura

- **Frontend:**
  - React + TypeScript
  - Vite como bundler
  - Axios para llamadas a la API
  - Autenticación y autorización por roles
  - Componentes modulares y organización por features
  - Servido en producción por Nginx (Docker)
- **Backend:**

  - API REST (se espera que corra en el servicio `ventas-backend` en Docker)
  - Autenticación JWT

- **Docker:**
  - Uso de Dockerfile y docker-compose para despliegue sencillo
  - Red interna para comunicación entre frontend y backend

## Usuarios de prueba

> **Advertencia:** Estos usuarios son solo para pruebas y no deben usarse en producción.

- **Administrador**
  - Usuario: `admin@example.com`
  - Contraseña: `admin123`
- **Operador**
  - Usuario: `operador@example.com`
  - Contraseña: `operador123`

## Instalación y ejecución

### Requisitos

- Docker y Docker Compose instalados

### Pasos

1. Clona el repositorio:
   ```powershell
   git clone https://github.com/aeromeme/miempresaventa.git
   cd miempresaventa
   ```
2. Construye y ejecuta los servicios con Docker Compose:
   ```powershell
   docker-compose up --build
   ```
3. Accede a la aplicación en [http://localhost](http://localhost)

### Variables de entorno

- El frontend lee la URL del backend desde la variable `VITE_API_URL` definida en `.env.docker`.
- El backend debe estar disponible como el servicio `ventas-backend` en la red de Docker Compose.

## Puntos clave

- Arquitectura desacoplada y escalable
- Autenticación y autorización por roles
- Uso de Docker para despliegue rápido y reproducible
- Código organizado por features y componentes reutilizables

## Notas

- Este proyecto es solo una base para pruebas y desarrollo.
- No expongas los usuarios de prueba en ambientes productivos.
- El backend debe estar configurado para aceptar los usuarios de prueba indicados.

---

¡Listo para comenzar a gestionar tus ventas de manera moderna y eficiente!
