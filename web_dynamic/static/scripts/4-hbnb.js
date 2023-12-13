$( document ).ready(function() {
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: "POST",
        data: JSON.stringify({}),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        success: function(response){
            response.forEach(function(place) {
                $('.places').append('<article class="place_box"></article>')
                $('.place_box').last().append('<div class="title_box"><h2></h2></div')
                $('.title_box h2').last().html( '#' + place.name)
                $('.title_box').last().append('<div class="price_by_night"></div>')
                $('.price_by_night').last().html('$')
                $('.price_by_night').last().html('$' + place.price_by_night)
                $('.place_box').last().append('<div class="information"></div>')
                $('.information').last().append('<div class="max_guest"></div>')
                $('.max_guest').last().text(place.max_guest + ' guests')
                $('.information').last().append('<div class="number_rooms"></div>')
                $('.number_rooms').last().html(place.number_rooms + ' rooms')
                $('.information').last().append('<div class="number_bathrooms"></div>')
                $('.number_bathrooms').last().html(place.number_bathrooms + ' bathrooms')
                $('.place_box').last().append('<div class="description"></div>')
                $('.description').last().html(place.description)
            })
            setInterval(function(){
                $.ajax({
                    url: '/4-hbnb',
                    success: function(data) {
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
                        })
                                
                        let searchDict = {}
                        if (checkedId.length !== 0) {
                        searchDict = {"amenities": checkedId}
                        }
                        $.ajax({
                            url: 'http://0.0.0.0:5001/api/v1/places_search',
                            type: "POST",
                            data: JSON.stringify(searchDict),
                            contentType:"application/json; charset=utf-8",
                            dataType: "json",
                            success: function(response){
                                response.forEach(function(place) {
                                    $('button').on("click", function() {
                                        document.querySelectorAll('.place_box').forEach(e => e.remove());
                                        document.querySelectorAll('.title_box').forEach(e => e.remove());
                                        $('.places').append('<article class="place_box"></article>')
                                        $('.place_box').last().append('<div class="title_box"><h2></h2></div')
                                        $('.title_box h2').last().html( '#' + place.name)
                                        $('.title_box').last().append('<div class="price_by_night"></div>')
                                        $('.price_by_night').last().html('$')
                                        $('.price_by_night').last().html('$' + place.price_by_night)
                                        $('.place_box').last().append('<div class="information"></div>')
                                        $('.information').last().append('<div class="max_guest"></div>')
                                        $('.max_guest').last().text(place.max_guest + ' guests')
                                        $('.information').last().append('<div class="number_rooms"></div>')
                                        $('.number_rooms').last().html(place.number_rooms + ' rooms')
                                        $('.information').last().append('<div class="number_bathrooms"></div>')
                                        $('.number_bathrooms').last().html(place.number_bathrooms + ' bathrooms')
                                        $('.place_box').last().append('<div class="description"></div>')
                                        $('.description').last().html(place.description)
                                        $('.h1place').text('hiii')
                                    })
                                })
                            }
                        })
                        $.get('http://0.0.0.0:5001/api/v1/status/', function(data, textStatus) {
                            if (textStatus === 'success') {
                                $('#api_status').addClass('available')
                            }
                            if (textStatus !== 'success') {
                                $('#api_status').removeClass('available').addClass('not')
        
                            }   
                        })
                    }
                })
            })
        }})
    })
