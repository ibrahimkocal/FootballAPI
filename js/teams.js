document.addEventListener('DOMContentLoaded', () => {
    const teamAbout = document.querySelector("#teamAbout");

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
                    const teamContent = `<br>
            <h2 class="text-center"><strong>${team.strTeam}</strong></h2>
            <br>
            <div class="container text-center text-lg-start">
                <div class="row d-block d-lg-flex justify-content-center justify-content-lg-between">
                    <div class="col-lg-2 ms-0 ms-lg-3">
                        <div class="text-left">
                            <h5><strong>Takım Adı</strong></h5><a href="">${team.strTeam}</a>
                        </div>
                        <div class="mt-5">
                            <h5><strong>Logo</strong></h5><img
                                src="${team.strBadge}"
                                alt="${team.strTeam}"
                                width="150">
                        </div>
                        <div class="mt-5">
                            <h5><strong>Stadyum</strong></h5>
                            <p>${team.strStadium}</p>
                        </div>
                        <div class="mt-5">
                            <h5><strong>Kapasite</strong></h5>
                            <p>${team.intStadiumCapacity}</p>
                        </div>
                        <div class="mt-5">
                            <h5><strong>Konum</strong></h5>
                            <p>${team.strLocation}</p>
                        </div>
                         <div class="mt-5">
                            <h5><strong>Forma</strong></h5>
                            <img src="${team.strEquipment}" width="150"></img>
                        </div>
                    </div>
                    <div id="teamsInfo" class="col-lg-9 mt-5 mt-md-4 mt-lg-0">
                        <div>
                            <h5><strong>Tanım</strong></h5>
                            <p>${team.strDescriptionEN}</p>
                        </div>
                    </div>
                </div>
            </div>`;
                    teamAbout.innerHTML = teamContent;
                    document.title = teamName;

                    // SON 5 İÇ SAHA MAÇI //
                    fetch(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${team.idTeam}`)
                        .then(response => response.json())
                        .then(data => {
                            const matches = data.results.slice(0, 5);
                            const matchContent = matches.map(match => {
                                const matchDate = new Date(match.dateEvent).toLocaleDateString();

                                return `
                        <div class="match-row d-flex align-items-center mb-3 ms-md-5">
                            <div class="d-flex align-items-center">
                                <img src="${match.strLeagueBadge}" width="40" alt="${match.strLeague}">
                                <p class="season-info d-block d-lg-none my-auto ms-2">24/25</p>    
                                <p class="season-info d-none d-lg-block my-auto ms-2">2024/2025</p>    
                            </div>
                            <div class="d-flex align-items-center team-info ms-5 ">
                                <img src="${match.strHomeTeamBadge}" width="30" alt="${match.strHomeTeam}">
                                <div class="d-flex flex-column mx-2 text-center text-lg-start">                                         
                                    <p class="d-none d-lg-block mt-3">
                                        ${match.strHomeTeam} ${match.intHomeScore}-${match.intAwayScore} ${match.strAwayTeam}
                                    </p>
                                    <p class="d-block d-lg-none">
                                        ${match.strHomeTeam.substring(0, 3).toUpperCase()} ${match.intHomeScore}-${match.intAwayScore} ${match.strAwayTeam.substring(0, 3).toUpperCase()}
                                    </p>
                                </div>
                                <img src="${match.strAwayTeamBadge}" width="30" alt="${match.strAwayTeam}">
                            </div>
                            <div class="d-flex align-items-center text-center date-info ms-4 ms-md-0 ">
                                <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" width="30" alt="${match.strTeam}">
                                <p class="d-block d-lg-none my-auto ms-2">${matchDate.slice(0, 2)}/${matchDate.slice(3, 5)}<br>${match.strTime.slice(0, 5)}</p>             
                                <p class="d-none d-lg-block my-auto ms-2">${matchDate} <br> ${match.strTime.slice(0, 5)}</p>             
                            </div>
                        </div>
                        <br>
                    `;
                            }).join('');

                            const matchCal = `<div id="matchCal" class="mt-5">
                                <h5><strong>İç Saha Son 5 Maç</strong></h5>
                                ${matchContent}
                            </div>`;

                            const teamsInfo = document.querySelector("#teamsInfo");
                            teamsInfo.insertAdjacentHTML('beforeend', matchCal);
                        })
                        .catch(error => console.error('Maç bilgileri isteği sırasında bir hata oluştu:', error));
                } else {
                    teamAbout.innerHTML = `<p>Takım bilgisi bulunamadı.</p>`;
                }
            })
            .catch(error => console.error('Takım bilgileri isteği sırasında bir hata oluştu:', error));

    } else {
        teamAbout.innerHTML = `<p>Geçersiz takım ID'si.</p>`;
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
