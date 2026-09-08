import { trip } from './src/data/trip.js';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'AGENDA_');
  const clientId = process.env.AGENDA_CLIENT || env.AGENDA_CLIENT || 'banco-mercantil';
  if (!['banco-mercantil', 'acerto'].includes(clientId)) throw new Error(`Unsupported agenda client: ${clientId}`);
  const clientDirectory = resolve(process.cwd(), 'src/data/clients', clientId);
  const { client } = await import(pathToFileURL(resolve(clientDirectory, 'config.js')));
  return {
  resolve: { alias: { '#client-events': resolve(clientDirectory, 'events.js'), '#client-config': resolve(clientDirectory, 'config.js') } },
  base: '/',
  plugins: [
    react(),
    {
      name: 'client-browser-icons',
      transformIndexHtml() {
        return [
          { tag: 'link', attrs: { rel: 'icon', type: 'image/png', href: client.appIcons.small }, injectTo: 'head' },
          { tag: 'link', attrs: { rel: 'apple-touch-icon', href: client.appIcons.small }, injectTo: 'head' },
        ];
      },
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [client.appIcons.small.slice(1), client.appIcons.large.slice(1)],
      manifest: {
        name: client.agendaTitle,
        short_name: client.name,
        description: trip.pwa.description,
        theme_color: '#00A1E0',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: client.appIcons.small, sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: client.appIcons.large, sizes: '512x512', type: 'image/png', purpose: 'any' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,webp,svg,ico,woff,woff2}'],
      },
    }),
  ],
};
});
