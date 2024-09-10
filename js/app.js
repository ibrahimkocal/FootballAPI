
document.addEventListener('DOMContentLoaded', () => {
    const teamSearchForm = document.getElementById('teamSearchForm');
    const teamSearchInput = document.getElementById('teamSearchInput');
    const teamSearchFormButton = document.getElementById('teamSearchFormButton');

    const searchTeam = () => {
        let teamName = teamSearchInput.value.trim();
        let teamNameUpper = teamName.split(' ')                 
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()  
            )
            .join(' ');                     

        if (teamName) {
            fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamNameUpper}`)
                .then(response => response.json())
                .then(data => {
                    if (data.teams && data.teams.length > 0) {
                        window.location.href = `teams.html?teamName=${teamNameUpper}`;
                    } else {
                        alert("Böyle bir takım bulunamadı!");
                    }
                })
                .catch(error => {
                    console.error('Error fetching team data:', error);
                    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
                });
        }
    };

    teamSearchFormButton.addEventListener('click', (event) => {
        event.preventDefault();
        searchTeam();
    });

    teamSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        searchTeam();
    });
});

// let teamInput = document.querySelector("#teamInput");
// let teamInputButton = document.querySelector("#teamInputButton");
// let teamResult = document.querySelector("#teamResult");

// function displayTeamInfo(teamInfo) {
//     teamResult.innerHTML = "";
//     if (teamInfo) {
//         let team_Name = `<h1>${teamInfo.team_Name}</h1>`;
//         let teamStadiumName = `<h3>Stadyum: ${teamInfo.teamStadiumName}</h3>`;
//         let teamLocation = `<h3>Şehir: ${teamInfo.teamLocation}</h3>`;
//         let teamImage = `<img style="width:70px;" src="${teamInfo.teamImage}">`;
//         teamResult.insertAdjacentHTML("beforeend", team_Name);
//         teamResult.insertAdjacentHTML("beforeend", teamStadiumName);
//         teamResult.insertAdjacentHTML("beforeend", teamLocation);
//         teamResult.insertAdjacentHTML("beforeend", teamImage);
//     } else {
//         teamResult.textContent = "Takım bulunamadı.";
//     }
// }

// function fetchTeam() {
//     let teamName = teamInput.value;

//     fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}`)
//         .then(response => response.json())
//         .then(json => {
//             let teamInfo = null;
//             if (json.teams && json.teams.length > 0) {
//                 let team = json.teams[0];
//                 teamInfo = {
//                     team_Name: team.strTeam,
//                     teamStadiumName: team.strStadium,
//                     teamLocation: team.strLocation,
//                     teamImage: team.strBadge
//                 };
//                 sessionStorage.setItem('teamInfo', JSON.stringify(teamInfo));  // sessionStorage kullanımı
//             }
//             displayTeamInfo(teamInfo);
//         })
//         .catch(error => {
//             console.error("Bir hata oluştu:", error);
//             teamResult.textContent = "Veri alınırken bir hata oluştu.";
//         });
// }

// function loadSavedTeamInfo() {
//     let savedTeamInfo = sessionStorage.getItem('teamInfo');  // sessionStorage'dan veri alınıyor
//     if (savedTeamInfo) {
//         displayTeamInfo(JSON.parse(savedTeamInfo));
//     }
// }

// // Sayfa yüklendiğinde, daha önce kaydedilmiş takımı göster
// document.addEventListener("DOMContentLoaded", loadSavedTeamInfo);

// teamInputButton.addEventListener("click", fetchTeam);
// teamInput.addEventListener("keypress", event => {
//     if (event.key === "Enter") {
//         fetchTeam();
//     }
// });
