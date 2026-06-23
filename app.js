const moduleDetails = {
  "sprite-lab": {
    title: "Create Sprite",
    badge: "Sprite Forge",
    text: "Planned builder for one original sprite with body type, palette, variant colors, front/back views, idle frames, attack frames, stats, and PNG/JSON export.",
    options: ["Creature", "Item", "Icon", "Front/Back", "Variant Palette", "Idle Frames"]
  },
  "sprite-factory": {
    title: "Sprite Factory",
    badge: "Asset Furnace",
    text: "Planned pack generator for themed sets: creatures, items, tiles, spell icons, palettes, atlases, metadata, and ZIP exports.",
    options: ["Monster Pack", "Item Pack", "Tileset", "Atlas", "Palette", "ZIP Export"]
  },
  "novel-generator": {
    title: "Book / Novel Generator",
    badge: "Story Anvil",
    text: "Planned novel pipeline for premise, cast, world rules, chapter cards, scene lists, style rewrites, and a full story bible.",
    options: ["Premise", "Characters", "Outline", "Chapters", "Style", "Story Bible"]
  },
  "culture-generator": {
    title: "Culture Generator",
    badge: "World Kiln",
    text: "Planned civilization builder for laws, rituals, architecture, social conflicts, symbols, taboos, myths, and exportable dossiers.",
    options: ["Government", "Myths", "Laws", "Symbols", "Factions", "Dossier"]
  },
  "language-engine": {
    title: "Language / Name Engine",
    badge: "Rune System",
    text: "Planned root-based naming engine for consistent people, places, gods, monsters, items, cities, moons, and dictionaries.",
    options: ["Roots", "People", "Cities", "Gods", "Items", "Dictionary"]
  },
  "model-generator": {
    title: "3D Model Generator",
    badge: "Block Forge",
    text: "Planned procedural 3D creator for relics, weapons, crystals, masks, towers, ships, statues, and exportable model data.",
    options: ["Relic", "Weapon", "Crystal", "Mask", "Render", "Model JSON"]
  },
  "sound-generator": {
    title: "Monster Sound Generator",
    badge: "Ghast Audio Lab",
    text: "Planned Web Audio synthesizer for roars, hisses, clicks, growls, whispers, attack sounds, hurt sounds, and WAV exports.",
    options: ["Roar", "Attack", "Hurt", "Death", "Waveform", "WAV"]
  },
  "comic-generator": {
    title: "Comic Generator",
    badge: "Panel Smith",
    text: "Planned comic page builder for panel layouts, camera shots, silhouettes, speech bubbles, captions, sound effects, and PNG export.",
    options: ["Panels", "Bubbles", "Shots", "SFX", "Script", "PNG"]
  }
};

const cards = document.querySelectorAll(".module-card");
const previewTitle = document.getElementById("previewTitle");
const previewBadge = document.getElementById("previewBadge");
const previewText = document.getElementById("previewText");
const previewOptions = document.getElementById("previewOptions");
const themeToggle = document.getElementById("themeToggle");

function selectModule(key) {
  const details = moduleDetails[key];
  if (!details) return;

  cards.forEach(card => card.classList.toggle("active", card.dataset.module === key));
  previewTitle.textContent = details.title;
  previewBadge.textContent = details.badge;
  previewText.textContent = details.text;
  previewOptions.innerHTML = details.options
    .map(option => `<span class="option-chip">${option}</span>`)
    .join("");
}

cards.forEach(card => {
  card.addEventListener("click", () => selectModule(card.dataset.module));
});

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "new-project") selectModule("sprite-lab");
    if (action === "open-library") {
      previewTitle.textContent = "Asset Vault";
      previewBadge.textContent = "Coming Soon";
      previewText.textContent = "The vault will store every generated sprite, book, culture, model, sound, comic, and export bundle locally on this device.";
      previewOptions.innerHTML = ["Projects", "Assets", "Linked Files", "Remix", "Export"]
        .map(option => `<span class="option-chip">${option}</span>`)
        .join("");
      cards.forEach(card => card.classList.remove("active"));
    }
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("ember-boost");
  themeToggle.textContent = document.body.classList.contains("ember-boost") ? "✹" : "✦";
});

selectModule("sprite-lab");
