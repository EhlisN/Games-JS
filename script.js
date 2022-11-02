// Burger-menu

let burger = document.querySelector('.burger__menu');
let open = false;

burger.addEventListener('click', () => {
  if (!open) {
    burger.classList.add('open');
    open = true;
  } else {
    burger.classList.remove('open');
    open = false;
  }
});
