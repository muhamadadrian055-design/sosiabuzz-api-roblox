let donations = []

module.exports = async (req, res) => {

    // =====================================
    // ROBLOX AMBIL DATA
    // =====================================

    if (req.method === "GET") {

        return res.status(200).json({
            status: "success",
            data: donations
        })
    }

    // =====================================
    // SOCIABUZZ / SAWERIA KIRIM DATA
    // =====================================

    if (req.method === "POST") {

        const body = req.body || {}

        let donator =
            body?.username ||
            body?.data?.donator_name ||
            "Anonymous"

        let amount =
            Number(body?.price) ||
            Number(body?.data?.amount_raw) ||
            0

        donations.unshift({
            donator: donator,
            amount: amount,
            timestamp: Date.now()
        })

        return res.status(200).json({
            success: true
        })
    }

    // =====================================
    // METHOD TIDAK VALID
    // =====================================

    return res.status(405).json({
        error: "Method not allowed"
    })
}