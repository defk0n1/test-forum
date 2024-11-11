import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase.js"; // Import the Firestore instance

const RegistrationForm = (props) => {
    const [email, setEmail] = useState("");
    const [university, setUniversity] = useState("");
    const [name, setName] = useState("");
    const [attendedSupCom, setAttendedSupCom] = useState("no");
    const [graduationYear, setGraduationYear] = useState("");
    const [additionalEmail, setAdditionalEmail] = useState("");
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://supcomje.in/forumdb/api/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" // Added Content-Type header
                },
                body: JSON.stringify({
                    email,
                    university,
                    name,
                    attendedSupCom,
                    graduationYear: attendedSupCom ? graduationYear : null,
                    additionalEmail: attendedSupCom ? additionalEmail : null,
                })
            });
            await addDoc(collection(db, "registrations"), {
                email,
                university,
                name,
                attendedSupCom,
                graduationYear: attendedSupCom ? graduationYear : null,
                additionalEmail: attendedSupCom ? additionalEmail : null,
                createdAt: Timestamp.fromDate(new Date())
            });
            setStatus("Registration successful!");
            setEmail("");
            setUniversity("");
            setName("");
            setAttendedSupCom(null);
            setGraduationYear("");
            setAdditionalEmail("");
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus("Registration failed.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Registration</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>University:</label>
                    <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
              
                <div style={styles.formGroup}>
                    <label style={styles.label}>Did you graduate from Sup'Com?</label>
                    <select
                        value={attendedSupCom}
                        onChange={(e) => setAttendedSupCom(e.target.value)}
                        required
                        style={styles.select}
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {attendedSupCom == "yes" && (
                    <>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Year of Graduation:</label>
                            <input
                                type="number"
                                value={graduationYear}
                                onChange={(e) => setGraduationYear(e.target.value)}
                                required
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Additional Email Address:</label>
                            <input
                                type="email"
                                value={additionalEmail}
                                onChange={(e) => setAdditionalEmail(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </>
                )}

                <button type="submit" style={styles.button}>Register</button>
                <button onClick={props.close} style={styles.closeButton}>Close</button>

            </form>
            {status && <p style={styles.status}>{status}</p>}
        </div>
    );
};

const styles = {

    container: {
        backgroundColor: "#1e3a8a", // Light blue
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily:"Overpass",
        // overflowY:"scroll",
        maxHeight:"100vh",
        
        zIndex:"999999999"
    },
    header: {
        color:"#62EFFE", // Blue
        textAlign: "center",
        marginBottom: "20px"
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    formGroup: {
        marginBottom: "15px"
    },
    label: {
        color: "#FFFFFF",
        fontWeight: "bold",
        // marginBottom: "5px",
        display: "block"
    },
    input: {
        padding: "8px 0",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #1e3a8a",
        outlineColor: "#ffd700",
        width:"100%" // Gold
        
    },
    select: {
        padding: "4px",
        fontSize: "16px",
        borderRadius: "4px",
        border: "1px solid #1e3a8a",
        outlineColor: "#ffd700" // Gold
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#62EFFE",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    buttonHover: {
        backgroundColor: "#003366"
    },
    status: {
        marginTop: "20px",
        textAlign: "center",
        color: "#ffd700", // Gold
        fontWeight: "bold"
    },
    closeButton: {
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "black",
        color: "#ffffff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        marginTop: "10px"
    },

};

export default RegistrationForm;
