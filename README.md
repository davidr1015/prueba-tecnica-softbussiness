
# Prueba tecnica Backend Softbusinness



## Pasos para configurar y ejecutar el proyecto

1. **Clonar el proyecto**  
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Entrar al área de trabajo e instalar dependencias**  
   ```bash
   cd prueba-tecnica
   yarn install
   ```

3. **Crear base de datos**  
   Crear una base de datos llamada `ptecnica-db` en PostgreSQL.

4. **Configurar variables de entorno**  
   Renombra el archivo `env.template` a `.env` y llena los valores correspondientes

5. **Ejecutar la aplicación**  
   ```bash
   yarn start:dev
   ```

Aquí está la sección corregida, incluyendo que el seed se ejecuta a través de un endpoint:

6. **Ejecutar el seed para usuarios iniciales**  
   Realiza una petición `GET` al siguiente endpoint usando Postman:  
   ```
   GET http://localhost:3000/api/seed
   ```

   Puede realizar pruebas con los siguientes usuarios

   ```
   Email: ejemplo1@gmail.com
   password: Clave123
   ```
   ó

    ```
   Email: ejemplo2@gmail.com
   password: Clave123
   ```

7. **Acceder a la documentación de la API**  
   Visita: [http://localhost:3000/api](http://localhost:3000/api)

## Stack utilizado

- **NestJS**
- **Swagger**
- **PostgreSQL**
