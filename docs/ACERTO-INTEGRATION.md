# Acerto local integration

The user confirmed the same contacts and dinner/event arrangements as Banco Mercantil and supplied separate header and installation icons. Acerto has 27 recommended sessions (September 15/16/17: 6/12/9), plus the existing shared Brazil Sessions, Recorded Sessions and SF content.

Client selection: AGENDA_CLIENT=acerto. Banco Mercantil remains the default. Both use the same Vite app with build-time aliases; Node package imports remain Mercantil for its existing regression suite. New client tests validate both selections and Acerto day composition.

The imported Acerto records preserve all fields except area and summary, which have been rewritten to remove internal account commentary. Source IDs, date/time/room, links, registration and conflict notes remain unchanged. Original italic recording/repeat-session notes are retained. No new event facts were researched or asserted during integration.

Header: /icons/acerto-header-v1.png (supplied 320×320). Installed PWA: /icons/acerto-df192-v1.png and /icons/acerto-df512-v1.png (supplied opaque 192×192 and 512×512). Contacts and shared plans explicitly reuse the Mercantil-approved values; client-local storage uses df26-acerto keys.

Local review commands:

```sh
AGENDA_CLIENT=acerto npm run build -- --outDir dist-acerto
AGENDA_CLIENT=acerto npm run preview -- --host 127.0.0.1 --port 4175 --strictPort --outDir dist-acerto
```

Mercantil remains available from its own dist on port 4173. Production Cloudflare builds use the regular dist output. Do not push unfinished changes: the working branch automatically deploys Mercantil. Acerto local review comes before its own Pages project/deployment and hostname confirmation. No Acerto domain is authorized yet.

Validation completed: 40 tests passed and both client production builds succeeded. Browser review verified 27 recommended sessions, 8 Brazil sessions, the 24-session Recorded collection, saved-session persistence, calendar conversion, shared Sunday/Tuesday evening ordering, Acerto icon links and contacts at 320/390/768px without overflow. No browser errors observed. No physical phone installation test was performed. Local review: http://127.0.0.1:4175/#/dreamforce. Acerto is uncommitted and unpublished.
