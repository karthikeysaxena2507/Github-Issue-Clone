import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Edit() {

    let { id } = useParams();

    var [title,setTitle] = useState("");
    var [content,setContent] = useState("");

    useEffect(function() {
        axios.get("/issues/list/"+id) 
            .then(function(response) {
                setTitle(response.data.title);
                setContent(response.data.content);
        });
    });

    var [issue,setIssue] = useState({Title:title, Content:content});

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

        const newissue = {
            title: issue.Title,
            content: issue.Content
        }

        axios.post("/issues/update/"+id, newissue)
            .then(function(response) {
                console.log("post updated");
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
        <button className="btn btn-dark expand margin" onClick={editIssue}> Edit </button> 
    </div>);
};

export default Edit;