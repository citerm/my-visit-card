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

// Приветствие по времени суток
function getGreetingMessage() {
    const hour = new Date().getHours();
    if (hour < 12) return "Доброе утро";
    else if (hour < 18) return "Добрый день";
    else return "Добрый вечер";
}

// Форматирование даты и времени
function formatDateTime(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`;
}

// Класс для демонстрации
class Person {
    constructor(firstName, lastName, birthYear, city, bio) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.city = city;
        this.bio = bio;
    }
    getAge() {
        return new Date().getFullYear() - this.birthYear;
    }
    getInfo() {
        return `Имя: ${this.firstName} ${this.lastName}, город: ${this.city}. Мне ${this.getAge()} лет. ${this.bio}`;
    }
}

// Создание экземпляра класса
const me = new Person("Никита", "Батин", 1991, "Москва", "Я начинающий веб-разработчик, люблю создавать современные сайты и изучать новые технологии.");

// Обновление приветствия
function updateGreeting(name) {
    const greeting = getGreetingMessage();
    const greetingText = name ? `${greeting}, ${name}!` : `${greeting}, посетитель!`;
    document.getElementById('greeting').textContent = greetingText;
    document.getElementById('visitor-greeting').textContent = name
        ? `Привет, ${name}! Добро пожаловать на мой сайт.`
        : '';
}

// Заполнение разделов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Тема
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Приветствие
    const greeting = getGreetingMessage();
    const greetingText = `${greeting}, посетитель!`;
    document.getElementById('greeting').textContent = greetingText;

    // Интерактив: приветствие посетителя
    const visitorForm = document.getElementById('visitor-form');
    const visitorGreeting = document.getElementById('visitor-greeting');
    visitorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('visitor-name').value.trim();
        if (name) {
            const greetingText = `${getGreetingMessage()}, ${name}!`;
            document.getElementById('greeting').textContent = greetingText;
            visitorGreeting.textContent = `Привет, ${name}! Добро пожаловать на мой сайт.`;
        } else {
            const greetingText = `${getGreetingMessage()}, посетитель!`;
            document.getElementById('greeting').textContent = greetingText;
            visitorGreeting.textContent = '';
        }
    });

    // Кнопка удаления последнего увлечения
    const removeHobbyBtn = document.getElementById('removeHobbyBtn');
    if (removeHobbyBtn) {
        removeHobbyBtn.addEventListener('click', () => {
            const list = document.getElementById('hobbyList');
            if (list && list.lastElementChild) {
                list.removeChild(list.lastElementChild);
                // Если список стал пустым, показать заглушку
                if (!list.hasChildNodes()) {
                    const hobbyPlaceholder = document.getElementById('hobby-placeholder');
                    if (hobbyPlaceholder) hobbyPlaceholder.style.display = 'block';
                }
            }
        });
    }

    // Очистка поля ввода имени после вывода приветствия
    const userNameInput = document.getElementById('userNameInput');
    const saveNameBtn = document.getElementById('saveNameBtn');
    function handleNameInput() {
        const name = userNameInput.value.trim();
        updateGreeting(name);
        userNameInput.value = ""; // очистить поле после сохранения
    }
    if (saveNameBtn && userNameInput) {
        saveNameBtn.addEventListener('click', handleNameInput);
        userNameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleNameInput();
            }
        });
    }

    // Заполнение раздела "О себе" с использованием класса
    const aboutEl = document.getElementById('about-me-text');
    if (aboutEl) {
        aboutEl.textContent = me.getInfo();
    }

    // Заполнение списка увлечений
    const hobbyList = document.getElementById('hobbyList');
    const hobbyPlaceholder = document.getElementById('hobby-placeholder');
    if (hobbyList && hobbies.length > 0) {
        hobbyList.innerHTML = '';
        hobbies.forEach(hobby => {
            const li = document.createElement('li');
            li.textContent = `${hobby.name} — ${hobby.description}`;
            hobbyList.appendChild(li);
        });
        if (hobbyPlaceholder) hobbyPlaceholder.style.display = 'none';
    }

    // Текущая дата и время в футере
    const currentDateSpan = document.getElementById('currentDate');
    const now = new Date();
    currentDateSpan.textContent = formatDateTime(now);

    // Эффект при наведении на фото
    const photo = document.getElementById('profile-photo');
    if (photo) {
        photo.addEventListener('mouseover', () => {
            photo.style.opacity = '0.7';
            photo.style.boxShadow = '0 0 16px 4px var(--primary-color)';
        });
        photo.addEventListener('mouseout', () => {
            photo.style.opacity = '1';
            photo.style.boxShadow = '';
        });
    }

    // Эффект при наведении на элементы списка увлечений
    if (hobbyList) {
        hobbyList.querySelectorAll('li').forEach(li => {
            li.addEventListener('mouseover', () => {
                li.style.background = 'var(--primary-color)';
                li.style.color = '#fff';
            });
            li.addEventListener('mouseout', () => {
                li.style.background = '';
                li.style.color = '';
            });
        });
    }
});