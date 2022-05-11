import React from "react"
import { IUser } from "../../types/user"
import UserPNG from "../../assets/img/user.png"
import "../../styles/user.scss"

const User: React.FC<IUser> = ({ name }) => {
    return (
        <div className="user">
            <div>
                <img src={UserPNG} alt="user"/>
            </div>
            <h6>{name}</h6>
        </div>
    )
}

export default User