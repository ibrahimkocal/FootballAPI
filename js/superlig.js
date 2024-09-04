let leagueName_Title = document.querySelector("#leagueName_Title");
let about = document.querySelector("#about");
let leagueName = document.querySelector("#leagueName");
let leagueLogo = document.querySelector("#leagueLogo");
let leaguePoster = document.querySelector("#leaguePoster");
let leagueInfo = document.querySelector("#leagueInfo");
let leaguePuanDurumu = document.querySelector("#leaguePuanDurumu");

// LİG BİLGİLERİ //
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
    let league_Info = leagues[0].strDescriptionEN;

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
    leagueInfo.innerHTML = ` <h5>Tanım</h5>
              <p>${league_Info}</p>`               
  })
  .catch(error => console.error('API isteği sırasında bir hata oluştu:', error)); 

// PUAN DURUMU //  
fetch('https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4339&s=2024-2025')
    .then(response => response.json())
    .then(data => {
      let table = data.table;
      let g = "";
      let b = "";
      let l = "";
      let tableContent = `<h5>Puan Durumu</h5>`;
      tableContent += `<div class="d-flex">
                         <div class="row">
                           <table class="table text-white">
                             <thead>
                               <tr>
                                 <th scope="col"></th>
                                 <th scope="col"></th>
                                 <th scope="col"></th>
                                 <th scope="col">O</th>
                                 <th scope="col">G</th>
                                 <th scope="col">B</th>
                                 <th scope="col">M</th>
                                 <th scope="col">AG</th>
                                 <th scope="col">YG</th>
                                 <th scope="col">A</th>
                                 <th scope="col">P</th>
                               </tr>
                             </thead>
                             <tbody>`;

      for (let i = 0; i < table.length; i++) {
        tableContent += `<tr>
                          <th scope="row">${table[i].intRank}.</th>
                          <td><img src="${table[i].strBadge}" width="24"></td>
                          <td>${table[i].strTeam}</td>
                          <td>${table[i].intPlayed}</td>
                          <td>${table[i].intWin}</td>
                          <td>${table[i].intDraw}</td>
                          <td>${table[i].intLoss}</td>
                          <td>${table[i].intGoalsFor}</td>
                          <td>${table[i].intGoalsAgainst}</td>
                          <td>${table[i].intGoalDifference}</td>
                          <td>${table[i].intPoints}</td>
                        </tr>`;
      }

      tableContent += `</tbody></table></div></div>`;
      tableContent += `<small>Son Güncelleme | ${table[0].dateUpdated}</small>`;

      leaguePuanDurumu.innerHTML = tableContent;
    })
  .catch(error => console.error('API isteği sırasında bir hata oluştu:', error)); 
