import { PROFESSIONS, UK_REGIONS } from "./constants"

export function getBaseUrl() {
  return (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/^﻿/, "").trimEnd()
}

export function professionToSlug(value: string) {
  return value.replace(/_/g, "-")
}

export function slugToProfession(slug: string) {
  return slug.replace(/-/g, "_")
}

export function regionToSlug(region: string) {
  return region.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")
}

export function slugToRegion(slug: string) {
  return UK_REGIONS.find(r => regionToSlug(r) === slug)
}

export function getProfessionBySlug(slug: string) {
  return PROFESSIONS.find(p => p.value === slugToProfession(slug))
}
