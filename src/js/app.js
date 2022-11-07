import { modal } from './modal.js';
import { SignFormFactory } from './sign-form.js';

(() => {
  const { openModal } = modal();
  const signFormFactory = new SignFormFactory();

  document.querySelector('#join-button').addEventListener('click', () => {
    openModal((close) => {
      return signFormFactory.createSignUpForm(close, openModal);
    });
  });
  document.querySelector('#join-now-button').addEventListener('click', () => {
    openModal((close) => {
      return signFormFactory.createSignUpForm(close, openModal);
    });
  });
  const pricingEl = document.querySelector('#pricing');
  pricingEl.scrollIntoView({
    behavior: 'smooth',
  });
})();
