$(document).ready(function () {
    listing();
});

function listing() {
    $.ajax({
        type: 'GET',
        url: '/rank',
        data: {},
        success: function (response) {
            let rows = response["movieRank"]
            for(let i = 0; i < rows.length; i++){
                let title = rows[i]["title"]
                let img = rows[i]["img"]
                let release = rows[i]["release"]
                let r_rate = rows[i]["r_rate"]
                let address = "rank/" + r_rate.split(".")[1]

                let temp_html = `<div class="col">
                                    <div class="rating">${r_rate}</div>
                                    <div class="card h-60 cardBox">
                                        <img src="${img}"
                                             class="card-img-top cardImg" >
                                        <div class="card-body">
                                            <h5 class="card-title">${title}</h5>
                                            <p class="card-text">${release}</p>
                                        </div>
                                        <a href="/${address}" class="reviewBtn">리뷰 확인</button>
                                    </div>
                                </div>`

                $('#cards-box').append(temp_html)
            }
        }
    })
}

function push_review(title) {
    console.log(title)
    $.ajax({
        type: 'POST',
        url: '/rank/pushreview',
        data: {title_give: title},
        // success: function (response) {
        //     alert(response['msg'])
        //     window.location.reload()
        // }
    });
}
