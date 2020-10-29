import debounce from 'lodash.debounce';
import API from './api-service';
import countryCardTpl from '../templates/country-card.hbs';
import countriesTpl from '../templates/countries-list.hbs';
import getRefs from './get-refs';

const refs = getRefs();

refs.form.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();
  const form = e.target;
  const searchValue = form.value;
  API.fetchCountriesById(searchValue)
    .then(response => {
      if (response.length === 1) {
        renderCountryCard(response, countryCardTpl);
        console.log(response);
      } else if (response.length > 1) {
        renderCountries(response, countriesTpl);
        console.log(response);
      }
    })

    .catch(error => console.log(error));
  // .finally(() => e.target.reset());
}

function renderCountryCard(countries, template) {
  const markup = countries.map(country => template(country)).join('');
  refs.cardContainer.innerHTML = markup;
  // refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}

function renderCountries(countries) {
  const markup = countriesTpl(countries);
  refs.cardContainer.innerHTML = markup;
}
