function backgroundCompare(options) {
    // getting the attributes
    const before = options.beforeImage;
    const after = options.afterImage;
    const bgSize = options.bgSize || "contain";
    const targetId = options.targetId;
    const showTooltips = options.showTooltips || "yes";
    const txtBefore = options.beforeTooltip || "Before";
    const txtAfter = options.afterTooltip || "After";


    console.log("Script Parameters:\n" + options);

    //Generating the slider

    var targetElement = document.getElementById(targetId);

    console.log("Target ID : " + targetElement);

    var docfrag = document.createDocumentFragment();

    var container1 = document.createElement("div");
    container1.className = "super-container";
    docfrag.appendChild(container1);

    var container2 = document.createElement('div');
    container2.className = "aspect-container";
    container1.appendChild(container2);

    var aspectCritical = document.createElement('div');
    aspectCritical.className = "aspect-critical-content";
    container2.appendChild(aspectCritical);

    var beforeWrapper = document.createElement('div');
    beforeWrapper.className = "before-wrapper";
    beforeWrapper.id = "before" + targetId;
    aspectCritical.appendChild(beforeWrapper);

    var afterWrapper = document.createElement('div');
    afterWrapper.className = "after-wrapper";
    beforeWrapper.appendChild(afterWrapper);

    var afterImage = document.createElement('div');
    afterImage.className = "after-image";
    afterImage.id = "after" + targetId;
    afterWrapper.appendChild(afterImage);

    var sliderHandle = document.createElement('div');
    sliderHandle.className = "comparison-slider handle";
    aspectCritical.appendChild(sliderHandle);

    if (showTooltips === "yes") {
        var beforeTooltip = document.createElement('div');
        beforeTooltip.className = "avant";
        beforeTooltip.textContent = txtBefore;
        sliderHandle.appendChild(beforeTooltip);

        var afterTooltip = document.createElement('div');
        afterTooltip.className = "apres";
        afterTooltip.textContent = txtAfter;
        sliderHandle.appendChild(afterTooltip);
    }

    targetElement.appendChild(docfrag);


    // Putting the images in the background

    var beforeTarget = "#before" + targetId;
    var afterTarget = "#after" + targetId;

    console.log(beforeTarget);


    $(beforeTarget).css({
        "background": "url(" + before + ") center no-repeat",
        "background-size": bgSize
    });
    $(afterTarget).css({
        "background": "url(" + after + ") center no-repeat",
        "background-size": bgSize
    });


    $(this).find('.comparison-slider').css({
        left: '50%',
        transition: 'all 1.5s'
    });
    $(this).find('.after-wrapper').css({
        transform: 'translateX(50%)',
        transition: 'all 1.5s'
    });
    $(this).find('.after-image').css({
        transform: 'translateX(-50%)',
        transition: 'all 1.5s'
    });


    let down = false;

    $(targetElement).find('.comparison-slider').on("mousedown touchstart", function() {
        down = true;
        $('.avant, .apres').stop().fadeOut(100);

    });
    $(targetElement).on("mouseup touchend", function() {
        down = false;
        $('.avant, .apres').stop().fadeIn(400);
    });

    $(targetElement).on("touchmove", function(e) {
        e.preventDefault();
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        if (down) {

            var offsets = $(targetElement).find('.before-wrapper').offset();
            var fullWidth = $(targetElement).find('.before-wrapper').width();
            var mouseX = touch.pageX - offsets.left;

            if (mouseX < 0) { mouseX = 0; } else if (mouseX > fullWidth) { mouseX = fullWidth }

            $(targetElement).find('.before-wrapper').parent().find('.comparison-slider').css({
                left: mouseX,
                transition: 'none'
            });
            $(targetElement).find('.before-wrapper').find('.after-wrapper').css({
                transform: 'translateX(' + (mouseX) + 'px)',
                transition: 'none'
            });
            $(targetElement).find('.before-wrapper').find('.after-image').css({
                transform: 'translateX(' + (-1 * mouseX) + 'px)',
                transition: 'none'
            });

        }

    });

    $(targetElement).on("mousemove", function(e) {

        if (down) {

            var offsets = $(targetElement).find('.before-wrapper').offset();
            var fullWidth = $(targetElement).find('.before-wrapper').width();
            var mouseX = e.pageX - offsets.left;



            if (mouseX < 0) { mouseX = 0; } else if (mouseX > fullWidth) { mouseX = fullWidth }


            $(targetElement).find('.before-wrapper').parent().find('.comparison-slider').css({
                left: mouseX,
                transition: 'none'
            });
            $(targetElement).find('.before-wrapper').find('.after-wrapper').css({
                transform: 'translateX(' + (mouseX) + 'px)',
                transition: 'none'
            });
            $(targetElement).find('.before-wrapper').find('.after-image').css({
                transform: 'translateX(' + (-1 * mouseX) + 'px)',
                transition: 'none'
            });

        }

    });



}



$(window).resize(function() {
    $(document).find('.comparison-slider').css({
        left: '50%',
        transition: 'all 1.5s'
    });
    $(document).find('.after-wrapper').css({
        transform: 'translateX(50%)',
        transition: 'all 1.5s'
    });
    $(document).find('.after-image').css({
        transform: 'translateX(-50%)',
        transition: 'all 1.5s'
    });
});