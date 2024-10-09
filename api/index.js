import express from "express";
import fs from "fs";
import cors from "cors"


const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream it. Wish it. Do it.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Success doesn’t just find you. You have to go out and get it."
];




const app = express();

// Використовуємо CORS для всіх маршрутів
app.use(cors());
app.use(express.json());

// Вивід всіх задач
app.get('/getTasks', function (req, res) {
    const data = fs.readFileSync('tasks.json', 'utf8');
    res.send(data)
})


// Добавлення задачі
app.post("/postTask", function (req, res) {
    /**
     * Отримуємо дані з сайту
     */
    const { task } = req.body;

    /**
     * Працюмєо файл
     */
    // 1. отримаємо всі задачі з бд
    const data = fs.readFileSync('tasks.json', 'utf8');

    // 2. Перетворити файл джейсон в обєкт
    const tasks = JSON.parse(data)

    // 3. Додаємо нову задачу в файл
    tasks.push(task)

    // 4. зберегти файл
    fs.writeFileSync("tasks.json", JSON.stringify(tasks))
})

// Видали задачі
app.delete('/deleteMySuperTaskFromMyBd', function (request, response) {
    const delpos = request.body.delpos;
    //отримаємо всі задачі і зберігаємо в змінну
    const data = fs.readFileSync("tasks.json", "utf-8")
    //перетворити файл в обєкт і зберігаємо в змінну
    const tasks = JSON.parse(data)
    // видаляємо задачу з файла
    tasks.splice(delpos, 1)
    // перезаписати файл і перетворити йому дані в стрінг
    fs.writeFileSync("tasks.json", JSON.stringify(tasks))
})

// Посилання для отримання цитати
app.get('/getQuote', function (request, response) {

    // ???
})


app.listen(5500, () => {
    console.log("server runs");
})
