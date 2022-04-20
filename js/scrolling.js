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

    var containerScene4 = new ScrollMagic.Scene({
        triggerElement: '#steph-page',
        duration: 10
    })
    .setPin('#steph-page')
    .addIndicators()
    .addTo(controller);

    var containerScene5 = new ScrollMagic.Scene({
        triggerElement: '#klay-page',
        duration: 10
    })
    .setPin('#klay-page')
    .addIndicators()
    .addTo(controller);

    var containerScene6 = new ScrollMagic.Scene({
        triggerElement: '#dray-page',
        duration: 10
    })
    .setPin('#dray-page')
    .addIndicators()
    .addTo(controller);

    var containerScene7 = new ScrollMagic.Scene({
        triggerElement: '#regseason',
        duration: 10
    })
    .setPin('#regseason')
    .addIndicators()
    .addTo(controller);

    var containerScene8 = new ScrollMagic.Scene({
        triggerElement: '#fourfive-season',
        duration: 10
    })
    .setPin('#fourfive-season')
    .addIndicators()
    .addTo(controller);

    var containerSceneX = new ScrollMagic.Scene({
        triggerElement: '#releasereports',
        duration: 10
    })
    .setPin('#releasereports')
    .addIndicators()
    .addTo(controller);
});