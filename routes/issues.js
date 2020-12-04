const router = require("express").Router();
let Issue = require("../models/issue.model");

// listing all issues
router.route("/").get(function(req, res) {
    Issue.find({}, function(err, issues) {
        if(err) {
            res.status(400).json("Error: " + err);
        }
        else {
            res.json(issues);
        }
    });
});

// adding issues
router.route("/add").post(function(req, res) {
    const issue = new Issue({
        title: req.body.title,
        content: req.body.content,
        isopen: req.body.isopen
    });
    console.log(issue);

    issue.save(function(err) {
        if(err) {
            res.status(400).json("Error: " + err);
        }
        else {
            res.json("issue added");
        }
    });
});

// deleting a issue
router.route("/delete/:id").delete(function(req, res) {
    Issue.deleteOne({_id: req.params.id}, function(err) {
        if(err) {
            res.status(400).json("Error: " + err);
        }
        else {
            res.json("issue deleted");
        }
    });
});

// listing a particular issue
router.route("/list/:id").get(function(req, res) {
    Issue.findOne({_id: req.params.id}, function(err, issue) {
        if(err) {
            res.status(400).json("Error: " + err);
        }
        else {
            res.json(issue);
        }
    });
});

// updating an issue
router.route("/update/:id").post(function(req, res) { 
    Issue.findOne({_id:req.params.id}, function(err, issue) {
        issue.title = req.body.title;
        issue.content = req.body.content;
        issue.save(function(err) {
            if(err) {
                res.status(400).json("Error: " + err);
            }
            else {
                res.json("issue updated");
            }    
        });
    });
});

module.exports = router;