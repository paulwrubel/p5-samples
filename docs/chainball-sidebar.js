$(document).ready(function() {
    $('#testslider').slider({
        value: 5,
        min: 1,
        max: 1000,
        create: attachSlider,
        slide: attachSlider
    });

    function attachSlider() {
        $('#testtest').text($('#testslider').slider("value"));
    }
});