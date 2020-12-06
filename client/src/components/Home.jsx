/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";
import { Link } from "react-router-dom";
import edit from "../images/edit.png";
import trash from "../images/trash.png";

function Home() {

    let [page, setPage] = useState(1);
    const PER_PAGE = 10;

    var [open,setOpen] = useState(false);
    var [close,setClose] = useState(false);
    var [issues,setIssues] = useState([]);

    useEffect(function() {
        axios.get("/issues") 
            .then(function(response) {
                if(open && !close) {
                    setIssues(response.data.reverse().filter(function(issue) {
                        return (issue.status === "open")
                    }));
                }
                else if(!open && close) {
                    setIssues(response.data.reverse().filter(function(issue) {
                        return (issue.status === "closed")
                    }));
                }
                else {
                    setIssues(response.data.reverse());
                }
            });
    });

    const count = Math.ceil(issues.length / PER_PAGE);
    const _DATA = usePagination(issues, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
      };

    function changeopen() {
        setOpen(!open);
    }

    function changeclose() {
        setClose(!close);
    }


    function createIssue(props, index) {

        function update() {
            window.location = "/update/" + props._id;
        }       

        function remove() {
            axios.delete("/issues/delete/" + props._id);
        }

        function changeStatus1() {
            if(props.status === "open") {
                axios.post("/issues/status/" + props._id, props)
                    .then(function(response) {
                        console.log(response.data);
                    });
            }
        }

        function changeStatus2() {
            if(props.status === "closed") {
                axios.post("/issues/status/" + props._id, props)
                    .then(function(response) {
                        console.log(response.data);
                    });
            }
        }

        if(props.status==="open") {
            var styling2 = {
                color: "blue"
            }
        };

        if(props.status==="closed") {
            var styling1 = {
                color: "blue"
            }
        };

        const link = "/list/"+props._id;
        
        return(<div key={index} className="container margin post"> 
        <div className="issue-title">
            <div className="title"> {props.title}</div>
            <div className="status2"> status: {props.status} </div>
        </div>
        <div className="issue-content"> {props.content.substring(0,225)} ...<a href={link}> Read More </a> </div>
        <div className="issue-info">
            <div className="status1">
                <span className="one expand" style={styling1} onClick={changeStatus1}> Close </span> 
                <span onClick={changeStatus2} style={styling2} className="expand"> Open </span> 
            </div>
            <div className="status2">
            <img src={edit} onClick={update} className="one expand"/>
            <img src={trash} onClick={remove} className="one expand"/>
            </div>
        </div>
        </div>);
    }
        

    return(<div>
    <div>
        <h1> Issues Page </h1>
    </div>
    <div >
    <Link to="/add">
        <button className="btn btn-dark expand margin"> new issue </button> 
    </Link>
    <div className="margin">
        <input type="checkbox" onClick={changeopen}/> <span className="one"> Open Issues </span>
        <input type="checkbox" onClick={changeclose}/> <span className="one"> Closed Issues </span>
    </div>
    </div>
    <div className="container">
        <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
        />

        {_DATA.currentData().map(createIssue)}        

        <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
        />
        <br />
        <br />
    </div>
</div>)
};

export default Home;