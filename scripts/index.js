// @todo: Темплейт карточки
import { initialCards } from './cards.js'

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');
const addCard = document.querySelector('.profile__add-button');
const popupWindow = document.querySelector('.popup_type_new-card');
const popupCloseButton = popupWindow.querySelector('.popup__close');
const form = document.querySelector('form[name="new-place"]');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// @todo: DOM узлы
function createCard(cardData) {
    const cardElement = cardTemplate.content
        .querySelector('.places__item')
        .cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active')
    });

    cardImage.addEventListener('click', () => {
        openImagePopup(cardData);
    });

    return cardElement;
}

// @todo: Функция создания карточки
addCard.addEventListener('click', popupOpen);

function popupOpen() {
    popupWindow.classList.add('popup_is-opened');
};

popupCloseButton.addEventListener('click', popupClose);

function popupClose() {
    popupWindow.classList.remove('popup_is-opened');
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('.popup__input_type_card-name');
    const linkInput = form.querySelector('.popup__input_type_url');

    const newCard = {
        name: nameInput.value,
        link: linkInput.value
    };

    const cardElement = createCard(newCard);
    placesList.prepend(cardElement);

    form.reset();
    popupClose();
});

imagePopupCloseButton.addEventListener('click', closeImagePopup);

function openImagePopup(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;

    imagePopup.classList.add('popup_is-opened');
};

function closeImagePopup() {
    imagePopup.classList.remove('popup_is-opened');
};

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    placesList.append(createCard(card));
});
