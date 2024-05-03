// Create web server
// Create a comment API
// Create a comment HTML page
// Create a comment CSS

const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/api/comments', (req, res) => {
    fs.readFile(__dirname + '/data/comments.json', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        res.json(comments);
    });
});

app.post('/api/comments', (req, res) => {
    let comment = req.body;
    fs.readFile(__dirname + '/data/comments.json', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile(__dirname + '/data/comments.json', JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.json(comments);
        });
    });
});

app.get('/comment', (req, res) => {
    fs.readFile(__dirname + '/public/comment.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});