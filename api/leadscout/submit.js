const LEADSCOUT_URL = "https://app.leadscout.ca/api/v1/public/submit";

function getApiKey() {
  // Prefer server environment variable in production.
  return process.env.LEADSCOUT_API_KEY || "170ab112-3304-4535-adb9-36aaf3c67759";
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return res.status(500).json({ message: "Missing LeadScout API key on server." });
  }

  try {
    const upstream = await fetch(LEADSCOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify(req.body || {})
    });

    const text = await upstream.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text || "Invalid upstream response." };
    }

    return res.status(upstream.status).json(data);
  } catch (error) {
    return res.status(502).json({
      message: "Failed to reach LeadScout API.",
      error: error.message
    });
  }
}
