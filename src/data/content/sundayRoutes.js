export const sundayStops = {
  "ferry": {
    "placeId": "ferry-building",
    "guidance": "Start outside the Ferry Building beneath the clock tower, facing Market Street. Browse and get something to eat before leaving. This is a suggested starting point, not an arranged group meetup.",
    "flag": null,
    "foodNearbyIds": [],
    "durationMinutes": 35
  },
  "embarcadero": {
    "placeId": "embarcadero",
    "guidance": "Take a short waterfront pause beside the Ferry Building, then cross at the marked crossings toward California & Drumm. Allow 5 minutes to reach the waterfront pause and another 5 minutes to reach the Cable Car terminal; these walks are separate from the 10-minute stop.",
    "flag": null,
    "foodNearbyIds": [],
    "durationMinutes": 10
  },
  "cableCar": {
    "placeId": "cable-car",
    "guidance": "Board the California Line toward Van Ness at California & Drumm and get off at California & Powell. Allow another 20 minutes for waiting and boarding. If the wait exceeds 25 minutes or service is disrupted, use a taxi/rideshare to Huntington Park and continue from Nob Hill.",
    "flag": "recommended",
    "foodNearbyIds": [],
    "durationMinutes": 15
  },
  "nobHill": {
    "placeId": "nob-hill",
    "guidance": "From California & Powell, walk west for about 5 minutes to Huntington Park. Pause around the park and Grace Cathedral exterior. Continue west along California Street, then north on Hyde toward Lombard; allow about 40 minutes for this hilly walk.",
    "flag": null,
    "foodNearbyIds": [],
    "durationMinutes": 20
  },
  "lombard": {
    "placeId": "lombard-street",
    "guidance": "Arrive at Lombard & Hyde, at the top of the crooked block. Use the pedestrian steps beside the road to descend to Leavenworth for the view looking uphill. Continue north on Leavenworth, then west on Beach to Buena Vista; allow another 15 minutes. Stay on the sidewalks and keep the roadway clear.",
    "flag": null,
    "foodNearbyIds": [
      "buena-vista"
    ],
    "durationMinutes": 20
  },
  "buenaVista": {
    "placeId": "buena-vista",
    "guidance": "Use this as the lunch and refreshment break: allow roughly 20 minutes for waiting and 40 minutes to order, eat and settle up. If the queue would consume your lunch break, choose somewhere convenient nearby and continue; no table is reserved.",
    "flag": null,
    "foodNearbyIds": [],
    "durationMinutes": 60
  },
  "ghirardelli": {
    "placeId": "ghirardelli-waterfront",
    "guidance": "From Buena Vista, walk about 5 minutes west toward Ghirardelli Square. Take a short look around the square and adjoining Aquatic Park waterfront. Skip this detour first if time is slipping; arrange the onward ride from a legal nearby pickup point.",
    "flag": "optional",
    "foodNearbyIds": [],
    "durationMinutes": 20
  },
  "palace": {
    "placeId": "palace-of-fine-arts",
    "guidance": "Take a taxi or rideshare from the Ghirardelli waterfront to the Palace of Fine Arts near Baker & North Point. Allow 30 minutes including pickup. Walk around the lagoon and rotunda, then continue via Baker and Marina Boulevard toward Crissy Field East Beach; allow another 15 minutes.",
    "flag": null,
    "foodNearbyIds": [],
    "durationMinutes": 35
  },
  "crissy": {
    "placeId": "crissy-field",
    "guidance": "Walk west from Crissy Field East Beach along the Golden Gate Promenade/Bay Trail to the Warming Hut area. The 55-minute allowance includes about 40 minutes walking and 15 minutes for views and rest. Bring a layer for the wind. The final climb to the bridge is a separate leg.",
    "flag": null,
    "foodNearbyIds": [],
    "durationMinutes": 55
  },
  "bridge": {
    "placeId": "golden-gate-viewpoint",
    "guidance": "From the Warming Hut area, follow signed pedestrian connections uphill to Battery East Trail and the Golden Gate Bridge Welcome Center; allow 30 minutes for the climb. Finish at the outdoor visitor plaza on the San Francisco side. This route does not cross the bridge. For the return, meet your taxi/rideshare at the Welcome Center pickup area indicated by signs and the driver; vehicles may pick up but cannot wait there.",
    "flag": null,
    "foodNearbyIds": [],
    "durationMinutes": 25
  },
  "oracle": {
    "placeId": "oracle-park",
    "guidance": "Aim to reach the ballpark exterior at 3 p.m. Use Willie Mays Plaza as an orientation point, then follow your mobile ticket and staff directions to the appropriate entrance. Allow about 20 minutes for the exterior and approaching entry; security, food and finding your seat use the remaining pregame buffer. There is no organized meetup.",
    "flag": "recommended",
    "foodNearbyIds": [],
    "durationMinutes": 20
  }
};
export const routes = [
  { ...{
  "id": "sunday-classic",
  "slug": "sunday-classic",
  "name": "Classic San Francisco",
  "status": "ready",
  "shortDescription": "A full day of Cable Car hills, waterfront stops and Golden Gate views, from the Ferry Building through the Presidio.",
  "image": null,
  "bestFor": "First-time visitors who want a full sightseeing day and are comfortable with hills, steps and extended walking.",
  "durationMinutes": 465,
  "durationLabel": "Allow about 7½–8½ hours to the bridge viewpoint, including lunch and transfers. Return travel and dinner are extra.",
  "suggestedStartTime": "09:00",
  "runningLateGuidance": "Skip Ghirardelli first and shorten Nob Hill to a quick park-side pause. If you are still at the Palace of Fine Arts at 3 p.m., finish with a shorter visit to Crissy Field East Beach and take a taxi/rideshare back from a legal road pickup point nearby; leave the bridge climb for another day. Keep the 7 p.m. EPIC dinner in mind.",
  "directionsUrl": null,
  "departureTime": null,
  "departureGuidance": null,
  "arrivalTime": null,
  "milestones": [
    {
      "label": "Start at the Ferry Building",
      "time": "09:00",
      "guidance": "Suggested start outside the clock tower; begin with browsing and breakfast or a snack."
    },
    {
      "label": "California Line",
      "time": "09:55",
      "guidance": "Reach California & Drumm. Budget 20 minutes to board, followed by about 15 minutes riding to Powell."
    },
    {
      "label": "Lunch at Buena Vista",
      "time": "12:10",
      "guidance": "Allow an hour including the queue; shorten or move the meal if waiting eats into that hour."
    },
    {
      "label": "Palace of Fine Arts",
      "time": "14:05",
      "guidance": "Target arrival after the short Ghirardelli detour and a taxi/rideshare transfer."
    },
    {
      "label": "Crissy Field East Beach",
      "time": "14:55",
      "guidance": "Begin the waterfront walk toward the Warming Hut, followed by the uphill connection to Battery East."
    },
    {
      "label": "Golden Gate viewpoint",
      "time": "16:20",
      "guidance": "Enjoy the Welcome Center outdoor plaza until about 4:45 p.m."
    },
    {
      "label": "Return toward downtown",
      "time": "16:45",
      "guidance": "Use a taxi/rideshare from the Welcome Center. Budget roughly 45–60 minutes including pickup and traffic; use the remaining time as you like before dinner."
    },
    {
      "label": "Dinner at EPIC Steak",
      "time": "19:00",
      "guidance": "369 The Embarcadero. Allow time to reach the restaurant if you return to your hotel first."
    }
  ],
  "optionalExtensionPlaceIds": [],
  "related": [
    {
      "kind": "sharedPlan",
      "id": "sunday-dinner"
    }
  ]
}, stops: [sundayStops.ferry, sundayStops.embarcadero, sundayStops.cableCar, sundayStops.nobHill, sundayStops.lombard, sundayStops.buenaVista, sundayStops.ghirardelli, sundayStops.palace, sundayStops.crissy, sundayStops.bridge] },
  { ...{
  "id": "sunday-both",
  "slug": "sunday-both",
  "name": "Classic SF + Giants at the Park",
  "status": "ready",
  "shortDescription": "See the Ferry Building, ride a Cable Car and explore the hills before lunch at Buena Vista and an afternoon at Oracle Park.",
  "image": null,
  "bestFor": "Visitors who want city highlights and baseball, with a firm afternoon cutoff and several hilly walks.",
  "durationMinutes": 320,
  "durationLabel": "Allow about 5–5½ hours through the approach to stadium entry; the game and dinner are extra.",
  "suggestedStartTime": "09:30",
  "runningLateGuidance": "Protect the 1:30 p.m. departure from Buena Vista. First shorten Ferry Building browsing and the Nob Hill pause. Next skip the Lombard descent and continue down Hyde to Beach Street. Replace a long Buena Vista lunch with a quick meal if necessary. If delayed, head directly to Oracle Park by taxi/rideshare and allow 45–60 minutes for pickup, traffic and the final walk. Do not add Ghirardelli, the Presidio or the bridge to this route.",
  "directionsUrl": null,
  "departureTime": "13:30",
  "departureGuidance": "Leave Buena Vista by 1:30 p.m. Take a taxi or rideshare toward Oracle Park, allowing 45–60 minutes including pickup, traffic and the final walk. Expect to reach the park around 2:15–2:30 p.m., ahead of the 3 p.m. arrival target. Follow your driver’s legal drop-off point and walk the final stretch.",
  "arrivalTime": "15:00",
  "milestones": [
    {
      "label": "Start at the Ferry Building",
      "time": "09:30",
      "guidance": "Suggested start outside the clock tower. Keep browsing to about 35 minutes."
    },
    {
      "label": "California Line",
      "time": "10:15",
      "guidance": "Reach California & Drumm; allow 20 minutes to board and about 15 minutes riding to Powell."
    },
    {
      "label": "Lombard Street",
      "time": "11:55",
      "guidance": "Twenty minutes includes the pedestrian descent to Leavenworth."
    },
    {
      "label": "Lunch at Buena Vista",
      "time": "12:30",
      "guidance": "Allow an hour including the queue. If you arrive late, shorten lunch rather than the stadium buffer."
    },
    {
      "label": "Leave for Oracle Park",
      "time": "13:30",
      "guidance": "Take a taxi/rideshare and allow 45–60 minutes including pickup and the final walk."
    },
    {
      "label": "Reach Oracle Park",
      "time": "14:30",
      "guidance": "Expected arrival is around 2:15–2:30 p.m.; keep 3 p.m. as the latest target. Allow around 20 minutes for the exterior and approaching entry, then use the pregame buffer for security, food and your seat."
    },
    {
      "label": "First pitch",
      "time": "16:20",
      "guidance": "Check your ticket for any schedule changes."
    },
    {
      "label": "Dinner at EPIC Steak",
      "time": "19:00",
      "guidance": "Allow approximately 20–25 minutes walking north along the Embarcadero, plus time to exit the stadium. You may need to leave the game early."
    }
  ],
  "optionalExtensionPlaceIds": [],
  "related": [
    {
      "kind": "activity",
      "id": "sunday-giants"
    },
    {
      "kind": "sharedPlan",
      "id": "sunday-dinner"
    }
  ]
}, stops: [sundayStops.ferry, sundayStops.cableCar, sundayStops.nobHill, sundayStops.lombard, { ...sundayStops.buenaVista, ...{
  "flag": "skipIfLate",
  "guidance": "Use this as the lunch and refreshment break: allow roughly 20 minutes for waiting and 40 minutes to order, eat and settle up. If the queue would consume your lunch break, choose somewhere convenient nearby and continue; no table is reserved. Aim to start lunch by 12:30 p.m. and leave by 1:30 p.m. Arrange a taxi/rideshare from a legal nearby pickup point toward Oracle Park."
} }, sundayStops.oracle] },
];
