import { client } from '#client-config';
export { client };
export const agendaTitle = client.agendaTitle;
export const clientName = client.name;
export const instructions = 'Tap a session for details. Star live sessions to add them to My Schedule. All live times are San Francisco time.';
export const whatsappNumber = client.whatsappNumber;
export const teamContacts = client.teamContacts;
export const heroImage = client.heroImage;
export const colors = { salesforceBlue: '#00A1E0', neutralDark: '#032D60', white: '#FFFFFF' };
// Per-category color tokens matching the PDF agenda palette.
// accent: left-border color on cards and badge border in detail modal.
// tint:   card background fill.
// Labels must be rendered in dark text (#032D60) — accent colors fail WCAG AA on their tints.
export const categoryColors = {
  suggested: { accent: null,      tint: '#ffffff' },
  also:      { accent: '#19a7b3', tint: '#f0fbfc' },  // teal
  oneOnOne:  { accent: '#ff9200', tint: '#fff8ec' },  // amber
  social:    { accent: '#8a4fd3', tint: '#f7f2fd' },  // purple
};
