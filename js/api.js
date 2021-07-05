const alertTemplate = document.querySelector('#data-error').content.querySelector('.error');
const alertElement = alertTemplate.cloneNode(true);
const ALERT_SHOW_TIME = 5000;
const RECEIVE_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SEND_URL = 'https://23.javascript.pages.academy/keksobooking';

const showAlert = () => {
  document.body.append(alertElement);
  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const getData = (onSuccess, onFail) => {
  fetch(RECEIVE_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(onFail);
};

const sendData = (onSuccess, onFail, data) => {
  fetch(
    SEND_URL,
    {
      method: 'POST',
      body: data,
    },
  ).then((response) => {
    if (response.ok) {
      return onSuccess();
    } throw new Error('Ошибка отправки данных');
  }).catch(onFail);
};

export {getData, sendData, showAlert};
