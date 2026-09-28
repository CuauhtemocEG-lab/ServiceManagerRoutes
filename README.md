# API de Servicios

Este módulo expone el recurso `services` a través de rutas definidas en `src/routes/services.routes.js` y montadas en la aplicación principal con `app.use('/api', servicesRoute);`.

## Base URL

```text
/api
```

## Endpoints

### 1) Obtener todos los servicios

```http
GET /api/services
```

Devuelve la lista completa de servicios.

Además acepta filtros por query params:

```http
GET /api/services?category=salud
GET /api/services?available=true
GET /api/services?category=salud&available=true
```

#### Respuesta exitosa

```json
{
  "status": "success",
  "payload": [
    {
      "id": 1,
      "name": "Consulta general",
      "description": "Atención médica general",
      "price": 2500,
      "duration": 30,
      "available": true,
      "category": "salud"
    }
  ]
}
```

---

### 2) Obtener un servicio por ID

```http
GET /api/services/:id
```

Busca un servicio por su identificador.

#### Ejemplo

```http
GET /api/services/1
```

#### Respuesta exitosa

```json
{
  "status": "success",
  "payload": {
    "id": 1,
    "name": "Consulta general",
    "description": "Atención médica general",
    "price": 2500,
    "duration": 30,
    "available": true,
    "category": "salud"
  }
}
```

#### Respuesta no encontrado

```json
{
  "status": "error",
  "message": "Servicio no encontrado"
}
```

---

### 3) Crear un servicio

```http
POST /api/services
```

Recibe los datos del servicio en el body JSON.

#### Body esperado

```json
{
  "name": "Radiografía",
  "description": "Estudio de imagen",
  "price": 1800,
  "duration": 20,
  "available": true,
  "category": "salud"
}
```

#### Respuesta exitosa

```json
{
  "status": "success",
  "message": "Servicio creado exitosamente",
  "payload": {
    "id": 5,
    "name": "Radiografía",
    "description": "Estudio de imagen",
    "price": 1800,
    "duration": 20,
    "available": true,
    "category": "salud"
  }
}
```

#### Respuesta inválida

```json
{
  "status": "error",
  "message": "Todos los campos son obligatorios"
}
```

---

### 4) Actualizar un servicio

```http
PUT /api/services/:id
```

Actualiza los datos de un servicio existente.

#### Ejemplo

```http
PUT /api/services/1
```

```json
{
  "name": "Consulta general",
  "description": "Nueva descripción",
  "price": 3000,
  "duration": 45,
  "available": true,
  "category": "salud"
}
```

#### Respuesta exitosa

```json
{
  "status": "success",
  "message": "Servicio actualizado exitosamente",
  "payload": {
    "id": 1,
    "name": "Consulta general",
    "description": "Nueva descripción",
    "price": 3000,
    "duration": 45,
    "available": true,
    "category": "salud"
  }
}
```

---

### 5) Eliminar un servicio

```http
DELETE /api/services/:id
```

Elimina un servicio por su ID.

#### Ejemplo

```http
DELETE /api/services/1
```

#### Respuesta exitosa

```json
{
  "status": "success",
  "message": "Servicio eliminado exitosamente"
}
```

#### Respuesta no encontrado

```json
{
  "status": "error",
  "message": "Servicio no encontrado"
}
```

---

## Código de estado HTTP

- `200 OK`: operación exitosa
- `201 Created`: servicio creado correctamente
- `400 Bad Request`: faltan datos obligatorios
- `404 Not Found`: servicio inexistente
- `500 Internal Server Error`: error al crear o eliminar un servicio

## Implementación

Las rutas están montadas en `src/routes/services.routes.js` y usan `ServiceManager` para manejar la lógica del recurso.

```js
router.get('/services', ...)
router.get('/services/:id', ...)
router.post('/services', ...)
router.put('/services/:id', ...)
router.delete('/services/:id', ...)
```

Este enrutador se conecta con la app desde:

```js
app.use('/api', servicesRoute);
```
