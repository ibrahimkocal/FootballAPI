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
                    const teamContent = `<br>
        <div>
            <h2 class="text-center"><strong>${team.strTeam}</strong></h2>
            <br>
            <div class="container text-center text-lg-start">
                <div class="row d-block d-lg-flex justify-content-center justify-content-lg-between">
                    <div class="col-lg-2 ms-0 ms-lg-3">
                        <div class="text-left">
                            <h5><strong>Takım Adı</strong></h5><a href="">${team.strTeam}"</a>
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
                        <div id="matchCal" class="mt-5">
                            <h5><strong>Ev Saha Son 5 Maç</strong></h5>
                            <div class="d-flex align-items-center justify-content-evenly mt-4">
                                <div class="d-flex align-items-center justify-content-between">
                                    <img src="${team.strBadge}" width="50">
                                    <p class="d-block d-lg-none my-auto">24/25</p>    
                                    <p class="d-none d-lg-block my-auto ms-2">2024-2025</p>    
                                </div>
                                <div class="d-flex align-items-center justify-content-between">
                                    <img src="${team.strBadge}" width="40" alt="${team.strTeam}">
                                    <p class="d-block d-lg-none my-auto ms-2">FB 3 - 0 ALA</p>
                                    <p class="d-none d-lg-block my-auto ms-3">Fenerbahçe 3 - 0 Alanyaspor</p>
                                    <img class="ms-3" src="https://www.thesportsdb.com/images/media/team/badge/9fr3071601667898.png" width="40" alt="${team.strTeam}">
                                </div>
                                 <div class="d-flex align-items-center justify-content-between">
                                    <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" width="40" alt="${team.strTeam}">
                                    <p class="d-block d-lg-none my-auto ms-2">30/08<br>20:00 </p>             
                                    <p class="d-none d-lg-block my-auto ms-2">30-08-2024 | 20:00 </p>             
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
                    teamDetails.innerHTML = teamContent;
                    document.title = teamName;
                } else {
                    teamDetails.innerHTML = `<p>Takım bilgisi bulunamadı.</p>`;
                }

                 // SON 5 İÇ SAHA MAÇI //
                fetch(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${team.idTeam}`)
                .then(response => response.json())
                .then(data => {
                    const teamHomeID = data.results[0].idHomeTeam;
                    console.log(teamHomeID);
                })
            })
            .catch(error => console.error('Takım bilgileri isteği sırasında bir hata oluştu:', error));

            

    } else {
        teamDetails.innerHTML = `<p>Geçersiz takım ID'si.</p>`;
    }
});
