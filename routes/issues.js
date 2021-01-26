const router = require("express").Router();
let Issue = require("../models/issue.model");

// LISTING ALL ISSUES
router.get("/", async(req, res, next) => {
    try {
        const issues = await Issue.find({});
        res.json(issues);
    }
    catch(error) {
        res.json(next(error));
    }
});

// ADDING AN ISSUE
router.post("/add", async(req, res, next) => {
    try {
        const issue = await new Issue({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status
        });
        issue.save()
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            res.json(error);
        })
    }
    catch(error) {
        res.json(error);
    }
});

// DELETING AN ISSUE
router.delete("/delete/:id", async(req, res, next) => {
    try {
        const issue = await Issue.deleteOne({_id: req.params.id});
        const issues = await Issue.find({});
        res.json(issues);
    }
    catch(error) {
        res.json(next(error));
    }
});

// GETTING A PARTICULAR ISSUE
router.get("/list/:id", async(req, res, next) => {
    try {
        const issue = await Issue.findOne({_id: req.params.id});
        res.json(issue);
    }
    catch(error) {
        res.json(error);
    }
});

// UPDATING AN ISSUE
router.post("/update/:id", async(req, res, next) => {
    try {
        const issue = await Issue.findOne({_id:req.params.id});
        issue.title = req.body.title;
        issue.content = req.body.content;
        issue.status = req.body.status;
        issue.save()
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            res.json(error);
        });
    } 
    catch(error) {
        res.json(next(error));
    }
});

// CHANGING STATUS OF ISSUE
router.post("/status/:id", async(req, res, next) => {
    try {
        const issue = await Issue.findOne({_id:req.params.id});
        if(req.body.status === "closed") {
            issue.status = "open";
        }
        else if(req.body.status === "open") {
            issue.status = "closed";
        }
        issue.save()
        .then(async() => {
            if(req.body.single) {
                res.json(issue);
            }
            else {
                const issues = await Issue.find({});
                res.json(issues);
            }
        })
        .catch((err) => {
            res.json(err);
        })
        
    }
    catch(error) {
        res.json(next(error));
    }
});

module.exports = router;