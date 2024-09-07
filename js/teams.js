document.addEventListener('DOMContentLoaded', () => {
    const teamDetails = document.querySelector("#teamDetails");

    // URL parametrelerini al
    const urlParams = new URLSearchParams(window.location.search);
    const teamName = urlParams.get('teamName');

    if (teamName) {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}`)
            .then(response => response.json())
            .then(data => {
                const team = data.teams[0];
                console.log(team);
                if (team) {
                    const teamContent = `
                        <h1>${team.strTeam}</h1>
                        <img src="${team.strBadge}" alt="${team.strTeam}" class="img-fluid">
                        <p><strong>Ülke:</strong> ${team.strCountry}</p>
                        <p><strong>Kuruluş:</strong> ${team.intFormedYear}</p>
                        <p><strong>Stadyum:</strong> ${team.strStadium}</p>
                        <p><strong>Stadyum Kapasitesi:</strong> ${team.intStadiumCapacity}</p>
                        <p><strong>Hakkında:</strong> ${team.strDescriptionEN}</p>
                    `;
                    teamDetails.innerHTML = teamContent;
                } else {
                    teamDetails.innerHTML = `<p>Takım bilgisi bulunamadı.</p>`;
                }
            })
            .catch(error => console.error('Takım bilgileri isteği sırasında bir hata oluştu:', error));
    } else {
        teamDetails.innerHTML = `<p>Geçersiz takım ID'si.</p>`;
    }
});
