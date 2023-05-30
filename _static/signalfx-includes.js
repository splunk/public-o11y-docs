$(document).ready(function() {
  $('.new-page').attr('target', '_blank');

  $('.sphinxsidebarwrapper a').each(function() {
    let hash = "nav-" + $(this).text().replaceAll(' ', '-').replaceAll(',', '');
    let url = $(this).attr('href');

    if (url.charAt(0) != '#' || url == "#") {
      $(this).attr('id', hash);
      let finalUrl = (url == "#") ? "#" + hash : (url + "#" + hash);
      $(this).attr('href', finalUrl);
    }

    $("div.relations").hide();

  });

  let scrollToTarget = function(targetID) {
    let target = $(targetID);
    if (target.length) {
      let targetTop = target.offset().top;
      $('html, body').scrollTop(targetTop - 100);
    }
  }

  let scrollToMenu = function(){
    setTimeout(function() {
      let getCurrentLocation = $("#mainTOC .sphinxsidebar .sphinxsidebarwrapper a.current").position().top;
      if (getCurrentLocation < 700) {
        $('.sphinxsidebar').scrollTop($("#mainTOC .sphinxsidebar .sphinxsidebarwrapper a.current").position().top - 200);
      } else {
        $('.sphinxsidebar').scrollTop($("#mainTOC .sphinxsidebar .sphinxsidebarwrapper a.current").position().top - 200);
      }
    }, 1000);
  }

  $('#rightSideTOC a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    scrollToTarget(this.getAttribute('href'));
  });

  if (window.location.hash) {
    scrollToTarget(window.location.hash);
    //scrollToMenu();
  }
});
