$(document).ready(function () {
    function resize(obj) {
        obj.style.height = '1px';
        obj.style.height = (12 + obj.scrollHeight) + 'px';
    }

    console.log('load!')
    listing();
});

function listing() {
    $.ajax({
        type: 'GET',
        url: '/review/posting',
        data: {},
        success: function (response) {
            let rows = response['reviews']
            for (let i=0; i<rows.length; i++)
            {
                let name = rows[i]['name']
                let comment = rows[i]['comment']
                let star = rows[i]['star']
                let num = rows[i]['num']

                let star_image = '⭐'.repeat(star)

                let temp_html = `<div class="card">
                                    <div class="card-body">
                                        <blockquote class="blockquote mb-0">
                                            <h5 class="card-title">${name}</h5>
                                            <p>${star_image}</p>
                                            <textarea class="autosize" id="txtfield${num}" disabled>${comment}</textarea>
                                            <div class="btnarea">
                                                <p><button type="button" id="btn-confirm${num}" class="btn btn-primary btnmodify" onclick="modify_confirm(${num})">confirm</button></p>
                                                <span><button type="button" onclick="modify_review(${num})" class="btn btn-outline-primary" id="modifybtn${num}">modify</button></span>
                                                <span><button type="button" onclick="delete_review(${num})" class="btn btn-outline-secondary" id="deletebtn${num}">delete</button></span>
                                            </div>     
                                        </blockquote>                                    
                                    </div>   
                                </div>`
                $('#cards-box').append(temp_html)
            }
            $('.btnmodify').hide()
        }
    })
}

function posting() {
    let sel_text = $("#selectbox option:selected").text();
    let star = $('#star').val()
    let comment = $('#comment').val()
    $.ajax({
        type: 'POST',
        url: '/review/posting',
        data: {name_give: sel_text, star_give: star, comment_give: comment},
        success: function (response) {
             alert(response['msg'])
            window.location.reload()
        }
    });
}

function delete_review(num){
    $.ajax({
        type: "POST",
        url: "/review/delete",
        data: {num_give: num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}

function modify_review(num){
    let text = num.toString()

    $("#txtfield"+text).attr("disabled", false)
    $("#btn-confirm"+text).show()
    $("#modifybtn"+text).hide()
    $("#deletebtn"+text).hide()
}

function modify_confirm(num){
    let text = num.toString()
    let comment = $("#txtfield"+text).val()

    $.ajax({
        type: "POST",
        url: "/review/modify",
        data: {num_give: num, comment_give: comment},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}