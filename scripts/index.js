const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item');
const cardsList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const buttonOpenProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup_type_edit .popup__close');

const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');

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


function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closeModal(profilePopup);
}


// наполняем контейнер карточками.
initialCards.forEach(card => {
    // отображаем на странице
    cardsList.append(createCard(card.name, card.link));
})

buttonOpenProfile.addEventListener('click', () => {
    openModal(profilePopup);
})

buttonCloseProfile.addEventListener('click', () => {
    closeModal(profilePopup);

})

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleProfileFormSubmit);



