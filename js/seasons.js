document.addEventListener('DOMContentLoaded', () => {
    let matchFikstur = document.querySelector("#matchFikstur");

    const leagues = {
      "superLig": { id: "4339" },
      "birinciLig": { id: "4676" },
      "premierLig": { id: "4328" },
      "laLiga": { id: "4335" },
      "serieA": { id: "4332" },
      "ligue1": { id: "4334" }
    };
  
    const urlParams = new URLSearchParams(window.location.search);
    const seasonParam = urlParams.get('season');
    const season = leagues[seasonParam];
  
    if (season) {
        const { id } = season;
        
        fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=${id}&s=2024-2025`)
        .then(response => response.json())
        .then(data => {
            let matchs = data.events;

            if (matchs && matchs.length > 0) {
                const matchHTML = matchs.map(match => {
                    const matchDate = new Date(match.dateEvent).toLocaleDateString();
                    const homeScore = match.intHomeScore !== null ? match.intHomeScore : "";
                    const awayScore = match.intAwayScore !== null ? match.intAwayScore : "";

                    return `
                        <div class="match-row d-flex align-items-center justify-content-around mb-3">
                            <div class="d-flex align-items-center">
                                <img src="${match.strLeagueBadge}" width="40" alt="${match.strLeague}">
                                <p class="season-info d-block d-lg-none my-auto ms-2">24/25</p>    
                                <p class="season-info d-none d-lg-block my-auto ms-2">2024/2025</p>    
                            </div>
                            <div class="d-flex align-items-center team-info ms-4">
                                <img src="${match.strHomeTeamBadge}" width="30" alt="${match.strHomeTeam}">
                                <div class="d-flex flex-column mx-2 text-center text-lg-start">                                         
                                    <p class="d-none d-lg-block mt-3">
                                        ${match.strHomeTeam} ${homeScore}-${awayScore} ${match.strAwayTeam}
                                    </p>
                                    <p class="d-block d-lg-none ">
                                        ${match.strHomeTeam.substring(0, 3).toUpperCase()} ${homeScore}-${awayScore} ${match.strAwayTeam.substring(0, 3).toUpperCase()}
                                    </p>
                                </div>
                                <img src="${match.strAwayTeamBadge}" width="30" alt="${match.strAwayTeam}">
                            </div>
                            <div class="d-flex align-items-center text-center date-info ">
                                <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" width="30" alt="${match.strTeam}">
                                <p class="d-block d-lg-none my-auto ms-2">${matchDate.slice(0, 2)}/${matchDate.slice(3, 5)}<br>${match.strTime.slice(0, 5)}</p>             
                                <p class="d-none d-lg-block my-auto ms-2">${matchDate} <br> ${match.strTime.slice(0, 5)}</p>             
                            </div>
                        </div>
                    `;
                }).join('');

                matchFikstur.innerHTML = matchHTML;
            } else {
                console.log("Maç verileri bulunamadı.");
            }
        })
        .catch(error => {
            console.error('Veri alınırken hata oluştu:', error);
        });
    } else {
        console.log("Sezon parametresi geçersiz veya eksik.");
    }
});
