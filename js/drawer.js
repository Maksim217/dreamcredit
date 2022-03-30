/**
 * Класс инкапсулирует методы для работы с выпадающим меню
 *
 */
class Drawer {
  /**
   * Конструктор класса Drawer
   *
   * @param selector
   */
  constructor(selector) {
    this.elList = document.querySelectorAll(selector);
    this.selector = selector;
  }

  /**
   * Метод для привязки обработчиков к элементу
   *
   */
  start() {
    this.setHandler();
  }

  /**
   * Метод-обработчик события click
   *
   * @param event
   */
  clickHandler = (event) => {
    const selector = `${this.selector}--active`.slice(1);
    event.target.classList.toggle(selector);
  };

  /**
   * Метод для привязки обработчика к событию click
   *
   */
  setHandler() {
    this.elList.forEach((el) =>
      el.addEventListener('click', (event) => this.clickHandler(event)),
    );
  }
}
