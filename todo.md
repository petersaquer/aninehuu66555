# Anime1V API - TODO

## Backend - Migración de Servicios
- [x] Copiar servicios de scraping desde deployment_project/src/services/
- [x] Adaptar anime.service.js para tRPC (orquestación de proveedores)
- [x] Adaptar animeav1.service.js para CommonJS/ESM compatibility
- [x] Adaptar animeflv.service.js para CommonJS/ESM compatibility
- [x] Adaptar jkanime.service.js para CommonJS/ESM compatibility
- [x] Adaptar tioanime.service.js para CommonJS/ESM compatibility
- [x] Adaptar hentaila.service.js para CommonJS/ESM compatibility
- [x] Adaptar monoschinos.service.js para CommonJS/ESM compatibility
- [x] Adaptar api-error.js para manejo centralizado de errores

## Backend - Endpoints tRPC
- [x] Crear router anime.ts con procedimientos públicos
- [x] Implementar searchAnime(query, domain?) - GET /api/trpc/anime.search
- [x] Implementar getAnimeInfo(url) - GET /api/trpc/anime.info
- [x] Implementar getEpisodeLinks(url, includeMega, excludeServers) - GET /api/trpc/anime.episode
- [x] Implementar getProviders() - GET /api/trpc/anime.providers
- [x] Configurar CORS headers en respuestas
- [x] Implementar manejo de errores consistente con formato JSON

## Frontend - Interfaz Dark/Cyberpunk
- [x] Actualizar index.css con tema dark/cyberpunk (colores, fuentes, animaciones)
- [x] Implementar sección Hero con título, descripción y CTA
- [x] Implementar barra de estadísticas (stats bar)
- [x] Implementar terminal animada con ejemplo de uso
- [x] Implementar navegación fija superior con logo y links

## Frontend - Sección de Proveedores
- [x] Crear componente ProvidersGrid
- [x] Implementar tarjetas individuales para: AnimeAV1, JKAnime, AnimeFLV, TioAnime, HentaiLA, MonosChinos
- [x] Mostrar ID del proveedor, nombre, dominio y tags
- [x] Marcar proveedor por defecto (AnimeAV1)

## Frontend - Sección de Endpoints
- [x] Crear componente EndpointsSection
- [x] Implementar acordeón expandible para cada endpoint
- [x] Mostrar parámetros aceptados (nombre, tipo, requerido, descripción)
- [x] Mostrar ejemplos de respuesta JSON
- [x] Endpoint: GET /api/v1/anime/search?q={query}&domain={optional}
- [x] Endpoint: GET /api/v1/anime/info?url={url}
- [x] Endpoint: GET /api/v1/anime/episode?url={url}&includeMega=false&excludeServers=
- [x] Endpoint: GET /api/v1/anime/providers

## Frontend - Constructor Interactivo (API Builder)
- [x] Crear componente APIBuilder
- [x] Selector de endpoint (dropdown)
- [x] Campos de input dinámicos según endpoint seleccionado
- [x] Botón de envío para ejecutar consulta
- [x] Mostrar URL generada
- [x] Botón de copiar URL
- [x] Panel de respuesta con resultado JSON formateado
- [x] Manejo de errores y estados de carga

## Frontend - Página Home
- [x] Actualizar Home.tsx con estructura completa
- [x] Integrar sección Hero
- [x] Integrar barra de estadísticas
- [x] Integrar terminal animada
- [x] Integrar sección de proveedores
- [x] Integrar sección de endpoints
- [x] Integrar constructor de URLs (API Builder)
- [x] Integrar footer

## Testing
- [x] Escribir tests para searchAnime procedure
- [x] Escribir tests para getAnimeInfo procedure
- [x] Escribir tests para getEpisodeLinks procedure
- [x] Escribir tests para getProviders procedure
- [x] Escribir tests para manejo de errores

## Verificación Final
- [x] Verificar que todos los endpoints funcionan correctamente
- [x] Verificar que la interfaz es responsive
- [x] Verificar que CORS está habilitado
- [x] Verificar que los nombres de proveedores son exactos
- [x] Verificar que los parámetros por defecto son correctos
- [x] Verificar que el manejo de errores es consistente
