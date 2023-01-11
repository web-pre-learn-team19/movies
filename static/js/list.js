$(document).ready(function () {
    show_all_list();
});

function show_all_list(){
    $('#movie-list').empty()
    $.ajax({
        type: "GET",
        url: "/watchlist",
        data: {},
        success: function (response) {
            let rows = response['watchLists']
            for (let i = 0; i < rows.length; i++) {
                let movie = rows[i]['movie']
                let done = rows[i]['done']
                let num = rows[i]['num']

                let temp_html = ``
                if (done == 0) {
                    temp_html = `<li>
                                    <h2><input type="checkbox" onclick="done_list(${num})"/> ${movie}</h2>
                                    <button type="button" onclick="delete_list(${num})"><span class="material-icons">delete</span></button>
                                </li>`
                } else {
                    temp_html = `<li>
                                    <h2 class="done"><input type="checkbox" onclick="cancel_list(${num})" checked/> ${movie}</h2>
                                    <button type="button" onclick="delete_list(${num})"><span class="material-icons">delete</span></button>
                                </li>`
                }
                $('#movie-list').append(temp_html)
            }
        }
    });
}
function show_unchecked_list(){
    $('#movie-list').empty()
    $.ajax({
        type: "GET",
        url: "/watchlist",
        data: {},
        success: function (response) {
            let rows = response['watchLists']
            for (let i = 0; i < rows.length; i++) {
                let movie = rows[i]['movie']
                let done = rows[i]['done']
                let num = rows[i]['num']

                let temp_html = ``
                if (done == 0) {
                    temp_html = `<li>
                                    <h2><input type="checkbox" onclick="done_list(${num})"/> ${movie}</h2>
                                    <button type="button" onclick="delete_list(${num})"><span class="material-icons">delete</span></button>
                                </li>`
                }
                $('#movie-list').append(temp_html)
            }
        }
    });
}
function show_checked_list(){
    $('#movie-list').empty()
    $.ajax({
        type: "GET",
        url: "/watchlist",
        data: {},
        success: function (response) {
            let rows = response['watchLists']
            for (let i = 0; i < rows.length; i++) {
                let movie = rows[i]['movie']
                let done = rows[i]['done']
                let num = rows[i]['num']

                let temp_html = ``
                if (done == 1) {
                    temp_html = `<li>
                                    <h2 class="done"><input class="checkedBox" type="checkbox" onclick="cancel_list(${num})" checked/> ${movie}</h2>
                                    <button type="button" onclick="delete_list(${num})"><span class="material-icons">delete</span></button>
                                </li>`
                }
                $('#movie-list').append(temp_html)
            }
        }
    });
}
function save_list(){
    let movie = $('#mymovie').val()

    $.ajax({
        type: "POST",
        url: "/watchlist",
        data: {movie_give: movie},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}
function done_list(num){
    $.ajax({
        type: "POST",
        url: "/watchlist/done",
        data: {num_give: num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}
function cancel_list(num){
    $.ajax({
        type: "POST",
        url: "/watchlist/cancel",
        data: {num_give: num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}
function delete_list(num){
    $.ajax({
        type: "POST",
        url: "/watchlist/delete",
        data: {num_give: num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}