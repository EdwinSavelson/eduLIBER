
var states = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "Bureau of Indian Education", "California", "Colorado", "Connecticut", "Delaware", "Department of Defense", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachussetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

// MAP HOVER

$("path, circle").hover(function(e) {
  $('#info-box').css('display', 'block');
  $('#info-box').html($(this).data('info'));
});

$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display', 'none');
});

$(document).mousemove(function(e) {
  $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
  $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
}).mouseover();

var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (ios) {
  $('a').on('click touchend', function() {
    var link = $(this).attr('href');
    window.open(link, '_blank');
    return false;
  });
}


// DROPDOWN MENU

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
o.addEventListener("click", () => {
  selected.innerHTML = o.querySelector("label").innerHTML;
  optionsContainer.classList.remove("active");
});
});

//GENERATES LIST OF STATES FOR MAP LIST//
//       for(var i = 0; i<states.length; i++){
//       console.log("<div class='option'> <a href=" + "'" + "/state?myState=" + states[i] + "'" + ">"+states[i]+"</a></div>");
// }
