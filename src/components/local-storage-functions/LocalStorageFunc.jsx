const LOCALSTORAGE_KEY = 'contacts';

const getItemLocalStorage = () => {
  return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) || [];
};

const setItemLocalStorage = values => {
  window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(values));
};

export { getItemLocalStorage, setItemLocalStorage };
