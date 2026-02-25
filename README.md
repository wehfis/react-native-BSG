# BSG Test App
## DEMO

https://github.com/user-attachments/assets/75c60b39-4e48-4391-8973-cce551d3a4af

A minimal React Native app that wraps the Börse Stuttgart website with a native drawer menu and deep link support.

### Framework choice

- **Expo + React Native + TypeScript** – fast setup, great DX, built‑in splash + deep linking, ideal for WebView‑based hybrid apps.
- **State management**: Redux Toolkit + RTK Query – centralized state, cached API calls, clean loading/error handling.
- **Navigation**: React Navigation (Drawer).
- **Web content**: `react-native-webview` with `userAgent="bsgapp"`.

### Setup

```bash
npm install
npx expo start
```

### Menu rendering

- Menu config is loaded via RTK Query from  
  `https://www.boerse-stuttgart.de/de-de/api/bsg-feature-navigation/MenuConfiguration/GetConfiguration`.
- Root `menuItems` array is rendered as a **native drawer menu**.
- Items with children are **collapsible**: tapping the parent toggles visibility of its sub‑items; leaf items navigate the WebView to their URL.
- “Secure” links are treated as normal links (no auth), but visually labeled.

### Deep link handling

- App scheme: `bsgapp` (configured in Expo).
- React Navigation linking maps **`bsgapp://events`** to the `WebView` screen showing  
  `https://www.boerse-stuttgart.de/de-de/anlegerclub/events/` inside the WebView.
