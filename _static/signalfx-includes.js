window.onload = function(){
  var anchors = document.getElementsByClassName('new-page');
  for (var i=0; i<anchors.length; i++){
    anchors[i].setAttribute('target', '_blank');
  }
  document.getElementsByName("q")[0].setAttribute("placeholder", "Search");

// Document scrolling via http://stackoverflow.com/a/13067009



}
