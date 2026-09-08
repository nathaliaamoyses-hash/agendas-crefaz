# Inter two-track integration

User approved one Inter site with CRM Business and CRM Operations selection remembered in the browser. Home and Recommended Sessions follow the selected track. My Schedule spans tracks and shared Brazil sessions, deduplicating shared occurrences without changing source IDs. Before a track is chosen, shared city content and shared conference collections remain available; no track is assumed.

Original source has 40 records, 20 per track, representing 32 distinct occurrences. Summary and selected area labels are cleaned of internal account commentary. All other fields, including track-specific transition warnings, are preserved. Repeat occurrences on different dates remain separate choices. Installed favorites use an existing source ID for each shared occurrence; original aliases still resolve to the same saved status.

Same contacts and dinner/event arrangements explicitly confirmed. Reuse original Inter SVG logo unchanged, copied into public/icons/inter-header-v1.svg for build configuration. Supplied PWA icons are exact copies at public/icons/inter-df192-v1.png and inter-df512-v1.png. Inter browser storage keys are separate from Acerto and Mercantil. Optional tracks remain absent for other clients; Mercantil remains the default build.

Local build: AGENDA_CLIENT=banco-inter npm run build -- --outDir dist-inter. Preview on a free separate port; verify both tracks, persistence, shared occurrences, Home daily filtering, all shared collections, mobile layout and other-client regressions. Local review precedes release. Do not push until approved: pushes automatically rebuild both existing Cloudflare Pages projects. Exact Inter hostname is not yet confirmed.
