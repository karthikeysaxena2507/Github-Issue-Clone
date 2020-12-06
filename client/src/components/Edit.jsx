import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Edit() {

    let { id } = useParams();

    var [issue,setIssue] = useState({title:"", content:""});

    function change(event) {

        var {name, value} = event.target;

        setIssue((prevIssue) => {
        return {
          ...prevIssue,
          [name]: value
        };
      });

    }

    function editIssue() {

        axios.post("/issues/update/"+id,issue)
            .then(function(response) {
                console.log(response.data);
            });
        window.location = "/";
    }

    return (<div>
    <div>
        <h2> Create a new issue </h2>
    </div>
    <div className="upper-margin"> <h1> Edit Issue </h1> </div> 
    <div>
        <textarea
            name="title"
            value={issue.title}
            className="margin"
            placeholder="New Title of your Issue"
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
            placeholder="New Content of your Issue"
            rows="5"
            cols="50"
            onChange={change}
            required
        />
     </div>
        <button className="btn btn-dark expand margin" onClick={editIssue}> Edit </button> 
    </div>);
};

export default Edit;