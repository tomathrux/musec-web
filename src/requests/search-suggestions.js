/**
 * Created by t on 14/03/17.
 */

export default function searchSuggestions(term) {
  return fetch('http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=' + term)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return json[1];
    })
}
