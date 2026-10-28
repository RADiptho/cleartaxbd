/**
 * ─────────────────────────────────────────────────────────────
 *  CLEAR TAX BD — SITE SETTINGS
 *  Edit the values below to update contact details site-wide.
 * ─────────────────────────────────────────────────────────────
 */
export const SITE = {
  name: 'Clear Tax BD',
  tagline: 'Your Taxes, Our Expertise',

  phoneDisplay: '01811163365',
  phoneIntl: '+8801811163365', // used for click-to-call
  whatsappNumber: '8801811163365', // country code + number, no "+" or spaces
  email: 'cleartaxbd@gmail.com',

  address: {
    en: 'House-03, Ground Floor, Road: Shahjalal Avenue, Sector-06, Uttara, Dhaka-1230, Bangladesh',
    bn: 'বাড়ি-০৩, নিচতলা, রোড: শাহজালাল এভিনিউ, সেক্টর-০৬, উত্তরা, ঢাকা-১২৩০, বাংলাদেশ',
  },
  // Query used for Google Maps search/directions links (no coordinates are guessed)
  mapsQuery: 'House 03, Shahjalal Avenue, Sector 6, Uttara, Dhaka 1230, Bangladesh',

  /**
   * FACEBOOK PAGE URL (official Clear Tax BD page)
   * If this is ever emptied, the Facebook icon is shown as "coming soon" and is not clickable.
   */
  facebookUrl: 'https://www.facebook.com/share/19bnvEV3wN/?mibextid=wwXIfr',

  /**
   * GOOGLE MAP EMBED (optional)
   * After confirming the office pin on Google Maps, click Share → Embed a map,
   * copy ONLY the src="..." value and paste it here. While empty, no map is embedded.
   */
  mapEmbedSrc: '',
};

export const waLink = (message) =>
  `https://wa.me/${SITE.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const mailLink = (subject) =>
  `mailto:${SITE.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const mapsSearchLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

export const mapsDirectionsLink = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE.mapsQuery)}`;
