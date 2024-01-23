import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

function createSortItemTemplate(type) {

  const isChecked = SortType.DAY === type ? 'checked' : '';
  const isDisabled = type === SortType.EVENT || type === SortType.OFFERS ? 'disabled' : '';

  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" data-sort-type="${type}" ${isChecked} ${isDisabled}>
    <label class="trip-sort__btn" for="sort-${type}">${type}</label>
   </div>`
  );
}

function createSortTemplate() {
  const sortItemsTemplate = Object.values(SortType).map((item) => createSortItemTemplate(item)).join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);

  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {

    if (evt.target?.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
