$(document).ready(function () {


    if ($('meta[name=viewport]').length > 0) {
        // console.log("A");
    } else {
        $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    }

    // Left Side TOC  ====>>START
    $("#welcome h1").hide();

    $("p.caption").css({"cursor": "pointer", "width": "calc(100% - 10px);"});
    $("span.caption-text ").after('<span class="gg-chevron-down"></span>');
    $("p.caption").nextUntil("p.caption").hide();

    $(".toctree-l2").not(".current").each(function () {
        $(this).hide();
    });


    $("ul.current > li.toctree-l2").each(function () {
        $("li.toctree-l2").show();
    });

    var h2textNew = $("div.bodywrapper h2:first").text();
    h2textNew = h2textNew.slice(0, -3);
    h2textNew = h2textNew.trim();
    // console.log("AB: " + h2textNew);

    var firstval = $("#mainTOC li.current").find("li.toctree-l3:first").text();
    // console.log("B: " + firstval);

    if ($("#mainTOC li.toctree-l2.current").find('ul.current').find('li.toctree-l3').length >= 1 && h2textNew == firstval) {
        // console.log('zz');
        $("#mainTOC li.toctree-l2.current").find('ul.current').find('li.toctree-l3').show();

    } else if ($("#mainTOC li.toctree-l2.current").find('ul').find('li.toctree-l3').length >= 1 && h2textNew == firstval) {
        // console.log('ss');

        $("#mainTOC li.toctree-l2.current").find('ul').find('li.toctree-l3').hide()
    }


    $("div.relations").hide();

    $(".feedbackbtn").show();

    $(".navbar-toggler").on("click", function () {
        if (!$(this).hasClass('collapsed')) {
            $(".feedbackbtn").hide();
        } else {
            $(".feedbackbtn").show();
        }
    });


    var leftSidebarIcon = '<div id="leftSidebar" style="width: 100%; margin-bottom:0px; margin-top:8px"><span id="leftSidebarIcon" data-toggle="tooltip" title="Collapse"  class="gg-chevron-left-o"></span></div>';
    $(leftSidebarIcon).insertBefore("div.sphinxsidebarwrapper");

    $("div#leftSidebar").find('span#leftSidebarIcon').on("click", function () {
        $("div#leftSidebar").find('span#leftSidebarIcon').removeClass(function (i, class_name) {
            console.log("class:", class_name);
            if (class_name == 'gg-chevron-left-o') {
                console.log("AAA");
                $("div.sphinxsidebarwrapper").css("display", "none");
                $("div.documentwrapper").css("max-width", "75%");
                $("div.documentwrapper").css("margin-left", "20px");
                $("div.documentwrapper").css("border-left", "none");
                $(this).removeClass("gg-chevron-left-o").addClass('gg-chevron-right-o');
                $("span#leftSidebarIcon").attr("title", "Expand");
            }
            if (class_name == 'gg-chevron-right-o') {
                console.log("BBB");
                $("div.sphinxsidebarwrapper").css("display", "block");
                $("div.documentwrapper").css("max-width", "56%");
                $("div.documentwrapper").css("margin-left", "20%");
                $("div.documentwrapper").css("border-left", "1px solid #eee");
                $(this).removeClass("gg-chevron-right-o").addClass('gg-chevron-left-o');
                $("span#leftSidebarIcon").attr("title", "Collapse");
            }
        });

    });

    $("p.caption").each(function () {
        if ($(this).nextUntil('p.caption').hasClass('current')) {
            $(this).find('span.gg-chevron-down').removeClass("gg-chevron-down").addClass('gg-chevron-up');
            $(this).nextUntil("p.caption").show();
        }
    });

    $("p.caption").on("click", function () {
        //$(this).css({"cursor": "pointer","width":"260px"});
        $(this).nextUntil("p.caption").toggle('fast');

        $(this).find('span.caption-text, span').removeClass(function (i, class_name) {
            console.log("class:", class_name);
            if (class_name == 'gg-chevron-down') {
                $(this).removeClass("gg-chevron-down").addClass('gg-chevron-up');
            }
            if (class_name == 'gg-chevron-up') {
                $(this).removeClass("gg-chevron-up").addClass('gg-chevron-down');
            }
        });

        $("div.relations").hide();
    });
    // left Side TOC  ====>>END

    $("#mainTOC .sphinxsidebarwrapper ul li.toctree-l1 a, #mobileSideBar .sphinxsidebarwrapper ul li.toctree-l1 a").each(function () {

        //var achorHtml = $(this).html()
        var anchorText = $(this).text();
        //console.log("TEXT:" + anchorText);
        var arrowSpan = "<span class='gg-chevron-down' style='transform: scale(var(--ggs,0.7));'></span>";
        if (anchorText.includes("TOGGLE")) {
            //console.log("test:" + a);
            anchorText = anchorText.replace("TOGGLE", "");
            $(this).text($.trim(anchorText));

            //console.log("test2: " + b);
            $(this).before(arrowSpan);
            //$(this).html(ss);

        }
    });

    $("#mainTOC ul.current li.current").each(function () {
        $(this).find('span.gg-chevron-down').removeClass(function (i, class_name) {
            //console.log("class:" + class_name);
            //console.log("check span:" + $(this).parent().is('li.current'));
            if (class_name == 'gg-chevron-down' && $(this).parent().is('li.current')) {
                $(this).removeClass("gg-chevron-down").addClass('gg-chevron-up');
            }
            if (class_name == 'gg-chevron-up' && $(this).parent().is('li.current')) {
                $(this).removeClass("gg-chevron-up").addClass('gg-chevron-down');
            }
        });

    });

    $('.gg-chevron-down').click(function () {
        $(this).next('a').get(0).click();
    });

});


$(document).ready(function () {

    //Card system dynamic url generation
    $('.card, .cardlong').click(function () {
        let url = $(this).find('.reference').attr('href');
        try {
            if (url.length) {
                window.location.href = url;
            }
        } catch (err) {
        }
    });

    $('.newcard').click(function () {
        let url = $(this).find('.reference').attr('href');
        try {
            if (url.length) {
                window.location.href = url;
            }
        } catch (err) {
        }
    });

    if ($('.sphinxsidebarwrapper ul.current').length > 0) {
        var liTOC = "<li class='githubeditlink' style='margin-top:5px;'></li>";
        //console.log("aaaaa");

        if ($('a.headerlink').parent().length <= 1) {
            $(".toctree-l2").each(function () {
                $(".toctree-l2").show();

            });
            $('#rightSideTOC').append(liTOC);
            $(".githubeditlink").html($(".olly_git_hub_link").html());


            return false;
        }


        $('a.headerlink').each(function () {
            var headingTagArray = $(this).parent();
            var headingTAGS = headingTagArray[0].tagName;
            // var headingText = $(this).parent().text();
            // headingText = headingText.slice(0, -3);
            var headingText = headingTagArray[0].innerText;
            headingText = headingText.trim();
            var headingLink = $(this).attr('href');

            if (headingTAGS == "H1") {
                liTOC += "<li class='toctree-l1' style='font-size:17px;font-weight:bold;color:black; margin-top:68px;'>On this page</li>";
            }

            if (headingTAGS == "H2") {
                liTOC += "<li class='toctree-l2 TOCL2' style='margin-left:20px;'><a class='reference internal' href=" + headingLink + " >" + headingText + " </a></li>";
            }
            if (headingTAGS == "H3") {
                liTOC += "<li class='toctree-l3 TOCL2' style='margin-left:36px;'><a class='reference internal' href=" + headingLink + " >" + headingText + " </a></li>";
            }
            if (headingTAGS == "H4") {
                liTOC += "<li class='toctree-l4 TOCL2' style='margin-left:52px;list-style-type: square;color: lightgrey;'><a class='reference internal' href=" + headingLink + " >" + headingText + " </a></li>";
            }

        });
        //console.log(liTOC);
        $('#rightSideTOC').append(liTOC);
        $(".githubeditlink").html($(".olly_git_hub_link").html());
    } else {
        var liTOC = "<li class='githubeditlink' style='margin-top:5px;'></li>";
        $('#rightSideTOC').append(liTOC);
        $(".githubeditlink").html($(".olly_git_hub_link").html());
    }

});