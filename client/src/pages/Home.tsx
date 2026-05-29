import { ProvidersGrid } from "@/components/ProvidersGrid";
import { EndpointsSection } from "@/components/EndpointsSection";
import { APIBuilder } from "@/components/APIBuilder";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--void)]">
      {/* Background Orbs */}
      <div className="orb orb-1 cl"></div>
      <div className="orb orb-2 cl"></div>

      {/* Navigation */}
      <nav className="nav cl">
        <a href="#" className="nav-logo">
          <span className="nav-mark"></span>ANIME1V API
        </a>
        <ul className="nav-links">
          <li>
            <a href="#providers">Providers</a>
          </li>
          <li>
            <a href="#reference">Endpoints</a>
          </li>
          <li>
            <a href="#builder">Builder</a>
          </li>
          <li>
            <span className="nav-badge">v1.0</span>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero cl">
        <div>
          <p className="hero-eyebrow">Multi-Provider Anime Engine</p>
          <h1>
            The API that
            <br />
            <span>streams everything.</span>
          </h1>
          <p className="hero-desc">
            Unified scraping engine across 6 anime providers. One endpoint to
            search, one to get episode links — across AnimeAV1, JKAnime,
            AnimeFLV, TioAnime, HentaiLA, and MonosChinos.
          </p>
          <div className="hero-actions">
            <a href="#reference" className="btn-primary">
              API Reference
            </a>
            <a href="#builder" className="btn-ghost">
              Try It Out
            </a>
          </div>
        </div>

        {/* Terminal */}
        <div className="hero-terminal animate-float">
          <div className="terminal-bar">
            <div className="dot dot-r"></div>
            <div className="dot dot-y"></div>
            <div className="dot dot-g"></div>
            <div className="terminal-title">anime1v-api.sh</div>
          </div>
          <div className="terminal-body">
            <div>
              <span className="t-comment">
                # Search for anime across all providers
              </span>
            </div>
            <div>
              <span className="t-prompt">$</span>
              <span className="t-cmd"> curl -X GET </span>
              <span className="t-url">
                "https://api.anime1v.com/api/v1/anime/search?q=naruto"
              </span>
            </div>
            <div>
              <span className="t-comment"># Response:</span>
            </div>
            <div>
              <span className="t-out">
                {"{"}
                <span className="t-key">"success"</span>
                <span className="t-out">: </span>
                <span className="t-bool">true</span>
                <span className="t-out">, </span>
                <span className="t-key">"data"</span>
                <span className="t-out">: {"{"}</span>
              </span>
            </div>
            <div>
              <span className="t-out">
                {"  "}
                <span className="t-key">"count"</span>
                <span className="t-out">: </span>
                <span className="t-num">42</span>
                <span className="t-out">,</span>
              </span>
            </div>
            <div>
              <span className="t-out">
                {"  "}
                <span className="t-key">"results"</span>
                <span className="t-out">: [...]</span>
              </span>
            </div>
            <div>
              <span className="t-out">
                {"}"}
                {"}"}
              </span>
              <span className="cursor"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar cl">
        <div className="stats-inner">
          <div className="stat">
            <div className="stat-num">
              <em>6</em>
            </div>
            <div className="stat-label">Providers</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              <em>4</em>
            </div>
            <div className="stat-label">Endpoints</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              <em>100%</em>
            </div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat">
            <div className="stat-num">
              <em>&lt;500ms</em>
            </div>
            <div className="stat-label">Avg Response</div>
          </div>
        </div>
      </div>

      {/* Providers Section */}
      <section className="section cl" id="providers">
        <div className="section-label">Providers</div>
        <h2>Anime Providers</h2>
        <p className="section-sub">
          Accede a contenido de anime desde múltiples proveedores a través de
          una única API unificada.
        </p>
        <ProvidersGrid />
      </section>

      {/* Endpoints Section */}
      <EndpointsSection />

      {/* API Builder Section */}
      <APIBuilder />

      {/* Footer */}
      <footer className="cl border-t border-[var(--border)] py-10 px-6">
        <div className="footer-inner max-w-[1400px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="footer-copy font-['JetBrains_Mono'] text-[0.72rem] text-[var(--text-muted)]">
            © 2026 Anime1V API. Built with{" "}
            <span className="text-[var(--purple)]">♥</span> by{" "}
            <a href="#" className="text-[var(--purple)] no-underline">
              FxxMorgan
            </a>
          </div>
          <ul className="footer-links flex gap-6 list-none">
            <li>
              <a href="#" className="font-['JetBrains_Mono'] text-[0.72rem] text-[var(--text-muted)] no-underline transition-colors duration-200 hover:text-[var(--text-dim)]">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="font-['JetBrains_Mono'] text-[0.72rem] text-[var(--text-muted)] no-underline transition-colors duration-200 hover:text-[var(--text-dim)]">
                Docs
              </a>
            </li>
            <li>
              <a href="#" className="font-['JetBrains_Mono'] text-[0.72rem] text-[var(--text-muted)] no-underline transition-colors duration-200 hover:text-[var(--text-dim)]">
                Status
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
