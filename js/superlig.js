let teamInfo = document.querySelector("#teamInfo");
let teamImage = document.querySelector("#teamImage");
let teamName = document.querySelector("#teamName");

fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Turkish%20Super%20Lig`)
  .then(response => response.json())
  .then(data => {
    data.teams.forEach(team => {
      console.log(team.strTeam);
      
    });
  })
  .catch(error => console.error('Error:', error));

