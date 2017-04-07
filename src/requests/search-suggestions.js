/**
 * Created by t on 14/03/17.
 */
import * as constants from '../constants'

export default function searchSuggestions(term) {
  return fetch(constants.api_url + 'suggest?term=' + term)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return json[1];
    })
}
