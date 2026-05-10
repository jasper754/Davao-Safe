# DavaoSafe — Web Project

A disaster preparedness web app for Davao City.

## How to run
Just open `index.html` in your browser — no server needed!

## How to edit TypeScript
1. Edit `ts/app.ts`
2. Run: `tsc` in the project folder
3. Refresh the browser

## Project Structure
```
davao-safe/
├── index.html          ← Main HTML (all pages)
├── css/
│   └── style.css       ← All styles
├── ts/
│   ├── app.ts          ← TypeScript source
│   └── app.js          ← Compiled JavaScript (auto-generated)
├── assets/
│   └── icons/          ← SVG icons from Figma
└── tsconfig.json       ← TypeScript config
```

## Pages included
- Splash Screen
- Login / Sign Up / Change Password
- Home (Safe / Warning / Danger states)
- Map
- Alerts
- Profile
- Emergency SOS
- Report Incident
- Preparedness Checklist
- Search
