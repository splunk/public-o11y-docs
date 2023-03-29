
/* Layout File -- Start */
$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
    // Assign active class to nav links while scolling
    $('.bodywrapper .section a.headerlink').each(function(i) {
        //console.log("$(this).position().top: " + $(this).position().top);
        if ($(this).position().top <= scrollDistance) {
          //console.log("aaaa");
            $('.TOCL2 a.active').removeClass('active');
            $('.TOCL2 a').eq(i).addClass('active');
        }
    });
  }).scroll();

  $(document).ready(function(){


    if($('meta[name=viewport]').length > 0)
      {
          console.log("A");
      }
      else
      {
          $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
      }

      // Left Side TOC  ====>>START
      $("#welcome h1").hide();

      $("p.caption").css({"cursor": "pointer","width":"calc(100% - 10px);"});
      $("span.caption-text ").after('<span class="gg-chevron-down"></span>');
      $("p.caption").nextUntil("p.caption").hide();

      $(".toctree-l2").not(".current").each(function(){
          $(this).hide();
      });


      $("ul.current > li.toctree-l2").each(function(){
          $("li.toctree-l2").show();
      });

          var h2textNew = $("div.bodywrapper h2:first").text();
          h2textNew = h2textNew.slice(0, -3);
          h2textNew = h2textNew.trim();
          console.log("AB: " + h2textNew);

          var firstval = $("#mainTOC li.current").find("li.toctree-l3:first").text();
          console.log("B: " + firstval);

          if($("#mainTOC li.toctree-l2.current").find('ul.current').find('li.toctree-l3').length >= 1 && h2textNew == firstval)
          {
            console.log('zz');
            $("#mainTOC li.toctree-l2.current").find('ul.current').find('li.toctree-l3').show();

          }
          else if($("#mainTOC li.toctree-l2.current").find('ul').find('li.toctree-l3').length >= 1 && h2textNew == firstval)
          {
            console.log('ss');

            $("#mainTOC li.toctree-l2.current").find('ul').find('li.toctree-l3').hide()
          }



      $("div.relations").hide();

      $(".feedbackbtn").show();

      $(".navbar-toggler").on("click",function(){
          if(!$(this).hasClass('collapsed'))
          {
            $(".feedbackbtn").hide();
          }
          else
          {
            $(".feedbackbtn").show();
          }
      });

      var leftSidebarIcon ='<div id="leftSidebar" style="width: 100%; margin-bottom:0px; margin-top:8px"><span id="leftSidebarIcon" data-toggle="tooltip" title="Collapse"  class="gg-chevron-left-o"></span></div>';
      $(leftSidebarIcon).insertBefore("div.sphinxsidebarwrapper");

      $("div#leftSidebar").find('span#leftSidebarIcon').on("click", function(){
          $("div#leftSidebar").find('span#leftSidebarIcon').removeClass(function(i,class_name){
                console.log("class:",class_name);
                if(class_name == 'gg-chevron-left-o')
                {
                  console.log("AAA");
                  $("div.sphinxsidebarwrapper").css("display","none");
                  $("div.documentwrapper").css("max-width","75%");
                  $("div.documentwrapper").css("margin-left","20px");
                  $("div.documentwrapper").css("border-left","none");
                  $(this).removeClass("gg-chevron-left-o").addClass('gg-chevron-right-o');
                  $("span#leftSidebarIcon").attr("title","Expand");
                }
                if(class_name == 'gg-chevron-right-o')
                {
                  console.log("BBB");
                  $("div.sphinxsidebarwrapper").css("display","block");
                  $("div.documentwrapper").css("max-width","56%");
                  $("div.documentwrapper").css("margin-left","20%");
                  $("div.documentwrapper").css("border-left","1px solid #eee");
                  $(this).removeClass("gg-chevron-right-o").addClass('gg-chevron-left-o');
                  $("span#leftSidebarIcon").attr("title","Collapse");
                }
            });

      });

      $("p.caption").each(function(){
          if($(this).nextUntil('p.caption').hasClass('current')){
              $(this).find('span.gg-chevron-down').removeClass("gg-chevron-down").addClass('gg-chevron-up');
              $(this).nextUntil("p.caption").show();
      }
      });

      $("p.caption").on("click", function(){
        //$(this).css({"cursor": "pointer","width":"260px"});
        $(this).nextUntil("p.caption").toggle('fast');

        $(this).find('span.caption-text, span').removeClass(function(i,class_name){
            console.log("class:",class_name);
            if(class_name == 'gg-chevron-down')
            {
              $(this).removeClass("gg-chevron-down").addClass('gg-chevron-up');
            }
            if(class_name == 'gg-chevron-up')
            {
              $(this).removeClass("gg-chevron-up").addClass('gg-chevron-down');
            }
        });

        $("div.relations").hide();
      });
      // left Side TOC  ====>>END

      var modal = document.getElementById('myModal');

      var span = document.getElementsByClassName("close")[0];


    $(".close").on("click", function(){
      //$("#myModal").css("display","none");
      $("#myModal").fadeOut("5000");

      $("#searchQuery").val('');
    });

    $("#searchQuery").keyup(function(event) {
        if (event.which === 13) {
          $("#modal-search-text").val('');
            var searchQueryVAL = $("#searchQuery").val();
            $("#modal-search-text").val(searchQueryVAL);
            $(".new-modal-header").css("border-bottom","2px solid #33AAFF");

            $("#searchbtn").click();
        }
    });

    $("#modal-search-text").keyup(function(event){
        if (event.which === 13) {
            var modal_search_text_val = $("#modal-search-text").val();

            $("#searchQuery").val(modal_search_text_val);
            $("#searchbtn").click();
        }
    });

    $("#mainTOC .sphinxsidebarwrapper ul li.toctree-l1 a").each(function(){

      //var achorHtml = $(this).html()
      var anchorText = $(this).text(); 
      console.log("TEXT:" + anchorText);   
      var arrowSpan = "<span class='gg-chevron-down' style='transform: scale(var(--ggs,0.7));'></span>";
      if(anchorText.includes("TOGGLE"))
      {
          //console.log("test:" + a);
          anchorText = anchorText.replace("TOGGLE","");
          $(this).text($.trim(anchorText));
          
          //console.log("test2: " + b);
          $(this).before(arrowSpan);
          //$(this).html(ss);
         
      }
  });

  $("#mainTOC ul.current li.current").each(function() {
    $(this).find('span.gg-chevron-down').removeClass(function(i,class_name){
        console.log("class:" + class_name);
        console.log("check span:" + $(this).parent().is('li.current'));
        if(class_name == 'gg-chevron-down' && $(this).parent().is('li.current'))
             {
               $(this).removeClass("gg-chevron-down").addClass('gg-chevron-up');
             }
             if(class_name == 'gg-chevron-up' && $(this).parent().is('li.current'))
             {
               $(this).removeClass("gg-chevron-up").addClass('gg-chevron-down');
             }
    });
     
 });

    $("#searchbtn").click(function(){
        //$(".popup-overlay, .popup-content").addClass("active");
       // $("#myModal").css("display","block");
        $("#myModal").fadeIn("5000");

        var searchQuery = $("#searchQuery").val();



        $("#modal-search-text").focus();

        if (searchQuery) {
            var query = searchQuery;

            //var docssearchApiUrl =  'https://docs.staging.splunk.com/api/userutility/observabilitysearch';
            var docssearchApiUrl = 'https://docs.splunk.com/api/userutility/observabilitysearch?query='+query+'&offset=0&limit=100';
            console.info("URL:", docssearchApiUrl);
            $('#search-progress').text(_('Preparing search...'));
            $(".new-modal-header").css("display","none");
            $(".new-modal-footer").css("display","none");
            $("#search-results").empty();
            $('.page_navigation').empty();

            $.post( docssearchApiUrl,{ query:query})
            .done(function( data ) {
            var items = [];
            var jsonResult = JSON.parse(data);
            var jsonResultCount = jsonResult.data[0].message.results.length;
            var jsonResultSet = jsonResult.data[0].message.results;

            // var items = '<div class="searchSummary"><h2>Search Results</h2><p class="search-summary">Search finished, found '+jsonResultCount+' page(s) matching the search query.</p></div>';
            // items += '<ul class="search" style="overflow-y:scroll; height:376px">';
            var show_search_result_count = 'Showing '+jsonResultCount+' result(s) for "' +query+'"';
            $(".search-result-count").html(show_search_result_count);

            var items = '<ul class="search">  ';

            $.each( jsonResult.data[0].message.results, function( key, val ) {
                items += '<li class="search-li" style="text-align: left; margin-right: 25px;"><a class="search-title-link" href='+val['link']+'>'+val['title']+'</a><div class="context search-context" style="text-align:justify; margin-left:0px;">'+val['description']+'</div></li>';

            });

            items += '</ul></div>';
            // const sample = jsonResult[0]['message'][0]['results'][0]['title'];
            console.info("sample: ", items);
            $('#search-progress').empty();
            $(".new-modal-header").css("display","block");
            $(".new-modal-footer").css("display","block");
            $("#search-results").html(items);

            var maxLength = 180;
            $(".search-context").each(function(){
                var myStr = $(this).text();

                if($.trim(myStr).length > maxLength){
                  var newStr = myStr.substring(0, maxLength) + "...";
                  var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
                  $(this).empty().html(newStr);
                }
            });
            showPage(1);
            // console.info("DATAAAA: ", jsonResult.data[0].message.results);
          }).fail(function() {
            $('#search-progress').empty();
            var noResult = "<h2>No Result Found</h2>";
            $("#search-results").html(noResult);
              console.info("NO DATA");
            });
        }
        else
        {
          var noResult = "<div style='text-align:center;'><h2>No Result Found</h2></div>";
            $("#modal-search-text").val('');
            $("#search-results").html(noResult);
            $(".search-result-count").empty();
            $('.page_navigation').empty();
              console.info("NO DATA");
        }

    return false;

  });

                  makePager = function(page){
                  var show_per_page = 10;
                  var number_of_items = $('#search-results ul li').length;
                  var number_of_pages = Math.ceil(number_of_items / show_per_page);
                  var number_of_pages_todisplay = 5;
                  var navigation_html = '';
                  var current_page = page;
                  var current_link = (number_of_pages_todisplay >= current_page ? 1 : number_of_pages_todisplay + 1);
                  if (current_page > 1)
                      current_link = current_page;
                  //if (current_link != 1) navigation_html += "<a class='nextbutton' href=\"javascript:first();\">« Start&nbsp;</a>&nbsp;<a class='nextbutton' href=\"javascript:previous();\">« Prev&nbsp;</a>&nbsp;";
                  if (current_link != 1) navigation_html += "<a class='nextbutton' href=\"javascript:previous();\">« Prev&nbsp;</a>&nbsp;";
                  if (current_link == number_of_pages - 1) current_link = current_link - 3;
                  else if (current_link == number_of_pages) current_link = current_link - 4;
                  else if (current_link > 2) current_link = current_link - 2;
                  else current_link = 1;
                  var pages = number_of_pages_todisplay;
                  while (pages != 0) {
                      if (number_of_pages < current_link) { break; }
                      if (current_link >= 1)
                          navigation_html += "<a class='" + ((current_link == current_page) ? "currentPageButton" : "numericButton") + "' href=\"javascript:showPage(" + current_link + ")\" longdesc='" + current_link + "'>" + (current_link) + "</a>&nbsp;";
                      current_link++;
                      pages--;
                  }
                  if (number_of_pages > current_page){
                      //navigation_html += "<a class='nextbutton' href=\"javascript:next()\">Next »</a>&nbsp;<a class='nextbutton' href=\"javascript:last(" + number_of_pages + ");\">Last »</a>";
                      navigation_html += "<a class='nextbutton' href=\"javascript:next()\">Next »</a>";
                  }
                          $('.page_navigation').html(navigation_html);
            }
                    var pageSize = 10;
                    showPage = function (page) {
                      console.info("page: ", page);
                          $("#search-results ul li").hide();
                          $('#current_page').val(page);
                          $("#search-results ul li").each(function (n) {
                            console.info("NUM: ", n);
                              if (n >= pageSize * (page - 1) && n < pageSize * page)
                                  $(this).show();
                          });
                      makePager(page);
                    }

                    next = function () {
                          new_page = parseInt($('#current_page').val()) + 1;
                          showPage(new_page);
                      }
                      last = function (number_of_pages) {
                          new_page = number_of_pages;
                          $('#current_page').val(new_page);
                          showPage(new_page);
                      }
                      first = function () {
                          var new_page = "1";
                          $('#current_page').val(new_page);
                          showPage(new_page);
                    }
                      previous = function () {
                          new_page = parseInt($('#current_page').val()) - 1;
                          $('#current_page').val(new_page);
                          showPage(new_page);
                    }

   });


   $(document).ready(function(){
    try{
        //Menu build for navigation
        $('.sphinxsidebarwrapper a').each(function(){

            let hash = "nav-" + $(this).text().replaceAll(' ','-').replaceAll(',','');
            let url = $(this).attr('href');

            if(url.charAt(0) != '#' || url == "#"){
                $(this).attr('id', hash);
                let finalUrl = (url == "#") ? "#" + hash : (url + "#" + hash);
                $(this).attr('href', finalUrl);
            }

            $("div.relations").hide();

        });

        //Adjust left nav
        // $('.sphinxsidebar').animate({
        //     scrollTop: ($(location.hash).offset().top - 100)
        // }, 0.1);

        var getCurrOrigin = $(location).attr('origin');
        var getCurrPathName = $(location).attr('pathname');
        var newurllocation = getCurrOrigin + getCurrPathName;
        console.log('newCurrLocation:'+newurllocation);
        var getCurrentLocation = $("#mainTOC .sphinxsidebar .sphinxsidebarwrapper a.current").position().top;

        if (getCurrentLocation < 700) {
              console.log("Step2.1");
                $('.sphinxsidebar').animate({
                  scrollTop: ($("#mainTOC .sphinxsidebar .sphinxsidebarwrapper a.current").position().top - 200)
              }, 0.1);
          }
          else
          {
            console.log("Step2.2");
            $('.sphinxsidebar').animate({
              scrollTop: ($("#mainTOC .sphinxsidebar .sphinxsidebarwrapper a.current").position().top - 200)
            }, 0.1);
          }

    }catch(err){
        console.log(err);
    }


    //Card system dynamic url generation
    $('.card, .cardlong').click(function () {
        let url = $(this).find('.reference').attr('href');
        try {
            if (url.length) {
                window.location.href = url;
            }
        } catch (err) {}
    });

    $('.newcard').click(function () {
        let url = $(this).find('.reference').attr('href');
        try {
            if (url.length) {
                window.location.href = url;
            }
        } catch (err) {}
    });
    
    if($('.sphinxsidebarwrapper ul.current').length > 0) {
      var liTOC = "<li class='githubeditlink' style='margin-top:5px;'></li>";
        //console.log("aaaaa");

        if($('a.headerlink').parent().length <= 1)
        {
          $(".toctree-l2").each(function(){
              $(".toctree-l2").show();

            });
            $('#rightSideTOC').append(liTOC);
            $(".githubeditlink").html($(".olly_git_hub_link").html());
            
         
          return false;
        }


          $('a.headerlink').each(function(){
                var headingTagArray = $(this).parent();
                var headingTAGS = headingTagArray[0].tagName;
                // var headingText = $(this).parent().text();
                // headingText = headingText.slice(0, -3);
                var headingText = headingTagArray[0].innerText;
                headingText = headingText.trim();
                var headingLink = $(this).attr('href');

                if(headingTAGS == "H1")
                {
                  liTOC += "<li class='toctree-l1' style='font-size:17px;font-weight:bold;color:black; margin-top:68px;'>On this page</li>";
                }

                if(headingTAGS == "H2")
                {
                    liTOC += "<li class='toctree-l2 TOCL2' style='margin-left:20px;'><a class='reference internal' href="+headingLink+" >"+headingText+" </a></li>";
                }
                if(headingTAGS == "H3")
                {
                    liTOC += "<li class='toctree-l3 TOCL2' style='margin-left:36px;'><a class='reference internal' href="+headingLink+" >"+headingText+" </a></li>";
                }
                if(headingTAGS == "H4")
                {
                  liTOC += "<li class='toctree-l4 TOCL2' style='margin-left:52px;list-style-type: square;color: lightgrey;'><a class='reference internal' href="+headingLink+" >"+headingText+" </a></li>";
                }

          });
          console.log(liTOC);
          $('#rightSideTOC').append(liTOC);
          $(".githubeditlink").html($(".olly_git_hub_link").html());
       }else{
          var liTOC = "<li class='githubeditlink' style='margin-top:5px;'></li>";
          $('#rightSideTOC').append(liTOC);
          $(".githubeditlink").html($(".olly_git_hub_link").html());
        }

});