const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item');
const cardsList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');


function createCard(name, link) {
    // клонируем содержимое тега template
    const card = cardElement.cloneNode(true);
    //Наполнение контейнера
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__title').textContent = name;
    return card;
}


function openModal(popup) {
    popup.classList.add('popup_is-opened');
}


function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}


// наполняем контейнер карточками.
initialCards.forEach(card => {
    // отображаем на странице
    cardsList.append(createCard(card.name, card.link));
})

