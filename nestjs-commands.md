# Lista de Comandos para Crear una Aplicación en NestJS

## 1. Instalar el CLI de NestJS
Si no tienes el CLI de NestJS instalado, usa el siguiente comando:
```bash
npm install -g @nestjs/cli
```

## 2. Crear una Nueva Aplicación NestJS
```bash
nest new nombre-de-tu-aplicacion
```
Esto generará una estructura básica del proyecto y te pedirá que elijas un gestor de paquetes (npm o yarn).

## 3. Moverte al Directorio del Proyecto
```bash
cd nombre-de-tu-aplicacion
```

## 4. Iniciar el Servidor de Desarrollo
```bash
npm run start
```
Por defecto, la aplicación estará disponible en `http://localhost:3000`.

## 5. Generar un Módulo
```bash
nest generate module nombre-del-modulo
```
o
```bash
nest g mo nombre-del-modulo
```

## 6. Generar un Controlador
```bash
nest generate controller nombre-del-controlador
```
o
```bash
nest g co nombre-del-controlador
```

## 7. Generar un Servicio
```bash
nest generate service nombre-del-servicio
```
o
```bash
nest g s nombre-del-servicio
```

## 8. Generar un Recurso Completo (Módulo, Controlador y Servicio)
```bash
nest generate resource nombre-del-recurso
```
Esto te pedirá que elijas entre diferentes opciones como REST API o GraphQL.

## 9. Instalar Dependencias Adicionales
- Para TypeORM:
  ```bash
  npm install @nestjs/typeorm typeorm mysql
  ```
- Para Swagger:
  ```bash
  npm install @nestjs/swagger swagger-ui-express
  ```

## 10. Construir la Aplicación para Producción
```bash
npm run build
```

## 11. Ejecutar la Aplicación en Modo de Producción
```bash
npm run start:prod
```

Con estos comandos, puedes crear y configurar una aplicación básica en NestJS.