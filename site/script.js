// Отримуємо доступ до елементів DOM
const taskInput = document.getElementById('taskInput'); // Поле вводу
const taskAdd = document.getElementById('taskAdd'); // Кнопка додавання
const tasksList = document.getElementById('tasksList'); // Список задач

// функція отримання даних по посиланню
async function getData(url) {
    const res = await fetch(url);
    return await res.json()
}

// створимо массив для списку задач
const mylist = await getData('http://localhost:5500/getTasks');

// виводимо збережені задачі массива
mylist.forEach((element, position) => {
    tasksList.innerHTML += `<li>${element} <button class='delete' data-delete-id="${position}">&#10006</button></li>`
});

// Функція для додавання нової задачі
function addTask() {
    const taskName = taskInput.value.trim(); // Отримуємо назву задачі з поля вводу

    if (taskName === "") return; // Якщо поле пусте, не додаємо задачу

    // Створюємо новий елемент списку в массиві
    if (mylist.includes(taskName) == true) {

        // оповіщаємо користувача, що завданн вже є
        alert('Task exist!');
    } else {

        // Об'єкт задачі
        const taskObj = {
            task: taskName
        }

        // додаємо задачу до массива
        fetch('http://localhost:5500/postTask', {
            method: 'POST',
            body: JSON.stringify(taskObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // вносимо задачу в список на екрані
        tasksList.innerHTML += `<li>${taskName} <button class='delete'>&#10006</button></li>`
    }

    // Очищуємо поле вводу після додавання
    taskInput.value = '';

    // зберігаємо в локал сторадж
    localStorage.setItem("todoes", JSON.stringify(mylist));
}

// Слухаємо подію кліку на кнопку додавання
taskAdd.addEventListener('click', addTask);

// Також можна додавати задачу по натисканню Enter у полі вводу
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// вішаємо подію кліка на кнопку видалення
tasksList.addEventListener("click", deleteitem)

// функція видалення рядка
function deleteitem(element) {

    //дістаємо дату артибут елемента по якому клікнули і зберігаємо в змінну
    const delpos = element.target.getAttribute("data-delete-id");

    //виконуємо це тільки для кнопки делете
    if (delpos !== null) {

        // видаляємо задачу з массива
        fetch('http://localhost:5500/deleteMySuperTaskFromMyBd', {
            method: "DELETE",
            body: JSON.stringify({ delpos: delpos }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // очищуємо елементи 
        tasksList.innerHTML = ""

        // Виводимо задачі на екран
        mylist.forEach((element, position) => {
            tasksList.innerHTML += `<li>${element} <button class='delete' data-delete-id="${position}">&#10006</button></li>`
        });

        // зберігаємо в локал сторадж
        localStorage.setItem("todoes", JSON.stringify(mylist));
    }
}


