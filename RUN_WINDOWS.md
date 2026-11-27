# Run on Windows — IMPORTANT (fixes the lightningcss / leaflet.css crash)

The crash you saw —
`Cannot find module '../lightningcss.win32-x64-msvc.node'`
— is a Tailwind v4 / npm issue on Windows: the native binary did not install, usually
because `npm install` ran on top of a stale/partial `node_modules`. Fix = clean reinstall.

## Do this once (PowerShell or CMD, inside the project folder)

```powershell
# 1. remove old install artifacts
rmdir /s /q node_modules
del /f /q package-lock.json
rmdir /s /q .next

# 2. clean reinstall (now on Next 16.2.9 + React 19.2.7)
npm install

# 3. run
npm run dev
```

Then open http://localhost:3000

PowerShell equivalents for step 1:
```powershell
Remove-Item -Recurse -Force node_modules, .next, package-lock.json -ErrorAction SilentlyContinue
```

## If the lightningcss error STILL appears after a clean install

Force the Windows native binaries (already listed in package.json optionalDependencies,
this just makes npm fetch them):

```powershell
npm install lightningcss-win32-x64-msvc @tailwindcss/oxide-win32-x64-msvc @next/swc-win32-x64-msvc --save-optional
npm run dev
```

## Notes
- Next.js **16.2.9** uses **Turbopack** by default, which avoids the webpack CSS pipeline that
  triggered the original `leaflet.css` error.
- Leaflet's CSS is loaded from a CDN `<link>` in `src/app/layout.tsx`, so it no longer passes
  through the bundler at all.
- Requires Node.js 18.18+ (Node 20 or 22 recommended).
- Build for production: `npm run build` then `npm start`.
