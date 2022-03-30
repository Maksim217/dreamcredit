$('.js-custom-select').on('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  const root = $(this).closest('.custom-select');

  if ($(this).hasClass('openned')) {
    root.find('.custom-select__btn').removeClass('custom-select__btn--active');
    $(this).siblings('.custom-select__results').removeClass('show');
    $('.js-custom-select').removeClass('openned');
  } else {
    $('.js-custom-select').removeClass('openned');
    root.find('.custom-select__btn').removeClass('custom-select__btn--active');
    $('.custom-select__results').removeClass('show');
    $(this).addClass('openned');
    root.find('.custom-select__btn').addClass('custom-select__btn--active');
    $(this).siblings('.custom-select__results').addClass('show');
  }
});

$('.custom-select__results li').on('click', function (e) {
  const value = e.target.dataset.optionId;
  $('#li-selected').text(value);
  const root = $(this).closest('.custom-select');
  root.find('.custom-select__btn').removeClass('custom-select__btn--active');
  root.find('.custom-select__results').removeClass('show');
  root.find('.custom-select__header').removeClass('openned');
});

$('body').on('click', function (e) {
  $('.custom-select__btn').removeClass('custom-select__btn--active');
  $('.custom-select__results').removeClass('show');
  $('.custom-select__header').removeClass('openned');
});
