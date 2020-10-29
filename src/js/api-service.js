const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

const fetchCountriesById = countryId =>
  fetch(`${BASE_URL}${countryId}`).then(response => response.json());

export default { fetchCountriesById };
