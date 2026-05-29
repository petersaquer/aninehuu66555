import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Importar servicios de scraping (CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const { searchAnime, getAnimeInfo, getEpisodeLinks, getProviders } = require("../services/anime.service.cjs");

export const animeRouter = router({
  /**
   * Buscar anime por nombre
   * GET /api/trpc/anime.search?input={"q":"naruto","domain":"animeav1.com"}
   */
  search: publicProcedure
    .input(
      z.object({
        q: z.string().min(1, "La búsqueda no puede estar vacía"),
        domain: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const result = await searchAnime(input.q, input.domain);
        return {
          success: true,
          data: result,
        };
      } catch (error: any) {
        console.error("[anime.search] Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message || "Error en la búsqueda de anime",
          cause: error,
        });
      }
    }),

  /**
   * Obtener información detallada de un anime
   * GET /api/trpc/anime.info?input={"url":"https://animeav1.com/anime/..."}
   */
  info: publicProcedure
    .input(
      z.object({
        url: z.string().url("URL inválida"),
      })
    )
    .query(async ({ input }) => {
      try {
        const result = await getAnimeInfo(input.url);
        return {
          success: true,
          data: result,
        };
      } catch (error: any) {
        console.error("[anime.info] Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message || "Error al obtener información del anime",
          cause: error,
        });
      }
    }),

  /**
   * Obtener enlaces de episodios
   * GET /api/trpc/anime.episode?input={"url":"https://animeav1.com/episode/...","includeMega":false,"excludeServers":""}
   */
  episode: publicProcedure
    .input(
      z.object({
        url: z.string().url("URL inválida"),
        includeMega: z.boolean().default(false),
        excludeServers: z.string().default(""),
      })
    )
    .query(async ({ input }) => {
      try {
        const result = await getEpisodeLinks(
          input.url,
          input.includeMega,
          input.excludeServers
        );
        return {
          success: true,
          data: result,
        };
      } catch (error: any) {
        console.error("[anime.episode] Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error?.message || "Error al obtener enlaces de episodios",
          cause: error,
        });
      }
    }),

  /**
   * Listar proveedores disponibles
   * GET /api/trpc/anime.providers
   */
  providers: publicProcedure.query(async () => {
    try {
      const providers = getProviders();
      return {
        success: true,
        data: providers,
      };
    } catch (error: any) {
      console.error("[anime.providers] Error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error?.message || "Error al obtener proveedores",
        cause: error,
      });
    }
  }),
});
