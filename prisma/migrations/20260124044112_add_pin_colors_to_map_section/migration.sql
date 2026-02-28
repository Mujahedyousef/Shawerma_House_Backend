-- Create branches_map_sections table if it doesn't exist (handles fresh DB or missing table)
CREATE TABLE IF NOT EXISTS "branches_map_sections" (
    "id" TEXT NOT NULL,
    "sectionTitleEn" TEXT NOT NULL DEFAULT 'Visit Our Branches',
    "sectionTitleAr" TEXT NOT NULL DEFAULT 'زر فروعنا',
    "sectionSubtitleEn" TEXT,
    "sectionSubtitleAr" TEXT,
    "mapCenterLat" DOUBLE PRECISION NOT NULL DEFAULT 24.7136,
    "mapCenterLng" DOUBLE PRECISION NOT NULL DEFAULT 46.6753,
    "defaultZoomLevel" INTEGER NOT NULL DEFAULT 12,
    "borderRadius" INTEGER DEFAULT 12,
    "cardBackgroundLight" TEXT NOT NULL DEFAULT '#ffffff',
    "cardTextLight" TEXT NOT NULL DEFAULT '#1a1a1a',
    "cardAccentLight" TEXT NOT NULL DEFAULT '#3daae1',
    "pinColorLight" TEXT NOT NULL DEFAULT '#3daae1',
    "cardBackgroundDark" TEXT NOT NULL DEFAULT '#2a2a2a',
    "cardTextDark" TEXT NOT NULL DEFAULT '#ffffff',
    "cardAccentDark" TEXT NOT NULL DEFAULT '#3daae1',
    "pinColorDark" TEXT NOT NULL DEFAULT '#3daae1',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "branches_map_sections_pkey" PRIMARY KEY ("id")
);

-- Add pin color columns if table exists but columns don't (handles existing table from older migration)
ALTER TABLE "branches_map_sections" ADD COLUMN IF NOT EXISTS "pinColorDark" TEXT NOT NULL DEFAULT '#3daae1';
ALTER TABLE "branches_map_sections" ADD COLUMN IF NOT EXISTS "pinColorLight" TEXT NOT NULL DEFAULT '#3daae1';
