import { PUBLISHED_ARTICLES } from '../src/content/articles';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function countWords(html: string): number {
  const plain = stripHtml(html);
  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
}

function warn(msg: string) {
  // eslint-disable-next-line no-console
  console.warn(msg);
}

function info(msg: string) {
  // eslint-disable-next-line no-console
  console.log(msg);
}

function main() {
  const seen = new Set<string>();
  let warnings = 0;

  for (const a of PUBLISHED_ARTICLES) {
    const isAiMarketing = a.category.toLowerCase() === 'ai marketing';

    if (seen.has(a.slug)) {
      warnings++;
      warn(`[slug] duplicate slug: ${a.slug}`);
    }
    seen.add(a.slug);

    const words = countWords(a.content);

    if (words < 800) {
      warnings++;
      warn(`[length] ${a.slug}: ${words} words (very short)`);
    } else if (words < 1500) {
      warnings++;
      warn(`[length] ${a.slug}: ${words} words (<1500)`);
    }

    const mt = a.meta_title?.trim() ?? '';
    if (mt.length < 30 || mt.length > 70) {
      warnings++;
      warn(`[meta_title] ${a.slug}: length ${mt.length} (recommended ~30-70)`);
    }

    const md = a.meta_description?.trim() ?? '';
    if (md.length < 110 || md.length > 180) {
      warnings++;
      warn(`[meta_description] ${a.slug}: length ${md.length} (recommended ~110-180)`);
    }

    const fk = (a.focus_keyword || '').trim().toLowerCase();
    const first300 = stripHtml(a.content).slice(0, 900).toLowerCase();
    if (fk) {
      if (!mt.toLowerCase().includes(fk)) {
        warnings++;
        warn(`[focus_keyword] ${a.slug}: focus keyword not in meta_title`);
      }
      if (!a.title.toLowerCase().includes(fk) && !first300.includes(fk)) {
        warnings++;
        warn(`[focus_keyword] ${a.slug}: focus keyword not found in title or early content`);
      }
    } else {
      warnings++;
      warn(`[focus_keyword] ${a.slug}: missing focus_keyword`);
    }

    const internalLinks = (a.content.match(/href="\\//g) || []).length;
    if (internalLinks < 3) {
      warnings++;
      warn(`[links] ${a.slug}: only ${internalLinks} internal links (recommended >=3)`);
    }

    const sources = a.sources ?? [];
    if (isAiMarketing && sources.length < 6) {
      warnings++;
      warn(`[sources] ${a.slug}: sources length ${sources.length} (AI Marketing recommended >=6)`);
    }

    // Numeric claim heuristic: warn if there are digits but no source footnote links at all.
    const hasDigits = /\\d/.test(stripHtml(a.content));
    const hasFootnotes = /href=\"#source-\\d+\"/.test(a.content);
    if (isAiMarketing && hasDigits && !hasFootnotes) {
      warnings++;
      warn(`[citations] ${a.slug}: digits detected but no inline #source-N citations found`);
    }

    // Check that citation numbers do not exceed sources length.
    const cited = Array.from(a.content.matchAll(/href=\"#source-(\\d+)\"/g)).map((m) => Number(m[1]));
    const maxCited = cited.length ? Math.max(...cited) : 0;
    if (isAiMarketing && maxCited > sources.length) {
      warnings++;
      warn(`[citations] ${a.slug}: cites source-${maxCited} but only ${sources.length} sources provided`);
    }
  }

  info(`Audited ${PUBLISHED_ARTICLES.length} published articles.`);
  if (warnings > 0) {
    warn(`Content audit warnings: ${warnings}`);
    process.exitCode = 1;
  } else {
    info('No warnings.');
  }
}

main();
