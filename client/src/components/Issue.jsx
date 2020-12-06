/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import edit from "../images/edit.png";
import trash from "../images/trash.png";

function Issue() {

    let { id } = useParams();

    var [issue,setIssue] = useState({title:"", content:"", isopen:true});

    function update() {
        window.location = "/update/"+id;
    }       

    function remove() {
        axios.delete("/issues/delete/"+id);
        window.location = "/";
    }

    useEffect(function() {
        axios.get("/issues/list/"+id) 
            .then(function(response) {
                setIssue(response.data);
            });
    });

    function changeStatus() {
        axios.post("/issues/status/" + id, issue)
            .then(function(response) {
                console.log(response.data);
            });
    }

    return(<div className="container margin post"> 
    <div className="issue-title">
            <div className="title"> {issue.title}</div>
            <div className="status2"> status: {issue.status} </div>
        </div>
        <div className="issue-content"> {issue.content.substring(0,225)} </div>
        <div className="issue-info">
            <div className="status1">
                <span className="one expand" onClick={changeStatus}> Close </span> 
                <span onClick={changeStatus} className="expand"> Open </span> 
            </div>
            <div className="status2">
            <img src={edit} onClick={update} className="one expand"/>
            <img src={trash} onClick={remove} className="one expand"/>
            </div>
        </div>
    </div>);
};

export default Issue;