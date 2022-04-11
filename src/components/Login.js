import React from "react";
import './Login.css'
import Api from "../Api";

export default () => {
    const handleFacebookLogin = async () => {
        let result = await Api.fbPopup();
        if(result){

        } else {
            alert("Algo deu errado!" );
        }
    }

    return (
        <div className="login">
            <button onClick={handleFacebookLogin}>Logar com Facebook</button>
        </div>
    )
}