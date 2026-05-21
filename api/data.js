export default function handler(req, res) {
  return res.status(200).json(
    global.latestDonation || {
      supporter: null,
      amount: 0,
      message: "",
      created_at: null
    }
  );
}
