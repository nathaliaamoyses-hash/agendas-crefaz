# Banco Mercantil integration

The user approved four At Dreamforce collections: Recommended Sessions, Brazil Sessions, Recorded Sessions, My Schedule. Banco Mercantil is the first local preview. Shared recorded sessions are not appointments; their source date/time is a live occurrence and their URL is a catalog page. The introduction links Salesforce+ using the user's supplied availability wording. Video availability has not been independently verified by this integration.

All final In San Francisco packages in the content workspace are approved. Current records are ready except Thursday dinner, which remains TBD. The user approved removing internal account commentary from session descriptions, reusing the Inter team contacts for Mercantil, and replacing the Do Both streetcar leg with a 13:30 taxi/rideshare departure, 45–60 minutes including pickup and final walk, expected arrival 14:15–14:30 before the 15:00 target.

The original inputs and hashes remain at /Users/teco/Documents/ChatGPT/Salesforce Events Agenda/integration-intake. Acerto and Inter inputs are retained there for later integration; their content is not bundled into Mercantil. Banco Mercantil uses the original M+ PNG in the header with 6px rounded corners and no adjacent name label. Installed PWA, browser and Apple touch icons use the new mercantildf192.png and mercantildf512.png artwork; icon paths live in the client configuration. The root application remains the target; agendas/df26 is historical reference.

One repository with separate Cloudflare Pages client builds is now authorized in scope, superseding the old prohibition on multiple agendas. This is a minimal client build configuration, not an administration platform. Only Mercantil is enabled initially. Existing GitHub workflows and domains remain unchanged. Local review precedes the first temporary Cloudflare deployment; domain cutover follows a release decision.


The user approved the local preview and requested Cloudflare deployment on September 8. First publish uses a pages.dev URL; custom-domain migration remains a later step. Build from repository root with npm run build, output dist, AGENDA_CLIENT=banco-mercantil and NODE_VERSION=22. Keep the existing working branch claude/inspiring-volta-u820u for this first build; main and its GitHub Pages workflows are not changed. Other client builds remain disabled until their integration.

Final review changes: Sunday dinner above sightseeing choices; shared Evening first in Home on September 13 and 15; waterfront hero on Home; route sunday-both displayed as Classic SF + Giants at the Park; Brazil Sessions collection label; twelve updated Napa wine recommendations and a styled recommendation heading. Source IDs remain unchanged.
