// LLM-powered generator using Cloudflare Workers AI
// Replace WORKER_URL with your deployed Cloudflare Worker URL

const WORKER_URL = "https://still-sound-96b9.prajapatpraveen144.workers.dev/"; // ← REPLACE THIS

export async function generateResearchQuestion({ fieldId, interest, horizonYear, ambitionBoost = 0 }) {
  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ field: fieldId, interest, horizonYear, ambitionBoost }),
  });

  if (!res.ok) throw new Error(`Worker returned ${res.status}`);

  const data = await res.json();
  if (data.error) throw new Error(data.error);

  return {
    id: `${Date.now()}-${Math.random()}`,
    question: data.question,
    field: { id: fieldId, label: data.connections?.[0] ?? fieldId, short: fieldId.toUpperCase() },
    partnerField: { label: data.connections?.[1] ?? "Interdisciplinary" },
    interest: interest || fieldId,
    horizonYear,
    whyItMatters: data.whyItMatters,
    connections: data.connections ?? [],
    novelty: data.novelty ?? 75,
    difficulty: data.difficulty ?? "Hard",
    impact: data.impact ?? { academic: 70, industrial: 60, societal: 65 },
    experiments: data.experiments ?? [],
    directions: data.directions ?? [],
    ambitionLevel: ambitionBoost,
  };
}
