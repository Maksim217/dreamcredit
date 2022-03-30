/**
 * Класс инкапсулирует методы для работы с маской полей ввода
 *
 */
class Mask {
  /**
   * Конструктор класса Mask
   *
   * @param selector
   * @param mask
   * @param replacementChar
   */
  constructor(selector, mask, replacementChar) {
    this.el = document.querySelector(selector);
    this.mask = mask;
    this.replacementChar = replacementChar;
  }

  /**
   * Метод для привязки обработчиков к полю ввода
   *
   */
  start() {
    this.setMaskHandler();
    this.setFocusHandler();
  }

  /**
   * Метод для привязки обработчика к событию input
   *
   */
  setMaskHandler() {
    this.el.addEventListener(`input`, (event) => this.maskHandler(event));
  }

  /**
   * Метод для привязки обработчиков к событиям устанавки/снятия фокуса
   *
   */
  setFocusHandler() {
    this.el.addEventListener('focus', (event) => this.focusHandler(event));
    this.el.addEventListener('blur', (event) => this.blurHandler(event));
  }

  /**
   * Метод для установки курсора в поле ввода
   *
   * @param pos
   * @param elem
   */
  setCursorPosition(pos, elem) {
    elem.focus();

    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd(`character`, pos);
      range.moveStart(`character`, pos);
      range.select();
    }
  }

  /**
   * Метод-обработчик события input
   *
   * @param event
   */
  maskHandler = (event) => {
    const replacementChar = this.replacementChar;
    let matrix = event.target.defaultValue,
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = event.target.value.replace(/\D/g, '');

    def.length >= val.length && (val = def);

    const reg = new RegExp(`[${replacementChar}\\d]`, `g`);

    matrix = matrix.replace(reg, function (a) {
      return val.charAt(i++) || replacementChar;
    });

    event.target.value = matrix;

    i = matrix.lastIndexOf(val.substr(-1));

    i < matrix.length && matrix != event.target.defaultValue
      ? i++
      : (i = matrix.indexOf(replacementChar));

    this.setCursorPosition(i, event.target);
  };

  /**
   * Метод-обработчик события focus
   *
   * @param event
   */
  focusHandler = (event) => {
    if (event.target.value === ``) {
      event.target.value = this.mask;
    }

    event.target.setAttribute(`value`, this.mask);
  };

  /**
   * Метод-обработчик события blur
   *
   * @param event
   */
  blurHandler = (event) => {
    event.target.removeAttribute(`value`);

    if (event.target.value === this.mask) {
      event.target.value = ``;
    }
  };
}
