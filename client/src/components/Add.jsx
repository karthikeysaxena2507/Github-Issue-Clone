import React, { useState } from "react";
import axios from "axios";

const Add = () => {
    var [issue,setIssue] = useState({title:"", content:"", status:"open"});

    const change = (e) => {
        var {name, value} = e.target;
        setIssue((prevIssue) => {
        return {
          ...prevIssue,
          [name]: value
        };
      });
    }

    const addIssue = (e) => {
        e.preventDefault();
        axios.post("/issues/add", issue)
          .then((res) => { 
            console.log(res.data);
        });
        setIssue({
          title:"", 
          content:"",
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