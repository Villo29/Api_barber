# API Barber

API RESTful para la gestión de una barbería.

## Instalación

```bash
git clone <url-del-repo>
cd Api_barber
npm install
npm run dev
```

## Endpoints principales y ejemplos

### Autenticación

#### Registrar administrador

`POST /api/auth/admin/register`

**Request:**
```json
{
  "email": "admin@barber.com",
  "password": "123456",
  "shopName": "Barbería Central",
  "shopAddress": "Calle 123",
  "shopPhone": "555-1234",
  "shopEmail": "barberia@central.com"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "admin@barber.com",
    "role": "admin",
    "shopId": "shop_id"
  }
}
```

#### Login administrador

`POST /api/auth/admin/login`

**Request:**
```json
{
  "email": "admin@barber.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "admin@barber.com",
    "role": "admin",
    "shopId": "shop_id"
  }
}
```

---

### Administración (`/api/admin`)

> Todas requieren autenticación y autorización de administrador.

#### Obtener detalles de la tienda
`GET /api/admin/shop`

**Response:**
```json
{
  "_id": "shop_id",
  "name": "Barbería Central",
  "address": "Calle 123",
  "phone": "555-1234",
  "email": "barberia@central.com",
  "openingHours": "Lunes a Viernes: 9:00 - 19:00",
  "description": "",
  "active": true
}
```

#### Actualizar detalles de la tienda
`PUT /api/admin/shop`

**Request:**
```json
{
  "name": "Barbería Central Actualizada",
  "address": "Calle 456",
  "phone": "555-5678",
  "email": "nueva@barberia.com",
  "openingHours": "Lunes a Sábado: 9:00 - 20:00",
  "description": "Nueva descripción"
}
```

**Response:**
```json
{
  "_id": "shop_id",
  "name": "Barbería Central Actualizada",
  "address": "Calle 456",
  "phone": "555-5678",
  "email": "nueva@barberia.com",
  "openingHours": "Lunes a Sábado: 9:00 - 20:00",
  "description": "Nueva descripción",
  "active": true
}
```

#### Listar barberos de la tienda (admin)
`GET /api/admin/bathers`

**Response:**
```json
[
  {
    "_id": "bather_id",
    "name": "Carlos",
    "bio": "Experto en cortes modernos",
    "experienceYears": 5,
    "active": true
  }
]
```

#### Agregar barbero (admin)
`POST /api/admin/bathers`

**Request:**
```json
{
  "name": "Carlos",
  "bio": "Experto en cortes modernos",
  "experienceYears": 5,
  "photoUrl": "https://..."
}
```

**Response:**
```json
{
  "_id": "bather_id",
  "name": "Carlos",
  "bio": "Experto en cortes modernos",
  "experienceYears": 5,
  "active": true
}
```

#### Listar citas de la tienda (admin)
`GET /api/admin/appointments`

**Response:**
```json
[
  {
    "_id": "appointment_id",
    "batherId": { "_id": "bather_id", "name": "Carlos", "photoUrl": "https://..." },
    "service": { "_id": "service_id", "name": "Corte clásico", "price": 10 },
    "appointmentDate": "2024-06-01T10:00:00.000Z",
    "status": "pending"
  }
]
```

#### Actualizar estado de cita (admin)
`PUT /api/admin/appointments/:id`

**Request:**
```json
{
  "status": "confirmed"
}
```

**Response:**
```json
{
  "_id": "appointment_id",
  "status": "confirmed"
}
```

#### Ver estado de suscripción
`GET /api/admin/subscription`

**Response:**
```json
{
  "hasActiveSubscription": true,
  "subscription": {
    "_id": "subscription_id",
    "adminId": "user_id",
    "startDate": "2024-05-01T00:00:00.000Z",
    "endDate": "2024-06-01T00:00:00.000Z",
    "status": "active"
  }
}
```

---

### Citas (`/api/appointments`)

#### Crear cita
`POST /api/appointments/`

**Request:**
```json
{
  "batherId": "bather_id",
  "service": "service_id",
  "appointmentDate": "2024-06-01T10:00:00.000Z",
  "customerInfo": {
    "name": "Juan Pérez",
    "phone": "555-6789"
  }
}
```

**Response:**
```json
{
  "_id": "appointment_id",
  "batherId": "bather_id",
  "service": "service_id",
  "appointmentDate": "2024-06-01T10:00:00.000Z",
  "status": "pending"
}
```

#### Listar citas de un barbero
`GET /api/appointments/bather/:batherId`

**Response:**
```json
{
  "bather": {
    "name": "Carlos",
    "photoUrl": "https://..."
  },
  "appointments": [
    {
      "appointmentDate": "2024-06-01T10:00:00.000Z",
      "status": "pending",
      "customerInfo": { "name": "Juan Pérez" },
      "service": "service_id"
    }
  ],
  "stats": {
    "total": 1,
    "confirmed": 0,
    "pending": 1
  }
}
```

#### Ver disponibilidad de un barbero
`GET /api/appointments/bather/:batherId/availability?date=2024-06-01`

**Response:**
```json
{
  "date": "2024-06-01",
  "availableSlots": ["09:00", "11:00", "14:00"]
}
```

#### Listar citas (usuario/admin)
`GET /api/appointments/`

**Response:**
```json
[
  {
    "_id": "appointment_id",
    "batherId": "bather_id",
    "service": "service_id",
    "appointmentDate": "2024-06-01T10:00:00.000Z",
    "status": "pending"
  }
]
```

#### Actualizar estado de cita (admin)
`PUT /api/appointments/:id/status`

**Request:**
```json
{
  "status": "confirmed"
}
```

**Response:**
```json
{
  "_id": "appointment_id",
  "status": "confirmed"
}
```

#### Cancelar cita
`PATCH /api/appointments/:id/cancel`

**Response:**
```json
{
  "_id": "appointment_id",
  "status": "canceled"
}
```

---

### Barberos (`/api/bathers`)

#### Listar barberos de una tienda
`GET /api/bathers/shop/:shopId`

**Response:**
```json
[
  {
    "_id": "bather_id",
    "name": "Carlos",
    "bio": "Experto en cortes modernos",
    "experienceYears": 5,
    "active": true
  }
]
```

#### Crear barbero
`POST /api/bathers/` (requiere admin y suscripción activa)

**Request:**
```json
{
  "name": "Carlos",
  "bio": "Experto en cortes modernos",
  "experienceYears": 5,
  "photoUrl": "https://..."
}
```

**Response:**
```json
{
  "_id": "bather_id",
  "name": "Carlos",
  "bio": "Experto en cortes modernos",
  "experienceYears": 5,
  "active": true
}
```

#### Actualizar barbero
`PUT /api/bathers/:id`

**Request:**
```json
{
  "name": "Carlos Actualizado",
  "bio": "Nuevo bio"
}
```

**Response:**
```json
{
  "_id": "bather_id",
  "name": "Carlos Actualizado",
  "bio": "Nuevo bio",
  "experienceYears": 5,
  "active": true
}
```

#### Desactivar barbero
`PATCH /api/bathers/:id/deactivate`

**Response:**
```json
{
  "_id": "bather_id",
  "active": false
}
```

---

### Servicios (`/api/services`)

#### Listar servicios
`GET /api/services/`

**Response:**
```json
[
  {
    "_id": "service_id",
    "name": "Corte clásico",
    "description": "Corte tradicional",
    "price": 10,
    "durationMinutes": 30,
    "active": true
  }
]
```

#### Crear servicio
`POST /api/services/` (requiere admin y suscripción activa)

**Request:**
```json
{
  "name": "Corte clásico",
  "description": "Corte tradicional",
  "price": 10,
  "durationMinutes": 30
}
```

**Response:**
```json
{
  "_id": "service_id",
  "name": "Corte clásico",
  "description": "Corte tradicional",
  "price": 10,
  "durationMinutes": 30,
  "active": true
}
```

#### Actualizar servicio
`PUT /api/services/:id`

**Request:**
```json
{
  "name": "Corte moderno"
}
```

**Response:**
```json
{
  "_id": "service_id",
  "name": "Corte moderno",
  "description": "Corte tradicional",
  "price": 10,
  "durationMinutes": 30,
  "active": true
}
```

#### Desactivar servicio
`PATCH /api/services/:id/deactivate`

**Response:**
```json
{
  "_id": "service_id",
  "active": false
}
```

---

### Paquetes (`/api/packages`)

#### Listar paquetes
`GET /api/packages/`

**Response:**
```json
[
  {
    "_id": "package_id",
    "name": "Paquete Premium",
    "description": "Corte + barba + lavado",
    "price": 25,
    "serviceIncluded": ["service_id1", "service_id2"],
    "active": true
  }
]
```

#### Crear paquete
`POST /api/packages/` (requiere admin y suscripción activa)

**Request:**
```json
{
  "name": "Paquete Premium",
  "description": "Corte + barba + lavado",
  "price": 25,
  "serviceIncluded": ["service_id1", "service_id2"]
}
```

**Response:**
```json
{
  "_id": "package_id",
  "name": "Paquete Premium",
  "description": "Corte + barba + lavado",
  "price": 25,
  "serviceIncluded": ["service_id1", "service_id2"],
  "active": true
}
```

#### Actualizar paquete
`PUT /api/packages/:id`

**Request:**
```json
{
  "name": "Paquete Deluxe"
}
```

**Response:**
```json
{
  "_id": "package_id",
  "name": "Paquete Deluxe",
  "description": "Corte + barba + lavado",
  "price": 25,
  "serviceIncluded": ["service_id1", "service_id2"],
  "active": true
}
```

#### Desactivar paquete
`PATCH /api/packages/:id/deactivate`

**Response:**
```json
{
  "_id": "package_id",
  "active": false
}
```

---

### Órdenes (`/api/orders`)

#### Crear orden
`POST /api/orders/`

**Request:**
```json
{
  "productIds": ["product_id1", "product_id2"],
  "totalAmount": 50
}
```

**Response:**
```json
{
  "_id": "order_id",
  "userId": "user_id",
  "productIds": ["product_id1", "product_id2"],
  "totalAmount": 50,
  "status": "pending"
}
```

#### Obtener orden
`GET /api/orders/:id`

**Response:**
```json
{
  "_id": "order_id",
  "userId": "user_id",
  "productIds": ["product_id1", "product_id2"],
  "totalAmount": 50,
  "status": "pending"
}
```

#### Actualizar estado de orden
`PUT /api/orders/:id/status`

**Request:**
```json
{
  "status": "completed"
}
```

**Response:**
```json
{
  "_id": "order_id",
  "status": "completed"
}
```

---

### Tiendas (`/api/shops`)

#### Listar tiendas
`GET /api/shops/`

**Response:**
```json
[
  {
    "_id": "shop_id",
    "name": "Barbería Central",
    "address": "Calle 123",
    "phone": "555-1234",
    "email": "barberia@central.com",
    "openingHours": "Lunes a Viernes: 9:00 - 19:00",
    "description": "",
    "active": true
  }
]
```

#### Obtener tienda por ID
`GET /api/shops/:id`

**Response:**
```json
{
  "_id": "shop_id",
  "name": "Barbería Central",
  "address": "Calle 123",
  "phone": "555-1234",
  "email": "barberia@central.com",
  "openingHours": "Lunes a Viernes: 9:00 - 19:00",
  "description": "",
  "active": true,
  "bathers": [
    { "_id": "bather_id", "name": "Carlos", "active": true }
  ]
}
```

#### Crear tienda
`POST /api/shops/` (requiere admin y suscripción activa)

**Request:**
```json
{
  "name": "Barbería Central",
  "address": "Calle 123",
  "phone": "555-1234",
  "email": "barberia@central.com",
  "openingHours": "Lunes a Viernes: 9:00 - 19:00",
  "description": ""
}
```

**Response:**
```json
{
  "_id": "shop_id",
  "name": "Barbería Central",
  "address": "Calle 123",
  "phone": "555-1234",
  "email": "barberia@central.com",
  "openingHours": "Lunes a Viernes: 9:00 - 19:00",
  "description": "",
  "active": true
}
```

#### Actualizar tienda
`PUT /api/shops/:id`

**Request:**
```json
{
  "name": "Barbería Central Actualizada"
}
```

**Response:**
```json
{
  "_id": "shop_id",
  "name": "Barbería Central Actualizada",
  "address": "Calle 123",
  "phone": "555-1234",
  "email": "barberia@central.com",
  "openingHours": "Lunes a Viernes: 9:00 - 19:00",
  "description": "",
  "active": true
}
```

#### Desactivar tienda
`PATCH /api/shops/:id/deactivate`

**Response:**
```json
{
  "shop": {
    "_id": "shop_id",
    "active": false
  },
  "message": "Barbería y sus barberos desactivados correctamente"
}
```

---

### Dashboard (`/api/dashboard`)

#### Obtener estadísticas del dashboard
`GET /api/dashboard/`

**Response:**
```json
{
  "_id": "dashboard_id",
  "adminId": "user_id",
  "totalAppointments": 10,
  "totalCustomers": 8,
  "lastUpdated": "2024-06-01T12:00:00.000Z"
}
```

---

### Opciones de Suscripción de Barbero (`/api/bather-options`)

#### Crear suscripción
`POST /api/bather-options/` (requiere admin)

**Request:**
```json
{
  "startDate": "2024-05-01T00:00:00.000Z",
  "endDate": "2024-06-01T00:00:00.000Z",
  "paymentId": "pay_123"
}
```

**Response:**
```json
{
  "_id": "subscription_id",
  "adminId": "user_id",
  "startDate": "2024-05-01T00:00:00.000Z",
  "endDate": "2024-06-01T00:00:00.000Z",
  "status": "active"
}
```

#### Obtener suscripción activa
`GET /api/bather-options/active` (requiere admin)

**Response:**
```json
{
  "_id": "subscription_id",
  "adminId": "user_id",
  "startDate": "2024-05-01T00:00:00.000Z",
  "endDate": "2024-06-01T00:00:00.000Z",
  "status": "active"
}
```

#### Actualizar suscripción
`PUT /api/bather-options/:id` (requiere admin)

**Request:**
```json
{
  "startDate": "2024-05-01T00:00:00.000Z",
  "endDate": "2024-07-01T00:00:00.000Z",
  "status": "active"
}
```

**Response:**
```json
{
  "_id": "subscription_id",
  "adminId": "user_id",
  "startDate": "2024-05-01T00:00:00.000Z",
  "endDate": "2024-07-01T00:00:00.000Z",
  "status": "active"
}
```

#### Cancelar suscripción
`PATCH /api/bather-options/:id/cancel` (requiere admin)

**Response:**
```json
{
  "_id": "subscription_id",
  "adminId": "user_id",
  "status": "canceled",
  "message": "Suscripción cancelada correctamente"
}
```

---

### Salud del API

`GET /api/health`

**Response:**
```json
{
  "status": "OK"
}
```

---

## Notas

- Todos los endpoints que requieren autenticación deben recibir el token JWT en el header `Authorization: Bearer <token>`.
- Los endpoints de administración y gestión requieren permisos de administrador y, en muchos casos, una suscripción activa.
- Los modelos pueden variar, pero los campos principales están reflejados en los ejemplos. 