// ---------------------------------------------------------------------------
// Region Hotspot Data (src/data/regionHotspots.ts)
// ---------------------------------------------------------------------------
// Defines the clickable areas on the world map. Each hotspot corresponds to a
// scene and is positioned using percentage-based coordinates so that the layout
// scales with different screen sizes. Designers should adjust this file when the
// map artwork changes or new scenes are introduced.
export interface Hotspot {
  id: number;
  name: string;
  sceneId: number;
  style: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
}

// List of all hotspots. The order matches the visual layout on the map.
//
// Development Plan:
// - Move this data to an external JSON file or CMS so designers can tweak
//   coordinates without touching TypeScript.
// - Provide multiple hotspot sets for different map sizes or orientations if we
//   add a mobile-specific map layout.
// - Validate the hotspot coordinates at build time to catch typos early.
// - Document the coordinate system (percent-based values) in assets.md so map
//   artists can easily align hotspots with new artwork.
// - Consider exposing a debug overlay in development mode to visualize these
//   hotspots when tweaking positions.
const regionHotspots: Hotspot[] = [
  {
    id: 1,
    name: "Glendor Grove",
    sceneId: 1,
    style: { left: "5%", top: "5%", width: "30%", height: "30%" },
  },
  {
    id: 2,
    name: "Willowshade Woods",
    sceneId: 2,
    style: { left: "35%", top: "5%", width: "30%", height: "30%" },
  },
  {
    id: 3,
    name: "Sparkspire Zone",
    sceneId: 3,
    style: { left: "65%", top: "5%", width: "30%", height: "30%" },
  },
  {
    id: 4,
    name: "Glyphstone Ruins",
    sceneId: 4,
    style: { left: "5%", top: "35%", width: "30%", height: "30%" },
  },
  {
    id: 5,
    name: "Whispering Woods",
    sceneId: 5,
    style: { left: "35%", top: "35%", width: "30%", height: "30%" },
  },
  {
    id: 6,
    name: "Sandy Shoals",
    sceneId: 6,
    style: { left: "65%", top: "35%", width: "30%", height: "30%" },
  },
  {
    id: 7,
    name: "Ember Crag",
    sceneId: 7,
    style: { left: "5%", top: "65%", width: "30%", height: "30%" },
  },
  {
    id: 8,
    name: "Sunnybrush Fields",
    sceneId: 8,
    style: { left: "35%", top: "65%", width: "30%", height: "30%" },
  },
  {
    id: 9,
    name: "Fable Fern Grotto",
    sceneId: 9,
    style: { left: "65%", top: "65%", width: "30%", height: "30%" },
  },
];

export default regionHotspots;
