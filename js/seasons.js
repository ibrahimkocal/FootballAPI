document.addEventListener('DOMContentLoaded', () => {
    const leagueTitle = document.querySelector("#leagueTitle");
    const weekSelect = document.querySelector("#weekSelect");
    const matchFikstur = document.querySelector("#matchFikstur");
    const seasonImage = document.querySelector("#seasonImage");

    const leagues = {
        "superLig": { id: "4339", name: "Süper Lig", weeks: 12 },
        "birinciLig": { id: "4676", name: "1. Lig", weeks: 10 },
        "premierLig": { id: "4328", name: "Premier Lig", weeks: 10 },
        "laLiga": { id: "4335", name: "La Liga", weeks: 10 },
        "serieA": { id: "4332", name: "Serie A", weeks: 10 },
        "ligue1": { id: "4334", name: "Ligue 1", weeks: 10 }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const seasonParam = urlParams.get('season');
    const season = leagues[seasonParam];

    if (season) {
        function populateWeekSelect(weeks) {
            weekSelect.innerHTML = ""; // Önce mevcut seçenekleri temizliyoruz
            for (let i = 1; i <= weeks; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.textContent = `${i}. Hafta`;
                weekSelect.appendChild(option);
            }
        }

        function fetchAndDisplayMatches(leagueId, week) {
            fetch(`https://www.thesportsdb.com/api/v1/json/3/eventsseason.php?id=${leagueId}&s=2024-2025`)
                .then(response => response.json())
                .then(data => {
                    const matches = data.events;
                    const filteredMatches = matches.filter(match => match.intRound === week.toString());
                    matchFikstur.innerHTML = filteredMatches.map(match => {
                        const matchDate = new Date(match.dateEvent).toLocaleDateString();
                        const homeScore = match.intHomeScore !== null ? match.intHomeScore : "";
                        const awayScore = match.intAwayScore !== null ? match.intAwayScore : "";
                        leagueTitle.innerHTML = `<strong>${match.strLeague}</strong>`
                        seasonImage.innerHTML = `<img class="img-fluid" src="${match.strLeagueBadge}" width="60">`
                        return `
                            <div class="match-row offset-sm-2 d-flex align-items-center justify-content-around mb-3">
                                <div class="d-flex align-items-center">
                                    <img src="${match.strLeagueBadge}" width="40" alt="${match.strLeague}">
                                    <p class="season-info d-block d-lg-none my-auto ms-2">24/25</p>    
                                    <p class="season-info d-none d-lg-block my-auto ms-2">2024/2025</p>    
                                </div>
                                <div class="d-flex align-items-center offset-sm-1 ms-5 team-info">
                                    <img src="${match.strHomeTeamBadge}" width="30" alt="${match.strHomeTeam}">
                                    <div class="d-flex flex-column mx-2 text-center text-lg-start">                                         
                                        <p class="d-none d-lg-block mt-3">
                                            ${match.strHomeTeam} ${homeScore}-${awayScore} ${match.strAwayTeam}
                                        </p>
                                        <p class="d-block d-lg-none">
                                            ${match.strHomeTeam.substring(0, 3).toUpperCase()} ${homeScore}-${awayScore} ${match.strAwayTeam.substring(0, 3).toUpperCase()}
                                        </p>
                                    </div>
                                    <img src="${match.strAwayTeamBadge}" width="30" alt="${match.strAwayTeam}">
                                </div>
                                <div class="d-flex align-items-center text-center date-info ms-4">
                                    <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" width="30" alt="${match.strTeam}">
                                    <p class="d-block d-lg-none my-auto ms-2">${matchDate.slice(0, 2)}/${matchDate.slice(3, 5)}<br>${match.strTime.slice(0, 5)}</p>             
                                    <p class="d-none d-lg-block my-auto ms-2">${matchDate} <br> ${match.strTime.slice(0, 5)}</p>             
                                </div>
                            </div>`;

                    }).join('');

                })
                .catch(error => {
                    console.error('Veri alınırken hata oluştu:', error);
                });
        }

        populateWeekSelect(season.weeks);
        fetchAndDisplayMatches(season.id, 1); // Varsayılan olarak 1. haftanın maçlarını göster

        weekSelect.addEventListener("change", () => {
            const selectedWeek = weekSelect.value;
            fetchAndDisplayMatches(season.id, selectedWeek);

        });
    } else {
        console.error("Geçersiz veya eksik sezon parametresi.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const teamSearchForm = document.getElementById('teamSearchForm');
    const teamSearchInput = document.getElementById('teamSearchInput');
    const teamSearchFormButton = document.getElementById('teamSearchFormButton');

    const showToast = (message) => {
        document.querySelector('#liveToast .toast-body').textContent = message;
        var toastElement = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastElement);
        toast.show();
    };

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
                        showToast("Böyle bir takım bulunamadı");
                    }
                })
                .catch(error => {
                    console.error('Error fetching team data:', error);
                    showToast("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
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
