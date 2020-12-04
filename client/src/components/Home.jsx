/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import edit from "../images/edit.png";
import trash from "../images/trash.png";


function Home() {

    var [issues,setIssues] = useState([]);

    useEffect(function() {
        axios.get("/issues") 
            .then(function(response) {
                setIssues(response.data);
            });
    });

    function createIssue(props) {

        function update() {
            window.location = "/update/"+props._id;
        }       

        function remove() {
            axios.delete("/issues/delete/"+props._id);
        }

        const link = "/list/"+props._id;
        
        return(<div className="container margin post"> 
        <div className="post-title"> <h2> {props.title} </h2> </div>
        <div className="post-content"> {props.content.substring(0,100)} ...<a href={link}> Read More </a> </div>
        <div className="post-info"> <img src={edit} onClick={update} className="one expand"/> <img src={trash} onClick={remove} className="one expand"/> </div>
        </div>);
    }
        

    return(<div>
    <div>
        <h1> Issues Page </h1>
    </div>
    <div >
    <Link to="/add">
        <button className="btn btn-dark expand margin one" > Create </button> 
    </Link>
    </div>
    <div className="container">
        {issues.reverse().map(createIssue)}
    </div>
    </div>)
};

export default Home;