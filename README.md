# Hoverline

An anti-gravity racing game for the browser: you against 7 AI pilots over 3 laps, on phone, tablet or desktop.

The game is one file, `index.html`, plus a web-app manifest, a service worker (`sw.js`) and icons so it can be installed and played offline. It uses [three.js r128](https://threejs.org/) from cdnjs, and all models, textures and sounds are generated in code, so there are no asset files.

## Run it

Serve the folder and open it in a browser:

```bash
npx serve .
```

Opening `index.html` directly from disk also works, but the game can't be installed or play offline that way, because service workers need http or https.

## Install as an app

Hoverline is a progressive web app. In Chrome or Edge, use **Install** in the address bar. On iPhone or iPad, use **Share → Add to Home Screen**. The installed game opens full screen in landscape and works offline after the first visit.

When you change the list of files the service worker precaches, bump `VERSION` in `sw.js` so players get the new cache.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Thrust | ↑ / W | Drag up on the left side (further = more) |
| Airbrake | ↓ / S | Drag down on the left side (further = more) |
| Steer | ← → / A D | Drag left/right on the right half |
| Use item | Space | Item button (appears above steering) |
| Pause | P / Esc | Pause button |
| Rear-view mirror on/off | M | MIRROR button in the menu or pause screen |

## What's in it

- **10 courses**, in order of difficulty: Harbor Loop, Canyon Run, Lunar Basin (low gravity), Tidewater Reach (a causeway over the sea), Skyline Drop, Timberline Pass (a redwood forest), Magma Rift, Storm Coast (night rain and lightning), Glacier Apex and Cloud Citadel (above the clouds). They include tunnels, hills, valleys and jumps over gaps.
- **Career:** race the courses in order; finishing in the top 3 qualifies you and unlocks the next course. Progress is saved. Quick Race and Practice stay open on every course.
- **Race or practice:** race 7 AI pilots, or practice alone with no opponents or item pickups. Race and practice best times (total and best lap) are saved separately for each course and shown on the course list.
- **8 ship designs:** all handle identically; only the looks differ.
- **Physics:** ships hover on a spring, and there's no ground friction. Air drag is low along the nose and high side-on, and the airbrake adds drag and tightens turns.
- **Track pickups:** boost pads, plus one-shot items: homing missile (with an incoming-missile warning), rear mine, turbo and a timed shield.
- **Rear-view mirror:** a strip along the top of the screen shows what's behind you.
- **Sound:** synthesised with Web Audio, with a compressor and a short reverb. The engine is a low thrust roar that swells with the throttle.
- **Saved data:** best times, career progress and settings are stored in the browser's `localStorage`, so they survive closing the browser. The game asks the browser to keep that storage persistent.
- **Performance:** resolution adapts automatically when frames run slow.

## Development notes

`window.__hoverline.simulate(trackIndex, seconds)` runs an AI-only race without rendering and returns each ship's laps, times and respawn count; where any ship respawned is logged to the console. Simulated races don't save best times. It's a quick way to check a course after editing it.
