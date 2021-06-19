const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
uuid();

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }))

let comments = [
    {   id: uuid(),
        username: "Paula",
        comment: "JavaScript is quite a powerful language!"
    },
    {   id: uuid(),
        username: "Jeff",
        comment: "It's client-server capabilities are wooh.."
    },
    {   id: uuid(),
        username: "Ken",
        comment: "The async and modular codes are amazing!"
    }
]
//Lists/displays all the comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

// Renders the form for new comments
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

// Posts new comments to the server & lists in the index
app.post('/comments', (req, res) => {
    const {username, comment } = req.body;
    comments.push({ username, comment, id: uuid()})
    res.redirect('/comments') 
})

//Shows info about one particular comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
})

//uses a form to edit a comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', {comment})
})

//Updates one particular comment 
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id)
    foundComment.comment = newCommentText
    res.redirect('/comments')
})

//Deletes specific item on server
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments')
})

//Retrieves info about burger from the server
app.get('/burger', (req, res) => {
    const { meat, qty } = req.query;
    res.send(`Well, I got ${qty} ${meat} burgers`)
})

// Posts infor about burger to the server
app.post('/burger', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Okay, here are your ${qty} ${meat} burgers`)
})
//Runs the server on port 3000
app.listen(3000, () => {
    console.log("Listening on Port 3000")
})