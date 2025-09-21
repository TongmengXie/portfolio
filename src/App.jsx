import React, { useMemo, useState } from 'react'
import { Github, Link as LinkIcon, Filter, Star } from 'lucide-react'

const PROJECTS = [
  // —— Research & Industry (no public repo unless linked) ——
  {
    title: "Machine of Progress (LSE) — Applied Economics with AI",
    url: "#",
    description:
      "Collaborative programme at LSE applying agentic LLM frameworks to large‑scale document and data pipelines. Focus on RAG, visual doc understanding, batch prediction on GCP (Gemini & OpenAI), parallelisation, and prompt engineering.",
    tags: ["Agentic Framework", "RAG", "Visual DU", "GCP", "Gemini", "OpenAI API", "Big Data", "2024–2025"],
  },
  {
    title: "Record Linkage Across Historical Patent & Census Data (UK/US)",
    url: "#",
    description:
      "Entity resolution pipeline linking inventors across patents & census. Weak learners (phonetic encodings, address hierarchy NER, cosine sim) ensembled by a small neural net; constraints resolve many‑to‑one conflicts.",
    tags: ["Record Linkage", "NER", "Ensemble", "Phonetic", "IR", "Semi‑supervised", "2023–2024"],
  },
  {
    title: "Dissertation — Address Matching Across UK Property Datasets (EPC ↔ PPD)",
    url: "#",
    description:
      "Hybrid rule‑based + probabilistic + ML matcher for semi‑structured addresses; improved match rate by ~5% vs literature under limited ground truth.",
    tags: ["Record Linkage", "Probabilistic Models", "Geocoding", "NLP", "Spatial", "2023"],
  },
  {
    title: "Coursework — Evacuation Zoning Strategy (Venice, multi‑modal)",
    url: "#",
    description:
      "Agent‑Based Modelling (ODD), NetLogo (Mesa‑convertible). Agents with IDM for vehicles; experiments across pedestrian/private/motorcycle/PT mixes to optimise evacuation time.",
    tags: ["ABM", "Traffic Simulation", "Optimisation", "NetLogo", "2023"],
  },

  // —— Public GitHub highlights ——
  {
    title: "representation_shifts_multimodal_adaptation-",
    url: "https://github.com/TongmengXie/representation_shifts_multimodal_adaptation-",
    description:
      "Investigates representation shifts when adapting Gemma‑2 text decoder within PaliGemma‑2 (LLM→VLM transfer).",
    tags: ["LLM→VLM", "Interpretability", "Jupyter", "2025"],
  },
  {
    title: "rogue_wave",
    url: "https://github.com/TongmengXie/rogue_wave",
    description:
      "Physics‑informed DeepONet experiments to predict extreme ocean rogue waves; custom loss design.",
    tags: ["PINNs", "DeepONet", "Physics ML", "2025"],
  },
  {
    title: "plasma_temp — Tokamak PINNs",
    url: "https://github.com/TongmengXie/plasma_temp",
    description: "Physics‑Informed Neural Networks for tokamak plasma temperature evolution (science ML sandbox).",
    tags: ["PINNs", "Tokamak", "Science ML", "Jupyter", "2025"],
  },
  {
    title: "UrbSim — Resilience of London Underground Network",
    url: "https://github.com/TongmengXie/UrbSim",
    description:
      "Resilience via network centralities on London Underground; spatial interaction models for what‑if scenarios (job shock in Canary Wharf; city‑wide cost increase) with time‑series forecasts.",
    tags: ["Network Science", "Graph Theory", "Urban", "Forecasting", "2023"],
  },
  {
    title: "representation_shifts_in_multimodal_adaptation (archived)",
    url: "https://github.com/TongmengXie/representation_shifts_in_multimodal_adaptation",
    description:
      "Earlier iteration on representation shifts during multimodal adaptation.",
    tags: ["LLM→VLM", "Interpretability", "Archive"],
  },
  {
    title: "representation_shifts_multimodal (archived)",
    url: "https://github.com/TongmengXie/representation_shifts_multimodal",
    description:
      "Analyzes changes in representation space during LLM‑to‑VLM adaptation.",
    tags: ["LLM→VLM", "Embeddings", "Archive"],
  },
  {
    title: "cooperative_AI",
    url: "https://github.com/TongmengXie/cooperative_AI",
    description:
      "Explores commitment mechanisms in two‑agent settings to incentivise alignment.",
    tags: ["Multi‑Agent", "Alignment", "Game Theory", "2025"],
  },
  {
    title: "misinformation_detection_and_moderation",
    url: "https://github.com/TongmengXie/misinformation_detection_and_moderation",
    description:
      "Experiments with LLMs & classical ML for misinformation detection and moderation.",
    tags: ["Safety", "Moderation", "LLM", "2025"],
  },
  {
    title: "ARENA_3.0",
    url: "https://github.com/TongmengXie/ARENA_3.0",
    description:
      "Exercises and implementations from the ARENA 3.0 curriculum (FAEB).",
    tags: ["Mechanistic Interpretability", "Education", "2025"],
  },
  {
    title: "adversarial_robustness",
    url: "https://github.com/TongmengXie/adversarial_robustness",
    description:
      "Uses TextAttack to flip model predictions while preserving meaning (Algoverse exercises).",
    tags: ["Robustness", "NLP", "Adversarial", "2025"],
  },
  {
    title: "self_awareness_evals",
    url: "https://github.com/TongmengXie/self_awareness_evals",
    description:
      "Prompt‑based evaluations of LLMs’ self‑awareness capabilities.",
    tags: ["Eval", "LLM", "2025"],
  },
  {
    title: "GNN_water",
    url: "https://github.com/TongmengXie/GNN_water",
    description:
      "Integrates hydraulic domain knowledge into GNNs to model urban sewage water networks.",
    tags: ["GNN", "PINNs", "Hydraulics", "2025"],
  },
  {
    title: "GNN",
    url: "https://github.com/TongmengXie/GNN",
    description: "General graph neural network experiments and templates.",
    tags: ["GNN", "Templates", "2025"],
  },
  {
    title: "PDE_solver",
    url: "https://github.com/TongmengXie/PDE_solver",
    description: "Physics‑aware machine learning demos for PDE solving.",
    tags: ["PDE", "Physics ML", "2025"],
  },
  {
    title: "Encode_AI",
    url: "https://github.com/TongmengXie/Encode_AI",
    description: "Assorted utilities / scripts (encoding & tooling).",
    tags: ["Utilities", "Python", "2025"],
  },
  {
    title: "AgenticCategoryAlignment (Machine of Progress data)",
    url: "https://github.com/TongmengXie/AgenticCategoryAlignment",
    description: "Data building code for Machine of Progress project.",
    tags: ["Data", "Agents", "RAG", "2025"],
  },
  {
    title: "CASA0006 — ULEZ Impact on Air Quality (London)",
    url: "https://github.com/TongmengXie/CASA0006-Spatial-Data-Science",
    description:
      "Causal analysis of ULEZ Oct‑2021 expansion using dimensionality reduction for pollutant indices and Regression Discontinuity Design to estimate impacts; spatial patterning of improvements.",
    tags: ["GeoAI", "Causal", "RDD", "Dim. Reduction", "London", "2025"],
  },
  {
    title: "TraffEasePred",
    url: "https://github.com/TongmengXie/TraffEasePred",
    description:
      "Traffic prediction experiments (graph & sequence baselines).",
    tags: ["Traffic", "GNN", "Time‑series", "2024"],
  },
  {
    title: "trip_chain_analysis",
    url: "https://github.com/TongmengXie/trip_chain_analysis",
    description: "Travel behaviour / trip chain analysis utilities.",
    tags: ["Transport", "Analytics", "2024"],
  },
  {
    title: "AI_perception",
    url: "https://github.com/TongmengXie/AI_perception",
    description:
      "Urban design demo on AI perception (Texas A&M).",
    tags: ["Perception", "Urban Design", "2025"],
  },
]

const TAGS = [
  "All",
  "LLM→VLM",
  "Interpretability",
  "GNN",
  "Physics ML",
  "PINNs",
  "Tokamak",
  "Safety",
  "Robustness",
  "GeoAI",
  "Transport",
  "Time‑series",
  "Multi‑Agent",
  "Agentic Framework",
  "RAG",
  "Visual DU",
  "GCP",
  "Gemini",
  "Record Linkage",
  "Causal",
  "RDD",
  "Dim. Reduction",
  "Network Science",
  "Urban",
  "ABM"
]

export default function App() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesTag = activeTag === 'All' || p.tags.includes(activeTag)
      const q = query.toLowerCase()
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      return matchesTag && matchesQuery
    })
  }, [query, activeTag])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <Github className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Tongmeng Xie — Project Portfolio</h1>
        </div>
        <p className="mt-3 text-gray-600 max-w-3xl">
          Data scientist & researcher in London. Focused on graph neural networks, physics‑informed
          learning, interpretability, and AI safety. This is a curated snapshot of public work and selected research.
        </p>
        <div className="mt-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  className={"btn " + (activeTag === t ? "btn-active" : "btn-outline")}
                  onClick={() => setActiveTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1" />
          <input
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm w-full border rounded-xl px-3 py-2 bg-white"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.title} className="card">
            <div className="card-body">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-snug">{p.title}</h2>
                <a href={p.url} target="_blank" rel="noreferrer" title="Open on GitHub"
                   className="shrink-0 inline-flex items-center">
                  <LinkIcon className="w-4 h-4" />
                </a>
              </div>
              <p className="mt-2 text-sm text-gray-700">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="max-w-6xl mx-auto px-6 pb-12 text-sm text-gray-600">
        <p>
          Want a Markdown profile version instead? Create a README with: Highlights • Research & Safety • Graph & Physics ML • Geo/Transport • Coursework.
        </p>
      </footer>
    </div>
  )
}
