$(document).ready(function() {
  var counter = 0;

  $(window).load(function() {
    // Find Theme Onload
    if ( $(".theme-switch").is(":checked") ) {
      $('link[href="css/light.css"]').attr('href','css/dark.css');
      $('#splitContainer, #leftSplitter, #rightSplitter').jqxSplitter({
        theme: 'metrodark'
      });
    } else {
      $('link[href="css/dark.css"]').attr('href','css/light.css');
      $('#splitContainer, #leftSplitter, #rightSplitter').jqxSplitter({
        theme: 'metro'
      });
    }
  }).on("load resize", function() {
    if ( $(this).width() < 681 ) {
      if ( $(this).height() < 600 ) {
        $(".libraries-dialog, .demos-dialog").css({
          "height": "auto",
          "overflow-y": "auto"
        });
      }
    } else {
      if ( $(this).height() < 600 ) {
        $(".libraries-dialog, .demos-dialog").css({
          "height": $(this).height() - 80 + "px",
          "overflow-y": "auto"
        });
      } else if ( $(this).height() < 630 ) {
        $(".libraries-dialog, .demos-dialog").css({
          "height": "auto"
        });
      } else {
        $(".libraries-dialog, .demos-dialog").css({
          "height": "auto"
        });
      }
    }
  });
  
  // Virtual File Manager
  $(function() {
    // Apply Site Title
    $(".vprojectname").on("keyup change", function() {
      $(".addsitetitle").html( $(this).val() );
      $(".finalCode").setValue( $(".mirrorcode").html() ).trigger("change");
    });
    $(".addsitetitle").html( $(this).val() );
    $(".indexcode").html( htmlEditor.getValue() );

    function SelectFile() {
      // Selects a new file
      $(".vfiles a").on("click", function() {
        if ( $(this).hasClass("htmlfile") ) {
          if ( $(".html-selected").is(":visible") ) {
            $(".html-selected").removeClass("html-selected");
            $(".html-editor > div").addClass("hide");
            $("#" + $(this).parent().attr("class") ).removeClass("hide");
          }
          $(this).addClass("html-selected");
        } else if ( $(this).hasClass("cssfile") ) {
          if ( $(".css-selected").is(":visible") ) {
            $(".css-selected").removeClass("css-selected");
            $(".css-editor > div").addClass("hide");
            $("#" + $(this).parent().attr("class") ).removeClass("hide");
          }
          $(this).addClass("css-selected");
        } else if ( $(this).hasClass("jsfile") ) {
          if ( $(".js-selected").is(":visible") ) {
            $(".js-selected").removeClass("js-selected");
            $(".js-editor > div").addClass("hide");
            $("#" + $(this).parent().attr("class") ).removeClass("hide");
          }
          $(this).addClass("js-selected");
        }
        return false;
      });
      return false;
    }
    SelectFile();
    
    // Adds a new file
    $(".addvfile").click(function() {
      $(".count").html(counter++);
      
      var count = $(".count").html();
      var $val = $(".vfilename").val();
      var myjs = ".js";
      var findJS = myjs.substr(myjs.length - 3); // => ".js"
      var mycss = ".css";
      var findCSS = mycss.substr(mycss.length - 4); // => ".css"
      var htmlfile = '<a class="htmlfile ' + count + '">'+ $val.toLowerCase() +'</a> <a class="delfile fr"><i class="fa fa-times"></i></a>';
      var cssfile = '<a class="cssfile ' + count + '">'+ $val.toLowerCase() +'</a> <a class="delfile fr"><i class="fa fa-times"></i></a>';
      var jsfile = '<a class="jsfile ' + count + '">'+ $val.toLowerCase() +'</a> <a class="delfile fr"><i class="fa fa-times"></i></a>';
      
      var htmlCodemirror = 'var htmlEditor'+ count +' = CodeMirror(document.getElementById("htmlfile'+ count +'"), {  mode: "text/html",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],  value: "<!-- comment -->"});';
      var htmlLintMarkers = '';
      var htmlActiveEditor = '';
      var cssCodemirror = 'var cssEditor'+ count +' = CodeMirror(document.getElementById("cssfile'+ count +'"), {  mode: "text/css",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],  value: "/* comment */"});';
      var cssLintMarkers = '';
      var cssActiveEditor = '';
      var jsCodemirror = 'var jsEditor'+ count +' = CodeMirror(document.getElementById("jsfile'+ count +'"), {  mode: "text/javascript",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],  value: "// comment "});';
      var jsLintMarkers = '';
      var jsActiveEditor = '';
      
      if ($val.toLowerCase().substring($val.length - 5) === ".html") {
        $(".html-editor").append( '<div id="htmlfile'+ count + '" class="htmlfile' + count + '"></div>' );
        $(".vfiles").append( '<div class="htmlfile' + count + '">'+ htmlfile +'<script>' + htmlCodemirror + '<' + '/script></div>' );
        alertify.error("New HTML files are not yet ready!");
      } else if ($val.toLowerCase().substring($val.length - 4) === ".css") {
        $(".css-editor").append( '<div id="cssfile'+ count + '" class="cssfile' + count + '"></div>' );
        $(".vfiles").append( '<div class="cssfile' + count + '">'+ cssfile +'<script>' + cssCodemirror + '<' + '/script></div>' );
        alertify.success("You've added a CSS Library");
      } else if ($val.toLowerCase().substring($val.length - 3) === ".js") {
        $(".js-editor").append( '<div id="jsfile'+ count + '" class="jsfile' + count + '"></div>' );
        $(".vfiles").append( '<div class="jsfile' + count + '">'+ jsfile +'<script>' + jsCodemirror + '<' + '/script></div>' );
        alertify.success("You've added a JS Library");
      } else {
        alertify.error("Houston we have a problem!");
      }
      
      SelectFile();
      $(".vfilename").val("");

      // Delete Virtual File
      $(".delfile").on("click", function() {
        $("#" + $(this).parent().attr("class") ).remove();
        if ( $(this).prev().hasClass("htmlfile") ) {
          if ( $(this).prev().hasClass("html-selected") ) {
            if ( !$(".req-html").hasClass("html-selected") ) {
              $(".req-html").trigger("click");
            }
          }
        } else if ( $(this).prev().hasClass("cssfile") ) {
          if ( $(this).prev().hasClass("css-selected") ) {
            if ( !$(".req-css").hasClass("css-selected") ) {
              $(".req-css").trigger("click");
            }
          }
        } else if ( $(this).prev().hasClass("jsfile") ) {
          if ( $(this).prev().hasClass("js-selected") ) {
            if ( !$(".req-js").hasClass("js-selected") ) {
              $(".req-js").trigger("click");
            }
          }
        }
        $(this).parent().remove();
z      });
    });
    $(".vfilename").keyup(function(e) {
      if ( e.keyCode == 13 ) {
        $(".addvfile").trigger("click");
      }
    });
  });

  // Settings & Theme
  $(".call-settings").click(function() {
    $(".settingsdialog").fadeIn();
    $(".tools.active").trigger("click");
  });
  $(".close").click(function() {
    $(".settingsdialog").fadeOut();
    $(".tools.active").trigger("click");
  });
  $(".theme-switch").on("click change", function() {
    if ( $(".theme-switch").is(":checked") ) {
      $('link[href="css/light.css"]').attr("href","css/dark.css");
      $('#splitContainer, #leftSplitter, #rightSplitter').jqxSplitter({
        theme: "metrodark"
      });
    } else {
      $('link[href="css/dark.css"]').attr("href","css/light.css");
      $("#splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
        theme: "metro"
      });
    }
  });
  
  // Dialog Dropdown
  $("header a:not(#collaborate, .dialog a)").on("click", function() {
    $(this).not(".dialog a").toggleClass("active");
    $(this).next(":not(#collaborate)").not(".dialog a").toggleClass("hide");

    if ( $(".tools.active").is(":visible") || $(".edit.active").is(":visible") || $(".add-source.active").is(":visible") || $(".download.active").is(":visible") || $(".open-demos.active").is(":visible")) {
      $("header a:not(#collaborate, .grid-alignment)").not(".dialog a").not(this).removeClass("active").next().addClass("hide");
    }

    $(".dialog.fl").css({
      "left": $(this).offset().left - 250
    });
    //$(".dialog.fr").css({
      //"left": $(this).offset().left - $(".dialog.fr").width() + $(this).width()
    //});
  });

  // Grid Alignment
  $(function() {
    var BoxSplitter = function() {
      $('#splitContainer').jqxSplitter({
        height: "auto",
        width: "100%",
        orientation: 'horizontal',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%' }]
      });
      $('#leftSplitter').jqxSplitter({
        height: '100%',
        width: "100%",
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%',collapsible:false },
                 { size: '50%'}]
      });
      $('#rightSplitter').jqxSplitter({
        height: '100%',
        width: "100%",
        orientation: 'vertical',
        showSplitBar: true,
        panels: [{ size: '50%'},
                 { size: '50%',collapsible:false }]
      });
    };
    BoxSplitter();
    
    // Fullscreen Toggle
    $(".fullscreen-html-toggle").click(function() {
      $(this).toggleClass("fill unfill");
      if ( $(".fullscreen-html-toggle.unfill").is(":visible") ) {
        $(this).html('<span class="fa fa-expand" id="fullscreen-html"></span>');
        BoxSplitter();
      } else if ( $(".fullscreen-html-toggle.fill").is(":visible") ) {
        $(this).html('<span class="fa fa-compress" id="fullscreen-html"></span>');
        $("#splitContainer").jqxSplitter({
          height: "auto",
          width: "100%",
          orientation: "vertical",
          showSplitBar: false,
          panels: [{ size: "100%" },
                   { size: "100%" }]
        });
        $("#leftSplitter").jqxSplitter({
          height: "100%",
          width: "100%",
          orientation: "horizontal",
          showSplitBar: false,
          panels: [{ size: "100%" },
                   { size: "0%"}]
        });
        $("#rightSplitter").jqxSplitter({
          height: "100%",
          width: "100%",
          orientation: "horizontal",
          showSplitBar: false,
          panels: [{ size: "0%"},
                   { size: "0%"}]
        });
      }
    });
    $(".fullscreen-css-toggle").click(function() {
      $(this).toggleClass("fill unfill");
      if ( $(".fullscreen-css-toggle.unfill").is(":visible") ) {
        $(this).html('<span class="fa fa-expand" id="fullscreen-css"></span>');
        BoxSplitter();
      } else if ( $(".fullscreen-css-toggle.fill").is(":visible") ) {
        $(this).html('<span class="fa fa-compress" id="fullscreen-css"></span>');
        $("#splitContainer").jqxSplitter({
          height: "auto",
          width: "100%",
          orientation: "vertical",
          showSplitBar: false,
          panels: [{ size: "100%" },
                   { size: "100%" }]
        });
        $("#leftSplitter").jqxSplitter({
          height: "100%",
          width: "100%",
          orientation: "horizontal",
          showSplitBar: false,
          panels: [{ size: "0%" },
                   { size: "100%"}]
        });
        $("#rightSplitter").jqxSplitter({
          height: "100%",
          width: "100%",
          orientation: "horizontal",
          showSplitBar: false,
          panels: [{ size: "100%"},
                   { size: "0%"}]
        });
      }
    });
    $(".fullscreen-js-toggle").click(function() {
      $(this).toggleClass("fill unfill");
      if ( $(".fullscreen-js-toggle.unfill").is(":visible") ) {
        $(this).html('<span class="fa fa-expand" id="fullscreen-js"></span>');
        BoxSplitter();
      } else if ( $(".fullscreen-js-toggle.fill").is(":visible") ) {
        $(this).html('<span class="fa fa-compress" id="fullscreen-js"></span>');
        $("#splitContainer").jqxSplitter({
          height: "auto",
          width: "100%",
          orientation: "vertical",
          showSplitBar: false,
          panels: [{ size: "0%" },
                   { size: "100%" }]
        });
        $("#leftSplitter").jqxSplitter({
          height: "100%",
          width: "100%",
          orientation: "horizontal",
          showSplitBar: false,
          panels: [{ size: "0%" },
                   { size: "0%"}]
        });
        $("#rightSplitter").jqxSplitter({
          height: "100%",
          width: "100%",
          orientation: "horizontal",
          showSplitBar: false,
          panels: [{ size: "100%"},
                   { size: "0%"}]
        });
      }
    });
    $(".preview-mode-toggle").click(function() {
      $(this).toggleClass("fill unfill");
      if ( $(".preview-mode-toggle.unfill").is(":visible") ) {
        $(this).html('<span class="fa fa-expand" id="preview-mode"></span>');
        BoxSplitter();
      } else if ( $(".preview-mode-toggle.fill").is(":visible") ) {
        $(this).html('<span class="fa fa-compress" id="preview-mode"></span>');
        $("#splitContainer").jqxSplitter({
          height: "auto",
          width: "100%",
          orientation: "vertical",
          showSplitBar: false,
          panels: [{ size: "0%" },
                   { size: "100%" }]
        });
        $("#leftSplitter").jqxSplitter({
          height: "100%",
          width: "100%",
          orientation: "horizontal",
          showSplitBar: false,
          panels: [{ size: "0%" },
                   { size: "0%"}]
        });
        $("#rightSplitter").jqxSplitter({
          height: "100%",
          width: "100%",
          orientation: "horizontal",
          showSplitBar: false,
          panels: [{ size: "0%"},
                   { size: "100%"}]
        });
      }
    });
  });
});
