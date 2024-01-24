export const formValidators = {};
export const settingsApi = {
  myUrl: 'https://api.sergey.nomoredomainsmonster.ru',
  headers: {
    authorization: localStorage.getItem('jwt'),
    'Content-Type': 'application/json'
  }
}
export const initialCards = []
export const userId = {};

export const cardSettings = {
  selectors: {
    photosImage: ".photos__image",
    photosName: ".photos__name",
    photosButtonLike: ".photos__button-like",
    photosButtonDelete: ".photos__button-delete",
    photosElement: ".photos__element",
    photosButtonLikeActive: "photos__button-like_active",
    imagePopup: ".discovery",
    imageDiscovery: ".discovery__img",
    discoveryDescription: ".discovery__description",
    openPopup: ".popup_open",
  },
};
