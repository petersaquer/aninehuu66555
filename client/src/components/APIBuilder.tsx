import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

const endpoints = [
  {
    id: "search",
    label: "Search Anime",
    path: "/api/v1/anime/search",
    params: [
      { name: "q", type: "text", placeholder: "e.g., naruto", required: true },
      {
        name: "domain",
        type: "text",
        placeholder: "e.g., animeav1.com (optional)",
        required: false,
      },
    ],
  },
  {
    id: "info",
    label: "Get Anime Info",
    path: "/api/v1/anime/info",
    params: [
      {
        name: "url",
        type: "text",
        placeholder: "e.g., https://animeav1.com/anime/...",
        required: true,
      },
    ],
  },
  {
    id: "episode",
    label: "Get Episode Links",
    path: "/api/v1/anime/episode",
    params: [
      {
        name: "url",
        type: "text",
        placeholder: "e.g., https://animeav1.com/episode/...",
        required: true,
      },
      {
        name: "includeMega",
        type: "select",
        options: ["false", "true"],
        required: false,
      },
      {
        name: "excludeServers",
        type: "text",
        placeholder: "e.g., server1,server2",
        required: false,
      },
    ],
  },
  {
    id: "providers",
    label: "List Providers",
    path: "/api/v1/anime/providers",
    params: [],
  },
];

export function APIBuilder() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0].id);
  const [params, setParams] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const endpoint = endpoints.find((e) => e.id === selectedEndpoint)!;

  const handleParamChange = (name: string, value: string) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const buildUrl = () => {
    let url = endpoint.path;
    const queryParams = new URLSearchParams();

    endpoint.params.forEach((param) => {
      const value = params[param.name];
      if (value) {
        queryParams.append(param.name, value);
      }
    });

    if (queryParams.toString()) {
      url += "?" + queryParams.toString();
    }

    return url;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = buildUrl();
      const res = await fetch(url);
      const data = await res.json();
      setResponse(data);
      setShowResponse(true);
    } catch (error: any) {
      setResponse({ error: error.message });
      setShowResponse(true);
      toast.error("Error al ejecutar la consulta");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const url = buildUrl();
    navigator.clipboard.writeText(url);
    toast.success("URL copiada al portapapeles");
  };

  return (
    <section className="builder-section" id="builder">
      <div className="builder-inner">
        <div className="section-label">Interactive Builder</div>
        <h2>Constructor de URLs</h2>
        <p className="section-sub">
          Construye y prueba tus consultas a la API de forma interactiva
        </p>

        <div className="builder-form">
          <select
            className="builder-select"
            value={selectedEndpoint}
            onChange={(e) => {
              setSelectedEndpoint(e.target.value);
              setParams({});
              setResponse(null);
            }}
          >
            {endpoints.map((ep) => (
              <option key={ep.id} value={ep.id}>
                {ep.label}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "1px", flex: 1 }}>
            {endpoint.params.map((param, idx) => (
              <input
                key={idx}
                type={param.type === "select" ? "text" : param.type}
                className="builder-input"
                placeholder={param.placeholder}
                value={params[param.name] || ""}
                onChange={(e) => handleParamChange(param.name, e.target.value)}
                style={{ flex: 1 }}
              />
            ))}
          </div>

          <button
            className="builder-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="inline animate-spin mr-2" size={14} />
            ) : (
              "Enviar"
            )}
          </button>
        </div>

        <div className={`builder-output ${showResponse ? "visible" : ""}`}>
          <div className="builder-output-bar">
            <div className="builder-output-url">{buildUrl()}</div>
            <button className="copy-btn" onClick={handleCopy}>
              <Copy size={14} className="inline mr-1" />
              Copiar
            </button>
          </div>
          <div className="builder-hint">
            {response && (
              <pre
                style={{
                  margin: 0,
                  overflow: "auto",
                  maxHeight: "400px",
                  fontSize: "0.75rem",
                }}
              >
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
