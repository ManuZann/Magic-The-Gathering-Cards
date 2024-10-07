
## Magic The Gathering API

Aplicacion para CRUD con cartas de Magic.
En esta aplicacion vas a poder:
- Visualizar la totalidad de Cartas.
- Agregar nuevas cartas personalizadas. Para la imagen recomendamos este [Generador](https://www.mtgcardmaker.com).
- Modificar las cartas ya existentes, o las nuevas personalizadas.
- Eliminar las cartas que ya no quieras visualizar.

## Frontend
[Despliegue Frontend](https://magic-the-gathering-cards.netlify.app)

Instalacion y configuracion:

Instala las dependencias:
```
  cd Frontend
  npm install o npm i
```
Configura las variables de entorno. Tenes como ejemplo el archivo .env.template
```
  VITE_API_URL=https://api.example.com
```
Ejecuta la aplicacion:
```
  npm run dev
```

## Backend

[Despliegue Backend](https://magic-the-gathering-cards-production.up.railway.app/api-docs/)

Instalacion y configuracion:

Instala las dependencias:
```
  cd Backend
  npm install o npm i
```
Configura las variables de entorno. Tenes como ejemplo el archivo .env.template
```
  PORT= 3000
  MONGO_URI= mongodb://user:password@server:port
```
Ejecuta la aplicacion:
```
  npm run dev
```

## API Reference

#### Para informacion sobre los Endpoints

```http
  /api-docs/
```
