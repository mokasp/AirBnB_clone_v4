$( document ).ready(function() {
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: "POST",
        data: JSON.stringify({}),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        success: function(response){
            let html = ''
            response.forEach(function(place) {
                html += '<article class="place_box">';
                html += '<div class="title_box"><h2>' + '#' + place.name + '</h2>';
                html += '<div class="price_by_night">$' + place.price_by_night + '</div></div>';
                html += '<div class="information">';
                html += '<div class="max_guest">' + place.max_guest + ' guests</div>';
                html += '<div class="number_rooms">' + place.number_rooms + ' rooms</div>';
                html += '<div class="number_bathrooms">' + place.number_bathrooms + ' bathrooms</div>';
                html += '</div>';
                html += '<div class="description">' + place.description + '</div>';
                html += '</article>';
            })
            $('.places').html(html);
            $.get('http://0.0.0.0:5001/api/v1/status/', function(data, textStatus) {
                if (textStatus === 'success') {
                    $('#api_status').addClass('available')
                }
                if (textStatus !== 'success') {
                    $('#api_status').removeClass('available').addClass('not')
                }
                let searchDict = {}
                setInterval(function(){
                    let checkBox = document.querySelectorAll('#myBox');
                    let checkedName = []
                    let checkedId = []
                    checkBox.forEach(function(box) {
                        if (box.checked === true){
                            let amenityName = box.getAttribute('data-name')
                            let amenityId = box.getAttribute('data-id')
                            checkedName.push(amenityName)
                            checkedId.push(amenityId)
                        } else {
                            let amenityName = box.getAttribute('data-name')
                            let index = checkedName.indexOf(amenityName);
                            if (index !== -1) {
                                checkedName.splice(index, 1);
                                checkedId.splice(index, 1)
                            }}
                        let spacelist = checkedName.join(", ")
                        $('.checkedbox').text(spacelist)
                        searchDict = {}
                        if (checkedId.length !== 0) {
                        searchDict = {"amenities": checkedId}
                        }
                    })
                })
                $('button').on("click", function() {
                    $.ajax({
                        url: 'http://0.0.0.0:5001/api/v1/places_search',
                        type: "POST",
                        data: JSON.stringify(searchDict),
                        contentType:"application/json; charset=utf-8",
                        dataType: "json",
                        success: function(response){
                            let html = ''
                            $('.places').html(html);
                            response.forEach(function(place) {
                                html += '<article class="place_box">';
                                html += '<div class="title_box"><h2>' + '#' + place.name + '</h2>';
                                html += '<div class="price_by_night">$' + place.price_by_night + '</div></div>';
                                html += '<div class="information">';
                                html += '<div class="max_guest">' + place.max_guest + ' guests</div>';
                                html += '<div class="number_rooms">' + place.number_rooms + ' rooms</div>';
                                html += '<div class="number_bathrooms">' + place.number_bathrooms + ' bathrooms</div>';
                                html += '</div>';
                                html += '<div class="description">' + place.description + '</div>';
                                html += '</article>';
                            })
                            $('.places').html(html);
                        }
                    })
                })
            })
        }
    })
})
