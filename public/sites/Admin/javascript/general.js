/*
  osCommerce Online Merchant $osCommerce-SIG$
  Copyright (c) 2009 osCommerce (http://www.oscommerce.com)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License v2 (1991)
  as published by the Free Software Foundation.
*/

jQuery.fn.slideFadeToggle = function(speed, easing, callback) {
  return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};

function rowOverEffect(object) {
  if (object.className == 'deactivatedRow') {
    object.className = 'mouseOverDeactivatedRow';
  } else {
    object.className = 'mouseOver';
  }
}

function rowOutEffect(object) {
  if (object.className == 'mouseOverDeactivatedRow') {
    object.className = 'deactivatedRow';
  } else {
    object.className = '';
  }
}

function updateDatePullDownMenu(objForm, fieldName) {
  var pdmDays = fieldName + "_days";
  var pdmMonths = fieldName + "_months";
  var pdmYears = fieldName + "_years";

  time = new Date(objForm[pdmYears].options[objForm[pdmYears].selectedIndex].text, objForm[pdmMonths].options[objForm[pdmMonths].selectedIndex].value, 1);

  time = new Date(time - 86400000);

  var selectedDay = objForm[pdmDays].options[objForm[pdmDays].selectedIndex].text;
  var daysInMonth = time.getDate();

  for (var i=0; i<objForm[pdmDays].length; i++) {
    objForm[pdmDays].options[0] = null;
  }

  for (var i=0; i<daysInMonth; i++) {
    objForm[pdmDays].options[i] = new Option(i+1);
  }

  if (selectedDay <= daysInMonth) {
    objForm[pdmDays].options[selectedDay-1].selected = true;
  } else {
    objForm[pdmDays].options[daysInMonth-1].selected = true;
  }
}

function toggleDivBlocks(group, exempt) {
  if (!document.getElementsByTagName) return null;

  if (!exempt) exempt = "";

  var divs = document.getElementsByTagName("div");

  for(var i=0; i < divs.length; i++) {
    var div = divs[i];
    var id = div.id;

    if ((id != exempt) && (id.indexOf(group) == 0)) {
      hideBlock(id);
    }
  }

  showBlock(exempt);
}

function toggleInfoBox(exempt) {
  if (!exempt || !document.getElementsByTagName) return null;

  var infoBox = "infoBox_" + exempt;

  var divs = document.getElementsByTagName("div");

  for(var i=0; i < divs.length; i++) {
    var div = divs[i];
    var id = div.id;

    if (id.indexOf("infoBox_") == 0) {
      var infoBoxForm = id.substring(8);

      if (document.forms[infoBoxForm]) {
        document.forms[infoBoxForm].reset();
      }

      if (id != infoBox) {
        hideBlock(id);
      }
    }
  }

  showBlock(infoBox);
}

function showBlock(id) {
  if (document.getElementById) {
    itm = document.getElementById(id);
  } else if (document.all){
    itm = document.all[id];
  } else if (document.layers){
    itm = document.layers[id];
  }

  if (itm) {
    itm.style.display = "block";
  }
}

function hideBlock(id) {
  if (document.getElementById) {
    itm = document.getElementById(id);
  } else if (document.all){
    itm = document.all[id];
  } else if (document.layers){
    itm = document.layers[id];
  }

  if (itm) {
    itm.style.display = "none";
  }
}

function toggleClass(removeClass, addClass, cssClass, tagName) {
  if (!document.getElementsByTagName) return null;

  if (!tagName) tagName = "div";

  var tags = document.getElementsByTagName(tagName);

  for(var i=0; i < tags.length; i++) {
    var tag = tags[i];
    var id = tag.id;

    if ((id != addClass) && (id.indexOf(removeClass) == 0)) {
      tag.className = "";
    }
  }

  document.getElementById(addClass).className = cssClass;
}

function selectAllFromPullDownMenu(field) {
  var field = document.getElementById(field);

  for (i=0; i < field.length; i++) {
    field.options[i].selected = true;
  }
}

function resetPullDownMenuSelection(field) {
  var field = document.getElementById(field);

  for (i=0; i < field.length; i++) {
    field.options[i].selected = false;
  }
}

function flagCheckboxes(element) {
  var elementForm = element.form;
  var i = 0;

  for (i = 0; i < elementForm.length; i++) {
    if (elementForm[i].type == 'checkbox') {
      elementForm[i].checked = element.checked;
    }
  }
}

$(document).ready(function() {
  $('.fieldTitleAsDefault').focus(function(srcc) {
    if ( $(this).val() == $(this)[0].title ) {
      $(this).removeClass('fieldDefaultText');
      $(this).val('');
    }
  });

  $('.fieldTitleAsDefault').blur(function() {
    if ( $(this).val() == '') {
      $(this).addClass('fieldDefaultText');
      $(this).val($(this)[0].title);
    }
  });

  $('.fieldTitleAsDefault').blur();        
});

function htmlSpecialChars(string) {
  return $('<span>').text(string).html();
};

/* Javascript version of osC_Tax::displayTaxRateValue() */

function displayTaxRateValue(value, padding) {
  if ( padding == null ) {
    padding = taxDecimalPlaces;
  }

  if ( value.indexOf('.') != -1 ) {
    while ( true ) {
      if ( value.substr(-1) == '0' ) {
        value = value.substr(0, value.length - 1);
      } else {
        if ( value.substr(-1) == '.' ) {
          value = value.substr(0, value.length - 1);
        }

        break;
      }
    }
  }

  if ( padding > 0 ) {
    var decimal_pos = value.indexOf('.');

    if ( decimal_pos != -1 ) {
      var decimals = value.substr(decimal_pos + 1).length;

      for ( var i = decimals; i < padding; i++ ) {
        value += '0';
      }
    } else {
      value += '.';

      for ( var i = 0; i < padding; i++ ) {
        value += '0';
      }
    }
  }

  return value + '%';
}
