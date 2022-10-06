const express = require("express");
const Course = require("../mongoose/models/courses");

//setting up the student router
const usersRouter = new express.Router();

//write your code here
usersRouter.post("/courses/enroll/:id", async (req, res) => {
    const course = await Course.findById(req.params.id)
    if(course.isApplied)  res.status(403).json({ error: "You have already applied for this course" })
    
    Course.findByIdAndUpdate(req.params.id, { isApplied: true })
        .then(response => {
            res.status(200).json({ message: "You have successfully enrolled for the course" })
        }).catch(error => {
            res.status(400)
        })
})

usersRouter.delete("/courses/drop/:id", async (req, res) => {
    const course = await Course.findById(req.params.id)
    if(!course.isApplied)  res.status(403).json({ error: "You have not enrolled for this course" })

    Course.findByIdAndUpdate(req.params.id, { isApplied: false })
        .then(response => {
            res.status(200).json({ message: "You have droped the course" })
        }).catch(error => {
            res.status(400)
        })
})

usersRouter.get("/courses/get", (req, res) => {
    Course.find({}).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(400)
    })
})

usersRouter.patch("/courses/rating/:id", async (req, res) => {
    const course = await Course.findById(req.params.id)

    if(!course.isApplied) res.status(403).json({ error: "You have not enrolled for this course" })
    if(course.isRated) res.status(403).json({ error: "You have already rated this course" })

    const newNoOfRatings = course.noOfRatings+1
    const result = ((course.rating*course.noOfRatings)+req.body.rating)/newNoOfRatings

    let rating = Math.round(result * 10) / 10

    Course.findByIdAndUpdate(req.params.id, { 
        noOfRatings: course.noOfRatings+1,
        rating: rating,
        isRated: true
    }).then(response => {
        res.status(200).json({ message: "You have rated this course" })
    }).catch(error => {
        res.status(400)
    })
})

module.exports = usersRouter;
