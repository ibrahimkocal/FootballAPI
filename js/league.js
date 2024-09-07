document.addEventListener('DOMContentLoaded', () => {
  // DOM elemanlarını seçin
  let leagueName_Title = document.querySelector("#leagueName_Title");
  let about = document.querySelector("#about");
  let leagueName = document.querySelector("#leagueName");
  let leagueLogo = document.querySelector("#leagueLogo");
  let leaguePoster = document.querySelector("#leaguePoster");
  let leagueInfo = document.querySelector("#leagueInfo");
  let leaguePuanDurumu = document.querySelector("#leaguePuanDurumu");
  let teamsDOM = document.querySelector("#teams");

  // Lig bilgilerini tanımlayın
  const leagues = {
    "superLig": {
      id: "4339",
      url: "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Turkish%20Super%20Lig",
      country: "Turkiye"
    },
    "birinciLig": {
      id: "4676",
      url: "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Turkish%201%20Lig",
      country: "Turkiye"
    },
    "premierLig": {
      id: "4328",
      url: "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League",
      country: "England"
    },
    "laLiga":{
      id: "4335",
      url: "https://thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Spanish%20La%20Liga",
      country: "Spain"
    },
    "serieA":{
      id: "4332",
      url: "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Italian%20Serie%20A",
      country: "Italy"
    },
    "ligue1":{
      id: "4334",
      url: "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=French%20Ligue%201",
      country: "France"
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const leagueParam = urlParams.get('league');

  const league = leagues[leagueParam];

  if (league) {
    const { id, url, country } = league;

    // LIG BILGILERI
    fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=${country}`)
      .then(response => response.json())
      .then(data => {
        let leagues = data.countries;
        let selectedLeague = leagues.find(element => element.idLeague === id);

        if (selectedLeague) {
          let league_Name = selectedLeague.strLeague;
          let league_Kurulus = selectedLeague.intFormedYear;
          let league_Country = selectedLeague.strCountry;
          let league_Logo = selectedLeague.strBadge;
          let league_Poster = selectedLeague.strPoster;
          let league_Info = selectedLeague.strDescriptionEN;

          leagueName_Title.textContent = league_Name;
          about.innerHTML = `<h5>Kuruluş</h5><p>${league_Kurulus}</p><br><h5>Ülke</h5><p>${league_Country}</p>`;
          leagueName.innerHTML = `<h5>Lig Adı</h5><a id="leagueName" href="">${league_Name}</a>`;
          leagueLogo.innerHTML = `<h5>Logo</h5><img src="${league_Logo}" width="190">`;
          leaguePoster.innerHTML = `<h5>Poster</h5><img src="${league_Poster}" width="220">`;
          leagueInfo.innerHTML = `<h5>Tanım</h5><p>${league_Info}</p>`;

          // PUAN DURUMU
          fetch(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${id}&s=2024-2025`)
            .then(response => response.json())
            .then(data => {
              let table = data.table;
              if (table && table.length > 0) {
                let tableContent = `<h5 class="text-center text-lg-start">Puan Durumu</h5>`;
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
                                                  <td class="d-block d-md-none">${table[i].strTeam.substring(0, 3).toUpperCase()}</td>
                                                  <td class="d-none d-md-block">${table[i].strTeam}</td>
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
              } else {
                leaguePuanDurumu.innerHTML = `<p>Puan durumu bulunamadı.</p>`;
              }
            })
            .catch(error => console.error('Puan durumu isteği sırasında bir hata oluştu:', error));

          // TAKIMLAR
          fetch(url)
          .then(response => response.json())
          .then(data => {
              let teams = data.teams;
              let teamsContent = `<h5>Takımlar</h5><div class="row">`;
              let counter = 0;

              teams.forEach((element, index) => {
                  teamsContent += `
                      <div class="col-4 text-center">
                          <img src="${element.strBadge}" alt="${element.strTeam}" class="img-fluid">
                          <a style="font-size:18px;" href="teams.html?teamName=${element.strTeam}" class="mt-2">${element.strTeam}</a>
                      </div>`;
                  counter++;

                  if (counter % 3 === 0 && index !== teams.length - 1) {
                      teamsContent += `</div><div class="row mt-2">`;
                  }
              });

              teamsContent += `</div>`;
              teamsDOM.innerHTML = teamsContent;
          })
         .catch(error => console.error('Takımlar isteği sırasında bir hata oluştu:', error));

        } else {
          console.error('Lig bilgisi bulunamadı.');
        }
      })
      .catch(error => console.error('Lig bilgisi isteği sırasında bir hata oluştu:', error));
  } else {
    console.error('Geçersiz lig parametresi.');
  }
});
