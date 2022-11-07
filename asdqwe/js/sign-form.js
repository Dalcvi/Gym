export class SignFormFactory {
  constructor() {
    this.signUptemplate = document.querySelector('#sign-up-template');
    this.signIntemplate = document.querySelector('#sign-in-template');
  }
  createSignUpForm = (close, openForm) => {
    const documentFragment = this.signUptemplate.content.cloneNode(true);
    this._addEventListeners(close, openForm, this.createSignInForm, documentFragment);

    return documentFragment;
  };

  createSignInForm = (close, openForm) => {
    const documentFragment = this.signIntemplate.content.cloneNode(true);
    this._addEventListeners(close, openForm, this.createSignUpForm, documentFragment);
    return documentFragment;
  };

  _addEventListeners = (close, openForm, createForm, fragment) => {
    fragment.querySelector('.modal__close').addEventListener('click', close);
    fragment.querySelector('.modal__link').addEventListener('click', (e) => {
      e.preventDefault;
      openForm((newClose) => {
        return createForm(newClose, openForm);
      });
    });
  };
}
