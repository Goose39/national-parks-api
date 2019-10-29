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
    $('.results-list').append(
      `<li><h3>${dataObj.data[i].fullName}</h3>
      <p>${dataObj.data[i].description}</p>
      <a href="${dataObj.data[i].url}">Website</a>
      </li>`
    )
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

$(formListener);