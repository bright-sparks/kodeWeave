/**
 * HSLA Color Picker 1.0
 * © 2014 Michael Schwartz
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope $this it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, you can view/download it from...
 * https://www.gnu.org/licenses/gpl-2.0.html
 */

(function($) {
  $.fn.HSLAColorPicker = function(container) {
    var $this = $(this);
    container = $(container).get(0);
    $(container).addClass("hsla-cpick-container").html('<table class="cpick"> <tr> <td><div id="h" class="colorwheel"></div></td> </tr> <tr> <td><div id="s"></div></td> </tr> <tr> <td><div id="l"></div></td> </tr> <tr> <td><div id="a"></div></td> </tr> </table>');

    var ApplyHSLACodeNPrev = function() {
      if ( $(container).children().find("#a").slider( "value" ) === "1" ) {
        $this.val( "hsl(" + $(container).children().find("#h").slider( "value" ) + ", " + $(container).children().find("#s").slider( "value" ) + "%, " + $(container).children().find("#l").slider( "value" ) + "%)").change();
      } else {
        $this.val( "hsla(" + $(container).children().find("#h").slider( "value" ) + ", " + $(container).children().find("#s").slider( "value" ) + "%, " + $(container).children().find("#l").slider( "value" ) + "%, " + $(container).children().find("#a").slider( "value" ) + ")").change();
      }
      if ( $(container).children().find("#a").slider( "value" ) === "0" ) {
        $this.val("transparent").change();
      }
      if ( $(container).children().find("#l").slider( "value" ) > 50 ) {
        $this.css({
          "background-color": $this.val(),
          "color": "#000"
        });
      } else {
        $this.css({
          "background-color": $this.val(),
          "color": "#fff"
        });
      }
      
      $this.val( $this.css("background-color") );

      // Alpha Saturation
      $(container).children().find("#s.ui-slider" ).css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $("#h").slider( "value" ) + "," + $("#s").slider( "value" ) + "%," + $("#l").slider( "value" ) + "%)" + " 100%)"
      });
      // Alpha Lightness
      $(container).children().find("#l.ui-slider" ).css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $("#h").slider( "value" ) + "," + $("#s").slider( "value" ) + "%,50%) 50%,#ffffff 100%)"
      });
      // Alpha Preview
      $(container).children().find("#a.ui-slider" ).css({
        "background": "linear-gradient(to right, transparent 0%," + "hsl(" + $("#h").slider( "value" ) + "," + $("#s").slider( "value" ) + "%,50%) 100%,#ffffff 100%)"
      });
    };

    $this.on("focus", function(e) {
      ApplyHSLACodeNPrev();
      $this.select();
    }).on("keyup change", function() {
      $this.css({
        "background-color": $this.val()
      });
    });
    
    // Apply HSLA Code from Sliders
    $(container).children().find("#h, #s, #l, #a").on('change', function() {
      ApplyHSLACodeNPrev();
    });

    $(container).children().find( "#h" ).slider({
      orientation: "horizontal",
      max: 360,
      value: 128,
      slide: ApplyHSLACodeNPrev,
      change: ApplyHSLACodeNPrev
    });
    $(container).children().find( "#s" ).slider({
      value: 100,
      orientation: "horizontal",
      slide: ApplyHSLACodeNPrev,
      change: ApplyHSLACodeNPrev
    });
    $(container).children().find( "#l" ).slider({
      value: 44,
      orientation: "horizontal",
      slide: ApplyHSLACodeNPrev,
      change: ApplyHSLACodeNPrev
    });
    $(container).children().find( "#a" ).slider({
      min: 0,
      max: 1,
      value: 1,
      step: "0.1",
      orientation: "horizontal",
      slide: ApplyHSLACodeNPrev,
      change: ApplyHSLACodeNPrev
    });
    ApplyHSLACodeNPrev();

    ApplyHSLACodeNPrev();
  };
}) (jQuery) ;
