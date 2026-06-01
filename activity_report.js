//Import express modules
const express = require("express");

//Import Node.js file system module and assign to fs.
const fs = require("fs");

const app = express();

//Middleware to parse incoming JSON data.
app.use(express.json());


//Checks if file path exists, if not creates a 
//new JSON file and writes an empty array to file.
if (!fs.existsSync("activityLog.json")) {
    const newData = [];

    //Write file method from fs. Takes file name and data 
    //as argument. 
    //JSON.stringify turns JS value and converts to JSON string.
    fs.writeFileSync(
        "activityLog.json",
        JSON.stringify(newData)
    );
}


//Post request takes path and callback parameters.
app.post("/activity", (req, res) => {

    //read contents from JSON file and store in data variable.
    const data = fs.readFileSync("activityLog.json");

    //Convert JSON string to JS array.
    const logs = JSON.parse(data);

    //Add request data to logs array.
    logs.push(req.body);

    //Function writes JS array data to JSON string and stores in
    //activityLog.json.
    fs.writeFileSync(
        "activityLog.json",
        JSON.stringify(logs)
    );

   //Notifies user of file being written.
    res.send("Saved activity");
});


//Get request handler for /report
app.get("/report", (req, res) => {

    const data = fs.readFileSync("activityLog.json");
    const logs = JSON.parse(data);

    //sends activity log as JSON response.
    res.json(logs);
});



console.log("loaded");

//listening port for express
app.listen(5000);