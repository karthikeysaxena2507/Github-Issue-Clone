/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";
import { Link } from "react-router-dom";
import edit from "../images/edit.png";
import trash from "../images/trash.png";

const Home = () => {

    let [page, setPage] = useState(1);
    const PER_PAGE = 10;
    var [issues,setIssues] = useState([]);
    var [open, setOpen] = useState(false);
    var [close, setClose] = useState(false);

    useEffect(() => {
        const fetch = async() => {
            try {
                const response = await axios.get("/issues");
                if(open && !close) {
                    setIssues(response.data.reverse().filter((issue) => {
                        return (issue.status === "open");
                    }));
                }
                else if(!open && close) {
                    setIssues(response.data.reverse().filter((issue) => {
                        return (issue.status === "closed");
                    }));
                }
                else {
                    setIssues(response.data.reverse());
                }
            }
            catch(error) {
                console.log(error);
            }
        }
        fetch();
    },[close, open]);

    const count = Math.ceil(issues.length / PER_PAGE);
    const _DATA = usePagination(issues, PER_PAGE);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const createIssue = (props, index) => {    

        const remove = async() => {
            const response = await axios.delete(`/issues/delete/${props._id}`);
            if(open && !close) {
                setIssues(response.data.reverse().filter((issue) => {
                    return (issue.status === "open");
                }));
            }
            else if(!open && close) {
                setIssues(response.data.reverse().filter((issue) => {
                    return (issue.status === "closed");
                }));
            }
            else {
                setIssues(response.data.reverse());
            }
        }

        const changeStatus = async(e) => {
            if(e.target.innerText === "Open" && props.status === "closed") {
                var response = await axios.post(`/issues/status/${props._id}`, props);
            }
            else if(e.target.innerText === "Close" && props.status === "open") {
                response = await axios.post(`/issues/status/${props._id}`, props);
            }
            if(open && !close) {
                setIssues(response.data.reverse().filter((issue) => {
                    return (issue.status === "open");
                }));
            }
            else if(!open && close) {
                setIssues(response.data.reverse().filter((issue) => {
                    return (issue.status === "closed");
                }));
            }
            else {
                setIssues(response.data.reverse());
            }
        }

        const link = `/list/${props._id}`;
        
        return(<div key={index} className="container margin post"> 
        <div className="issue-title">
            <div className="title"> {props.title}</div>
            <div className="status2"> status: {props.status} </div>
        </div>
        <div className="issue-content"> {props.content.substring(0,225)} ...<a href={link}> Read More </a> </div>
        <div className="issue-info">
            <div className="status1">
                <span className="one expand" style={(props.status === "closed") ? {color: "blue"} : null} onClick={changeStatus}> Close </span> 
                <span onClick={changeStatus} style={(props.status === "open") ? {color: "blue"} : null} className="expand"> Open </span> 
            </div>
            <div className="status2">
            <img src={edit} onClick={() => {window.location = `/update/${props._id}`}} className="one expand"/>
            <img src={trash} onClick={remove} className="one expand"/>
            </div>
        </div>
        </div>);
    }
        
    const filterIssues = (e) => {
        console.log(open, close);
        if(e.target.name === "open") setOpen(!open);
        else setClose(!close);
    }

    return(<div>
    <div>
        <h1> Issues Page </h1>
    </div>
    <div >
    <Link to="/add">
        <button className="btn btn-dark expand margin"> New Issue </button> 
    </Link>
    <div className="margin">
        <input type="checkbox" onClick={filterIssues} name="open"/> <span className="one"> Open Issues </span>
        <input type="checkbox" onClick={filterIssues} name="close"/> <span className="one"> Closed Issues </span>
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