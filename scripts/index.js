const popups = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item');
const cardsList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profile = document.querySelector('.profile');

const buttonOpenProfile = profile.querySelector('.profile__edit-button');
const buttonCloseProfile = profilePopup.querySelector('.popup__close');

const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const nameUser = profile.querySelector('.profile__title');
const job = profile.querySelector('.profile__description');

const buttonAddCard = profile.querySelector('.profile__add-button');
const buttonCloseCard = cardPopup.querySelector('.popup__close');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardPopup.querySelector('.popup__input_type_url');
const cardFormElement = cardPopup.querySelector('.popup__form');

const imageFormTitle = imagePopup.querySelector('.popup__caption');
const imageFormImage = imagePopup.querySelector('.popup__image');

function createCard(name, link) {
    // клонируем содержимое тега template.
    const card = cardElement.cloneNode(true);
    //Наполнение контейнера.
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    card.querySelector('.card__title').textContent = name;
    //добавление слушателя для кнопки "лайк".
    const likeButton = card.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });
    //добавление слушателя для кнопки удаления.
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        const cardToRemove = deleteButton.closest('.places__item');
        cardToRemove.remove();
    });
    //добавление слушателя для открытия картинки.
    cardImage.addEventListener('click', () => {
        imageFormTitle.textContent = name;
        imageFormImage.src = link;
        openModal(imagePopup);
    });
    //добавление слушателя для закрытия картинки.
    const closeButton = imagePopup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => {
        closeModal(imagePopup);
    });
    return card;
}


function displayCards() {
// наполняем контейнер карточками.
    initialCards.forEach(card => {
        // отображаем на странице
        cardsList.append(createCard(card.name, card.link));
    })
}


function openModal(popup) {
    popup.classList.add('popup_is-opened');
}


function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameUser.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closeModal(profilePopup);
    displayCards();
}


function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(cardNameInput.value, cardUrlInput.value);
    cardsList.prepend(newCard);
    closeModal(cardPopup);
}


buttonOpenProfile.addEventListener('click', () => {
    openModal(profilePopup);
})

buttonCloseProfile.addEventListener('click', () => {
    closeModal(profilePopup);
})

// кнопка добавления карточки
buttonAddCard.addEventListener('click', () => {
    cardNameInput.value = '';
    cardUrlInput.value = '';
    openModal(cardPopup);
});

buttonCloseCard.addEventListener('click', () => {
    closeModal(cardPopup);
})
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

cardFormElement.addEventListener('submit', handleCardFormSubmit);


displayCards();
popups.forEach(popup => {
    //анимация для popups.
    popup.classList.add('popup_is-animated');
})





