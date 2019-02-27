(function(window){
  
  /* A full compatability script from MDN: */
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
 
  /* Add an event to the window.onscroll event */
  window.addEventListener("scroll", function(e) {  
    
    /* A full compatability script from MDN for gathering the x and y values of scroll: */
  var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;

  document.getElementById("IdMenu").style.left = -x + "px";
  });
  
})(window);
