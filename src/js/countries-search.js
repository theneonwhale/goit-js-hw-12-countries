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

  const searchValue = e.target.value;

  if (searchValue === '') return;

  API.fetchCountries(searchValue)
    .then(response => {
      if (response.length > 10) {
        onFetchManyMatches();
      } else if (response.length > 1) {
        renderCard(response, countriesTpl);
      } else if (response.length === 1) {
        renderCard(response[0], countryCardTpl);
      } else {
        onFetchNoMatches();
      }
    })

    .catch(onFetchError);
}

function renderCard(countries, template) {
  const markup = template(countries);
  refs.cardContainer.innerHTML = markup;
}

function clearCardContainer() {
  refs.cardContainer.innerHTML = '';
}

function onFetchManyMatches() {
  notice({
    title: 'Too many matches!',
    text: 'Too many matches found. Please enter a more specific query.',
    delay: 2500,
  });
}

function onFetchNoMatches() {
  error({
    title: 'No matches!',
    text: 'No matches found. Please enter another query.',
    delay: 2500,
  });
}

function onFetchError() {
  error({
    title: 'Error!',
    text: 'Please enter a query.',
    delay: 2500,
  });
}
