import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarTeam from "../Navbar/NavbarTeam";
import Footer from "./Footer";
import '../../../pages/Recruiting2324/Details.css'
const Newsletter = () => {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        document.title = "Newsletter Responses ECELL | NITS";
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.trim() === "") {
            setError("Please enter the password.");
            return;
        }

        if (password === process.env.REACT_APP_PWD_NEWSLETTER) {
            try {
                setLoading(true);
                // const response = await axios.get('http://localhost:3001/getnewsletters');
                const response = await axios.get(process.env.REACT_APP_GET_NEWSLETTER);
                setListOfUsers(response.data);
                setLoggedIn(true);
            } catch (error) {
                console.log("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setPassword("");
            setError("Wrong password. Access denied.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return (
            <div>
                <NavbarTeam />
                <div className="topdetailsre">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                            className='input-common-recruit halfinptdtls'
                        />
                        <button type="submit" className='submtformrecuit'>Submit</button>
                    </form>
                    {error && <div>{error}</div>}
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <>
            {listOfUsers.map((user) => (
                <div >
                    <div key={user.id} >
                        <h1>email: <span style={{ color: "red" }}>{user.email}</span> </h1>
                        <hr />
                    </div>
                </div>

            ))}
            <Footer />
        </>
    );
};

export default Newsletter;
