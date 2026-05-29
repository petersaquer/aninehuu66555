import { useState } from "react";
import { ChevronDown } from "lucide-react";

const endpoints = [
  {
    id: "search",
    method: "GET",
    path: "/api/v1/anime/search",
    description: "Buscar anime por nombre",
    params: [
      {
        name: "q",
        type: "string",
        required: true,
        description: "Término de búsqueda",
      },
      {
        name: "domain",
        type: "string",
        required: false,
        description: "Proveedor específico (opcional)",
      },
    ],
    example: {
      request: "/api/v1/anime/search?q=naruto&domain=animeav1.com",
      response: {
        success: true,
        data: {
          count: 5,
          results: [
            {
              id: "1",
              title: "Naruto",
              image: "https://example.com/naruto.jpg",
              url: "https://animeav1.com/anime/naruto",
            },
          ],
        },
      },
    },
  },
  {
    id: "info",
    method: "GET",
    path: "/api/v1/anime/info",
    description: "Obtener información detallada de un anime",
    params: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "URL del anime",
      },
    ],
    example: {
      request: "/api/v1/anime/info?url=https://animeav1.com/anime/naruto",
      response: {
        success: true,
        data: {
          title: "Naruto",
          description: "...",
          genres: ["Action", "Adventure"],
          episodes: 220,
        },
      },
    },
  },
  {
    id: "episode",
    method: "GET",
    path: "/api/v1/anime/episode",
    description: "Obtener enlaces de reproducción de episodios",
    params: [
      {
        name: "url",
        type: "string",
        required: true,
        description: "URL del episodio",
      },
      {
        name: "includeMega",
        type: "boolean",
        required: false,
        description: "Incluir servidores Mega (default: false)",
      },
      {
        name: "excludeServers",
        type: "string",
        required: false,
        description: "Servidores a excluir (separados por coma)",
      },
    ],
    example: {
      request:
        "/api/v1/anime/episode?url=https://animeav1.com/episode/naruto-1&includeMega=false",
      response: {
        success: true,
        data: {
          servers: [
            {
              name: "Server 1",
              url: "https://example.com/video",
            },
          ],
        },
      },
    },
  },
  {
    id: "providers",
    method: "GET",
    path: "/api/v1/anime/providers",
    description: "Listar proveedores disponibles",
    params: [],
    example: {
      request: "/api/v1/anime/providers",
      response: {
        success: true,
        data: [
          {
            id: "animeav1",
            label: "AnimeAV1",
            domains: ["animeav1.com"],
          },
        ],
      },
    },
  },
];

export function EndpointsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="section" id="reference">
      <div className="section-label">API Reference</div>
      <h2>Endpoints Disponibles</h2>
      <p className="section-sub">
        Explora todos los endpoints disponibles de la API de Anime1V
      </p>

      <div className="endpoints-list">
        {endpoints.map((endpoint) => (
          <div key={endpoint.id} className="endpoint-card">
            <div
              className="endpoint-header cursor-pointer"
              onClick={() =>
                setExpandedId(expandedId === endpoint.id ? null : endpoint.id)
              }
            >
              <div
                className={`method-badge method-${endpoint.method.toLowerCase()}`}
              >
                {endpoint.method}
              </div>
              <div className="endpoint-meta">
                <div className="endpoint-path">{endpoint.path}</div>
                <div className="endpoint-desc">{endpoint.description}</div>
              </div>
              <div
                className={`endpoint-toggle ${
                  expandedId === endpoint.id ? "open" : ""
                }`}
              >
                <ChevronDown size={20} />
              </div>
            </div>

            {expandedId === endpoint.id && (
              <div className="endpoint-body open">
                <div className="endpoint-columns">
                  <div className="ep-col">
                    <div className="ep-col-title">Parámetros</div>
                    {endpoint.params.length > 0 ? (
                      endpoint.params.map((param, idx) => (
                        <div key={idx} className="param-row">
                          <div className="param-name">{param.name}</div>
                          <div className="param-type">{param.type}</div>
                          {param.required ? (
                            <div className="param-req">REQUIRED</div>
                          ) : (
                            <div className="param-desc">optional</div>
                          )}
                          <div className="param-desc">{param.description}</div>
                        </div>
                      ))
                    ) : (
                      <div className="param-desc">Sin parámetros requeridos</div>
                    )}
                  </div>

                  <div className="ep-col">
                    <div className="ep-col-title">Ejemplo de Respuesta</div>
                    <div className="code-block">
                      {JSON.stringify(endpoint.example.response, null, 2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
