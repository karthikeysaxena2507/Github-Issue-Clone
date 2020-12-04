import React, { useState } from "react";
import axios from "axios";

function Add() {
    var [issue,setIssue] = useState({title:"", content:"", isopen:true});

    function change(event) {
        var {name, value} = event.target;

        setIssue((prevPost) => {
        return {
          ...prevPost,
          [name]: value
        };
      });
    }

    function addIssue(event) {
        event.preventDefault();
        axios.post("/issues/add", issue)
          .then(function(res) { 
            console.log(res.data);
        });
        setIssue({
          title:"", 
          content:"",
          likes:0
        });
        window.location = "/";
    }
    return <div>
    <div className="upper-margin"> <h1> Create Your Issue </h1> </div> 
    <div>
        <textarea
            name="title"
            value={issue.title}
            className="margin"
            placeholder="Title of your Issue"
            rows="1"
            cols="50"
            onChange={change}
            required
        />
     </div>
     <div>
        <textarea
            name="content"
            value={issue.content}
            className="margin"
            placeholder="Content of your Issue"
            rows="5"
            cols="50"
            onChange={change}
            required
        />
     </div>
    <button className="btn btn-dark expand margin" onClick={addIssue}> Create </button> 
    

</div>
};

export default Add;