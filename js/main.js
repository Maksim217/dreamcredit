const mask = new Mask(`#phone`, `1-XXX-XXX-XXXX`, `X`);
mask.start();

const headerDrawer = new Drawer(`.header__content-item-drop`);
headerDrawer.start();

const backdropPopup = new Drawer(`.backdrop`);
backdropPopup.start();

const options = {
  formSelector: `.write-us__form`,
  formControlSelector: {
    select: {
      data: `.form__control-select`,
      block: `.custom-select`,
    },
    input: `.form__control-input`,
    textarea: `.form__control-textarea`,
  },
  formSubmitButtonSelector: `#write-us-submit-btn`,
  requiredClass: `required-control`,
};

const form = new Form(options);
form.start();

const popupCloseBtn = document.querySelector(`.popup__close-btn`);
popupCloseBtn.addEventListener(`click`, (event) => {
  event.stopPropagation();
  const backdrop = document.querySelector(`.backdrop`);
  backdrop.classList.remove(`backdrop--active`);
});
