
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
                    for (let i = 0; i < rows.length; i++) {
                        let title = rows[i]["title"]
                        let img = rows[i]["img"]
                        let release = rows[i]["release"]
                        let r_rate = rows[i]["r_rate"]

                        let temp_html = `<div class="col">
                                            <div class="rating">${r_rate}</div>
                                            <div class="card h-60 cardBox">
                                                <img src="${img}"
                                                     class="card-img-top cardImg" >
                                                <div class="card-body">
                                                    <h5 class="card-title">"${title}"</h5>
                                                    <p class="card-text">"${release}"</p>
                                                    <p class="mycomment">"${r_rate}"</p>
                                                </div>
                                                <a href="/review_rank" onclick="sendPost('${title}')" class="reviewBtn">리뷰 확인</a>
                                            </div>
                                        </div>`

                        $('#cards-box').append(temp_html)
                    }
                }
            })
        }


        // function sendPost(url,title){
        //     var form=document.createElement('form');
        //     form.setAttribute('method','post');
        //     form.setAttribute('action','/rank/push_review')
        //     document.charset ="utf-8";
        //     for(var key in params){
        //         var hiddenField = document.createElement('input');
        //         hiddenField.setAttribute('type','hidden');
        //         hiddenField.setAttribute('name',key)
        //         hiddenField.setAttribute('value',params[key]);
        //         form.appendChild(hiddenField);
        //     }
        //     document.body.appendChild(form);
        //     form.submit();


        function push_review(title) {
            $.ajax({
                type: 'POST',
                url: '/rank/push_review',
                data: {title1_give: title},
                success: function() {
                }
            });
        }

