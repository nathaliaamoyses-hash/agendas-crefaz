// Official operator/city/weather links checked 2026-09-07. No fixed fares or schedules.
/** @type {import('./schema.js').PracticalTip[]} */
export const practicalTips = [
  {
    "id": "layers",
    "slug": "layers",
    "name": "Layers & changing weather",
    "category": "weather",
    "shortDescription": "Keep a layer handy for wind and changing temperatures.",
    "externalUrl": "https://forecast.weather.gov/MapClick.php?lat=37.79280&lon=-122.41450",
    "externalLabel": "National Weather Service forecast",
    "status": "draft",
    "image": null,
    "infoBlocks": [],
    "related": []
  },
  {
    "id": "getting-around",
    "slug": "getting-around",
    "name": "Getting around",
    "category": "transport",
    "shortDescription": "Walking, ride-hailing, cable cars, Muni, and ferries can all fit into the week. Choose transport around the day’s confirmed plans.",
    "externalUrl": "https://www.sfmta.com/getting-around",
    "externalLabel": "SFMTA transit & transport",
    "status": "draft",
    "image": null,
    "infoBlocks": [
      {
        "id": "detail-1",
        "title": "Walking",
        "text": null
      },
      {
        "id": "detail-2",
        "title": "Uber / Lyft",
        "text": null
      },
      {
        "id": "detail-3",
        "title": "Muni",
        "text": null
      }
    ],
    "related": []
  },
  {
    "id": "cable-cars",
    "slug": "cable-cars",
    "name": "Cable cars",
    "category": "transport",
    "shortDescription": "Check the operator’s payment guidance before the ride. The Sunday boarding point and line are still being finalized.",
    "externalUrl": "https://www.sfmta.com/fares/cable-car-single-ride",
    "externalLabel": "Cable-car fares & payment",
    "status": "draft",
    "image": null,
    "infoBlocks": [
      {
        "id": "detail-1",
        "title": "Useful routes",
        "text": null
      },
      {
        "id": "detail-2",
        "title": "Queue guidance",
        "text": null
      }
    ],
    "related": [
      {
        "kind": "guide",
        "id": "sunday"
      }
    ]
  },
  {
    "id": "city-awareness",
    "slug": "city-awareness",
    "name": "City awareness",
    "category": "safety",
    "shortDescription": "Keep belongings with you. Do not leave valuables or luggage in a parked car.",
    "externalUrl": "https://www.sanfranciscopolice.org/stay-safe/crime-prevention/park-smart",
    "externalLabel": "Park Smart guidance",
    "status": "draft",
    "image": null,
    "infoBlocks": [],
    "related": []
  },
  {
    "id": "sfo-city",
    "slug": "sfo-city",
    "name": "SFO → city",
    "category": "airport",
    "shortDescription": "Use the airport’s official ground-transportation guide to plan your arrival. Pickup instructions depend on your chosen option.",
    "externalUrl": "https://www.flysfo.com/passengers/ground-transportation",
    "externalLabel": "SFO ground transportation",
    "status": "draft",
    "image": null,
    "infoBlocks": [],
    "related": []
  },
  {
    "id": "ferries",
    "slug": "ferries",
    "name": "Ferry schedules",
    "category": "transport",
    "shortDescription": "Check the current outbound and return sailings before committing to the Sausalito outing.",
    "externalUrl": "https://www.goldengate.org/ferry/schedules-maps/",
    "externalLabel": "Official ferry schedules",
    "status": "draft",
    "image": null,
    "infoBlocks": [],
    "related": [
      {
        "kind": "activity",
        "id": "sausalito-ferry"
      }
    ]
  },
  {
    "id": "city-map",
    "slug": "city-map",
    "name": "San Francisco map",
    "category": "maps",
    "status": "draft",
    "shortDescription": "Open a city map for your next stop.",
    "image": null,
    "externalUrl": "https://www.google.com/maps/search/?api=1&query=San+Francisco",
    "externalLabel": "San Francisco map",
    "infoBlocks": [],
    "related": []
  }
]
