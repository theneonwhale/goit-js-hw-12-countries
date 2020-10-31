const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

const fetchCountries = searchQuery =>
  fetch(`${BASE_URL}${searchQuery}`).then(response => response.json());

export default { fetchCountries };
