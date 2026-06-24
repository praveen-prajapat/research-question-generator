/**
 * Cloudflare Worker — Research Question AI Backend
 * 
 * SETUP STEPS:
 * 1. Go to dash.cloudflare.com → Workers & Pages → Create → Worker
 * 2. Paste this entire file into the editor
 * 3. Go to Settings → Bindings → Add Binding → AI → name it "AI"
 * 4. Click Deploy
 * 5. Copy your worker URL (e.g. https://research-ai.YOUR-NAME.workers.dev)
 * 6. Paste it into src/lib/generator.js as WORKER_URL
 */

export default {
  async fetch(request, env) {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers });
    if (request.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers });
    }

    const { field, interest, horizonYear, ambitionBoost = 0 } = body;

    const horizonLabel =
      horizonYear === 2026 ? "near-term (1–2 years, grounded and feasible)"
      : horizonYear === 2035 ? "mid-future (10 years, ambitious but plausible)"
      : "far-future (20+ years, moonshot and speculative)";

    const ambitionNote = ambitionBoost > 0
      ? ` Increase ambition level by ${ambitionBoost}x — make it more speculative, interdisciplinary, and paradigm-shifting.`
      : "";

    const prompt = `You are a world-class research advisor helping PhD students at a top university discover genuinely novel research directions.

Student input:
- Field: ${field}
- Research interest: ${interest || field}
- Time horizon: ${horizonLabel}${ambitionNote}

Generate a creative, specific, and intellectually exciting research question for this student. It must be interdisciplinary — combine their field with a surprising partner field.

Respond ONLY with a valid JSON object, no markdown, no backticks, no explanation. Use exactly these keys:

{
  "question": "A single provocative, specific research question (1–2 sentences, must be concrete and novel)",
  "whyItMatters": "2–3 sentences explaining real-world significance and why existing approaches fall short",
  "connections": ["Primary Field", "Partner Field", "Application Domain"],
  "novelty": <integer between 55 and 99>,
  "difficulty": "Easy" or "Medium" or "Hard" or "Moonshot",
  "impact": {
    "academic": <integer 30–99>,
    "industrial": <integer 25–96>,
    "societal": <integer 25–97>
  },
  "experiments": [
    "Specific experiment 1 (2 sentences)",
    "Specific experiment 2 (2 sentences)",
    "Specific experiment 3 (2 sentences)"
  ],
  "directions": [
    "Future research direction 1 (1–2 sentences)",
    "Future research direction 2 (1–2 sentences)",
    "Future research direction 3 (1–2 sentences)"
  ]
}`;

    try {
      const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [{ role: "user", content: prompt }],
        max_tokens: 900,
      });

      const raw = response.response || "";

      // Strip any accidental markdown fences
      const cleaned = raw.replace(/```json|```/g, "").trim();

      // Find the JSON object in the response
      const jsonStart = cleaned.indexOf("{");
      const jsonEnd = cleaned.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found in response");

      const parsed = JSON.parse(cleaned.slice(jsonStart, jsonEnd + 1));
      return new Response(JSON.stringify(parsed), { headers });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: "generation_failed", message: err.message }),
        { status: 500, headers }
      );
    }
  },
};
