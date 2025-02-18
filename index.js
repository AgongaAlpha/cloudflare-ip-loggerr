export default {
  async fetch(request, env) {
    const ip = request.headers.get("CF-Connecting-IP") || "Unknown IP";
    console.log(`Visitor IP: ${ip}`);

    // Store the IP in Cloudflare KV
    await env.IP_LOGGER.put(`ip-${Date.now()}`, ip);

    return new Response(`Logged IP: ${ip}`, { status: 200 });
  },
};
