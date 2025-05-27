
const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: 'b7eca70d-a576-4b8a-81ae-597a37d75792',
        'Content-Type': 'application/json'
    }
}


//Обработка ответа.
function handleResponse(res) {
    if (res.ok) {
        return res.json(); // Если ответ успешный, возвращаем JSON
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}


//Получение карточек.
export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(handleResponse);
}


// Получение пользователя.
export function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(handleResponse);
}


//Внесение изменений в описание профиля.
export function updateUserData(newUserData) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newUserData.name,
            about: newUserData.about
        })
    })
        .then(handleResponse);
}


//Добавление новой карточки.
export function addNewCard(newCard) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link
        })
    })
        .then(handleResponse);
}


//Запрос на удаление карточки.
export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(handleResponse);
}


//Установка лайка на карточку.
export function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(handleResponse);
}


//Удаление лайка с карточки.
export function removeLike(cardId){
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(handleResponse);
}


//Обновление аватара пользователя.
export function changeUserAvatar(link){
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        })
    })
        .then(handleResponse);
}