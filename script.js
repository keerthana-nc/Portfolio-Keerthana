// ── tag labels, single source of truth ──────────────────
const LABELS = {
  llm: "LLMs & RAG",
  agentic: "Agentic AI",
  nlp: "NLP Pipelines",
  eval: "Evaluation",
  rl: "Reinforcement Learning",
  cv: "Computer Vision",
  datapipe: "Data Pipelines",
  ds: "Data Science",
  azure: "Azure",
  gcp: "Google Cloud",
  aws: "AWS",
};

// a broad tag also shows everything under it
const INCLUDES = {
  llm: ["llm", "agentic", "nlp", "eval"],
  ds: ["ds", "datapipe"],
};
const expand = (key) => INCLUDES[key] || [key];

const items = [...document.querySelectorAll(".filterable")];
const filterButtons = [...document.querySelectorAll(".filterbar .chip")];
const stateLine = document.getElementById("filterstate");
const emptyNote = document.getElementById("empty");

// ── build the tag chips on each card and work entry ─────
document.querySelectorAll("[data-tagchips]").forEach((holder) => {
  holder.getAttribute("data-tagchips").split(" ").forEach((key) => {
    if (!LABELS[key]) return;
    const b = document.createElement("button");
    b.className = "tag";
    b.type = "button";
    b.textContent = LABELS[key];
    b.setAttribute("data-filter", key);
    holder.appendChild(b);
  });
});

// ── counts on the filter bar ────────────────────────────
filterButtons.forEach((btn) => {
  const key = btn.dataset.filter;
  const n =
    key === "all"
      ? items.length
      : items.filter((el) =>
          expand(key).some((k) => el.dataset.tags.split(" ").includes(k))
        ).length;
  const span = document.createElement("span");
  span.className = "count";
  span.textContent = n;
  btn.appendChild(span);
});

// ── apply a filter ──────────────────────────────────────
function apply(key, push = true) {
  if (!LABELS[key]) key = "all";

  items.forEach((el) => {
    el.hidden =
      key !== "all" &&
      !expand(key).some((k) => el.dataset.tags.split(" ").includes(k));
  });

  filterButtons.forEach((b) => {
    const on = b.dataset.filter === key;
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", String(on));
  });

  const shown = items.filter((el) => !el.hidden).length;
  const rolled = expand(key)
    .filter((k) => k !== key)
    .map((k) => LABELS[k]);
  stateLine.textContent =
    key === "all"
      ? ""
      : `Showing ${shown} ${shown === 1 ? "item" : "items"} in ${LABELS[key]}` +
        (rolled.length ? `, including ${rolled.join(", ")}.` : ".");

  const visibleCards = [...document.querySelectorAll(".card")].filter((c) => !c.hidden);
  if (emptyNote) emptyNote.hidden = visibleCards.length > 0;

  if (push) {
    const url = key === "all" ? location.pathname : `${location.pathname}?tag=${key}`;
    history.replaceState({ tag: key }, "", url);
  }
}

// clicks: filter bar, card tags, and the empty-state reset
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  apply(btn.dataset.filter);
  if (btn.classList.contains("tag")) {
    document.querySelector(".filterbar").scrollIntoView({ block: "start" });
  }
});

// open with whatever the URL asks for, e.g. ?tag=de
apply(new URLSearchParams(location.search).get("tag") || "all", false);

// ── footer year ─────────────────────────────────────────
document.getElementById("updated").textContent = new Date().getFullYear();

// ── highlight the section in view ───────────────────────
const navLinks = [...document.querySelectorAll(".nav a")];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle("current", a.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-25% 0px -65% 0px" }
  );
  sections.forEach((s) => io.observe(s));
}
