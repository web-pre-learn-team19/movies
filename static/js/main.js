$(document).ready(function () {
    show_list();
});

function show_list(){
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

                let temp_html = ``
                }
                $('#bucket-list').append(temp_html)
            }
    });
}
