const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

// наполняем содержимым
initialCards.forEach(card => {
    // клонируем содержимое тега template
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    //Наполнение контейнера
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    // отображаем на странице
    cardsList.append(cardElement);
})


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
