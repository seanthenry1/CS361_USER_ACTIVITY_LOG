# CS361 User Activity Log

## Description

This microservice communicates with the main program through a REST API. The purpose of the microservice is to log user activity and generate a report containing all recorded activity.

User activity is stored in a JSON file named `activityLog.json`.

## REQUEST DATA

The client sends an HTTP POST request to `/activity`. The request body contains the activity data to be logged. The microservice parses the request body and appends the data to `activityLog.json`.

### Example

```javascript
const activity = {
    user: "Sean",
    action: "Login"
};

fetch("http://localhost:5000/activity", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(activity)
});
```

### Explanation

* `fetch()` sends a request to the microservice.
* `method: "POST"` specifies that data is being sent.
* `JSON.stringify(activity)` converts the JavaScript object into a JSON string.
* The microservice receives the request body and writes the activity data to `activityLog.json`.

---

## RECEIVE DATA

The client sends an HTTP GET request to `/report`. The microservice reads `activityLog.json` and returns the activity data as a JSON response.

### Example

```javascript
fetch("http://localhost:5000/report", {
    method: "GET"
})
.then(response => response.json())
.then(data => {
    fs.writeFileSync(
        "reportLog.json",
        JSON.stringify(data)
    );
});
```

### Explanation

* `fetch()` sends a GET request to the microservice.
* The microservice reads the contents of `activityLog.json`.
* `response.json()` converts the JSON response into a JavaScript array.
* `fs.writeFileSync()` writes the returned data to a file named `reportLog.json`.

### Example Response

```json
[
    {
        "user": "Sean",
        "action": "Login"
    },
    {
        "user": "Sean",
        "action": "Logout"
    }
]
```

---

## UML Sequence Diagram

```text
Client Program          Microservice           activityLog.json

     |                        |                        |
     | POST /activity         |                        |
     |----------------------->|                        |
     |                        | write activity data    |
     |                        |----------------------->|
     |                        |                        |
     |                        | activity saved         |
     |<-----------------------|                        |
     |                        |                        |
     | GET /report            |                        |
     |----------------------->|                        |
     |                        | read JSON file         |
     |                        |----------------------->|
     |                        |                        |
     |                        | return activity data   |
     |<-----------------------|                        |
     |                        |                        |
     | create reportLog.json  |                        |
     |                        |                        |
```
