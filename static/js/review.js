$(document).ready(function () {
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
                // let desc = rows[i]['desc']
                // let image = rows[i]['image']
                

                let star_image = '⭐'.repeat(star)

                let temp_html = `<div class="col">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <h5 class="card-title">${name}</h5>
                                            <p>${star_image}</p>
                                            <p class="mycomment">${comment} 
                                            <span><button>modify</button></span>
                                            <span><button>delete</button></span>
                                            </p>
                                            
                                        </div>
                                    </div>
                                </div>`

                $('#cards-box').append(temp_html)
            }
            // alert(response['msg'])
        }
    })
}

function posting() {
    let sel_val = $("#selectbox option:selected").val();
    let sel_text = $("#selectbox option:selected").text();
    alert(sel_text)

    // console.log(sel_val)
    // console.log(sel_text)

    let name = $('#name').val()
    let star = $('#star').val()
    let comment = $('#comment').val()
    $.ajax({
        type: 'POST',
        url: '/review/posting',
        data: {name_give: name, star_give: star, comment_give: comment},
        success: function (response) {
            // console.log('posting 완료!')
            // alert(response['msg'])
            window.location.reload()
        }
    });
}