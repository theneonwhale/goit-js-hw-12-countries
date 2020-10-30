const BASE_URL = 'https://restcountries.eu/rest/v2/';

const fetchCountries = searchQuery =>
  fetch(`${BASE_URL}name/${searchQuery}`).then(response => response.json());

export default { fetchCountries };
