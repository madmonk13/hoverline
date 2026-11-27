# Hoverline

An anti-gravity racing game for the browser: you against 7 AI pilots over 3 laps, on phone, tablet or desktop.

Everything is in one file, `index.html`. It uses [three.js r128](https://threejs.org/) from cdnjs, and all models, textures and sounds are generated in code, so there are no asset files.

## Run it

Open `index.html` in a browser, or serve the folder (some browsers restrict local files):

```bash
npx serve .
```

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Thrust | ↑ / W | THRUST button (left) |
| Airbrake | ↓ / S | BRAKE button (left) |
| Steer | ← → / A D | Drag left/right on the right half |
| Use item | Space | Item button (appears above steering) |
| Pause | P / Esc | Pause button |

## What's in it

- **6 courses:** Harbor Loop, Canyon Run, Lunar Basin (low gravity), Skyline Drop, Magma Rift and Glacier Apex. They include tunnels, hills, valleys and jumps over gaps.
- **8 ship designs:** all handle identically; only the looks differ.
- **Physics:** ships hover on a spring, and there's no ground friction. Air drag is low along the nose and high side-on, and the airbrake adds drag and tightens turns.
- **Track pickups:** boost pads, plus one-shot items: homing missile (with an incoming-missile warning), rear mine, turbo and a timed shield.
- **Sound:** synthesised with Web Audio, with a compressor and a short reverb.
- **Performance:** resolution adapts automatically when frames run slow.

## Development notes

`window.__hoverline.simulate(trackIndex, seconds)` runs an AI-only race without rendering and returns each ship's laps, times and respawn count. It's a quick way to check a course after editing it.
