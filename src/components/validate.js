export const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationSettings);
    });
};

 const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass);

    inputList.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement, validationSettings);
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationSettings);
            toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass);
        });
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((elem) => {
        return !elem.validity.valid;
    });
}

function toggleButtonState(input, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(input)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');

    }
}


const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.classList.add(validationSettings.errorClass);
    errorElement.textContent = errorMessage;
};


const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
        hideInputError(formElement, inputElement, validationSettings);
    }
};