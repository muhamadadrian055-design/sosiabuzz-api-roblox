export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const body = req.body;

  global.latestDonation = {
    supporter: body.supporter || "Unknown",
    amount: Number(body.amount) || 0,
    message: body.message || "",
    created_at: new Date().toISOString()
  };

  return res.status(200).json({ success: true });
}
