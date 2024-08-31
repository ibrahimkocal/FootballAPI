let leagueName_Title = document.querySelector("#leagueName_Title");
let about = document.querySelector("#about");
let leagueName = document.querySelector("#leagueName");
let leagueLogo = document.querySelector("#leagueLogo");
let leaguePoster = document.querySelector("#leaguePoster");

fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=Turkiye`)
  .then(response => response.json())
  .then(data => {
    const leagues = data.countries;
    about.innerHTML = `<h5>Kuruluş</h5>
              <p>${leagues[0].intFormedYear}</p>
              <br>
              <h5>Ülke</h5>
              <p>${leagues[0].strCountry}</p>
              <br>
              <h5>TV</h5>
              <p>${leagues[0].strTvRights}</p>`
    leagueName.innerHTML = `<h5>Lig Adı</h5>
              <a id="leagueName" href="">${leagues[0].strLeague}</a>`              
    leagueLogo.innerHTML = `<h5>Logo</h5>
              <img src="${leagues[0].strBadge}" width="190">`    
    leaguePoster.innerHTML = `<h5>Poster</h5>
              <img src="${leagues[0].strPoster}" width="220">`                     
  })
  .catch(error => console.error('API isteği sırasında bir hata oluştu:', error)); 

