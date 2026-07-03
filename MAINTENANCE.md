# Maintenance & Archive Status

## Repository Status

**State:** Archived & Community-Maintained

This is a **preserved backup** of the Atmospheric Weather Card project, originally created by **`shpongledsummer`**. The original repository has been deleted along with the author's account.

### Timeline

- **Original Creation:** By `shpongledsummer`
- **Backup Created:** By `whyisthisbroken` via `atmospheric-weather-card-backup`
- **Current State:** Reorganized for community use and clarity

---

## Current Scope

### ✅ What This Repo Does

1. **Preserves** the original working code and documentation
2. **Organizes** existing releases and version history under proper tags
3. **Provides** a reference for users who are still using the card
4. **Maintains** a clean structure for future community forks

### ❌ What This Repo Does NOT Do

- **No active development** or new features
- **No bug fixes** (unless critical for functionality)
- **No new versions** (only historical releases)
- **No maintenance beyond organization**

---

## Release History

| Version | Status | Release Date | Notes |
| --- | --- | --- | --- |
| [v5.0.0](../../releases/tag/v5.0.0) | Final | Original | Last official release by original author |
| v5.1.0+ | ❌ None | N/A | No new releases planned |

---

## For Users

### Installation

Users should install from this archived version or maintain their own copy. Instructions are in the main README.

### Compatibility

- **Home Assistant:** v2024.x and later (check release notes for specifics)
- **Browser Support:** Modern browsers with WebGL/GLSL shader support
- **Device Compatibility:** Performance varies; older/lower-end devices may struggle with animations

### Issues & Support

Since this is archived:
- Issues will not be actively addressed
- Pull requests are unlikely to be merged
- For active development, fork this repository and maintain your own version

---

## For Contributors / Forks

If you want to **continue development**, fork this repository and:

1. Update the `hacs.json` with your repository URL
2. Register your fork with HACS
3. Create a new release and tag system
4. Communicate clearly that your version is a "community fork"

**Example for your fork:**

```json
{
  "name": "Atmospheric Weather Card (Community Edition)",
  "render_readme": true,
  "filename": "atmospheric-weather-card.js"
}
```

---

## File Structure

```
atmospheric-weather-card-archived/
├── atmospheric-weather-card.js         (~250KB, minified)
├── atmospheric-weather-card-editor.js  (~165KB, minified)
├── hacs.json                           HACS integration metadata
├── README.md                           Full documentation
├── LICENSE                             MIT License
├── MAINTENANCE.md                      This file
└── .github/
    └── (workflows, if any)
```

---

## FAQ

### "Can I use this in my Home Assistant setup?"

**Yes**, this is fully functional. Download from the latest release and follow the installation instructions in `README.md`.

### "Can I request features or report bugs?"

**No**, this is archived. If you find a critical bug, consider forking the repository and publishing your own version.

### "Can I fork this and continue development?"

**Absolutely!** This is under the MIT License, so you're free to fork, modify, and distribute your own version.

### "Why isn't this deleted like the original?"

Because the community and users depend on this code. Archiving it here ensures the work isn't lost.

---

## License

This project is licensed under the **MIT License**. See `LICENSE` file for details.

**Original Creator:** shpongledsummer (account deleted)  
**Backup Maintainer:** whyisthisbroken  
**Current State:** Community Archive
