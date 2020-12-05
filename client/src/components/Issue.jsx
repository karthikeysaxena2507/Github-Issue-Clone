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
    <div className="post-title"> <h2> {issue.title} </h2> </div>
    <div className="post-content"> {issue.content} </div>
    <div className="post-info">
            <div className="status1">
                <span className="one expand" onClick={changeStatus} > Close </span> 
                <span onClick={changeStatus} className="expand"> Open </span> 
            </div>
            <img src={edit} onClick={update} className="one expand"/>
            <img src={trash} onClick={remove} className="one expand"/>
            <div className="status2">
                <p> {issue.status} </p>
            </div>
        </div>
    </div>);
};

export default Issue;