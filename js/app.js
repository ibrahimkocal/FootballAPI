let teamInput = document.querySelector("#teamInput");
let teamInputButton = document.querySelector("#teamInputButton");
let teamResult = document.querySelector("#teamResult");

function team(){
    let teamName = teamInput.value;

    fetch(`https://www.thesportsdb.com//api/v1/json/3/searchteams.php?t=${teamName}`)
    .then((response) => response.json()) //parse json data
    .then(json => {
        // Önceki içeriği temizle
        teamResult.innerHTML = "";

        if (json.teams && json.teams.length > 0) {
            console.log(json);
            teamResult.innerHTML = `<h1>${json.teams[0].strTeam}</h1>`;
            let teamStadiumName = `<h3>Stadyum: ${json.teams[0].strStadium}</h3>`;
            let teamLocation = `<h3>Şehir: ${json.teams[0].strLocation}</h3>`;
            let teamImage = `<img style="width:70px;" src=${json.teams[0].strBadge}>`
            teamResult.insertAdjacentHTML("beforeend", teamStadiumName);
            teamResult.insertAdjacentHTML("beforeend", teamLocation);
            teamResult.insertAdjacentHTML("beforeend", teamImage);
        } else {
            teamResult.textContent = "Takım bulunamadı.";
        }
    })
    .catch((error) => {
        console.error("Bir hata oluştu:", error);
        teamResult.textContent = "Veri alınırken bir hata oluştu.";
    });
}

teamInputButton.addEventListener("click", (team));
teamInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        team();
    }
});

