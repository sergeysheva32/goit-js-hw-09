import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const buttonEl = document.querySelector('button[type="submit"]')
let timerId = null;
let promisesCount = 1;

formEl.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();
  buttonEl.disabled = true;

  const elements = e.currentTarget.elements
  const delay = elements.delay.value
  const step = elements.step.value
  const amount = elements.amount.value

  setTimeout(() => {
    showPromises();
    timerId = setInterval(() => {
      showPromises();
    }, step)
  }, delay)

  function showPromises() {
    const promise = createPromise(promisesCount, delay);

    promisesCount += 1;

    if (promisesCount > Number(amount)) {
      clearInterval(timerId);
      // formEl.reset()
      promisesCount = 1;
      buttonEl.disabled = false;
    }

    promise.then(result => {
      Notiflix.Notify.success(result);
    }).catch(error => {
      Notiflix.Notify.failure(error);
    });
  }
}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  const elements = formEl.elements
  const step = elements.step.value

  let delayInMs = Number(delay) + step * (promisesCount - 1);

  return new Promise((res, rej) => {
    setTimeout(() => {

      if (shouldResolve) {
        res(`✅ Fulfilled promise ${position} in ${delayInMs}ms`)
      } else {
        rej(`❌ Rejected promise ${position} in ${delayInMs}ms`)
      }
    }, delay)
  })
}