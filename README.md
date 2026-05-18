CS361 USER ACTIVITY LOG

## Description
Microservice communicates with main program through REST API to generate a report on end user activity.

## REQUEST DATA
Client will send an HTTP post request to /reports. The microservice will then parse and log the request body into a JSON file named activityLog.json. 

```javascript
fetch('http://localhost:5000/activity', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(activity)
})
```

## RECEIVE DATA
Client will send an HTTP get request to /report. The microservice will then send a response with a JSON file in the HTTP response. Then the client will write this response to a JSON file name reportLog.json.

```javascript
fetch("http://localhost:5000/report", {
  method: 'GET'
})

.then(response => response.json())

.then(data => {
    fs.writeFileSync(
        "reportLog.json",
        JSON.stringify(data)
    );
});
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
