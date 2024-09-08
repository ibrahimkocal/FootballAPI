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

                                return `<div class="mt-5">
                            <div class="d-flex align-items-center justify-content-between mt-4">
                                <div class="d-flex">
                                    <img src="${match.strLeagueBadge}" width="50">
                                    <p class="d-block d-lg-none my-auto">24/25</p>    
                                    <p class="d-none d-lg-block my-auto ms-2">${match.strSeason}</p>    
                                </div>
                                <div class="d-flex col-md-2">
                                    <div class="align-items-center">
                                        <img src="${match.strHomeTeamBadge}" width="40" alt="${match.strHomeTeam}">
                                        <p class="d-block d-lg-none my-auto ">${match.strHomeTeam.substring(0, 3).toUpperCase()}</p>
                                        <p class="d-none d-lg-block my-auto">${match.strHomeTeam}</p>
                                    </div>
                                    
                                     <div class="align-items-center ms-3">
                                        <img src="${match.strAwayTeamBadge}" width="40" alt="${match.strAwayTeam}">
                                        <p class="d-block d-lg-none my-auto">${match.strAwayTeam.substring(0, 3).toUpperCase()}</p>
                                        <p class="d-none d-lg-block my-auto">${match.strAwayTeam}</p>
                                    </div>     
                                    
                                </div>
                                 <div class="d-flex align-items-center justify-content-between">
                                    <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" width="40" alt="${match.strTeam}">
                                    <p class="d-block d-lg-none my-auto ms-2">${matchDate.slice(0, 2)}/${matchDate.slice(3, 5)}<br>${match.strTime.slice(0, 5)}</p>             
                                    <p class="d-none d-lg-block my-auto ms-2">${matchDate} | ${match.strTime.slice(0, 5)}</p>             
                                </div>
                            </div>
                        </div>
                        <br>`;
                            }).join('');

                            const matchCal = `<div id="matchCal" class="mt-5">
                                <h5><strong>Ev Saha Son 5 Maç</strong></h5>
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
