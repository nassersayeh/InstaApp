import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import Avatar from "../Avatar";
const Info= () =>{
    const {id} = useParams()
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const [userData, setuserData] = useState([])

    useEffect(() => {
        if(id===auth.user._id){
            setuserData(auth.user)
        }
        }
    ,[id,auth.user])


    return(
        <div className="info">
            {
                userData.map(user => (
                    <div className="info_container" key={user._id}>
                    <Avatar src={user.avatar} size="supper-avatar" />
                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{user.username}</h2>
                            <button className="btn btn-outline-info">Edit Profile</button>
                        </div>
                    </div>
                </div>))}</div>)}
    
export default Info