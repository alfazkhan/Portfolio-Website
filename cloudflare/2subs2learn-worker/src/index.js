const DEFAULT_ORIGIN = "https://www.theonlyalfaz.com";

/**
 * Proxies requests for the 2subs2learn subdomain to the static /2subs2learn route
 * on the root portfolio site while forwarding _next and static assets unchanged.
 */
const worker = {
  async fetch(request, env) {
    const origin = (env?.ORIGIN_URL || DEFAULT_ORIGIN).replace(/\/+$/, "");
    const incomingUrl = new URL(request.url);
    const targetPath =
      incomingUrl.pathname === "/" || incomingUrl.pathname === "/index.html"
        ? "/2subs2learn"
        : incomingUrl.pathname;

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
    responseHeaders.set("X-Robots-Tag", "index, follow");

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  },
};

export default worker;
