let leagueName_Title = document.querySelector("#leagueName_Title");
let about = document.querySelector("#about");
let leagueName = document.querySelector("#leagueName");
let leagueLogo = document.querySelector("#leagueLogo");
let leaguePoster = document.querySelector("#leaguePoster");

fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=Turkiye`)
  .then(response => response.json())
  .then(data => {
    let leagues = data.countries;
    let league_Name = leagues[0].strLeague;
    let league_Kurulus = leagues[0].intFormedYear;
    let league_Country = leagues[0].strCountry;
    let league_Tv = leagues[0].strTvRights;
    let league_Logo = leagues[0].strBadge;
    let league_Poster = leagues[0].strPoster;

    leagueName_Title.textContent = `${league_Name}`
    about.innerHTML = `<h5>Kuruluş</h5>
              <p>${league_Kurulus}</p>
              <br>
              <h5>Ülke</h5>
              <p>${league_Country}</p>
              <br>
              <h5>TV</h5>
              <p>${league_Tv}</p>`
    leagueName.innerHTML = `<h5>Lig Adı</h5>
              <a id="leagueName" href="">${league_Name}</a>`              
    leagueLogo.innerHTML = `<h5>Logo</h5>
              <img src="${league_Logo}" width="190">`    
    leaguePoster.innerHTML = `<h5>Poster</h5>
              <img src="${league_Poster}" width="220">`                     
  })
  .catch(error => console.error('API isteği sırasında bir hata oluştu:', error)); 

