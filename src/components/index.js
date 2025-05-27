import {openModal, closeModal} from "./modal.js";
import {createCard} from "./card.js";
import {enableValidation} from "./validate.js";
import '../pages/index.css';
import {getInitialCards, getUser, updateUserData, addNewCard, changeUserAvatar} from "./api"

// Получаем все всплывающие окна
const popups = document.querySelectorAll('.popup');
//Получаем ненумерованный список для карточек
const cardsList = document.querySelector('.places__list');
// Получаем попапы профиля
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_edit_avatar');
// Получаем элементы профиля
const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__title');
const userJob = profile.querySelector('.profile__description');
const userAvatar = profile.querySelector('.profile__image');
// Кнопки открытия/закрытия формы профиля
const buttonOpenProfile = profile.querySelector('.profile__edit-button');
const buttonCloseProfile = profilePopup.querySelector('.popup__close');
// Элементы формы профиля
const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;
// Элементы формы добавления карточки
const buttonAddCard = profile.querySelector('.profile__add-button');
const buttonCloseCard = cardPopup.querySelector('.popup__close');
const cardFormElement = document.forms['new-place'];
const cardNameInput = cardFormElement.elements[`place-name`];
const cardUrlInput = cardFormElement.elements.link;

//Элементы редактирования аватара
const buttonOpenAvatar = userAvatar.querySelector('.profile__avatar-edit-button');
const buttonCloseAvatar = avatarPopup.querySelector('.popup__close');
const avatarFormElement = document.forms['update-avatar'];
const avatarUrlInput = avatarFormElement.elements.link;

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


// Обработчик отправки формы профиля.
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const button = evt.submitter;
    toggleButtonLoadingAnimation(button, true);
    const updatedUserData = {
        name: nameInput.value,
        about: jobInput.value
    };

    updateUserData(updatedUserData)
        .then(({name, about}) => {
            userName.textContent = name;
            userJob.textContent = about;
            closeModal(profilePopup);
        })
        .catch(function (error) {
            console.error("Не удалось обновить информацию о пользователе:", error);
        })
        .finally(() => {
            toggleButtonLoadingAnimation(button, false);
        });
}


// Обработчик отправки формы новой карточки.
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const button = evt.submitter;
    toggleButtonLoadingAnimation(button, true);
    const newCardData = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    };
    addNewCard(newCardData)
        .then(card => {
            const newCard = createCard(card, card.owner._id);
            cardsList.prepend(newCard);
            closeModal(cardPopup);
        })
        .catch(function (error) {
            console.error("Не удалось добавить карточку:", error);
        })
        .finally(() => {
            toggleButtonLoadingAnimation(button, false);
        });
}


// Обработчик отправки формы обновления аватара.
function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const button = evt.submitter;
    toggleButtonLoadingAnimation(button, true);
    changeUserAvatar(avatarUrlInput.value)
        .then((user) => {
            setUser(user);
            avatarUrlInput.value = "";
            closeModal(avatarPopup);
        })
        .catch(function (error) {
            console.error("Не удалось обновить аватар:", error);
        })
        .finally(() => {
            toggleButtonLoadingAnimation(button, false);
        });
}


//Добавление анимации для всплывающих окон.
function addPopupAnimations() {
    popups.forEach(popup => popup.classList.add("popup_is-animated"));
}


//Анимация загрузки.
function toggleButtonLoadingAnimation(button, isLoading) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = "Сохранить";
    }
}

// Открытие формы редактирования профиля.
buttonOpenProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(profilePopup);
})

// Закрытие формы редактирования профиля.
buttonCloseProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal(profilePopup);
})

// Открытие формы добавления карточки.
buttonAddCard.addEventListener('click', (e) => {
    cardNameInput.value = '';
    cardUrlInput.value = '';
    e.stopPropagation();
    openModal(cardPopup);
});

// Закрытие формы добавления карточки.
buttonCloseCard.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal(cardPopup);
})

//Открытие формы редактирования аватара.
buttonOpenAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(avatarPopup);
})

//Закрытие формы редактирования аватара.
buttonCloseAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal(avatarPopup);
})

// Отправка формы профиля.
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Отправка формы для карточки.
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// Отправка формы для редактирования аватара.
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);


//Установка данных пользователя.
function setUser(user){
    userName.textContent = user.name;
    userJob.textContent = user.about;
    userAvatar.style.backgroundImage = `url(${user.avatar})`;
}


//Инициализация
function initApp() {
    Promise.all([getUser(), getInitialCards()])
        .then(([user, cards]) => {
            setUser(user);
            const userId = user._id;
            // Отрисовываем карточки.
            cards.forEach(card => {
                cardsList.append(createCard(card, userId));
            });
        })
        .catch(error => {
            console.error("Ошибка при инициализации данных:", error);
        });

    addPopupAnimations();
    enableValidation(validationSettings);
}

initApp();