import debounce from 'lodash.debounce';

const refs = {
  form: document.querySelector('.form-control'),
};

refs.form.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  // e.preventDefault();
  const form = e.target;
  const searchValue = form.value;
  fetch(`https://restcountries.eu/rest/v2/name/${searchValue}`)
    .then(response => response.json())
    .then(console.log)
    .catch(error => console.log(error));
}
