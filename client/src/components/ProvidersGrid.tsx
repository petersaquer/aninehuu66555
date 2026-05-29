import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export function ProvidersGrid() {
  const { data, isLoading } = trpc.anime.providers.useQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-[var(--purple)]" />
      </div>
    );
  }

  const providers = data?.data || [];

  return (
    <div className="providers-grid">
      {providers.map((provider: any) => (
        <div key={provider.id} className="provider-card">
          <div className="provider-id">{provider.id}</div>
          <div className="provider-name">{provider.label}</div>
          <div className="provider-domain">{provider.domains[0]}</div>
          {provider.id === "animeav1" && (
            <div className="default-badge">DEFAULT</div>
          )}
        </div>
      ))}
    </div>
  );
}
