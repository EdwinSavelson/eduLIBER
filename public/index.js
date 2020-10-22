
// var countries = [
//     { label: 'United Kingdom', value: 'UK' },
//     { label: 'United States', value: 'US' }
// ];
//
// var input = document.getElementById("country");
// autocomplete({
//     input: input,
//     fetch: function(text, update) {
//         text = text.toLowerCase();
//         // you can also use AJAX requests instead of preloaded data
//         var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
//         update(suggestions);
//     },
//     onSelect: function(item) {
//         input.value = item.label;
//     }
// });

    // { label: 'Alabama', value: 'AL'},
    // { label: 'Alaska', value: 'AK'},
    // { label: 'American Samoa', value: 'AS'},
    // { label: 'Arizona', value: 'AZ'},
    // { label: 'Arkansas', value: 'AR'},
    // { label: 'Bureau of Indian Education',value: 'BIE'},
    // { label: 'California', value: 'CA'},
    // { label: 'Colorado', value: 'CO'},
    // { label: 'Connecticut', value: 'CT'},
    // { label: 'Delaware', value: 'DE'},
    // { label: 'Department of Defense', value: 'DD'},
    // { label: 'District of Columbia', value: 'DC'},
    // { label: 'Florida', value: 'FL'},
    // { label: 'Georgia', value: 'GA'},
    // { label: 'Hawaii', value: 'HI'},
    // { label: 'Idaho', value: 'ID'},
    // { label: 'Illinois', value: 'IL'},
    // { label: 'Indiana', value: 'IN'},
    // { label: 'Iowa', value: 'IA'},
    // { label: 'Kansas', value: 'KS'},
    // { label: 'Kentucky', value: 'KY'},
    // { label: 'Louisiana', value: 'LA'},
    // { label: 'Maine', value: 'ME'},
    // { label: 'Maryland', value: 'MD'},
    // { label: 'Massachussetts', value: 'MA'},
    // { label: 'Michigan', value: 'MI'},
    // { label: 'Minnesota', value: 'MN'},
    // { label: 'Mississippi', value: 'MS'},
    // { label: 'Missouri', value: 'MO'},
    // { label: 'Montana', value: 'MT'},
    // { label: 'Nebraska', value: 'NE'},
    // { label: 'Nevada', value: 'NV'},
    // { label: 'New Hampshire', value: 'NH'},
    // { label: 'New Jersey', value: 'NJ'},
    // { label: 'New Mexico', value: 'NM'},
    // { label: 'New York', value: 'NY'},
    // { label: 'North Carolina', value: 'NC'},
    // { label: 'North Dakota', value: 'ND'},
    // { label: 'Ohio', value: 'OH'},
    // { label: 'Oklahoma', value: 'OK'},
    // { label: 'Oregon', value: 'OR'},
    // { label: 'Pennsylvania', value: 'PA'},
    // { label: 'Rhode Island', value: 'RI'},
    // { label: 'South Carolina', value: 'SC'},
    // { label: 'South Dakota', value: 'SD'},
    // { label: 'Tennessee', value: 'TN'},
    // { label: 'Texas', value: 'TX'},
    // { label: 'Utah', value: 'UT'},
    // { label: 'Vermont', value: 'VT'},
    // { label: 'Virginia', value: 'VA'},
    // { label: 'Washington', value: 'WA'},
    // { label: 'West Virginia', value: 'WV'},
    // { label: 'Wisconsin', value: 'WI'},
    // { label: 'Wyoming', value: 'WY'}

    //
    // function autocomplete(settings) {
    //     // just an alias to minimize JS file size
    //     var doc = document;
    //     var container = doc.createElement("div");
    //     var containerStyle = container.style;
    //     var userAgent = navigator.userAgent;
    //     var mobileFirefox = userAgent.indexOf("Firefox") !== -1 && userAgent.indexOf("Mobile") !== -1;
    //     var debounceWaitMs = settings.debounceWaitMs || 0;
    //     var preventSubmit = settings.preventSubmit || false;
    //     // 'keyup' event will not be fired on Mobile Firefox, so we have to use 'input' event instead
    //     var keyUpEventName = mobileFirefox ? "input" : "keyup";
    //     var items = [];
    //     var inputValue = "";
    //     var minLen = 2;
    //     var showOnFocus = settings.showOnFocus;
    //     var selected;
    //     var keypressCounter = 0;
    //     var debounceTimer;
    //     if (settings.minLength !== undefined) {
    //         minLen = settings.minLength;
    //     }
    //     if (!settings.input) {
    //         throw new Error("input undefined");
    //     }
    //     var input = settings.input;
    //     container.className = "autocomplete " + (settings.className || "");
    //     // IOS implementation for fixed positioning has many bugs, so we will use absolute positioning
    //     containerStyle.position = "absolute";
    //     /**
    //      * Detach the container from DOM
    //      */
    //     function detach() {
    //         var parent = container.parentNode;
    //         if (parent) {
    //             parent.removeChild(container);
    //         }
    //     }
    //     /**
    //      * Clear debouncing timer if assigned
    //      */
    //     function clearDebounceTimer() {
    //         if (debounceTimer) {
    //             window.clearTimeout(debounceTimer);
    //         }
    //     }
    //     /**
    //      * Attach the container to DOM
    //      */
    //     function attach() {
    //         if (!container.parentNode) {
    //             doc.body.appendChild(container);
    //         }
    //     }
    //     /**
    //      * Check if container for autocomplete is displayed
    //      */
    //     function containerDisplayed() {
    //         return !!container.parentNode;
    //     }
    //     /**
    //      * Clear autocomplete state and hide container
    //      */
    //     function clear() {
    //         // prevent the update call if there are pending AJAX requests
    //         keypressCounter++;
    //         items = [];
    //         inputValue = "";
    //         selected = undefined;
    //         detach();
    //     }
    //     /**
    //      * Update autocomplete position
    //      */
    //     function updatePosition() {
    //         if (!containerDisplayed()) {
    //             return;
    //         }
    //         containerStyle.height = "auto";
    //         containerStyle.width = input.offsetWidth + "px";
    //         var maxHeight = 0;
    //         var inputRect;
    //         function calc() {
    //             var docEl = doc.documentElement;
    //             var clientTop = docEl.clientTop || doc.body.clientTop || 0;
    //             var clientLeft = docEl.clientLeft || doc.body.clientLeft || 0;
    //             var scrollTop = window.pageYOffset || docEl.scrollTop;
    //             var scrollLeft = window.pageXOffset || docEl.scrollLeft;
    //             inputRect = input.getBoundingClientRect();
    //             var top = inputRect.top + input.offsetHeight + scrollTop - clientTop;
    //             var left = inputRect.left + scrollLeft - clientLeft;
    //             containerStyle.top = top + "px";
    //             containerStyle.left = left + "px";
    //             maxHeight = window.innerHeight - (inputRect.top + input.offsetHeight);
    //             if (maxHeight < 0) {
    //                 maxHeight = 0;
    //             }
    //             containerStyle.top = top + "px";
    //             containerStyle.bottom = "";
    //             containerStyle.left = left + "px";
    //             containerStyle.maxHeight = maxHeight + "px";
    //         }
    //         // the calc method must be called twice, otherwise the calculation may be wrong on resize event (chrome browser)
    //         calc();
    //         calc();
    //         if (settings.customize && inputRect) {
    //             settings.customize(input, inputRect, container, maxHeight);
    //         }
    //     }
    //     /**
    //      * Redraw the autocomplete div element with suggestions
    //      */
    //     function update() {
    //         // delete all children from autocomplete DOM container
    //         while (container.firstChild) {
    //             container.removeChild(container.firstChild);
    //         }
    //         // function for rendering autocomplete suggestions
    //         var render = function (item, currentValue) {
    //             var itemElement = doc.createElement("div");
    //             itemElement.textContent = item.label || "";
    //             return itemElement;
    //         };
    //         if (settings.render) {
    //             render = settings.render;
    //         }
    //         // function to render autocomplete groups
    //         var renderGroup = function (groupName, currentValue) {
    //             var groupDiv = doc.createElement("div");
    //             groupDiv.textContent = groupName;
    //             return groupDiv;
    //         };
    //         if (settings.renderGroup) {
    //             renderGroup = settings.renderGroup;
    //         }
    //         var fragment = doc.createDocumentFragment();
    //         var prevGroup = "#9?$";
    //         items.forEach(function (item) {
    //             if (item.group && item.group !== prevGroup) {
    //                 prevGroup = item.group;
    //                 var groupDiv = renderGroup(item.group, inputValue);
    //                 if (groupDiv) {
    //                     groupDiv.className += " group";
    //                     fragment.appendChild(groupDiv);
    //                 }
    //             }
    //             var div = render(item, inputValue);
    //             if (div) {
    //                 div.addEventListener("click", function (ev) {
    //                     settings.onSelect(item, input);
    //                     clear();
    //                     ev.preventDefault();
    //                     ev.stopPropagation();
    //                 });
    //                 if (item === selected) {
    //                     div.className += " selected";
    //                 }
    //                 fragment.appendChild(div);
    //             }
    //         });
    //         container.appendChild(fragment);
    //         if (items.length < 1) {
    //             if (settings.emptyMsg) {
    //                 var empty = doc.createElement("div");
    //                 empty.className = "empty";
    //                 empty.textContent = settings.emptyMsg;
    //                 container.appendChild(empty);
    //             }
    //             else {
    //                 clear();
    //                 return;
    //             }
    //         }
    //         attach();
    //         updatePosition();
    //         updateScroll();
    //     }
    //     function updateIfDisplayed() {
    //         if (containerDisplayed()) {
    //             update();
    //         }
    //     }
    //     function resizeEventHandler() {
    //         updateIfDisplayed();
    //     }
    //     function scrollEventHandler(e) {
    //         if (e.target !== container) {
    //             updateIfDisplayed();
    //         }
    //         else {
    //             e.preventDefault();
    //         }
    //     }
    //     function keyupEventHandler(ev) {
    //         var keyCode = ev.which || ev.keyCode || 0;
    //         var ignore = [38 /* Up */, 13 /* Enter */, 27 /* Esc */, 39 /* Right */, 37 /* Left */, 16 /* Shift */, 17 /* Ctrl */, 18 /* Alt */, 20 /* CapsLock */, 91 /* WindowsKey */, 9 /* Tab */];
    //         for (var _i = 0, ignore_1 = ignore; _i < ignore_1.length; _i++) {
    //             var key = ignore_1[_i];
    //             if (keyCode === key) {
    //                 return;
    //             }
    //         }
    //         if (keyCode >= 112 /* F1 */ && keyCode <= 123 /* F12 */) {
    //             return;
    //         }
    //         // the down key is used to open autocomplete
    //         if (keyCode === 40 /* Down */ && containerDisplayed()) {
    //             return;
    //         }
    //         startFetch(0 /* Keyboard */);
    //     }
    //     /**
    //      * Automatically move scroll bar if selected item is not visible
    //      */
    //     function updateScroll() {
    //         var elements = container.getElementsByClassName("selected");
    //         if (elements.length > 0) {
    //             var element = elements[0];
    //             // make group visible
    //             var previous = element.previousElementSibling;
    //             if (previous && previous.className.indexOf("group") !== -1 && !previous.previousElementSibling) {
    //                 element = previous;
    //             }
    //             if (element.offsetTop < container.scrollTop) {
    //                 container.scrollTop = element.offsetTop;
    //             }
    //             else {
    //                 var selectBottom = element.offsetTop + element.offsetHeight;
    //                 var containerBottom = container.scrollTop + container.offsetHeight;
    //                 if (selectBottom > containerBottom) {
    //                     container.scrollTop += selectBottom - containerBottom;
    //                 }
    //             }
    //         }
    //     }
    //     /**
    //      * Select the previous item in suggestions
    //      */
    //     function selectPrev() {
    //         if (items.length < 1) {
    //             selected = undefined;
    //         }
    //         else {
    //             if (selected === items[0]) {
    //                 selected = items[items.length - 1];
    //             }
    //             else {
    //                 for (var i = items.length - 1; i > 0; i--) {
    //                     if (selected === items[i] || i === 1) {
    //                         selected = items[i - 1];
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     /**
    //      * Select the next item in suggestions
    //      */
    //     function selectNext() {
    //         if (items.length < 1) {
    //             selected = undefined;
    //         }
    //         if (!selected || selected === items[items.length - 1]) {
    //             selected = items[0];
    //             return;
    //         }
    //         for (var i = 0; i < (items.length - 1); i++) {
    //             if (selected === items[i]) {
    //                 selected = items[i + 1];
    //                 break;
    //             }
    //         }
    //     }
    //     function keydownEventHandler(ev) {
    //         var keyCode = ev.which || ev.keyCode || 0;
    //         if (keyCode === 38 /* Up */ || keyCode === 40 /* Down */ || keyCode === 27 /* Esc */) {
    //             var containerIsDisplayed = containerDisplayed();
    //             if (keyCode === 27 /* Esc */) {
    //                 clear();
    //             }
    //             else {
    //                 if (!containerDisplayed || items.length < 1) {
    //                     return;
    //                 }
    //                 keyCode === 38 /* Up */
    //                     ? selectPrev()
    //                     : selectNext();
    //                 update();
    //             }
    //             ev.preventDefault();
    //             if (containerIsDisplayed) {
    //                 ev.stopPropagation();
    //             }
    //             return;
    //         }
    //         if (keyCode === 13 /* Enter */) {
    //             if (selected) {
    //                 settings.onSelect(selected, input);
    //                 clear();
    //             }
    //             if (preventSubmit) {
    //                 ev.preventDefault();
    //             }
    //         }
    //     }
    //     function focusEventHandler() {
    //         if (showOnFocus) {
    //             startFetch(1 /* Focus */);
    //         }
    //     }
    //     function startFetch(trigger) {
    //         // if multiple keys were pressed, before we get update from server,
    //         // this may cause redrawing our autocomplete multiple times after the last key press.
    //         // to avoid this, the number of times keyboard was pressed will be
    //         // saved and checked before redraw our autocomplete box.
    //         var savedKeypressCounter = ++keypressCounter;
    //         var val = input.value;
    //         if (val.length >= minLen || trigger === 1 /* Focus */) {
    //             clearDebounceTimer();
    //             debounceTimer = window.setTimeout(function () {
    //                 settings.fetch(val, function (elements) {
    //                     if (keypressCounter === savedKeypressCounter && elements) {
    //                         items = elements;
    //                         inputValue = val;
    //                         selected = items.length > 0 ? items[0] : undefined;
    //                         update();
    //                     }
    //                 }, 0 /* Keyboard */);
    //             }, trigger === 0 /* Keyboard */ ? debounceWaitMs : 0);
    //         }
    //         else {
    //             clear();
    //         }
    //     }
    //     function blurEventHandler() {
    //         // we need to delay clear, because when we click on an item, blur will be called before click and remove items from DOM
    //         setTimeout(function () {
    //             if (doc.activeElement !== input) {
    //                 clear();
    //             }
    //         }, 200);
    //     }
    //     /**
    //      * Fixes #26: on long clicks focus will be lost and onSelect method will not be called
    //      */
    //     container.addEventListener("mousedown", function (evt) {
    //         evt.stopPropagation();
    //         evt.preventDefault();
    //     });
    //     /**
    //      * Fixes #30: autocomplete closes when scrollbar is clicked in IE
    //      * See: https://stackoverflow.com/a/9210267/13172349
    //      */
    //     container.addEventListener("focus", function () { return input.focus(); });
    //     /**
    //      * This function will remove DOM elements and clear event handlers
    //      */
    //     function destroy() {
    //         input.removeEventListener("focus", focusEventHandler);
    //         input.removeEventListener("keydown", keydownEventHandler);
    //         input.removeEventListener(keyUpEventName, keyupEventHandler);
    //         input.removeEventListener("blur", blurEventHandler);
    //         window.removeEventListener("resize", resizeEventHandler);
    //         doc.removeEventListener("scroll", scrollEventHandler, true);
    //         clearDebounceTimer();
    //         clear();
    //     }
    //     // setup event handlers
    //     input.addEventListener("keydown", keydownEventHandler);
    //     input.addEventListener(keyUpEventName, keyupEventHandler);
    //     input.addEventListener("blur", blurEventHandler);
    //     input.addEventListener("focus", focusEventHandler);
    //     window.addEventListener("resize", resizeEventHandler);
    //     doc.addEventListener("scroll", scrollEventHandler, true);
    //     return {
    //         destroy: destroy
    //     };
    //     return autocomplete;
    // }
    //
    /* SEARCH */

    var states = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "Bureau of Indian Education", "California", "Colorado", "Connecticut", "Delaware", "Department of Defense", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachussetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    function autocomplete(inp, arr) {
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      inp.addEventListener("input", function(e) {
        $('#stateSearchSubmitButton').attr("disabled", true)

        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
          return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
          // ASDFJAKSDFJKALSDFJ
            $("path, circle").css('display', 'block');
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
              $('#stateSearchSubmitButton').attr("disabled", false)
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      });
      /*execute a function presses a key on the keyboard:*/
      inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
      });

      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }

      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }

      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function(e) {
        closeAllLists(e.target);
      });
    }






$(document).ready(function () {
        $('.dropdown-toggle').dropdown();
    });

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



// // DROPDOWN MENU
//
//
// const selected = document.querySelector(".selected");
// const optionsContainer = document.querySelector(".options-container");
//
// const optionsList = document.querySelectorAll(".option");
//
// selected.addEventListener("click", () => {
// optionsContainer.classList.toggle("active");
// });
//
// optionsList.forEach(o => {
// o.addEventListener("click", () => {
//   selected.innerHTML = o.querySelector("label").innerHTML;
//   optionsContainer.classList.remove("active");
// });
// });
//
//
//
//
// // GENERATE STATE DIVS FOR MOBILE MENU
// //   var states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
// //
// // for(i = 0; i < states.length; i++){
// //   console.log('<div class="option">','\n','<a href="#">'+states[i]+'</a>','\n','</div>');
// // }
//
//
//
//
//
autocomplete(document.getElementById("myInput"), states);
