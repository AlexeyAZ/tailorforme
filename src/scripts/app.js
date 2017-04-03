$(function() {

    
    // webshim.activeLang('en');
    // webshims.polyfill('forms');
    // webshims.cfg.no$Switch = true;

    webshim.setOptions('forms', {
        //set lazyCustomMessages to true
        lazyCustomMessages: true,
        //show custom styleable validation bubble
        replaceValidationUI: true
    });

    //start polyfilling
    webshim.polyfill('forms');

    var body = $("body");
    var sec2Gallery = $(".sec2__gallery");

    function phoneLink() {
        var md = new MobileDetect(window.navigator.userAgent);
        var phoneLink = $(".phone-link");

        if (md.mobile()) {
            phoneLink.attr("href", "tel:" + $(".phone-link").data("phone"));
            phoneLink.removeClass("js-modal");
            phoneLink.attr("data-id", "");
            console.log("mobile")
        } else {
            phoneLink.attr("href", "");
            phoneLink.addClass("js-modal");
            phoneLink.attr("data-id", "modal-win-call");
            console.log("pc")
        }
    }
    phoneLink();

    sec2Gallery.on('init', function(event, slick) {
        $(".sec2__gallery-number-all").text(slick.slideCount);
    });

    sec2Gallery.slick({
        arrows: false,
        dots: true,
        fade: true,
        appendDots: ".sec2__gallery-dots"
    });

    sec2Gallery.on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $(".sec2__gallery-number-now").text(currentSlide + 1);
    });

    body.on("click", ".sec5__switch-panel-item", function(e) {
        e.preventDefault();
        
        var self = $(this);
        var clotchData = self.data("clotch");

        if (!self.hasClass("sec5__switch-panel-item_active")) {
            $(".sec5__switch-panel-item_active").removeClass("sec5__switch-panel-item_active");
            $(".sec5__clotch_active").removeClass("sec5__clotch_active");

            self.addClass("sec5__switch-panel-item_active");
            $("." + clotchData).addClass("sec5__clotch_active");
        }

        setChoice();
    });

    var imgLeft = $(".sec5__clotch-img_left").find("use");
    var imgRight = $(".sec5__clotch-img_right").find("use");

    var imgPants = $(".sec5__clotch-img_pants").find("use");

    var shirtImgLeft = $(".sec5__clotch-img_shirt-left").find("use");
    var shirtImgRight = $(".sec5__clotch-img_shirt-right").find("use");


    body.on("click", "#viewone", function() {
        $("#buttonfour, #buttonsix").prop("disabled", true);
        $("#buttonone, #buttonthree").prop("disabled", false);
        $("#buttonone").prop("checked", true);
    });

    body.on("click", "#viewtwo", function() {
        $("#buttonfour, #buttonsix").prop("disabled", false);
        $("#buttonone, #buttonthree").prop("disabled", true);
        $("#buttontwo").prop("checked", true);
    });

    $(".sec5__clotch-options-radio[name=smonogram], .sec5__clotch-options-radio[name=spockets]").on("change", function() {
        var self = $(this);
        var selfVal = self.val();

        if (selfVal == "cuff") {
            $(".sec5__clotch-img-monogram_show").removeClass("sec5__clotch-img-monogram_show");
            $(".sec5__clotch-img-monogram_cuff").addClass("sec5__clotch-img-monogram_show");
        } else if (selfVal == "chest") {
            $(".sec5__clotch-img-monogram_show").removeClass("sec5__clotch-img-monogram_show");
            $(".sec5__clotch-img-monogram_chest").addClass("sec5__clotch-img-monogram_show");
        } else if (selfVal == "no") {
            $(".sec5__clotch-img-monogram_show").removeClass("sec5__clotch-img-monogram_show");
        }

        if (selfVal == "1") {
            $(".sec5__clotch-img-pocket").addClass("sec5__clotch-img-pocket_show");
        } else if (selfVal == "0") {
            $(".sec5__clotch-img-pocket_show").removeClass("sec5__clotch-img-pocket_show");
        }

        switchShirtMonogram(self);
    });

    function switchShirtMonogram(checkedEl) {

        var val = checkedEl.val();
        //$(".sec5__clotch-img-monogram_show").removeClass("sec5__clotch-img-monogram_show");

        if (val == "cuff") {
            //$(".sec5__clotch-img-monogram_cuff").addClass("sec5__clotch-img-monogram_show");
        } else if (val == "chest") {
            //$(".sec5__clotch-img-monogram_chest").addClass("sec5__clotch-img-monogram_show");
        }
    }

    

    function setChoice() {
        var choice = "";
        var activeForm = $(".sec5__clotch_active");
        
        activeForm.find(".sec5__clotch-options-radio").each(function() {
            var self = $(this);

            if (self.prop("checked") && self.data("choice")) {
                var dataChoice = self.data("choice");
                choice += dataChoice;
            }
        });

        $(".sec5__issue-choise").text(choice);
    }

    setChoice();

    $(".sec5__clotch-options-radio").on("change", function() {

        var self = $(this);
        var form = self.closest(".sec5__clotch_active");
        var ar = form.serializeArray();

        if (form.hasClass("sec5__clotch_suit")) {
            var style = ar[0].value;
            var lapel = ar[1].value;
            var view = ar[2].value;
            var button = ar[3].value;
            var monogram = ar[4].value;
            var pockets = ar[5].value;
            var splines = ar[6].value;


            imgLeft.attr("xlink:href", "#suit--" + 
            "style_" + style + "-" + 
            "lapel_" + lapel + "-" + 
            "view_" + view + "-" + 
            "button_" + button + "-" +
            "pockets_" + pockets);

        } else if (form.hasClass("sec5__clotch_pants")) {
            var pstyle = ar[0].value;
            var wrinkles = ar[1].value;
            var bend = ar[2].value;

            imgPants.attr("xlink:href", "#pants--" + 
            "style_" + pstyle + "-" + 
            "wrinkles_" + wrinkles + "-" + 
            "bend_" + bend);
        } else if (form.hasClass("sec5__clotch_shirt")) {
            var sstyle = ar[0].value;
            var collar = ar[1].value;
            var cuff = ar[2].value;
            var contrastcollar = ar[5].value;
            var sbar = ar[7].value;

            shirtImgLeft.attr("xlink:href", "#shirt--" + 
            "style_" + sstyle + "-" + 
            "collar_" + collar + "-" +
            "contrastcollar_" + contrastcollar + "-" +
            "sbar_" + sbar);

            shirtImgRight.attr("xlink:href", "#shirt--" + 
            "style_" + sstyle + "-" + 
            "cuff_" + cuff + "-" +
            "contrastcollar_" + contrastcollar);
        }

        setChoice();

        // Splines
        if (splines == "0") {
            imgRight.attr("xlink:href", "#suit--classic-splines-0");
        } else if (splines == "1") {
            imgRight.attr("xlink:href", "#suit--classic-splines-1");
        } else if (splines == "2") {
            imgRight.attr("xlink:href", "#suit--classic-splines-2");
        }
    });

    // sec8 size
    function setSec8Size() {
        var sec8Bg = $(".sec8__bg");
        var sec8Window = $(".sec8__window");
        var sec8WindowHeight = sec8Window.outerHeight(true);

        if (!window.matchMedia('(max-width: 1024px)').matches) {
            sec8Bg.height(sec8WindowHeight);
        } else {
            sec8Bg.height("auto");
        }
    }

    setSec8Size();

    var sec8Gallery = $(".sec8__gallery");

    sec8Gallery.on('init', function(event, slick) {
        $(".sec8__gallery-position-all").text(slick.slideCount);
    });

    sec8Gallery.slick({
        dots: false,
        prevArrow: ".sec8__gallery-nav-btn_left",
        nextArrow: ".sec8__gallery-nav-btn_right",
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    adaptiveHeight: true
                }
            }
        ]
    });

    sec8Gallery.on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $(".sec8__gallery-position-now").text(currentSlide + 1);
    });


    $(".sec9__form-input_phone").mask("+7 (999) 999-99-99");

    $('.sec9__form-input_time').styler();

    $('.sec9__form-input_date').datepicker();

    $(".modal-win__input_date").datepicker({
        classes: "datepicker__modal"
    });

    body.on("click", ".js-modal", function(e) {
        e.preventDefault();

        if(!$(".thanks").length) {
            var self = $(this);
            var selfId = self.data("id");
            var selfText = self.text();

            $("#" + selfId).addClass("modal-win_show");
            $("html").addClass("modal-win-show");
            body.css("overflow-y", "scroll");
        }
    });

    body.on("click", function(e) {
        if ($(e.target).hasClass("modal-win") && !$(e.target).hasClass("js-modal") && !$(e.target).hasClass("modal-win__form") || $(e.target).hasClass("modal-win__close")) {
            $(".modal-win-show").removeClass("modal-win-show");
            $(".modal-win_show").removeClass("modal-win_show");
        }
    });


    // video
    var videoContainer = $(".video-container");
    var video = $("#bgvid")[0];

    $('.quote').viewportChecker({
        classToAdd: 'visible',
        classToAddForFullView: 'quote_animate',
    });


    // $(".modal-win__form").submit(function(e) {
    //     e.preventDefault();

    //     var self = $(this);
    //     //window.location = "thanks.html";

    //     var name = self.find("input[name=name]").val();
    //     //localStorage.setItem("tailorname", name);
    //     body.addClass("modal-win-show, disable-links");

    //     if (name) {
    //         $("#thanksName").text(name + ", ");
    //     } else {
    //         $("#thanksName").text("");
    //     }
        
    //     $("#thanksWindow").show();
    //     $(".modal-win_show").removeClass("modal-win_show");
    // });

    $("#modal-win-time, #modal-win-call").submit(function(e) {
        //e.preventDefault();
        window.location = "thanks.html";

        var self = $(this);

        var name = self.find("input[name=name]").val();
        localStorage.setItem("tailorname", name);
        body.addClass("modal-win-show");

        if (name) {
            $("#thanksName").text(name + ", ");
        } else {
            $("#thanksName").text("");
            $("#thanksOur").text("Наши");
        }
    });

    $("#form-open").submit(function(e) {
        //e.preventDefault();
        window.location = "thanks.html";

        var self = $(this);

        var name = self.find("input[name=name]").val();
        localStorage.setItem("tailorname", name);

        if (name) {
            $("#thanksName").text(name + ", ");
        } else {
            $("#thanksName").text("");
            $("#thanksOur").text("Наши");
        }
    });

    // $("#modal-win-call").submit(function(e) {
    //     //e.preventDefault();

    //     var self = $(this);
    //     window.location = "thanks.html";

    //     var name = self.find("input[name=name]").val();
    //     localStorage.setItem("tailorname", name);
    //     body.addClass("modal-win-show");

    //     if (name) {
    //         $("#thanksName").text(name + ", ");
    //     } else {
    //         $("#thanksName").text("");
    //     }
    // });


    // $(".modal-win__form-btn").on("click", function(e) {
    //     e.preventDefault();

    //     var self = $(this).closest("form");
    //     window.location = "thanks.html";

    //     var name = self.find("input[name=name]").val();
    //     localStorage.setItem("tailorname", name);
    //     body.addClass("modal-win-show");

    //     if (name) {
    //         $("#thanksName").text(name + ", ");
    //     } else {
    //         $("#thanksName").text("");
    //     }
    // });


    // body.on("click", ".js-back-site", function(e) {
    //     e.preventDefault();
    //     $("#thanksWindow").hide();
    //     body.removeClass("modal-win-show");
    //     body.removeClass("disable-links");
    // });


    if($(".thanks").length) {

        if (localStorage.getItem("tailorname")) {
            $("#thanksName").text(localStorage.getItem("tailorname") + ", ");
        } else {

        }
    };


    $(window).on("resize", function() {
        setSec8Size();
    });

    $(window).on("scroll", function() {
        var videoHeight = videoContainer.height();

        if ($(window).scrollTop() > videoHeight) {
            video.pause();
        } else {
            video.play();
        }
    });

    $(window).on("load", function() {
        $(".preloader_active").removeClass("preloader_active");
        setSec8Size();
    });
});

