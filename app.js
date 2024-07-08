const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://yash0238:<password>@yash0238.bfaj6t9.mongodb.net/?retryWrites=true&w=majority&appName=Yash0238', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Schema and Model for Blog Post
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    created: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming CSS and JS files are in 'public' folder

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            console.log(err);
        } else {
            res.json(posts);
        }
    });
});

app.post('/posts', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content
    });

    newPost.save()
        .then(() => {
            console.log('New post created');
            res.send('Post created successfully!');
        })
        .catch(err => console.log(err));
});

// Server listening
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
