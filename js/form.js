/**
 * Класс инкапсулирует методы для работы с формой
 *
 */
class Form {
  /**
   * Конструктор класса Form
   *
   * @param options
   */
  constructor(options = {}) {
    const {
      formSelector,
      formControlSelector,
      formSubmitButtonSelector,
      requiredClass,
    } = options;

    this.formSelector = formSelector;
    this.formControlSelector = formControlSelector;
    this.formSubmitButtonSelector = formSubmitButtonSelector;
    this.requiredClass = requiredClass;

    this.init();
  }

  /**
   * Метод для инициализации атрибутов класса
   *
   */
  init() {
    const { input, select, textarea } = this.formControlSelector;

    this.elSubmitBtn = document.querySelector(this.formSubmitButtonSelector);
    this.elInputs = document.querySelectorAll(input);
    this.elTextarea = document.querySelector(textarea);
    this.elSelectData = document.querySelector(select.data);
    this.elSelectBlock = document.querySelector(select.block);
    this.preload = document.querySelector(`.preload`);
    this.backdrop = document.querySelector(`.backdrop`);
    this.elOptions = document.querySelectorAll(`.option`);
  }

  /**
   * Метод для привязки необходимых обработчиков
   *
   */
  start() {
    this.setSubmitHandler();
    this.setKeyUpHandler();
    this.clearError();
  }

  /**
   * Метод для привязки обработчика формы
   *
   */
  setSubmitHandler() {
    this.elSubmitBtn.addEventListener(`click`, (event) => this.submit(event));
  }

  /**
   * Метод для привязки обработчика к событию keyup
   *
   */
  setKeyUpHandler() {
    const onEnter = (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        return;
      }
    };

    this.elInputs.forEach((input) =>
      input.addEventListener(`keydown`, onEnter),
    );
    this.elTextarea.addEventListener(`keydown`, onEnter);
  }

  /**
   * Метод для привязки обработчика фокуса к контролу
   *
   */
  focusHandler = (field) => {
    self = this;
    field.onfocus = function () {
      this.classList.remove(self.requiredClass);
    };
  };

  /**
   * Метод для очищения ошибок валидации
   *
   */
  clearError() {
    this.elOptions.forEach((option) =>
      option.addEventListener(`click`, () => {
        this.elSelectBlock.classList.remove(this.requiredClass);
      }),
    );

    this.elInputs.forEach((input) =>
      input.addEventListener(`focusin`, (event) => {
        event.target.classList.remove(this.requiredClass);
      }),
    );

    this.elTextarea.addEventListener(`focusin`, (event) => {
      event.target.classList.remove(this.requiredClass);
    });
  }

  /**
   * Метод для валидации контролов формы
   *
   */
  validate() {
    let isValid = true;

    if (
      +this.elSelectData.dataset.required &&
      this.elSelectData.innerHTML.trim() ==
        this.elSelectData.dataset.defaultValue
    ) {
      this.elSelectBlock.classList.add(this.requiredClass);
      isValid = false;
    }

    this.elInputs.forEach((input) => {
      if (!input.value.trim() && +input.dataset.required) {
        input.classList.add(this.requiredClass);
        isValid = false;
      }
    });

    if (!this.elTextarea.value.trim() && +this.elTextarea.dataset.required) {
      this.elTextarea.classList.add(this.requiredClass);
      isValid = false;
    }

    return isValid;
  }

  /**
   * Метод для подготовки данных, отправляемых на сервер
   *
   * @returns FormData
   */
  prepareSendData() {
    const formData = new FormData();

    const subject = this.elSelectData.innerHTML.trim();
    formData.append('subject', subject);

    this.elInputs.forEach((input) => {
      const name = input.getAttribute(`name`);
      const value = input.value.trim();
      formData.append(name, value);
    });

    const question = this.elTextarea.value.trim();
    formData.append(`question`, question);

    return formData;
  }

  /**
   * Метод для сброса выбранных значений формы
   *
   */
  resetForm() {
    const form = document.querySelector(`#write-us-form`);
    form.reset();
    const defaultValue = this.elSelectData.dataset.defaultValue;
    this.elSelectData.innerHTML = defaultValue;
  }

  /**
   * Метод для отправки данных формы
   *
   */
  submit = async (event) => {
    event.preventDefault();
    const isValid = this.validate();

    if (!isValid) return;

    const formData = this.prepareSendData();

    const url = `http://server.loc/`;

    try {
      this.preload.classList.add(`preload--active`);

      const responseJson = await fetch(url, { method: 'POST', body: formData });
      const response = await responseJson.json();

      if (response.status === 'OK') {
        this.preload.classList.remove(`preload--active`);

        this.backdrop.classList.add(`backdrop--active`);
        setTimeout(
          () => this.backdrop.classList.remove(`backdrop--active`),
          3000,
        );

        this.resetForm();
      }

      if (response.status === 'ERROR') {
        this.preload.classList.remove(`preload--active`);
      }
    } catch (error) {
      this.preload.classList.remove(`preload--active`);
      console.error(error);
    }
  };
}
