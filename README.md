# LoganCreations

A Nether-themed GitHub Pages creative forge for sprites, books, cultures, languages, 3D models, monster sounds, comics, animations, and asset packs.

## Current version

**v0.3** adds the first working module: **Asset Vault**.

### Asset Vault features

- Store assets locally in the browser
- Create demo assets for testing
- Import small files from your device
- Search assets by name, tag, type, or description
- Filter by asset type
- Download individual assets
- Duplicate assets
- Remove assets
- Clear the vault
- Export a full vault backup as JSON
- Restore a vault backup JSON file

## Files

Upload these files to the root of the `LogansCreations` GitHub repo:

```text
index.html
styles.css
app.js
manifest.json
README.md
icons/icon-192.svg
icons/icon-512.svg
```

## GitHub Pages URL

```text
https://lordboby-crypto.github.io/LogansCreations/
```

## Notes

The Asset Vault currently stores assets in local browser storage. Files are stored on the device/browser where the app is opened. Export a backup JSON if you want to move the vault to another device or browser.

For this first storage version, imported files should stay under roughly 2.5 MB each. Later versions can move to IndexedDB for larger files and full ZIP project packs.
