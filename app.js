const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const PORT = 3000;

// Инициализация пустого массива постов
let posts = [];

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const theme = req.cookies.theme || 'light';
    res.render('index', { theme });
});

app.get('/blog', (req, res) => {
    const theme = req.cookies.theme || 'light';
    res.render('blog', { theme });
});

app.post('/theme', (req, res) => {
    res.cookie('theme', req.body.theme, { maxAge: 900000 });
    res.sendStatus(200);
});

// API: получить список постов (только из памяти)
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// API: создать новый пост (добавляет в память)
app.post('/api/posts', express.json(), (req, res) => {
    const { author, text } = req.body;
    if (author && text) {
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        posts.push({ id, author, text });
        res.status(200).json({ message: 'Пост успешно создан' });
    } else {
        res.status(400).json({ message: 'author и text обязательны' });
    }
});

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;