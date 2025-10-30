// Смена темы
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Примеры переменных разных типов
const myName = "Никита";
const birthYear = 1991;
const age = 2025 - birthYear;
const isDarkDefault = false;

// Объект с информацией о себе
const profile = {
    firstName: "Никита",
    lastName: "Батин",
    age: age,
    city: "Москва",
    bio: "Я начинающий веб-разработчик, люблю создавать современные сайты и изучать новые технологии."
};

// Массив с увлечениями
const hobbies = [
    { name: "Программирование", description: "Создание сайтов и приложений" },
    { name: "Чтение", description: "Люблю читать научную литературу и фантастику" },
    { name: "Путешествия", description: "Изучаю новые города и страны" },
    { name: "Музыка", description: "Слушаю и играю на гитаре" },
    { name: "Спорт", description: "Плавание и велосипед" }
];

// Вывод переменных в консоль
console.log("Имя:", myName);
console.log("Год рождения:", birthYear);
console.log("Возраст:", age);
console.log("Темная тема по умолчанию:", isDarkDefault);
console.log("Профиль:", profile);
console.log("Увлечения:", hobbies);

// Плавная прокрутка для навигации
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Загрузка сохраненной темы
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});