
$( document ).ready(function() {
    setInterval(function(){
        $.ajax({
            url: '/1-hbnb',
            success: function(data) {
                var checkBox = document.querySelectorAll('#myBox');
                checkBox.forEach(function(box) {
                    if (box.checked == true){
                        let amenityName = box.getAttribute('data-name')
                        $('.checkedbox').text(amenityName)
                    }})}})})})