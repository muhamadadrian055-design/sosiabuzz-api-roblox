export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "POST only" });
    }

    let body = req.body;

    // 🔥 FIX penting: kalau body masih string
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    global.latestDonation = {
      supporter: body?.supporter || "Unknown",
      amount: Number(body?.amount || 0),
      message: body?.message || "",
      created_at: new Date().toISOString()
    };

    return res.status(200).json({ success: true });

  } catch (err) {
    console.log("WEBHOOK ERROR:", err);
    return res.status(200).json({ success: true }); // tetap OK biar SocialBuzz tidak gagal
  }
}
