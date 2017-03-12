
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

export default async function songSearch(terms, results=30)
{
  let searchData = await fetch('https://content.googleapis.com/youtube/v3/search?part=snippet&maxResults=' + results + '&q=' + terms + '&key=AIzaSyCsOw-_6yXgsapyBDSVX5WCHx76njnN6jM').then(function(response) {
    return response.json();
  })
  let {items} = searchData;

  for (let i in items) {
    if (items[i].id.kind != "youtube#video" || items[i].snippet.liveBroadcastContent == "live") {
      items.splice(i, 1);
    }
  }

  let ids = items.map((item) => (item.id.videoId))

  let infoData = await fetch('https://www.googleapis.com/youtube/v3/videos?id=' + ids + '&part=contentDetails&key=AIzaSyCsOw-_6yXgsapyBDSVX5WCHx76njnN6jM').then(function(response) {
    return response.json();
  })

  for (let i in items) {
    items[i].duration = parseDur(infoData.items[i].contentDetails.duration);
  }

  return items;
};
