# Mapa Tandil

Sistema de gestión de reclamos ciudadanos basado en mapas interactivos para la ciudad de Tandil. Permite a los ciudadanos reportar problemas urbanos con ubicación geográfica, imágenes y detalles.

## 🗺️ Descripción

Mapa Tandil es una aplicación web que combina un frontend en Vue.js con OpenLayers para visualización de mapas y un backend en Node.js con Express para la gestión de reclamos ciudadanos. Los usuarios pueden:

- Visualizar reclamos existentes en un mapa interactivo
- Crear nuevos reclamos con ubicación geográfica
- Adjuntar imágenes como evidencia
- Ver detalles de reclamos existentes
- Navegar por la interfaz de manera intuitiva

## 📚 Documentación Técnica

Para información detallada sobre la arquitectura y componentes del proyecto, consulta la documentación técnica:

- **[Arquitectura del Backend](documentacion/back/arquitectura.md)** - Documentación completa del servidor Node.js, API, base de datos y seguridad
- **[Arquitectura del Frontend](documentacion/front/arquitectura.md)** - Documentación detallada de la aplicación Vue.js, componentes, mapas y UI

## 🏗️ Arquitectura General

El proyecto está dividido en dos partes principales:

### Frontend (`/front`)
- **Framework**: Vue.js 3 con Composition API
- **Mapas**: OpenLayers con vue3-openlayers
- **UI**: PrimeVue + PrimeFlex + Bootstrap Icons
- **Build**: Vue CLI

### Backend (`/back`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Base de datos**: MySQL
- **ORM**: Knex.js
- **Seguridad**: Rate limiting, CORS configurado

## 📁 Estructura del Proyecto

```
mapa_tandil/
├── back/                          # Backend Node.js
├── front/                         # Frontend Vue.js
├── documentacion/                 # Documentación técnica
│   ├── back/
│   │   └── arquitectura.md       # Arquitectura del backend
│   └── front/
│       └── arquitectura.md       # Arquitectura del frontend
└── README.md                     # Este archivo
```

## 🚀 Instalación Rápida

### Prerrequisitos
- Node.js (versión 14 o superior)
- MySQL (versión 5.7 o superior)
- npm o yarn

### Backend

1. Navegar al directorio del backend:
```bash
cd mapa_tandil/back
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno (crear archivo `.env`):
```env
service_port_api=3000
cors_origin=http://localhost:8080
mysql_host=localhost
mysql_user=tu_usuario
mysql_password=tu_password
mysql_database=mapa_tandil
```

4. Crear la base de datos:
```bash
mysql -u tu_usuario -p tu_database < definicion_inicial_db.sql
```

5. Iniciar el servidor:
```bash
node server.js
```

### Frontend

1. Navegar al directorio del frontend:
```bash
cd mapa_tandil/front
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run serve
```

4. Para producción:
```bash
npm run build
```

## 🔧 Uso Básico

### Acceso a la Aplicación
- **Desarrollo**: http://localhost:8080
- **API Backend**: http://localhost:3000

### Funcionalidades Principales
1. **Visualizar Mapa**: Ver reclamos existentes en el mapa
2. **Crear Reclamo**: Hacer clic en "Nuevo Reclamo" y seleccionar ubicación
3. **Completar Formulario**: Llenar título, detalles y adjuntar imágenes
4. **Enviar**: El reclamo se guarda en la base de datos

## 📝 Scripts Disponibles

### Frontend
- `npm run serve`: Servidor de desarrollo
- `npm run build`: Construcción para producción
- `npm run lint`: Verificación de código

### Backend
- `node server.js`: Iniciar servidor

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto, contactar al equipo de desarrollo.

---

**Versión**: 0.4.3  
**Última actualización**: 2024 