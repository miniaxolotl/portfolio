export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? match[1] : null;
};

export const setCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie-based state persistence
  document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`;
};
