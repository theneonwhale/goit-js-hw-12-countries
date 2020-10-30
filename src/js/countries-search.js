import API from './fetchCountries';
import getRefs from './get-refs';
import countryCardTpl from '../templates/country-card.hbs';
import countriesTpl from '../templates/countries-list.hbs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { notice, error } from '@pnotify/core';

const refs = getRefs();

refs.form.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  clearCardContainer();
  const form = e.target;
  const searchValue = form.value;
  API.fetchCountries(searchValue)
    .then(response => {
      if (response.length > 10) {
        onFetchManyMatches();
      } else if (response.length > 1) {
        renderCountries(response, countriesTpl);
        console.log(response);
      } else if (response.length === 1) {
        renderCountryCard(response, countryCardTpl);
        console.log(response);
      } else if (response.status === 404) {
        onFetchNoMatches();
      }
    })

    .catch(onFetchError);
}

function renderCountryCard(countries, template) {
  const markup = countries.map(country => template(country)).join('');
  refs.cardContainer.innerHTML = markup;
}

function renderCountries(countries) {
  const markup = countriesTpl(countries);
  refs.cardContainer.innerHTML = markup;
}

function clearCardContainer() {
  refs.cardContainer.innerHTML = '';
}

function onFetchError() {
  error({
    text: 'Please enter query!',
    delay: 2000,
  });
}

function onFetchManyMatches() {
  notice({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
  });
}

function onFetchNoMatches() {
  error({
    text: 'No matches found. Please enter another query!',
    delay: 2000,
  });
}
