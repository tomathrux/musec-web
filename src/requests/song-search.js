
import React from 'react';

function parseDur(original) {
  var regex = /P((([0-9]*\.?[0-9]*)Y)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)W)?(([0-9]*\.?[0-9]*)D)?)?(T(([0-9]*\.?[0-9]*)H)?(([0-9]*\.?[0-9]*)M)?(([0-9]*\.?[0-9]*)S)?)?/

  let matches = original.match(regex);
  let dur = 0;

  if (!!matches[12]) dur+= parseInt(matches[12]*3600);
  if (!!matches[14]) dur+= parseInt(matches[14]*60);
  if (!!matches[16]) dur+= parseInt(matches[16]);

  return dur;
}

export default function songSearch(terms, results=30) {
  return fetch('https://content.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + results + '&q=' + terms + '&key=AIzaSyCsOw-_6yXgsapyBDSVX5WCHx76njnN6jM')
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      let { items } = response

      for (let i in items) {
        if (items[i].id.kind != "youtube#video" || items[i].snippet.liveBroadcastContent == "live") {
          items.splice(i, 1);
        }
      }
      return items;
    })
    .then(function(items) {
      let ids = items.map((item) => (item.id.videoId))

      return fetch('https://www.googleapis.com/youtube/v3/videos?id=' + ids + '&part=contentDetails&key=AIzaSyCsOw-_6yXgsapyBDSVX5WCHx76njnN6jM')
        .then(function(response) {
          return response.json()
        })
        .then(function(json) {

          for (let i in items) {
            if (!!json.items[i]) {
              items[i].duration = parseDur(json.items[i].contentDetails.duration);
            }
          }
          return items;
        })
    })
}
