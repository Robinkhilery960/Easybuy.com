import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
    const { activationToken } = useParams();
    const [error, setError] = useState(false);

    const activationEmail = async () => {
        if (activationToken) {
            try {
                const res = await axios.post(`${server}/shop/activation`, { activationToken })
                console.log("res", res)
                // navigate("/login")
            } catch (error) {
                console.log(error.response.data.message)
                setError(true)
            }
        }
    }


    useEffect(() => {
        activationEmail()
    }, []);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {error ? (
                <p>Your token is expired!</p>
            ) : (
                <p>Your account has been created suceessfully!</p>
            )}
        </div>
    );
};

export default SellerActivationPage;
