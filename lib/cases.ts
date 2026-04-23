import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { CaseMeta, Case } from './case-types';

// Re-export everything from case-types so server pages can import from one place
export type { CaseMeta, Case };
export { CRISIS_TYPE_LABELS, CRISIS_TYPE_LABELS_ES, SECTOR_LABELS, SECTOR_LABELS_ES, INDUSTRY_LABELS_ES } from './case-types';

const casesDirectory = path.join(process.cwd(), 'content/cases');

export function getAllCases(): Case[] {
  const fileNames = fs.readdirSync(casesDirectory);
  const cases = fileNames
    .filter((f) => f.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(casesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      return {
        ...(data as CaseMeta),
        content,
        slug,
      };
    });

  return cases.sort((a, b) => {
    // Global cases first, then Latin America
    if (a.region !== b.region) {
      return a.region === 'global' ? -1 : 1;
    }
    // Within regions, sort by year
    return a.year - b.year;
  });
}

export function getCaseById(id: string): Case | undefined {
  const allCases = getAllCases();
  return allCases.find(
    (c) => c.id === id || c.slug === id || c.slug.startsWith(`case-${id}`)
  );
}

export function getFeaturedCases(): Case[] {
  return getAllCases().filter((c) => c.featured);
}

export function getRelatedCases(caseItem: Case, limit = 3): Case[] {
  const all = getAllCases().filter((c) => c.id !== caseItem.id);
  const scored = all.map((c) => {
    let score = 0;
    if (c.region === caseItem.region) score += 2;
    if (c.pr_rating === caseItem.pr_rating) score += 1;
    caseItem.crisis_type.forEach((ct) => {
      if (c.crisis_type.includes(ct)) score += 2;
    });
    caseItem.frameworks.forEach((f) => {
      if (c.frameworks.includes(f)) score += 1;
    });
    return { c, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.c);
}

