const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item');
const cardsList = document.querySelector('.places__list');

function createCard(name, link){
    // клонируем содержимое тега template
    const card = cardElement.cloneNode(true);
    //Наполнение контейнера
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__title').textContent = name;
    return card;
}
// наполняем содержимым
initialCards.forEach(card => {
    // отображаем на странице
    cardsList.append(createCard(card.name, card.link));
})


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
