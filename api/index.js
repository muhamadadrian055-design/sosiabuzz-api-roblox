const express = require("express");

const app = express();

app.use(express.json());

/*
    DATA DONASI TERAKHIR
*/
let latestDonation = {
    supporter: null,
    amount: 0,
    message: "",
    created_at: null
};

/*
    ROOT
*/
app.get("/", (req, res) => {
    res.send("Backend aktif!");
});

/*
    ENDPOINT UNTUK ROBLOX
*/
app.get("/data", (req, res) => {
    res.json(latestDonation);
});

/*
    WEBHOOK SOCIALBUZZ / SAWERIA
*/
app.post("/webhook", (req, res) => {

    console.log("DATA MASUK:", req.body);

    /*
        FLEXIBLE PARSER
    */

    const supporter =
        req.body.supporter ||
        req.body.username ||
        req.body.donator_name ||
        "Anonymous";

    const amount =
        Number(req.body.amount) ||
        Number(req.body.amount_settled) ||
        Number(req.body.donation_amount) ||
        0;

    const message =
        req.body.message ||
        req.body.donator_message ||
        "";

    latestDonation = {
        supporter,
        amount,
        message,
        created_at: new Date().toISOString()
    };

    console.log("DONASI BARU:", latestDonation);

    res.status(200).json({
        success: true
    });
});

module.exports = app;
