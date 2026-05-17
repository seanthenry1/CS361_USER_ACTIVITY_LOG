console.log("starting server...");

const fs = require("fs");
const fetch = require("node-fetch").default;

const data = fs.readFileSync("testData.json");
const activity = JSON.parse(data);

fetch('http://localhost:5000/activity', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(activity)
})

.then(response => response.text())
.then(data => console.log(data));

