let latestDonation = global.latestDonation || {
  supporter: null,
  amount: 0,
  message: "",
  created_at: null
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body;

  latestDonation = {
    supporter: body.supporter || "Unknown",
    amount: Number(body.amount) || 0,
    message: body.message || "",
    created_at: new Date().toISOString()
  };

  global.latestDonation = latestDonation;

  return res.status(200).json({ success: true });
}
