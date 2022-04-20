$(function() {
    var controller = new ScrollMagic.Controller();
    var containerScene = new ScrollMagic.Scene({
        triggerElement: '#title',
        duration: 10
    })
    .setPin('#page-2')
    .addIndicators()
    .addTo(controller);

    var containerScene2 = new ScrollMagic.Scene({
        triggerElement: '#page-3',
        duration: 10
    })
    .setPin('#page-3')
    .addIndicators()
    .addTo(controller);

    var containerScene3 = new ScrollMagic.Scene({
        triggerElement: '#page-5',
        duration: 10
    })
    .setPin('#page-5')
    .addIndicators()
    .addTo(controller);
});