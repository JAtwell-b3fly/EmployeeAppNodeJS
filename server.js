//importing your relevant packages
//similar to import {package} from "react...." in react.js
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

//Initialise
const serviceAccount = require("./key.json");
const app = express();

//Connect firebase to node.js
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();

//
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//enable Cors for all routes
app.use(cors());

//HTTP REQUESTS ARE POST(adding), PUT(updating), DELETE(deleting) AND GET(retrieving)
//What is used in the front end to add a new employee: /addEmployee

//Defining our endpoint....>>>>>
app.post("/addEmployee", async (req, res) => {
    //creating the object that stores all the employee information
    const employees = {
        name: req.body.name,
        emailA: req.body.emailA,
        position: req.body.position,
        locationE: req.body.locationE,
        number: req.body.number,
        workingStarted: req.body.workingStarted,
        employable: req.body.employable,
        salary: req.body.salary,
        cv: req.body.cv,
        image: req.body.image,
    };
    //adding the employees information to the employees collection in firestore
    const response = db.collection("employees").add(employees);
    //send the response back to the client so they can see the data was added
    res.send(response);
});

//Retrieve the data
//Defining our endpoint ..... >>>>
app.get("/getEmployees", async (req, res) => {
    try{
        //specifying the collection where the data should be pulled from
        const userRef = db.collection("employees");

        //get() takes everything from the collection
        const employees = await userRef.get();

        let responseArray = [];
        //adding each document pulled from the collection into the empty array one by one using a for loop
        employees.forEach(doc => {
            responseArray.push(doc.data());
        });

        res.json(responseArray);
    } catch(error) {
        res.status(500).json({error: error.message})
    }
    
})

//Updating existing data
//Defining the endpoint... >>>
app.put("/updateEmployee/:employeeId", async (req, res) => {
    try {
        const employeeId = req.params.employeeId;

        // Fetch the existing employee document from the "employees" collection
        const employeeRef = db.collection("employees").doc(employeeId);
        const employeeDoc = await employeeRef.get();

        if (!employeeDoc.exists) {
            // If the employee does not exist, return an error
            res.status(404).json({ error: "Employee not found" });
            return;
        }

        // Update the employee information based on the request body
        const updatedEmployee = {
            name: req.body.name,
            emailA: req.body.emailA,
            position: req.body.position,
            locationE: req.body.locationE,
            number: req.body.number,
            workingStarted: req.body.workingStarted,
            employable: req.body.employable,
            salary: req.body.salary,
            cv: req.body.cv,
            image: req.body.image,
        };

        // Update the document in the "employees" collection
        await employeeRef.update(updatedEmployee);

        // Return a success response
        res.json({ message: "Employee updated successfully" });
    } catch (error) {
        // Return an error response
        res.status(500).json({ error: error.message });
    }
})


//Deleting existing data
//Defining the endpoint... >>>


//Define the port the server will run on
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("server running")
});