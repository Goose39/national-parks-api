function formListener() {
$("form").submit(event => {
  event.preventDefault();
  const states = $(".states").val();
  const maxResults = $(".js-max-results").val();
  const url = formatUrl(states, maxResults);

  const options = {
    headers: new Headers({
      "Accept": "application/json"})
  };

  getData(url, options);
})
} 

function displayResults(dataObj) {
  $('.results-list').empty();
  for (let i = 0; i < dataObj.data.length; i++) {
    const addressId = `address${i}`
    const latLong = dataObj.data[i].latLong
    
    $('.results-list').append(
      `<li><h3 class="name">${dataObj.data[i].fullName}</h3>
      <h4 class="address" id="address${i}"></h4>
      <p class="desc">${dataObj.data[i].description}</p>
      <a href="${dataObj.data[i].url}" target="_blank">Visit Website</a>
      </li>`
    )
    getAddress(latLong, addressId);
    $('.results').removeClass("hidden");
  };

}

function formatUrl(states, max) {
return `https://developer.nps.gov/api/v1/parks?api_key=BkAtfWIa4Mudy2AcHUk08mYkFajeYLhScSJ7pjAP&stateCode=${states}&limit=${max}`
}

function getData(url, options) {

fetch(url, options)
.then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
.then(responsJson => displayResults(responsJson))
.catch(error => {
  $(".error").html(`An error occured: ${error.message}`)
})
}

function getAddress(latLong, classId) {
  const coordsArr = latLong.split(/:|,/);
  const coordsStr = coordsArr[1]+","+coordsArr[3];  
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordsStr}&key=AIzaSyAHc4UaPe3zS_gekgEbTAWAXpMp7vsNXSY`
  
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => {
    $(`#${classId}`).html(`${responseJson.results[2].formatted_address}`)
  })
  .catch(error => {
    $(`#${classId}`).html("")
  })  
}

$(formListener);