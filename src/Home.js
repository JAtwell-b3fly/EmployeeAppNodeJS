import React, {useState, useEffect} from "react";

import employee_add  from "./images/add-user.png";
import employee_add_unselected from "./images/add-user-unselected.png";
import employee_list from "./images/contact-list.png";
import employee_list_unselected from "./images/contact-list-unselected.png";
import user from "./images/user.png";
import user1 from "./images/user1.jpg";
import user2 from "./images/user2.jpg";
import user3 from "./images/user3.jpg";
import user4 from "./images/user4.jpg";
import user5 from "./images/user5.jpg";
import cellphone from "./images/telephone.png";
import location from "./images/maps-and-flags.png";
import calender from "./images/calendar.png";
import profile from "./images/user-black.png";
import email from "./images/email.png";
import employed from "./images/briefcase.png";
import salaries from "./images/wages.png";
import salaries_unselected from "./images/wages-unselected.png";
import edit from "./images/edit.png";
import trash from "./images/trash.png";
import save from "./images/save.png";
import cancel from "./images/cancel.png";

const Home = () => {

    useEffect(() => {
        fetch('http://localhost:8080/getEmployees')
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(result => {
            console.log("result: ", result);
            setEmployees(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [])

    //Function to store the employees information
    const [employees, setEmployees] = useState([]);

    //Function to store the search term
    const [searchTerm, setSearchTerm] = useState("");

    //Function to toggle between the Employee Form and the Employee List
    const [dashboardToggle, setDashboardToggle] = useState("Form");

    //Function to toggle between list edit or display in Employee List
    const [isListEdit, setIsListEdit] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);


    const handleListEdit = (index) => {
        if(employees && employees.length > index && employees[index]) {
            setEditingIndex(index);
            setIsListEdit(true);

            setEditName(employees[index].name);
            setEditEmailA(employees[index].emailA);
            setEditImage(employees[index].image);
            setEditEmployable(employees[index].employable);
            setEditPosition(employees[index].position);
            setEditNumber(employees[index].number);
            setEditLocationE(employees[index].employees);
            setEditWorkingStart(employees[index].workingStart)
        } else {
            console.error("Invalid index or employees array is empty");
        }
        
    }

    const handleCancelListEdit = () => {
        setIsListEdit(false);
    }

    //Function to toggle between salaries edit or display in Employee List
    const [isSalariesEdit, setIsSalariesEdit] = useState(false);

    const handleSalariesEdit = (index) => {
        if(employees && employees.length > index && employees[index]) {
            setEditingIndex(index);
            setIsSalariesEdit(true);

            setEditName(employees[index].name);
            setEditImage(employees[index].image);
            setEditEmployable(employees[index].employable);
            setEditPosition(employees[index].position);
            setEditWorkingStart(employees[index].workingStart);
            setEditSalary(employees[index].salary);
        } else {
            console.error("Invalid index or employees array is empty");
        }
    }

    const handleCancelSalariesEdit = () => {
        setIsSalariesEdit(false);
    }

    //Form State Management
    const [name, setName] = useState("");
    const [editName, setEditName] = useState("");
    const [emailA, setEmailA] = useState("");
    const [editEmailA, setEditEmailA] = useState("");
    const [position, setPosition] = useState("");
    const [editPosition, setEditPosition] = useState("");
    const [locationE, setLocationE] = useState("");
    const [editLocationE, setEditLocationE] = useState("");
    const [number, setNumber] = useState("");
    const [editNumber, setEditNumber] = useState("");
    const [workingStart, setWorkingStart] = useState("");
    const [editWorkingStart, setEditWorkingStart] = useState("");
    const [employable, setEmployable] = useState("Active");
    const [editEmployable, setEditEmployable] = useState("Active");
    const [salary, setSalary] = useState(null);
    const [editSalary, setEditSalary] = useState(null);
    const [cv, setCV] = useState(null);
    const [image, setImage] = useState(null);
    const [editImage, setEditImage] = useState(null);

    const addNewEmployee = () => {

        //Use the endpoint defined in the backend side to add the new employee

        let userData = {
            name: name,
            emailA: emailA,
            position: position,
            locationE: locationE,
            number: number,
            workingStarted: workingStart,
            employable: employable,
            salary: salary,
            cv: cv,
            image: image,
        };


        fetch('http://localhost:8080/addEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(userData), 
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(result => {
            console.log("result: ", result);
            setEmployees(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }


    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setEditImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const saveEmployeeListInfo = (index) => {
        let updatedEmployeeData = {
            name:  editName ? editName : name,
            emailA: editEmailA ? editEmailA : emailA,
            locationE: editLocationE ? editLocationE : locationE,
            workingStarted: editWorkingStart ? editWorkingStart : workingStart,
            position: editPosition ? editPosition : position,
            image: editImage ? editImage : image,
            employable: editEmployable ? editEmployable : employable,
            cv: cv,
            salary: salary,
            number: editNumber ? editNumber: number,
        }

        fetch(`http://localhost:8080/updateEmployee/${index}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application.json",
            },
            body: JSON.stringify(updatedEmployeeData),
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(result => {
                console.log("result: ", result);
                //Optionally, update your state or take any other actions
                alert("Employee List Information Updated");
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })

        setIsListEdit(false);
    }

    const saveSalariesListInfo = (index) => {
        let updatedEmployeeData = {
            name:  editName ? editName : name,
            workingStarted: editWorkingStart ? editWorkingStart : workingStart,
            position: editPosition ? editPosition : position,
            image: editImage ? editImage : image,
            employable: editEmployable ? editEmployable : employable,
            cv: cv,
            salary: editSalary ? editSalary : salary,
            number: number,
            location: location,
            emailA: emailA,
        }

        fetch(`http://localhost:8080/updateEmployee/${index}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application.json",
            },
            body: JSON.stringify(updatedEmployeeData),
        })
            .then(res => {
                if(!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(result => {
                console.log("result: ", result);
                //Optionally, update your state or take any other actions
                alert("Employee Salary Information Updated");
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })

        setIsSalariesEdit(false);
    }

    const cancelClick = () => {
        setName("")
        setEmailA("");
        setPosition("");
        setLocationE("");
        setNumber("");
        setWorkingStart("");
        setEmployable("");
        setSalary("");
        setCV(null);
        setImage(null);
    }

    const totalEmployees = () => {
        const totalEmp = employees.length;

        return totalEmp;
    }

    const calculateWorkingDuration = () => {
        const today = Date().today;
    }

    return (
        <div className="backgroundStyling">
            <div className="Dashboard">
                <div className="leftRibbon">
                    <div style={{width: "100%", height: "3rem", marginBottom: "0.5rem", marginTop: "0.5rem"}}>
                        <h1 style={{textAlign: "center", color: "rgb(236, 243, 250)"}}>EMP4HIRE</h1>
                    </div>

                    <hr style={{backgroundColor: "rgb(236, 243, 250)", height: "0.01rem"}} />

                    <div className="singleLeftButton" style={{marginTop: "2rem"}}>
                        <button className={dashboardToggle === "Form" ? "dashboardButton" : "dashboardButtonUnselected"} onClick={() => setDashboardToggle("Form")}>
                            <svg width="1.2rem" height="1.2rem" style={{marginTop: "0.7rem", justfifyContent: "center", marginRight: "1rem", marginLeft: "1rem"}} >
                                <image href={dashboardToggle === "Form" ? employee_add : employee_add_unselected} width="100%" height="100%" />
                            </svg>

                            <p style={{marginRight: "1rem", color: dashboardToggle === "Form" ? "rgb(0, 169, 255)" : "rgb(236, 243, 250)", fontWeight: "bold", fontSize: "105%"}}>Add New Employee</p>
                        </button>
                    </div>

                    <div className="singleLeftButton">
                        <button className={dashboardToggle === "List" ? "dashboardButton" : "dashboardButtonUnselected"} onClick={() => setDashboardToggle("List")}>
                            <svg width="1.2rem" height="1.2rem" style={{marginTop: "0.6rem", justfifyContent: "center", marginRight: "1rem", marginLeft: "1rem", backgroundColor: "rgb(236, 243, 250)", borderRadius: "1rem", padding: "0.2rem"}} >
                                <image href={dashboardToggle === "List" ? employee_list : employee_list_unselected} width="100%" height="100%" />
                            </svg>

                            <p style={{marginRight: "1rem", color: dashboardToggle === "List" ? "rgb(0, 169, 255)" : "rgb(236, 243, 250)", fontWeight: "bold", fontSize: "105%"}}>Employees List</p>
                        </button>
                    </div>

                    <div className="singleLeftButton">
                        <button className={dashboardToggle === "Salaries" ? "dashboardButton" : "dashboardButtonUnselected"} onClick={() => setDashboardToggle("Salaries")}>
                            <svg width="1.2rem" height="1.2rem" style={{marginTop: "0.6rem", justfifyContent: "center", marginRight: "1rem", marginLeft: "1rem", backgroundColor: "rgb(236, 243, 250)", borderRadius: "1rem", padding: "0.2rem"}} >
                                <image href={dashboardToggle === "Salaries" ? salaries : salaries_unselected} width="100%" height="100%" />
                            </svg>

                            <p style={{marginRight: "1rem", color: dashboardToggle === "Salaries" ? "rgb(0, 169, 255)" : "rgb(236, 243, 250)", fontWeight: "bold", fontSize: "105%"}}>Employees Salaries</p>
                        </button>
                    </div>

                    <div style={{marginTop: "20rem"}}>
                        <hr style={{backgroundColor: "rgb(236, 243, 250)", height: "0.1rem", width: "80%"}} />

                        <p style={{textAlign: "center", color: "rgb(236, 243, 250)", fontWeight: "bold"}}>Need Help?</p>
                        <p style={{textAlign: "center", color: "rgb(236, 243, 250)", fontWeight: "normal"}}>053 861 1259</p>
                        <p style={{textAlign: "center", color: "rgb(236, 243, 250)", fontWeight: "normal"}}>help@emp4hire.co.za</p>
                    </div>
                </div>

                <div className="Content">
                    {dashboardToggle === "List" && (
                        <>
                    <div style={{marginTop: "2rem"}}>
                        <input placeholder="Search..." 
                                style={{borderRadius: "1rem", padding: "0.6rem", width: "35rem", border: "none", backgroundColor: "rgb(137, 207, 243, 0.3)", textAlign: "left"}}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                value={searchTerm}
                        />
                    </div>

                    <hr style={{backgroundColor: "rgb(236, 243, 250)", height: "0.01rem", width: "100%"}} />

                    <div style={{width: "100%", display: "flex", flexDirection: "row", backgroundColor: "rgb(137, 207, 243, 0.3)", padding: "0.1rem"}}>
                        <svg width="1.2rem" height="1.2rem" style={{marginTop: "1rem", marginLeft: "1rem"}}>
                            <image href={user} width="100%" height="100%" />
                        </svg>

                        <p style={{textAlign: "left", marginLeft: "0.5rem"}}>{totalEmployees()} Employees</p>
                    </div>

                    <div className="List">
                        {isListEdit ? 
                        (
                        <>
                        {employees.map((employee, index) => (
                            <div className="EmpBox" key={index}>
                                {editingIndex === index ?
                                (
                                    <>
                                    <div className="EmpBoxTop">
                                <div style={{position: "relative", marginLeft: "6rem", marginTop: "1rem", display: "flex", flexDirection: "row"}}>
                                    <label htmlFor="imageInput">
                                        <svg width="3.5rem" height="3.5rem" style={{ borderRadius: '100%', border: 'solid', borderColor: 'white', borderWidth: 5 }}>
                                            <image href={user2} width="100%" height="100%" />
                                        </svg>
                                    </label>

                                    <input type="file" accept="image/*" style={{display: "none"}} /*onChange={handleImageChange}*/ id="imageInput" />

                                    <select defaultValue={editEmployable} onChange={(event) => setEditEmployable(event.target.value)} style={{color: "Green", marginTop: "2rem", marginLeft: "-1.5rem", fontWeight: "bold", border: "solid", borderRadius: "3rem", borderWidth: "0.01rem"}}>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Active">Active</option>
                                    </select>
                                </div>

                                <input placeholder={employee.name} value={editName} onChange={(event) => setEditName(event.target.value)} style={{fontWeight: "bolder", textAlign: "center", color: "black", position: "relative", marginTop: "-0.1rem", fontSize: "80%", border: "none", width: "98%"}} />
                                <input placeholder={employee.position} value={editPosition} onChange={(event) => setEditPosition(event.target.value)} style={{textAlign: "center", color: "black", position: "relative", marginTop: "-0.8rem", fontSize: "70%", fontWeight: "bold", border: "none", width: "98%"}} />
                            </div>

                            <div style={{display: "flex", flexDirection: "row", marginTop: "2.8rem", marginLeft: "0.5rem", marginBottom: "1rem"}}>
                                <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={cellphone} width="100%" height="100%" />
                                        </svg>
                                        <input placeholder={employee.number} value={editNumber} onChange={(event) => setEditNumber(event.target.value)} style={{ fontSize: "70%", border: "none", width: "100%", height: "20%", position: "relative", textAlign: "center", marginTop: "0.8rem"}} />
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={location} width="100%" height="100%" />
                                        </svg>
                                        <input placeholder={employee.locationE} value={editLocationE} onChange={(event) => setEditLocationE(event.target.value)} style={{ fontSize: "70%", border: "none", width: "100%", height: "20%", position: "relative", textAlign: "center", marginTop: "0.8rem"}} />
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={calender} width="100%" height="100%" />
                                        </svg>
                                        <input placeholder={employee.workingStarted} value={editWorkingStart} onChange={(event) => setEditWorkingStart(event.target.value)} style={{ fontSize: "70%", border: "none", width: "100%", height: "20%", position: "relative", textAlign: "center", marginTop: "0.8rem"}} />
                                    </div>
                                    
                                </div>

                                <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={email} width="100%" height="100%" />
                                        </svg>
                                        <input placeholder={employee.emailA} value={editEmailA} onChange={(event) => setEditEmailA(event.target.value)} style={{ fontSize: "70%", border: "none", width: "100%", height: "20%", position: "relative", textAlign: "center", marginTop: "0.8rem"}} />
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={employed} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>5 Years 3 Months</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <div style={{display: "flex", flexDirection: "row", marginTop:"0.5rem", marginLeft: "3rem"}}>
                                            <button style={{backgroundColor: "unset", border: "none"}} onClick={(index) => saveEmployeeListInfo(index)}>
                                                <svg width="1.1rem" height="1.5rem">
                                                    <image href={save} width="100%" height="100%" />
                                                </svg>
                                            </button>
                                            

                                            <button style={{border: "none", backgroundColor: "unset"}} onClick={() => handleCancelListEdit()}>
                                                <svg width="1.5rem" height="1.5rem" style={{marginLeft: "1rem"}}>
                                                    <image href={cancel} width="100%" height="100%" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                    <div className="EmpBoxTop">
                                    <div style={{position: "relative", marginLeft: "6rem", marginTop: "1rem", display: "flex", flexDirection: "row"}}>
                                        <svg width="3.5rem" height="3.5rem" style={{borderRadius: "100%", border: "solid", borderColor: "white", borderWidth: 5}}>
                                            <image href={user2} width="100%" height="100%" />
                                        </svg>
    
                                        <p style={{color: "Green", marginTop: "2rem", marginLeft: "-3.5rem", fontWeight: "bold"}}>- {employee.employable} -</p>
                                    </div>
    
                                    <p style={{fontWeight: "bolder", textAlign: "center", color: "black", position: "relative", marginTop: "-0.1rem", fontSize: "80%"}}>{employee.name}</p>
                                    <p style={{textAlign: "center", color: "black", position: "relative", marginTop: "-0.8rem", fontSize: "70%", fontWeight: "bold"}}>{employee.position}</p>
                                </div>
    
                                <div style={{display: "flex", flexDirection: "row", marginTop: "2.5rem", marginLeft: "0.5rem", marginBottom: "1rem"}}>
                                    <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={cellphone} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>{employee.number}</p>
                                        </div>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={location} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>{employee.locationE}</p>
                                        </div>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={calender} width="100%" height="100%" />
                                            </svg>
                                        <p style={{ fontSize: "70%"}}>{employee.workingStarted}</p>
                                        </div>
                                        
                                    </div>
    
                                    <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={email} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>{employee.emailA}</p>
                                        </div>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={employed} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>5 Years 3 Months</p>
                                        </div>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <div style={{display: "flex", flexDirection: "row", marginTop:"0.5rem", marginLeft: "3rem"}}>
                                                <button style={{border: "none", backgroundColor: "unset"}} onClick={() => handleListEdit(index)}>
                                                    <svg width="1.1rem" height="1.5rem">
                                                        <image href={edit} width="100%" height="100%" />
                                                    </svg>
                                                </button>
    
                                                <svg width="1.5rem" height="1.5rem" style={{marginLeft: "1rem"}}>
                                                    <image href={trash} width="100%" height="100%" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    </>
                                )
                                }
                            
                        </div>
                        ))}
                        </>
                        ):
                        (
                            <>
                            {employees.map((employee, index) => (
                                <div className="EmpBox" key={index}>
                                <div className="EmpBoxTop">
                                    <div style={{position: "relative", marginLeft: "6rem", marginTop: "1rem", display: "flex", flexDirection: "row"}}>
                                        <svg width="3.5rem" height="3.5rem" style={{borderRadius: "100%", border: "solid", borderColor: "white", borderWidth: 5}}>
                                            <image href={user2} width="100%" height="100%" />
                                        </svg>
    
                                        <p style={{color: "Green", marginTop: "2rem", marginLeft: "-3.5rem", fontWeight: "bold"}}>- {employee.employable} -</p>
                                    </div>
    
                                    <p style={{fontWeight: "bolder", textAlign: "center", color: "black", position: "relative", marginTop: "-0.1rem", fontSize: "80%"}}>{employee.name}</p>
                                    <p style={{textAlign: "center", color: "black", position: "relative", marginTop: "-0.8rem", fontSize: "70%", fontWeight: "bold"}}>{employee.position}</p>
                                </div>
    
                                <div style={{display: "flex", flexDirection: "row", marginTop: "2.5rem", marginLeft: "0.5rem", marginBottom: "1rem"}}>
                                    <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={cellphone} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>{employee.number}</p>
                                        </div>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={location} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>{employee.locationE}</p>
                                        </div>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={calender} width="100%" height="100%" />
                                            </svg>
                                        <p style={{ fontSize: "70%"}}>{employee.workingStarted}</p>
                                        </div>
                                        
                                    </div>
    
                                    <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={email} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>{employee.emailA}</p>
                                        </div>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={employed} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>5 Years 3 Months</p>
                                        </div>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <div style={{display: "flex", flexDirection: "row", marginTop:"0.5rem", marginLeft: "3rem"}}>
                                                <button style={{border: "none", backgroundColor: "unset"}} onClick={() => handleListEdit(index)}>
                                                    <svg width="1.1rem" height="1.5rem">
                                                        <image href={edit} width="100%" height="100%" />
                                                    </svg>
                                                </button>
    
                                                <svg width="1.5rem" height="1.5rem" style={{marginLeft: "1rem"}}>
                                                    <image href={trash} width="100%" height="100%" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                            </>
                        )}
                    </div>
                    </>
                )}

                { dashboardToggle === "Form" && (
                    <>
                        <div>
                            <h2 style={{color: "rgb(0, 169, 255)", marginLeft: "5rem"}}>Add New Employee</h2>

                            <hr style={{backgroundColor: "rgb(236, 243, 250)", height: "0.01rem", width: "100%"}} />

                            <form className="EmployeeForm">
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <div style={{marginTop: "2rem", display: "flex", flexDirection: "row"}}>
                                        <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Full Name</label>
                                            <input style={{width: "15rem", height: "2rem", borderRadius: "1rem", border: "none", textAlign: "left", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="text"
                                                    maxLength={20}
                                                    placeholder="John Doe"
                                                    value={name}
                                                    onChange={(event) => setName(event.target.value)}
                                            />
                                        </div>

                                        <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Email Address</label>
                                            <input style={{width: "15rem", height: "2rem", borderRadius: "1rem", border: "none", textAlign: "left", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="email"
                                                    placeholder="johndoe@gmail.com"
                                                    value={emailA}
                                                    onChange={(event) => setEmailA(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div style={{marginTop: "2rem", display: "flex", flexDirection: "row"}}>
                                        <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Job Position</label>
                                            <input style={{width: "33rem", height: "2rem", borderRadius: "1rem", border: "none", textAlign: "left", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="text"
                                                    maxLength={50}
                                                    placeholder="Web Developer"
                                                    value={position}
                                                    onChange={(event) => setPosition(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div style={{marginTop: "2rem", display: "flex", flexDirection: "row"}}>
                                        <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Location</label>
                                            <input style={{width: "15rem", height: "2rem", borderRadius: "1rem", border: "none", textAlign: "left", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="text"
                                                    maxLength={50}
                                                    placeholder="Kimberley"
                                                    value={locationE}
                                                    onChange={(event) => setLocationE(event.target.value)}

                                            />
                                        </div>

                                        <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Cell Number</label>
                                            <input style={{width: "15rem", height: "2rem", borderRadius: "1rem", border: "none", textAlign: "left", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="tel"
                                                    placeholder="071 836 9456"
                                                    maxLength={10}
                                                    value={number}
                                                    onChange={(event) => setNumber(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div style={{marginTop: "2rem", display: "flex", flexDirection: "row"}}>
                                        <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Started Working From</label>
                                            <input style={{width: "15rem", height: "2rem", borderRadius: "1rem", border: "none", textAlign: "left", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="date"
                                                    maxLength={10}
                                                    placeholder="10/05/2016"
                                                    value={workingStart}
                                                    onChange={(event) => setWorkingStart(event.target.value)}
                                            />
                                        </div>

                                        <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Employable</label>
                                            <select
                                                    style={{width: "16rem", height: "3rem", padding: "0.5rem", border: "none", borderRadius: "1rem"}}
                                                    onChange={(event) => setEmployable(event.target.value)}
                                            >
                                                <option value="Inactive">Inactive</option>
                                                <option value="Active">Active</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{marginTop: "2rem", display: "flex", flexDirection: "row"}}>
                                        <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Salary Per Annum</label>
                                            <input style={{width: "33rem", height: "2rem", borderRadius: "1rem", border: "none", textAlign: "left", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="number"
                                                    max={999999}
                                                    placeholder="R 350 000"
                                                    value={salary}
                                                    onChange={(event) =>setSalary(event.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row", marginTop: "3rem"}}>
                                        <button className="AddButton"
                                                type="submit"
                                                onClick={addNewEmployee}
                                        >
                                            Add Employee
                                        </button>

                                        <button className="CancelButton"
                                                onClick={cancelClick}
                                                type="button"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                <div style={{display: "flex", flexDirection: "column"}}>

                                    <div style={{marginTop: "2rem", display: "flex", flexDirection: "column"}}>
                                            <div style={{display: "flex", flexDirection: "column", marginRight: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Curriculum Vitae</label>
                                            <input style={{width: "33rem", height: "2rem", borderRadius: "1rem", border: "none", textAlign: "left", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="file"
                                                    value={cv}
                                                    onChange={(event) => setCV(event.target.value)}
                                            />
                                            </div>

                                            <div style={{display: "flex", flexDirection: "column", marginRight: "2rem", marginTop: "2rem"}}>
                                            <label style={{color: "rgb(0, 169, 255)", marginBottom: "0.5rem", marginLeft: "0.5rem"}}>Upload Profile Image</label>
                                            <input style={{width: "15rem", height: "5rem", borderRadius: "1rem", border: "none", textAlign: "center", padding: "0.5rem", fontSize: "90%"}} 
                                                    type="image"
                                                    alt="Profile Picture of Employee"
                                                    value={image}
                                                    onChange={(event) => setImage(event.target.value)}
                                            />
                                            </div>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    </>
                )}

                {dashboardToggle === "Salaries" && (
                        <>
                    <div style={{marginTop: "2rem"}}>
                        <input placeholder="Search..." 
                                style={{borderRadius: "1rem", padding: "0.6rem", width: "35rem", border: "none", backgroundColor: "rgb(137, 207, 243, 0.3)", textAlign: "left"}}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                value={searchTerm}
                        />
                    </div>

                    <hr style={{backgroundColor: "rgb(236, 243, 250)", height: "0.01rem", width: "100%"}} />

                    <div style={{width: "100%", display: "flex", flexDirection: "row", backgroundColor: "rgb(137, 207, 243, 0.3)", padding: "0.1rem"}}>
                            <svg width="1.2rem" height="1.2rem" style={{marginTop: "1rem", marginLeft: "1rem"}}>
                                <image href={user} width="100%" height="100%" />
                            </svg>

                        <p style={{textAlign: "left", marginLeft: "0.5rem"}}>{totalEmployees()} Employees</p>
                    </div>

                    <div className="List">
                        {isSalariesEdit ? 
                        (
                            <>
                               {employees.map((employee, index) => ( 
                                <div className="EmpBox" key={index}>
                                    {editingIndex === index ?
                                    (
                                        <>
                                        <div className="EmpBoxTop">
                                <div style={{position: "relative", marginLeft: "6rem", marginTop: "1rem", display: "flex", flexDirection: "row"}}>
                                    <label htmlFor="imageInput">
                                        <svg width="3.5rem" height="3.5rem" style={{borderRadius: "100%", border: "solid", borderColor: "white", borderWidth: 5}}>
                                            <image href={user5} width="100%" height="100%" />
                                        </svg>
                                    </label>

                                    <input type="file" accept="image/*" style={{display: "none"}} /*onChange={handleImageChange}*/ id="imageInput" />

                                    <select defaultValue={editEmployable} onChange={(event) => setEditEmployable(event.target.value)} style={{color: "Green", marginTop: "2rem", marginLeft: "-1.5rem", fontWeight: "bold", border: "solid", borderRadius: "3rem", borderWidth: "0.01rem"}}>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Active">Active</option>
                                    </select>
                                </div>

                                <input placeholder={employee.name} value={editName} onChange={(event) => setEditName(event.target.value)} style={{fontWeight: "bolder", textAlign: "center", color: "black", position: "relative", marginTop: "-0.1rem", fontSize: "80%", border: "none", width: "98%"}} />
                                
                            </div>

                            <div style={{display: "flex", flexDirection: "row", marginTop: "2rem", marginLeft: "2.5rem"}}>
                                        <svg width="1.8rem" height="1.8rem" style={{marginTop: "0.95rem", marginRight: "0.5rem"}}>
                                            <image href={salaries_unselected} width="100%" height="100%" />
                                        </svg>
                                        <input placeholder={employee.salary} value={editSalary} onChange={(event) => setEditSalary(event.target.value)} style={{ fontSize: "100%", fontWeight: "bold", position: "relative", border: "none", width: "100%", marginLeft: "0.3rem", paddingTop: "0.5rem", height: "60%", marginTop: "0.3rem", textAlign: "left"}} />
                            </div>

                            <div style={{display: "flex", flexDirection: "row", marginTop: "0.01rem", marginLeft: "0.5rem"}}>

                                <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={calender} width="100%" height="100%" />
                                        </svg>
                                        <input placeholder={employee.workingStarted} value={editWorkingStart} onChange={(event) => setEditWorkingStart(event.target.value)} style={{ fontSize: "70%", border: "none", width: "60%", height: "20%", position: "relative", textAlign: "center", marginTop: "0.8rem"}} />
                                    </div>
                                    
                                </div>

                                <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={employed} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>5 Years 3 Months</p>
                                    </div>
                                </div>
                            </div>

                                <div style={{display: "flex", flexDirection: "row", marginLeft: "8.5rem", marginBottom: "0.5rem"}}>
                                            <div style={{display: "flex", flexDirection: "row", marginLeft: "3rem"}}>
                                                <button style={{backgroundColor: "unset", border: "none"}} onClick={() => saveSalariesListInfo(index)}>
                                                    <svg width="1.1rem" height="1.5rem">
                                                        <image href={save} width="100%" height="100%" />
                                                    </svg>
                                                </button>

                                                <button style={{border: "none", backgroundColor: "unset"}} onClick={() => handleCancelSalariesEdit()}>
                                                    <svg width="1.5rem" height="1.5rem" style={{marginLeft: "0.1rem"}}>
                                                        <image href={cancel} width="100%" height="100%" />
                                                    </svg>
                                                </button>
                                            </div>
                                </div>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                        <div className="EmpBoxTop">
                                    <div style={{position: "relative", marginLeft: "6rem", marginTop: "1rem", display: "flex", flexDirection: "row"}}>
                                        <svg width="3.5rem" height="3.5rem" style={{borderRadius: "100%", border: "solid", borderColor: "white", borderWidth: 5}}>
                                            <image href={user2} width="100%" height="100%" />
                                        </svg>
    
                                        <p style={{color: "Green", marginTop: "2rem", marginLeft: "-3.5rem", fontWeight: "bold"}}>- {employee.employable} -</p>
                                    </div>
    
                                    <p style={{fontWeight: "bolder", textAlign: "center", color: "black", position: "relative", marginTop: "-0.1rem", fontSize: "80%"}}>{employee.name}</p>
                                    <p style={{textAlign: "center", color: "black", position: "relative", marginTop: "-0.8rem", fontSize: "70%", fontWeight: "bold"}}>{employee.position}</p>
                                </div>
    
                                <div style={{display: "flex", flexDirection: "row", marginTop: "2rem", marginLeft: "2.5rem"}}>
                                            <svg width="1rem" height="1rem" style={{marginTop: "0.95rem", marginRight: "0.5rem"}}>
                                                <image href={salaries_unselected} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "100%", fontWeight: "bold"}}>R {employee.salary} per annum</p>
                                </div>
    
                                <div style={{display: "flex", flexDirection: "row", marginTop: "0.01rem", marginLeft: "0.5rem"}}>
    
                                    <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={calender} width="100%" height="100%" />
                                            </svg>
                                        <p style={{ fontSize: "70%"}}>{employee.workingStarted}</p>
                                        </div>
                                        
                                    </div>
    
                                    <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={employed} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>5 Years 3 Months</p>
                                        </div>
                                    </div>
                                </div>
    
                                    <div style={{display: "flex", flexDirection: "row", marginLeft: "8.5rem", marginBottom: "0.5rem"}}>
                                                <div style={{display: "flex", flexDirection: "row", marginLeft: "3rem"}}>
                                                    <button style={{border: "none", backgroundColor: "unset"}} onClick={() => handleSalariesEdit(index)}>
                                                        <svg width="1.1rem" height="1.5rem">
                                                            <image href={edit} width="100%" height="100%" />
                                                        </svg>
                                                    </button>
    
                                                    <svg width="1.5rem" height="1.5rem" style={{marginLeft: "1rem"}}>
                                                        <image href={trash} width="100%" height="100%" />
                                                    </svg>
                                                </div>
                                    </div>
                                        </>
                                    )
                                    }
                        </div>
                               ))}
                            </>
                        ):
                        (
                            <>
                            {employees.map((employee, index) => (
                                <div className="EmpBox" key={index}>
                                <div className="EmpBoxTop">
                                    <div style={{position: "relative", marginLeft: "6rem", marginTop: "1rem", display: "flex", flexDirection: "row"}}>
                                        <svg width="3.5rem" height="3.5rem" style={{borderRadius: "100%", border: "solid", borderColor: "white", borderWidth: 5}}>
                                            <image href={user2} width="100%" height="100%" />
                                        </svg>
    
                                        <p style={{color: "Green", marginTop: "2rem", marginLeft: "-3.5rem", fontWeight: "bold"}}>- {employee.employable} -</p>
                                    </div>
    
                                    <p style={{fontWeight: "bolder", textAlign: "center", color: "black", position: "relative", marginTop: "-0.1rem", fontSize: "80%"}}>{employee.name}</p>
                                    <p style={{textAlign: "center", color: "black", position: "relative", marginTop: "-0.8rem", fontSize: "70%", fontWeight: "bold"}}>{employee.position}</p>
                                </div>
    
                                <div style={{display: "flex", flexDirection: "row", marginTop: "2rem", marginLeft: "2.5rem"}}>
                                            <svg width="1rem" height="1rem" style={{marginTop: "0.95rem", marginRight: "0.5rem"}}>
                                                <image href={salaries_unselected} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "100%", fontWeight: "bold"}}>R {employee.salary} per annum</p>
                                </div>
    
                                <div style={{display: "flex", flexDirection: "row", marginTop: "0.01rem", marginLeft: "0.5rem"}}>
    
                                    <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={calender} width="100%" height="100%" />
                                            </svg>
                                        <p style={{ fontSize: "70%"}}>{employee.workingStarted}</p>
                                        </div>
                                        
                                    </div>
    
                                    <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
    
                                        <div style={{display: "flex", flexDirection: "row"}}>
                                            <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                                <image href={employed} width="100%" height="100%" />
                                            </svg>
                                            <p style={{ fontSize: "70%"}}>5 Years 3 Months</p>
                                        </div>
                                    </div>
                                </div>
    
                                    <div style={{display: "flex", flexDirection: "row", marginLeft: "8.5rem", marginBottom: "0.5rem"}}>
                                                <div style={{display: "flex", flexDirection: "row", marginLeft: "3rem"}}>
                                                    <button style={{border: "none", backgroundColor: "unset"}} onClick={() => handleSalariesEdit(index)}>
                                                        <svg width="1.1rem" height="1.5rem">
                                                            <image href={edit} width="100%" height="100%" />
                                                        </svg>
                                                    </button>
    
                                                    <svg width="1.5rem" height="1.5rem" style={{marginLeft: "1rem"}}>
                                                        <image href={trash} width="100%" height="100%" />
                                                    </svg>
                                                </div>
                                    </div>
                            </div>
                            ))}
                            </>
                        )}
                    </div>
                    </>
                )}
                </div>
            </div>
        </div>
    )
};

export default Home;