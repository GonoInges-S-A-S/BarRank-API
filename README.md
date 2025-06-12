# BarRank-API
Backend API para la aplicación BarRank Bogotá.


##  Descripción

BarRank-API es un backend en Node.js que permite:

- Registrar bares.  
- Consultar ranking por puntuación.  
- Actualizar y eliminar bares.  
- Configurar puntuaciones y ordenar resultados.

---

## Requisitos

- Node.js v20.24.0
- npm o yarn  
- Base de dato MySql v8
- TypeScript v5.8.3

## Instalación

```bash
git clone https://github.com/GonoInges-S-A-S/BarRank-API.git

cd BarRank-API

npm install
 ```
## Configuración
Crea un archivo .env en la raíz con las variables de entorno necesarias:

```bash
ini
PORT=xxx
DB_URI=tu_conexion_a_la_bd
API_KEY=clave_secreta
```
Adapta estos valores según tu entorno local o de producción.


 ## Uso
```bash
# Levanta el servidor en modo desarrollo
npm run dev
# o
# yarn dev
```
Luego accede a http://localhost:xxxx 

## Endpoints 

|  Verbo | Ruta        | Descripción                       |
| :----: | ----------- | --------------------------------- |
|   GET  | `/bars`     | Lista todos los bares             |
|   GET  | `/bars/:id` | Obtiene un bar específico         |
|  POST  | `/bars`     | Crea un nuevo bar                 |
|   PUT  | `/bars/:id` | Actualiza un bar existente        |
| DELETE | `/bars/:id` | Elimina un bar                    |

## Ejemplo
Crear bar
```bash
curl -X POST http://localhost:xxxx/bars \
  -H "Content-Type: application/json" \
  -d '{
        "name": "Bar La Esquina",
        "rating": 4.5,
        "location": "Bogotá"
      }'
```

