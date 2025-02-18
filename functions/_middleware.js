export async function onRequest(context) {
  const ip = context.request.headers.get("CF-Connecting-IP");
  const timestamp = new Date().toISOString();

  const logEntry = `${ip} - ${timestamp}\n`;

  // Save to KV Storage (Cloudflare Pages)
  const { env } = context;
  let previousLogs = await env.IP_LOGGER.get("logs") || "";
  await env.IP_LOGGER.put("logs", previousLogs + logEntry);

  return new Response(`Logged IP: ${ip}`, { status: 200 });
}
