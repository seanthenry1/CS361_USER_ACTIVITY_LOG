
console.log("starting server...");

const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());


// Write activity
app.post("/activity", (req, res) => {
    const data = fs.readFileSync("activityLog.json");
    const logs = JSON.parse(data);

    logs.push(req.body);

    fs.writeFileSync(
        "activityLog.json",
        JSON.stringify(logs)
    );

    res.send("Saved activity");
});


// Get report
app.get("/report", (req, res) => {
    const data = fs.readFileSync("activityLog.json");
    const logs = JSON.parse(data);

    res.json(logs);
});

console.log("loaded");
app.listen(5000);