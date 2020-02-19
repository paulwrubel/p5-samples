$(document).ready(function() {
    $('#ballCountSlider').slider({
        value: 5,
        min: 1,
        max: 1000,
        create: attachSlider,
        slide: attachSlider
    });

    function attachSlider() {
        $('#ballCount').val($('#ballCountSlider').slider("value"));
    }

    function 
});