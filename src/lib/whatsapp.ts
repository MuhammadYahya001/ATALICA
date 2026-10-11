export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi ATALICA, I visited your website and would like to discuss an interior design, construction, or décor project.";

export function getWhatsAppUrl(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/923051755566?text=${encoded}`;
}
