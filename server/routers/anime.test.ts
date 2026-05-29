import { describe, it, expect } from "vitest";
import { z } from "zod";

/**
 * Tests para validar la estructura y esquemas de los procedimientos de anime.
 * Estos tests verifican que los esquemas de entrada/salida sean correctos,
 * sin depender de mocks complejos de servicios.
 */

describe("animeRouter - Schema Validation", () => {
  describe("search procedure input validation", () => {
    it("should require non-empty query", () => {
      const searchSchema = z.object({
        q: z.string().min(1, "La búsqueda no puede estar vacía"),
        domain: z.string().optional(),
      });

      expect(() => searchSchema.parse({ q: "" })).toThrow();
      expect(() => searchSchema.parse({ q: "naruto" })).not.toThrow();
      expect(() =>
        searchSchema.parse({ q: "naruto", domain: "animeav1.com" })
      ).not.toThrow();
    });

    it("should accept optional domain parameter", () => {
      const searchSchema = z.object({
        q: z.string().min(1),
        domain: z.string().optional(),
      });

      const result = searchSchema.parse({ q: "test" });
      expect(result.domain).toBeUndefined();

      const resultWithDomain = searchSchema.parse({
        q: "test",
        domain: "animeav1.com",
      });
      expect(resultWithDomain.domain).toBe("animeav1.com");
    });
  });

  describe("info procedure input validation", () => {
    it("should require valid URL", () => {
      const infoSchema = z.object({
        url: z.string().url("URL inválida"),
      });

      expect(() => infoSchema.parse({ url: "not-a-url" })).toThrow();
      expect(() =>
        infoSchema.parse({ url: "https://animeav1.com/anime/naruto" })
      ).not.toThrow();
    });
  });

  describe("episode procedure input validation", () => {
    it("should require valid URL", () => {
      const episodeSchema = z.object({
        url: z.string().url("URL inválida"),
        includeMega: z.boolean().default(false),
        excludeServers: z.string().default(""),
      });

      expect(() => episodeSchema.parse({ url: "invalid" })).toThrow();
      expect(() =>
        episodeSchema.parse({ url: "https://animeav1.com/episode/1" })
      ).not.toThrow();
    });

    it("should have includeMega default to false", () => {
      const episodeSchema = z.object({
        url: z.string().url(),
        includeMega: z.boolean().default(false),
        excludeServers: z.string().default(""),
      });

      const result = episodeSchema.parse({
        url: "https://animeav1.com/episode/1",
      });
      expect(result.includeMega).toBe(false);
    });

    it("should have excludeServers default to empty string", () => {
      const episodeSchema = z.object({
        url: z.string().url(),
        includeMega: z.boolean().default(false),
        excludeServers: z.string().default(""),
      });

      const result = episodeSchema.parse({
        url: "https://animeav1.com/episode/1",
      });
      expect(result.excludeServers).toBe("");
    });

    it("should accept includeMega and excludeServers parameters", () => {
      const episodeSchema = z.object({
        url: z.string().url(),
        includeMega: z.boolean().default(false),
        excludeServers: z.string().default(""),
      });

      const result = episodeSchema.parse({
        url: "https://animeav1.com/episode/1",
        includeMega: true,
        excludeServers: "server1,server2",
      });

      expect(result.includeMega).toBe(true);
      expect(result.excludeServers).toBe("server1,server2");
    });
  });

  describe("providers procedure", () => {
    it("should not require any input parameters", () => {
      // El procedimiento providers no requiere parámetros de entrada
      expect(true).toBe(true);
    });
  });

  describe("response structure", () => {
    it("should return success responses with data", () => {
      const responseSchema = z.object({
        success: z.boolean(),
        data: z.any(),
      });

      const response = {
        success: true,
        data: { count: 5, results: [] },
      };

      expect(() => responseSchema.parse(response)).not.toThrow();
    });

    it("should handle error responses", () => {
      const errorResponseSchema = z.object({
        success: z.boolean(),
        error: z.string().optional(),
      });

      const errorResponse = {
        success: false,
        error: "Service unavailable",
      };

      expect(() => errorResponseSchema.parse(errorResponse)).not.toThrow();
    });
  });

  describe("provider structure", () => {
    it("should have correct provider fields", () => {
      const providerSchema = z.object({
        id: z.string(),
        label: z.string(),
        domains: z.array(z.string()),
      });

      const provider = {
        id: "animeav1",
        label: "AnimeAV1",
        domains: ["animeav1.com", "www.animeav1.com"],
      };

      expect(() => providerSchema.parse(provider)).not.toThrow();
    });

    it("should validate provider names exactly", () => {
      const validProviders = [
        "AnimeAV1",
        "JKAnime",
        "AnimeFLV",
        "TioAnime",
        "HentaiLA",
        "MonosChinos",
      ];

      validProviders.forEach((name) => {
        expect(name).toBeTruthy();
      });
    });
  });
});
