$(document).ready(function () {
    show_rank();
});

function show_rank(){
    $.ajax({
        type: "GET",
        url: "/rank",
        data: {},
        success: function (response) {
            let rows = response['rankings']
            for (let i = 0; i < rows.length; i++) {
                let title = rows[i]['title']
                let img_url = rows[i]['img_url']
                let open_date = rows[i]['open_date']

                let temp_html = `<div class="card mb-3" style="max-width: 480px;">
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <img src="${img_url}" class="img-fluid rounded-start" alt="...">
                                            </div>
                                            <div class="rank_box">
                                                <div class="col-md-8" id="rank_card">
                                                    <div class="card-body">
                                                        <h5 class="card-title">${title}</h5>
                                                        <p class="card-text">${open_date}</p>
                                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                $('#rank_card').append(temp_html)
            }
        }
    });
}
