/**
 * Created by t on 14/03/17.
 */

export default function searchSuggestions(term) {
  return fetch('http://localhost:3002/suggest?term=' + term)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return json[1];
    })
}
