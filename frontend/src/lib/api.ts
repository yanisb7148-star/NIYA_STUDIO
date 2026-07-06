// Lightweight Strapi API helper for the frontend
export async function fetchAPI<T = any>(path: string, urlParamsObject: Record<string, any> = {}, options: RequestInit = {}): Promise<T> {
  function buildQueryString(params: Record<string, any>) {
    const parts: string[] = [];
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (Array.isArray(value)) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`);
      } else if (typeof value === 'object') {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`);
      } else {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    });
    return parts.join('&');
  }

  const queryString = buildQueryString(urlParamsObject);
  const base = (import.meta.env.VITE_STRAPI_URL || '').replace(/\/$/, '');
  const requestUrl = `${base}/api${path}${queryString ? `?${queryString}` : ''}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (import.meta.env.VITE_STRAPI_API_TOKEN) {
    defaultHeaders.Authorization = `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`;
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    const text = await response.text();
    console.error('Strapi API error', response.status, text);
    throw new Error(`Erreur lors de la requête API Strapi: ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }
  // Fallback to text for non-JSON responses
  return (await response.text()) as unknown as T;
}

export default fetchAPI;
