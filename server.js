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
    //generating a random number to uniquely identify a specific employee
    const randomEmployeeId = Math.floor(Math.random() * 1000000);

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
        employeeId : randomEmployeeId,
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

        const employeeId = parseInt(req.params.employeeId);

        // Check if the employee with the given ID exists
        const employeeRef = db.collection("employees").where("employeeId", "==", employeeId);
        const querySnapshot = await employeeRef.get();

        console.log("Query result: ", querySnapshot.docs);

        if (querySnapshot.empty) {
            console.log("Employee not found");
            return res.status(404).json({ error: "Employee not found" });
        }

        //Since there should only be one document with this Id
        const employeeDoc = querySnapshot.docs[0];

        console.log("Document belonging to selected employee: ", employeeDoc);

        // Update the employee information
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
            employeeId: req.body.employeeId,
        };

        console.log("Updating employee data: ", updatedEmployee);

        // Perform the update
        await employeeDoc.ref.update(updatedEmployee);

        res.json({ message: "Employee updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Deleting existing data
//Defining the endpoint... >>>
app.delete("/deleteEmployee/:employeeId", async (req, res) => {
    try {
        const employeeId = req.params.employeeId;

        // Check if the employee with the given ID exists
        const employeeRef = db.collection("employees").doc(employeeId);
        const employeeSnapshot = await employeeRef.get();

        if (!employeeSnapshot.exists) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Perform the delete operation
        await employeeRef.delete();

        res.json({ message: "Employee deleted successfully", employeeId: employeeId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Define the port the server will run on
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("server running")
});