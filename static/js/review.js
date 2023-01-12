$(document).ready(function () {

    listing();
    $('#selectbox').change(function(){
        let target = $(this).val()
        show_select_review(target)
        // alert()

    })
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
                // let desc = rows[i]['desc']
                // let image = rows[i]['image']
                

                let star_image = '⭐'.repeat(star)

                let temp_html = `<div class="col">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h5 class="card-title">${name}</h5>
                                            <p>${star_image}</p>

                                            <textarea class="autosize" id="txtfield${num}" disabled >${comment}</textarea>

                                            <p><button type="button" id="btn-confirm${num}" class="btnmodify" onclick="modify_confirm(${num})">confirm</button></p>

                                            <span><button type="button" onclick="modify_review(${num})">modify</button></span>
                                            <span><button type="button" onclick="delete_review(${num})">delete</button></span>
                                            
                                        </div>
                                    </div>
                                </div>`

                $('#cards-box').append(temp_html)
            }
            $('.btnmodify').hide()
            
            // alert(response['msg'])
        }
    })
}

function posting() {
    // let sel_val = $("#selectbox option:selected").val();
    let sel_text = $("#selectbox option:selected").text();
    // alert(sel_text)

    // console.log(sel_val)
    // console.log(sel_text)

    // let name = $('#name').val()
    let star = $('#star').val()
    let comment = $('#comment').val()
    $.ajax({
        type: 'POST',
        url: '/review/posting',
        data: {name_give: sel_text, star_give: star, comment_give: comment},
        success: function (response) {
            // console.log('posting 완료!')
            // alert(response['msg'])
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

    // console.log(typeof text)
 
    $("#txtfield"+text).attr("disabled", false);
    $("#btn-confirm"+text).show()
}

function modify_confirm(num){
    let text = num.toString()
    let comment = $("#txtfield"+text).val()
    // console.log(val)

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


function show_select_review(val){
    if (val =='all'){
        window.location.reload()
    }else{
        
    }
}