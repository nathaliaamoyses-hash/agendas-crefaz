// Approved content integrated September 2026. Preserve record IDs.
export const routeMaps = {
  "anchors": {
    "ferry": [
      "Ferry Building",
      37.7955,
      -122.3937,
      "ferry-building"
    ],
    "water": [
      "Embarcadero pause",
      37.7945,
      -122.3926,
      "embarcadero"
    ],
    "board": [
      "California & Drumm · board",
      37.7935,
      -122.3965,
      "cable-car"
    ],
    "alight": [
      "California & Powell · alight",
      37.792,
      -122.409,
      null
    ],
    "nob": [
      "Huntington Park · Nob Hill",
      37.7927,
      -122.413,
      "nob-hill"
    ],
    "lombard": [
      "Lombard & Hyde · top",
      37.8021,
      -122.4187,
      "lombard-street"
    ],
    "bottom": [
      "Lombard & Leavenworth · bottom",
      37.802,
      -122.417,
      null
    ],
    "buena": [
      "Buena Vista",
      37.8066,
      -122.4206,
      "buena-vista"
    ],
    "ghir": [
      "Ghirardelli / Waterfront",
      37.806,
      -122.423,
      "ghirardelli-waterfront"
    ],
    "palace": [
      "Palace of Fine Arts",
      37.8029,
      -122.4486,
      "palace-of-fine-arts"
    ],
    "east": [
      "Crissy Field East Beach",
      37.8056,
      -122.4505,
      "crissy-field"
    ],
    "west": [
      "Warming Hut area",
      37.8083,
      -122.472,
      null
    ],
    "bridge": [
      "Golden Gate Welcome Center plaza",
      37.8078,
      -122.475,
      "golden-gate-viewpoint"
    ],
    "oracle": [
      "Oracle Park · Willie Mays Plaza",
      37.7786,
      -122.3893,
      "oracle-park"
    ],
    "epic": [
      "EPIC Steak · 7pm dinner",
      37.7908,
      -122.3894,
      null
    ]
  },
  "legs": [
    {
      "routeId": "sunday-classic",
      "origin": "ferry",
      "destination": "water",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Ferry+Building%2C+San+Francisco&destination=Ferry+Building+waterfront%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-classic",
      "origin": "water",
      "destination": "board",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Ferry+Building+waterfront%2C+San+Francisco&destination=California+Street+and+Drumm+Street%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-classic",
      "origin": "board",
      "destination": "alight",
      "mode": "Cable Car",
      "url": "https://www.sfmta.com/routes/california-cable-car"
    },
    {
      "routeId": "sunday-classic",
      "origin": "alight",
      "destination": "nob",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=California+Street+and+Powell+Street%2C+San+Francisco&destination=Huntington+Park%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-classic",
      "origin": "nob",
      "destination": "lombard",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Huntington+Park%2C+San+Francisco&destination=Lombard+Street+and+Hyde+Street%2C+San+Francisco&travelmode=walking&waypoints=California+Street+and+Hyde+Street%2C+San+Francisco"
    },
    {
      "routeId": "sunday-classic",
      "origin": "lombard",
      "destination": "bottom",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Lombard+Street+and+Hyde+Street%2C+San+Francisco&destination=Lombard+Street+and+Leavenworth+Street%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-classic",
      "origin": "bottom",
      "destination": "buena",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Lombard+Street+and+Leavenworth+Street%2C+San+Francisco&destination=The+Buena+Vista%2C+2765+Hyde+Street%2C+San+Francisco&travelmode=walking&waypoints=Leavenworth+Street+and+Beach+Street%2C+San+Francisco"
    },
    {
      "routeId": "sunday-classic",
      "origin": "buena",
      "destination": "ghir",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=The+Buena+Vista%2C+2765+Hyde+Street%2C+San+Francisco&destination=Ghirardelli+Square%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-classic",
      "origin": "ghir",
      "destination": "palace",
      "mode": "Taxi / rideshare",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Ghirardelli+Square%2C+San+Francisco&destination=Palace+of+Fine+Arts%2C+Baker+Street+and+North+Point+Street%2C+San+Francisco&travelmode=driving"
    },
    {
      "routeId": "sunday-classic",
      "origin": "palace",
      "destination": "east",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Palace+of+Fine+Arts%2C+Baker+Street+and+North+Point+Street%2C+San+Francisco&destination=Crissy+Field+East+Beach%2C+San+Francisco&travelmode=walking&waypoints=Baker+Street+and+Marina+Boulevard%2C+San+Francisco"
    },
    {
      "routeId": "sunday-classic",
      "origin": "east",
      "destination": "west",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Crissy+Field+East+Beach%2C+San+Francisco&destination=Warming+Hut%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-classic",
      "origin": "west",
      "destination": "bridge",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Warming+Hut%2C+San+Francisco&destination=Golden+Gate+Bridge+Welcome+Center%2C+San+Francisco&travelmode=walking&waypoints=Battery+East+Trail%2C+San+Francisco"
    },
    {
      "routeId": "sunday-classic",
      "origin": "bridge",
      "destination": "epic",
      "mode": "Taxi / rideshare",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Golden+Gate+Bridge+Welcome+Center%2C+San+Francisco&destination=EPIC+Steak%2C+369+The+Embarcadero%2C+San+Francisco&travelmode=driving"
    },
    {
      "routeId": "sunday-both",
      "origin": "ferry",
      "destination": "board",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Ferry+Building%2C+San+Francisco&destination=California+Street+and+Drumm+Street%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-both",
      "origin": "board",
      "destination": "alight",
      "mode": "Cable Car",
      "url": "https://www.sfmta.com/routes/california-cable-car"
    },
    {
      "routeId": "sunday-both",
      "origin": "alight",
      "destination": "nob",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=California+Street+and+Powell+Street%2C+San+Francisco&destination=Huntington+Park%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-both",
      "origin": "nob",
      "destination": "lombard",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Huntington+Park%2C+San+Francisco&destination=Lombard+Street+and+Hyde+Street%2C+San+Francisco&travelmode=walking&waypoints=California+Street+and+Hyde+Street%2C+San+Francisco"
    },
    {
      "routeId": "sunday-both",
      "origin": "lombard",
      "destination": "bottom",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Lombard+Street+and+Hyde+Street%2C+San+Francisco&destination=Lombard+Street+and+Leavenworth+Street%2C+San+Francisco&travelmode=walking"
    },
    {
      "routeId": "sunday-both",
      "origin": "bottom",
      "destination": "buena",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Lombard+Street+and+Leavenworth+Street%2C+San+Francisco&destination=The+Buena+Vista%2C+2765+Hyde+Street%2C+San+Francisco&travelmode=walking&waypoints=Leavenworth+Street+and+Beach+Street%2C+San+Francisco"
    },
    {
      "routeId": "sunday-both",
      "origin": "buena",
      "destination": "oracle",
      "mode": "Taxi / rideshare",
      "url": "https://www.google.com/maps/dir/?api=1&origin=The+Buena+Vista,+2765+Hyde+Street,+San+Francisco&destination=Willie+Mays+Plaza,+San+Francisco&travelmode=driving"
    },
    {
      "routeId": "sunday-both",
      "origin": "oracle",
      "destination": "epic",
      "mode": "Walk",
      "url": "https://www.google.com/maps/dir/?api=1&origin=Willie+Mays+Plaza%2C+San+Francisco&destination=EPIC+Steak%2C+369+The+Embarcadero%2C+San+Francisco&travelmode=walking"
    }
  ]
};
