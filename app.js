const moduleDetails = {
  "asset-vault": {
    title: "Asset Vault",
    badge: "Storage Core",
    text: "Working vault for saved assets. Import files, create test assets, search, download, remove, and export the vault as a backup JSON file.",
    options: ["Store", "Import", "Download", "Remove", "Backup", "Restore"]
  },
  "sprite-lab": {
    title: "Create Sprite",
    badge: "Sprite Lab",
    text: "Planned builder for single original sprites with creature type, palette, evolution stage, idle frames, attack frames, stats, and exportable PNG/JSON.",
    options: ["Creature", "Item", "Icon", "Front/Back", "Shiny Variant", "Idle Frames"]
  },
  "sprite-factory": {
    title: "Sprite Factory",
    badge: "Asset Pack",
    text: "Planned pack generator for themed sets: creatures, items, tiles, spell icons, palettes, atlases, metadata, and ZIP exports.",
    options: ["Monster Pack", "Item Pack", "Tileset", "Atlas", "Palette", "ZIP Export"]
  },
  "novel-generator": {
    title: "Book / Novel Generator",
    badge: "Story Engine",
    text: "Planned novel pipeline for premise, cast, world rules, chapter cards, scene lists, style rewrites, and a full story bible.",
    options: ["Premise", "Characters", "Outline", "Chapters", "Style", "Story Bible"]
  },
  "culture-generator": {
    title: "Culture Generator",
    badge: "Worldbuilding",
    text: "Planned civilization builder for laws, rituals, architecture, social conflicts, symbols, taboos, myths, and exportable dossiers.",
    options: ["Government", "Myths", "Laws", "Symbols", "Factions", "Dossier"]
  },
  "language-engine": {
    title: "Language / Name Engine",
    badge: "Naming System",
    text: "Planned root-based naming engine for consistent people, places, gods, monsters, items, cities, moons, and dictionaries.",
    options: ["Roots", "People", "Cities", "Gods", "Items", "Dictionary"]
  },
  "model-generator": {
    title: "3D Model Generator",
    badge: "WebGL Forge",
    text: "Planned procedural 3D creator for relics, weapons, crystals, masks, towers, ships, statues, and exportable model data.",
    options: ["Relic", "Weapon", "Crystal", "Mask", "Render", "Model JSON"]
  },
  "sound-generator": {
    title: "Monster Sound Generator",
    badge: "Audio Lab",
    text: "Planned Web Audio synthesizer for roars, hisses, clicks, growls, whispers, attack sounds, hurt sounds, and WAV exports.",
    options: ["Roar", "Attack", "Hurt", "Death", "Waveform", "WAV"]
  },
  "comic-generator": {
    title: "Comic Generator",
    badge: "Panel Maker",
    text: "Planned comic page builder for panel layouts, camera shots, silhouettes, speech bubbles, captions, sound effects, and PNG export.",
    options: ["Panels", "Bubbles", "Shots", "SFX", "Script", "PNG"]
  }
};

const VAULT_KEY = "logansCreations.assetVault.v1";
const cards = document.querySelectorAll(".module-card");
const previewTitle = document.getElementById("previewTitle");
const previewBadge = document.getElementById("previewBadge");
const previewText = document.getElementById("previewText");
const previewOptions = document.getElementById("previewOptions");
const themeToggle = document.getElementById("themeToggle");
const vaultSection = document.getElementById("assetVault");
const vaultGrid = document.getElementById("vaultGrid");
const vaultEmpty = document.getElementById("vaultEmpty");
const vaultSearch = document.getElementById("vaultSearch");
const vaultType = document.getElementById("vaultType");
const vaultStats = document.getElementById("vaultStats");
const importInput = document.getElementById("assetImport");
const restoreInput = document.getElementById("vaultRestore");

let vaultAssets = loadVault();

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

  if (key === "asset-vault") showVault();
}

function showVault() {
  vaultSection.hidden = false;
  renderVault();
  setTimeout(() => vaultSection.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
}

function loadVault() {
  try {
    const raw = localStorage.getItem(VAULT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Could not load Asset Vault", error);
    return [];
  }
}

function saveVault() {
  localStorage.setItem(VAULT_KEY, JSON.stringify(vaultAssets));
}

function makeId() {
  return `asset_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
}

function formatBytes(bytes = 0) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  }[char]));
}

function assetIcon(type) {
  const icons = {
    sprite: "▣",
    book: "✦",
    culture: "◈",
    language: "⌁",
    model: "⬡",
    sound: "≋",
    comic: "▤",
    factory: "▦",
    file: "◆"
  };
  return icons[type] || "◆";
}

function renderVault() {
  const query = vaultSearch.value.trim().toLowerCase();
  const type = vaultType.value;
  const filtered = vaultAssets.filter(asset => {
    const searchable = `${asset.name} ${asset.type} ${(asset.tags || []).join(" ")} ${asset.description || ""}`.toLowerCase();
    return (!type || asset.type === type) && (!query || searchable.includes(query));
  });

  const totalSize = vaultAssets.reduce((sum, asset) => sum + (asset.size || 0), 0);
  vaultStats.textContent = `${vaultAssets.length} stored · ${filtered.length} showing · ${formatBytes(totalSize)}`;
  vaultEmpty.hidden = filtered.length !== 0;

  vaultGrid.innerHTML = filtered.map(asset => `
    <article class="asset-card" data-id="${asset.id}">
      <div class="asset-card-top">
        <div class="asset-icon">${assetIcon(asset.type)}</div>
        <div>
          <h3>${escapeHtml(asset.name)}</h3>
          <p>${escapeHtml(asset.type)} · ${formatBytes(asset.size)} · ${new Date(asset.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p class="asset-description">${escapeHtml(asset.description || "No description yet.")}</p>
      <div class="asset-tags">
        ${(asset.tags || []).map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="asset-actions">
        <button type="button" data-vault-action="download" data-id="${asset.id}">Download</button>
        <button type="button" data-vault-action="duplicate" data-id="${asset.id}">Duplicate</button>
        <button class="danger-action" type="button" data-vault-action="remove" data-id="${asset.id}">Remove</button>
      </div>
    </article>
  `).join("");
}

function addAsset(asset) {
  vaultAssets.unshift({
    tags: [],
    ...asset,
    id: makeId(),
    createdAt: new Date().toISOString()
  });
  saveVault();
  renderVault();
}

function createDemoAsset() {
  const demos = [
    {
      type: "sprite",
      name: "Nether Ember Beast",
      description: "Demo creature sprite entry ready for future generated PNG frames and stats.",
      tags: ["sprite", "nether", "creature"],
      filename: "nether-ember-beast.json",
      mime: "application/json",
      size: 622,
      content: {
        name: "Nether Ember Beast",
        module: "Create Sprite",
        palette: ["crimson", "blackstone", "lava orange", "portal purple"],
        plannedFiles: ["front.png", "back.png", "idle-sheet.png", "creature.json"]
      }
    },
    {
      type: "culture",
      name: "Ashglass Clan",
      description: "Demo culture dossier entry for a Nether survival civilization.",
      tags: ["culture", "clan", "nether"],
      filename: "ashglass-clan.json",
      mime: "application/json",
      size: 784,
      content: {
        name: "Ashglass Clan",
        value: "endurance through heat",
        taboo: "wasting light",
        symbols: ["obsidian fang", "red lantern", "cracked crown"]
      }
    },
    {
      type: "sound",
      name: "Basalt Howler Cry",
      description: "Demo monster sound profile. Future sound module will replace this with WAV data.",
      tags: ["sound", "monster", "basalt"],
      filename: "basalt-howler-cry.json",
      mime: "application/json",
      size: 538,
      content: {
        name: "Basalt Howler Cry",
        layers: ["low rumble", "stone scrape", "echo tail"],
        exportTarget: "wav"
      }
    }
  ];

  addAsset(demos[Math.floor(Math.random() * demos.length)]);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/data:(.*?);base64/)?.[1] || "application/octet-stream";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function downloadAsset(id) {
  const asset = vaultAssets.find(item => item.id === id);
  if (!asset) return;

  if (asset.dataUrl) {
    downloadBlob(asset.filename || `${asset.name}.asset`, dataUrlToBlob(asset.dataUrl));
    return;
  }

  const content = asset.content || asset;
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
  downloadBlob(asset.filename || `${asset.name.replace(/\s+/g, "-").toLowerCase()}.json`, blob);
}

function duplicateAsset(id) {
  const asset = vaultAssets.find(item => item.id === id);
  if (!asset) return;
  const { id: oldId, createdAt, ...copy } = asset;
  addAsset({
    ...copy,
    name: `${asset.name} Copy`
  });
}

function removeAsset(id) {
  const asset = vaultAssets.find(item => item.id === id);
  if (!asset) return;
  const confirmed = confirm(`Remove "${asset.name}" from the Asset Vault?`);
  if (!confirmed) return;
  vaultAssets = vaultAssets.filter(item => item.id !== id);
  saveVault();
  renderVault();
}

function exportVault() {
  const backup = {
    app: "LoganCreations",
    version: "0.3",
    exportedAt: new Date().toISOString(),
    assets: vaultAssets
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  downloadBlob("loganscreations-asset-vault-backup.json", blob);
}

function clearVault() {
  if (!vaultAssets.length) return;
  const confirmed = confirm("Remove every asset from the Asset Vault on this device?");
  if (!confirmed) return;
  vaultAssets = [];
  saveVault();
  renderVault();
}

function importFiles(files) {
  [...files].forEach(file => {
    if (file.size > 2.5 * 1024 * 1024) {
      alert(`${file.name} is too large for this first localStorage vault. Keep files under 2.5 MB for now.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      addAsset({
        type: detectType(file),
        name: file.name.replace(/\.[^/.]+$/, ""),
        description: `Imported file: ${file.name}`,
        tags: ["imported", file.name.split(".").pop()?.toLowerCase()].filter(Boolean),
        filename: file.name,
        mime: file.type || "application/octet-stream",
        size: file.size,
        dataUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  });
}

function detectType(file) {
  const name = file.name.toLowerCase();
  if (file.type.startsWith("image/")) return "sprite";
  if (file.type.startsWith("audio/")) return "sound";
  if (name.endsWith(".obj") || name.endsWith(".glb") || name.endsWith(".gltf")) return "model";
  if (name.endsWith(".md") || name.endsWith(".txt")) return "book";
  if (name.includes("comic")) return "comic";
  return "file";
}

function restoreVault(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const restoredAssets = Array.isArray(parsed) ? parsed : parsed.assets;
      if (!Array.isArray(restoredAssets)) throw new Error("Backup has no assets array.");
      vaultAssets = restoredAssets;
      saveVault();
      renderVault();
      showVault();
    } catch (error) {
      alert("Could not restore that backup JSON file.");
      console.error(error);
    }
  };
  reader.readAsText(file);
}

cards.forEach(card => {
  card.addEventListener("click", () => selectModule(card.dataset.module));
});

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "new-project") selectModule("sprite-lab");
    if (action === "open-library") selectModule("asset-vault");
  });
});

document.querySelectorAll("[data-vault-command]").forEach(button => {
  button.addEventListener("click", () => {
    const command = button.dataset.vaultCommand;
    if (command === "demo") createDemoAsset();
    if (command === "import") importInput.click();
    if (command === "export") exportVault();
    if (command === "restore") restoreInput.click();
    if (command === "clear") clearVault();
  });
});

vaultGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-vault-action]");
  if (!button) return;
  const action = button.dataset.vaultAction;
  const id = button.dataset.id;
  if (action === "download") downloadAsset(id);
  if (action === "duplicate") duplicateAsset(id);
  if (action === "remove") removeAsset(id);
});

[vaultSearch, vaultType].forEach(input => input.addEventListener("input", renderVault));
importInput.addEventListener("change", () => {
  importFiles(importInput.files);
  importInput.value = "";
});
restoreInput.addEventListener("change", () => {
  const [file] = restoreInput.files;
  if (file) restoreVault(file);
  restoreInput.value = "";
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode") ? "☀" : "☾";
});

selectModule("asset-vault");
renderVault();
