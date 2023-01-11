$(document).ready(function () {
    show_all_review();
});

function show_all_review() {
    $('#comment-list').empty()
    $.ajax({
        type: 'GET',
        url: '/reviews',
        data: {},
        success: function (response) {
            let rows = response['reviewList']
            for (let i = 0; i < rows.length; i++) {
                let num = rows[i]['num']
                let title = rows[i]['title']
                let star = rows[i]['star']
                let comment = rows[i]['comment']

                let star_image = '⭐️'.repeat(star)

                let temp_html = `<div class="card">
                                    <div class="card-body">
                                        <blockquote class="blockquote mb-0">
                                            <div class="titleinpost">${title}</div>
                                            <div class="starinpost">${star_image}</div>
                                            <div class="reviewinpost">${comment}</div>
                                            <div class="btnarea">
                                                <button onclick="modify_review(${num})" type="button" class="btn btn-outline-primary">수정</button>
                                                <button onclick="delete_review(${num})" type="button" class="btn btn-outline-secondary">삭제</button>
                                            </div>
                                        </blockquote>
                                    </div>
                                </div>`
                $('#comment-list').append(temp_html)
            }
        }
    });
}

function save_review() {
    let title = $('#title').val()
    let star = $('#star').val()
    let comment = $('#comment').val()

    $.ajax({
        type: 'POST',
        url: '/reviews',
        data: {title_give: title, star_give: star, comment_give: comment},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });
}
