$(function() {
    var controller = new ScrollMagic.Controller();
    var containerScene = new ScrollMagic.Scene({
        triggerElement: '#page-2',
        duration: 500
    })
    .setPin('#page-2')
    .addIndicators()
    .addTo(controller);
});