# LAO SMART TOOLS

A beginner-friendly Vite + React + TypeScript MVP starter for Laos, with Lao, Thai and English UI.

## Included tools
- Currency converter for LAK / THB / USD (manual exchange rate; no live rate API yet)
- Income and expense calculator
- QR code generator (uses an external QR image service)
- Simple invoice preview with Print / Save PDF
- Loan payment estimator
- Unit converter (km/m/cm, kg/g, L/mL)

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Important MVP notes
- Currency rates are entered manually. Do not treat the sample rate as current.
- QR generation sends the entered text/URL to the QR Server image service.
- No user accounts, cloud storage, payment system, or PWA install manifest is included yet.
- Before public launch, add a verified exchange-rate provider, privacy notice, error handling, PWA manifest/service worker, and test on mobile.
