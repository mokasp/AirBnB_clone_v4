
$( document ).ready(function() {
    setInterval(function(){
        $.ajax({
            url: '/1-hbnb',
            success: function(data) {
                var checkBox = document.querySelectorAll('#myBox');
                let checked = []
                checkBox.forEach(function(box) {
                    if (box.checked === true){
                        let amenityName = box.getAttribute('data-name')
                        checked.push(amenityName)
                    } else {
                        let amenityName = box.getAttribute('data-name')
                        let index = checked.indexOf(amenityName);
                        if (index !== -1) {
                            checked.splice(index, 1);
                    }
                    let spacelist = checked.join(", ")
                    $('.checkedbox').text(spacelist)
                }})}})})})