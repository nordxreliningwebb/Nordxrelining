-- Aktivera Row-Level Security (RLS) för tabellen projects
ALTER TABLE "projects" ENABLE ROW LEVEL SECURITY;

-- 1. Tillåt alla användare (public) att läsa data (SELECT)
CREATE POLICY "Allow public read access on projects" 
ON "projects" 
FOR SELECT 
TO public
USING (true);

-- Notera: 
-- Inga policies för INSERT, UPDATE eller DELETE behövs här eftersom CMS-systemet
-- är uppdaterat till att använda "service_role" (admin) nyckeln via en Server Action.
-- Service_role nyckeln förbigår RLS automatiskt. Detta är det säkraste sättet
-- eftersom all skrivåtkomst skyddas av ditt befintliga backend-autentiseringssystem (t.ex. NextAuth).
