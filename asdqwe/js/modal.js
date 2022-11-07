export const modal = () => {
  const state = {
    openModal: null,
  };

  const closeModal = () => {
    state.openModal = null;
    renderModal();
  };

  const openModal = (getModalElement) => {
    state.openModal = getModalElement(closeModal);
    renderModal();
  };

  const renderModal = () => {
    const modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('modal-container');
    modalContainer.innerHTML = '';
    if (!state.openModal) {
      enableScroll();
      return;
    }
    disableScroll();
    modalContainer.classList.add('modal-container');
    modalContainer.append(state.openModal);
  };

  const initializeModal = () => {
    const modalDiv = document.createElement('div');

    modalDiv.id = 'modal-container';
    document.querySelector('body').append(modalDiv);
  };

  initializeModal();
  return { openModal };
};

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

const preventDefault = (e) => {
  e.preventDefault();
};

const preventDefaultForScrollKeys = (e) => {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
};

let supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    }),
  );
} catch (e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

const disableScroll = () => {
  window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
  window.addEventListener('touchmove', preventDefault, wheelOpt);
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

const enableScroll = () => {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};
