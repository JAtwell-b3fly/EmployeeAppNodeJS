import React, {useState} from "react";

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

const Home = () => {

    //Function to store the search term
    const [searchTerm, setSearchTerm] = useState("");

    //Function to toggle between the Employee Form and the Employee List
    const [dashboardToggle, setDashboardToggle] = useState("");

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

                        <p style={{textAlign: "left", marginLeft: "0.5rem"}}>250 Employees</p>
                    </div>

                    <div className="List">
                        <div className="EmpBox">
                            <div className="EmpBoxTop">
                                <div style={{position: "relative", marginLeft: "6rem", marginTop: "1rem"}}>
                                    <svg width="3.5rem" height="3.5rem" style={{borderRadius: "100%", border: "solid", borderColor: "white", borderWidth: 5}}>
                                        <image href={user2} width="100%" height="100%" />
                                    </svg>
                                </div>

                                <p style={{fontWeight: "bolder", textAlign: "center", color: "black", position: "relative", marginTop: "-0.1rem", fontSize: "80%"}}>John Doe</p>
                                <p style={{textAlign: "center", color: "black", position: "relative", marginTop: "-0.8rem", fontSize: "70%", fontWeight: "bold"}}>Web Developer</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "row", marginTop: "2.5rem", marginLeft: "0.5rem", marginBottom: "1rem"}}>
                                <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={cellphone} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>071 826 4826</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={location} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>Kimberley</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={calender} width="100%" height="100%" />
                                        </svg>
                                    <p style={{ fontSize: "70%"}}>20/05/2016</p>
                                    </div>
                                    
                                </div>

                                <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={profile} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>John Doe</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={email} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>johndoe@gmail.com</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={employed} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>5 Years 3 Months</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="EmpBox">
                            <div className="EmpBoxTop">
                                <div style={{position: "relative", marginLeft: "6rem", marginTop: "1rem"}}>
                                    <svg width="3.5rem" height="3.5rem" style={{borderRadius: "100%", border: "solid", borderColor: "white", borderWidth: 5}}>
                                        <image href={user5} width="100%" height="100%" />
                                    </svg>
                                </div>

                                <p style={{fontWeight: "bolder", textAlign: "center", color: "black", position: "relative", marginTop: "-0.1rem", fontSize: "80%"}}>John Doe</p>
                                <p style={{textAlign: "center", color: "black", position: "relative", marginTop: "-0.8rem", fontSize: "70%", fontWeight: "bold"}}>Web Developer</p>
                            </div>

                            <div style={{display: "flex", flexDirection: "row", marginTop: "2.5rem", marginLeft: "0.5rem", marginBottom: "1rem"}}>
                                <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={cellphone} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>071 826 4826</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={location} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>Kimberley</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={calender} width="100%" height="100%" />
                                        </svg>
                                    <p style={{ fontSize: "70%"}}>20/05/2016</p>
                                    </div>
                                    
                                </div>

                                <div style={{marginLeft: "0.5rem", textAlign: "left", marginRight: "0.5rem", width: "50%"}}>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={profile} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>John Doe</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={email} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>johndoe@gmail.com</p>
                                    </div>

                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="0.8rem" height="0.8rem" style={{marginTop: "0.75rem", marginRight: "0.5rem"}}>
                                            <image href={employed} width="100%" height="100%" />
                                        </svg>
                                        <p style={{ fontSize: "70%"}}>5 Years 3 Months</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}

                { dashboardToggle === "Form" && (
                    <>
                        <div>

                        </div>
                    </>
                )}
                </div>
            </div>
        </div>
    )
};

export default Home;