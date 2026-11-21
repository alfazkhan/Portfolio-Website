const DEFAULT_ORIGIN = "https://www.theonlyalfaz.com";

// Subdomain paths that map onto pages under /2subs2learn on the origin.
// "/welcome" is opened by the extension right after installation.
const PAGE_ROUTES = {
  "/": "/2subs2learn",
  "/index.html": "/2subs2learn",
  "/welcome": "/2subs2learn/welcome",
};

// Pages that should not appear in search results.
const NOINDEX_PATHS = new Set(["/welcome"]);

function normalizePath(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

/**
 * Proxies requests for the 2subs2learn subdomain to the static /2subs2learn routes
 * on the root portfolio site while forwarding _next and static assets unchanged.
 */
const worker = {
  async fetch(request, env) {
    const origin = (env?.ORIGIN_URL || DEFAULT_ORIGIN).replace(/\/+$/, "");
    const incomingUrl = new URL(request.url);
    const path = normalizePath(incomingUrl.pathname);
    const targetPath = PAGE_ROUTES[path] || incomingUrl.pathname;

    const upstreamUrl = `${origin}${targetPath}${incomingUrl.search}`;
    const upstreamHeaders = new Headers(request.headers);
    upstreamHeaders.delete("host");

    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: upstreamHeaders,
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? request.body
          : undefined,
      redirect: "follow",
    });

    const responseHeaders = new Headers(upstreamResponse.headers);
    responseHeaders.set(
      "X-Robots-Tag",
      NOINDEX_PATHS.has(path) ? "noindex, follow" : "index, follow",
    );

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  },
};

export default worker;
