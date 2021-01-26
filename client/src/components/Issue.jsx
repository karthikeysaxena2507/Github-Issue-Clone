/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import edit from "../images/edit.png";
import trash from "../images/trash.png";

const Issue = () => {

    let { id } = useParams();

    var [issue,setIssue] = useState({});

    useEffect(function() {
        axios.get("/issues/list/"+id) 
            .then(function(response) {
                setIssue({
                    title: response.data.title,
                    content: response.data.content,
                    status: response.data.status,
                    single: true
                });
            });
    },[id]);

    const remove = async() => {
        await axios.delete(`/issues/delete/${id}`);
        window.location = "/";
    }
    
    const changeStatus = async(e) => {
        if(e.target.innerText === "Open" && issue.status === "closed") {
            const response = await axios.post(`/issues/status/${id}`, issue);
            setIssue({
                title: response.data.title,
                content: response.data.content,
                status: response.data.status,
                single: true
            });
        }
        else if(e.target.innerText === "Close" && issue.status === "open") {
            const response = await axios.post(`/issues/status/${id}`, issue);
            setIssue({
                title: response.data.title,
                content: response.data.content,
                status: response.data.status,
                single: true
            });
        }
    }
    
    return(<div className="container margin post"> 
    <div className="issue-title">
        <div className="title"> {issue.title}</div>
        <div className="status2"> status: {issue.status} </div>
    </div>
    <div className="issue-content"> {issue.content} </div>
    <div className="issue-info">
        <div className="status1">
            <span className="one expand" style={(issue.status === "closed") ? {color: "blue"} : null} onClick={changeStatus}> Close </span> 
            <span onClick={changeStatus} style={(issue.status === "open") ? {color: "blue"} : null} className="expand"> Open </span> 
        </div>
        <div className="status2">
        <img src={edit} onClick={() => {window.location = `/update/${issue._id}`}} className="one expand"/>
        <img src={trash} onClick={remove} className="one expand"/>
        </div>
    </div>
    </div>);
};

export default Issue;