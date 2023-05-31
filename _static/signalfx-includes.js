$(document).ready(function() {
  $('.new-page').attr('target', '_blank');

  let scrollToTarget = function(targetID, diff = 100) {
    let target = $(targetID);
    window.location.hash = targetID;
    if (target.length) {
      let targetTop = target.offset().top;
      // console.log(targetTop + "-> target top");
      $('html, body').scrollTop(targetTop - diff);
    }
  }

  $('body').on('click', '#rightSideTOC a[href^="#"], .headerlink',function(e) {
    e.preventDefault();
    scrollToTarget(this.getAttribute('href'));
  });

  if (window.location.hash) {
    // console.log("first load");
    scrollToTarget(window.location.hash, 100);
    //scrollToMenu();
  }
});
