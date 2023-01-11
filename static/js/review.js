$(document).ready(function () {
    // show_all_review()
});

function save_order() {
    let title = $('#title').val()
    let star = $('#star').val()
    let comment = $('#comment').val()

    $.ajax({
        type: 'POST',
        url: '/savereview',
        data: {title_give: title, star_give: star, comment_give: comment},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });
}
