// Данные о турах
const tours = [
    {
        id: 1,
        title: "Обзорная экскурсия по Москве",
        description: "Увлекательная прогулка по центру Москвы. Посетим Красную площадь, Александровский сад, храм Христа Спасителя. Узнаем историю города и его главные секреты.",
        price: 1500,
        duration: "3 часа",
        location: "Москва",
        maxPeople: 20,
        availableSeats: 15,
        date: "2026-04-15T10:00:00",
        imageIcon: "fa-city"
    },
    {
        id: 2,
        title: "Эрмитаж - сокровища России",
        description: "Экскурсия по одному из величайших музеев мира. Шедевры живописи, скульптуры и прикладного искусства.",
        price: 2000,
        duration: "2 часа",
        location: "Санкт-Петербург",
        maxPeople: 10,
        availableSeats: 8,
        date: "2026-04-16T11:00:00",
        imageIcon: "fa-museum"
    },
    {
        id: 3,
        title: "Казанский Кремль",
        description: "Знакомство с историей и архитектурой главной достопримечательности Татарстана. Посещение мечети Кул-Шариф и Спасской башни.",
        price: 1200,
        duration: "2.5 часа",
        location: "Казань",
        maxPeople: 15,
        availableSeats: 12,
        date: "2026-04-17T09:00:00",
        imageIcon: "fa-archway"
    },
    {
        id: 4,
        title: "Сочи Парк",
        description: "Экскурсия в самый большой тематический парк России. Аттракционы и развлечения для всей семьи.",
        price: 2500,
        duration: "4 часа",
        location: "Сочи",
        maxPeople: 25,
        availableSeats: 20,
        date: "2026-04-18T12:00:00",
        imageIcon: "fa-tree"
    },
    {
        id: 5,
        title: "Петродворец - русский Версаль",
        description: "Прогулка по дворцово-парковому ансамблю с знаменитыми фонтанами. Великолепные виды на Финский залив.",
        price: 1800,
        duration: "3 часа",
        location: "Санкт-Петербург",
        maxPeople: 12,
        availableSeats: 10,
        date: "2026-04-19T10:00:00",
        imageIcon: "fa-fountain"
    },
    {
        id: 6,
        title: "Золотое кольцо России",
        description: "Путешествие по древним городам: Сергиев Посад, Переславль-Залесский, Ростов Великий. Погружение в историю.",
        price: 3500,
        duration: "12 часов",
        location: "Москва",
        maxPeople: 8,
        availableSeats: 6,
        date: "2026-04-20T08:00:00",
        imageIcon: "fa-church"
    }
];

// Переменные для хранения данных
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];