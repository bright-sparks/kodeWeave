$(document).ready(function() {
  var counter = 0,
      activeEditor = $(".activeEditor");
  
  // Toggle Visibility of Add/Remove Files
  $("#toggle").on("change", function() {
    if ( $(this).is(":checked") ) {
      if ( $(window).width() < 830 ) {
        $(".head, #splitWrapper").animate({
          left: "250px",
          right: "auto",
          width: "100%"
        }, 200);
      } else {
        $(".head, #splitWrapper").css({
          left: "",
          right: "",
          width: ""
        });
      }
      $(".menubarsize").css("transform", "rotate(90deg) translate(-3px, 2px)");
    } else {
      if ( $(window).width() < 830 ) {
        $(".head, #splitWrapper").animate({
          left: "0",
          right: "auto",
          width: "100%"
        }, 200);
      } else {
        $(".head, #splitWrapper").css({
          left: "",
          right: "",
          width: ""
        });
      }
      $(".menubarsize").css("transform","rotate(0deg) translate(0, 0)" );
    }
    $("#splitContainer").delay("350").jqxSplitter({
      height: "auto",
      width: "100%",
      orientation: "horizontal",
      showSplitBar: true,
      panels: [{ size: "50%",collapsible:false },
               { size: "50%" }]
    });
    $("#leftSplitter").delay("350").jqxSplitter({
      height: "100%",
      width: "100%",
      orientation: "vertical",
      showSplitBar: true,
      panels: [{ size: "50%",collapsible:false },
               { size: "50%"}]
    });
    $("#rightSplitter").delay("350").jqxSplitter({
      height: "100%",
      width: "100%",
      orientation: "vertical",
      showSplitBar: true,
      panels: [{ size: "50%"},
               { size: "50%",collapsible:false }]
    });
  });
  $("#toggle").trigger("change");
  
  $(window).on("load resize", function() {
    $("#splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
      theme: "metrodark"
    });
    
    // Grid Alignment Based Upon Resolution
    if ( $(this).width() > 830 ) {
      if ( !$("#toggle").is(":checked") ) {
        $("#toggle").trigger("click");
      }
      $(".head, #splitWrapper").css({
        left: "",
        right: "",
        width: ""
      });
      $(".menubarsize").addClass("hide");
    } else {
      if ( $("#toggle").is(":checked") ) {
        $("#toggle").trigger("click");
      }
      $(".menubarsize").removeClass("hide");
    }
    
    // Dropdown Styles
    if ( $(this).width() > 924 ) {
      if ( $(this).height() > 552 ) {
        $(".libraries-dialog, .demos-dialog").css({
          "width": "auto",
          "height": "auto",
          "overflow-y": "auto"
        });
      } else {
        $(".libraries-dialog, .demos-dialog").css({
          "width": "auto",
          "height": $(window).height() - 100 + "px",
          "overflow-y": "auto"
        });
      }
    } else {
      if ( $(this).height() < 552 ) {
        $(".libraries-dialog, .demos-dialog").css({
          "width": $(window).width() - 350 + "px",
          "height": $(window).height() - 100 + "px",
          "overflow-y": "auto"
        });
      } else {
        $(".libraries-dialog, .demos-dialog").css({
          "width": $(window).width() - 350 + "px",
          "height": $(window).height() - 100 + "px",
          "overflow-y": "auto"
        });
      }
    }
  });
  
  // Virtual File Manager
  $(function() {
    // Apply Site Title
    $(".vprojectname").on("keyup change", function() {
      siteTitle.setValue( $(this).val() );
    });

    function SelectFile() {
      // Selects a new file
      $(".vfiles a").on("click", function() {
        if ( $(this).hasClass("htmlfile") ) {
          if ( $(".html-selected").is(":visible") ) {
            // $(".html-selected").removeClass("html-selected");
            // $(".html-editor > div").addClass("hide");
            // $("#" + $(this).parent().attr("class") ).removeClass("hide");
          }
          // $(this).addClass("html-selected");
        } else if ( $(this).hasClass("cssfile") ) {
          if ( $(".css-selected").is(":visible") ) {
            $(".css-selected").removeClass("css-selected");
            $(".css-editor > div").addClass("hide");
            $("#" + $(this).parent().attr("class") ).removeClass("hide");
          }
          $(this).addClass("css-selected");
          $("#" + $(this).parent().attr("class") ).removeClass("hide");
        } else if ( $(this).hasClass("jsfile") ) {
          if ( $(".js-selected").is(":visible") ) {
            $(".js-selected").removeClass("js-selected");
            $(".js-editor > div").addClass("hide");
            $("#" + $(this).parent().attr("class") ).removeClass("hide");
          }
          $(this).addClass("js-selected");
          $("#" + $(this).parent().attr("class") ).removeClass("hide");
        }
        return false;
      });
      // Detect Active Editor
      $("[data-action=fullactiveeditorcode]").val(function() {
        return $.map($(".calleditor"), function (el) {
          return el.value;
        }).join("");
      });

      // Undo Code Script (Applied dynamically from HTML div )
      $("[data-action=fullundocode]").val(function() {
        return $.map($(".undocode"), function (el) {
          return el.value;
        }).join("");
      });
      // Redo Code Script (Applied dynamically from HTML div )
      $("[data-action=fullredocode]").val(function() {
        return $.map($(".redocode"), function (el) {
          return el.value;
        }).join("");
      });
      // Update Preview Script (Applied dynamically from HTML div )
      $("[data-action=fullpreviewcode]").val(function() {
        return $.map($(".updatepreviewcode"), function (el) {
          return el.value;
        }).join("");
      });
      // Update JSZip (Applied dynamically from HTML div )
      $("[data-action=fulljszipcode]").val(function() {
        return $.map($(".jszipcode"), function (el) {
          return el.value;
        }).join("");
      });

      // Apply Update Code
      $("#applyfullpreview").html("").append( "<script>" + $("[data-action=fullpreviewcode]").val() + "<" + "/script>" );

      // Call Active Editor      
      $("#applyactiveeditorcode").html("").append( "<script>" + $("[data-action=fullactiveeditorcode]").val() + "<" + "/script>" );

      // Initiate Undo/Redo Buttons
      $("#applyundocode").html("").append( "<script>" + $("[data-action=fullundocode]").val() + "<" + "/script>" );
      $("#applyredocode").html("").append( "<script>" + $("[data-action=fullredocode]").val() + "<" + "/script>" );
      
      // Apply Export Function
      $("#applyjszip script").remove();
      $("#applyjszip").html("").append( "<script>" + $("[data-action=fulljszipcode]").val() + "<" + "/script>" );

      return false;
    }
    SelectFile();
    
    // Adds a new custom file
    $(".addvfile").click(function() {
      $("[data-action=count]").html(counter++);
      
      var count = $("[data-action=count]").html();
      var $val = $(".vfilename").val();
      var myjs = ".js";
      var findJS = myjs.substr(myjs.length - 3); // => ".js"
      var mycss = ".css";
      var findCSS = mycss.substr(mycss.length - 4); // => ".css"
      // var htmlfile = '<a class="htmlfile" data-action="htmlfile' + count + '">'+ $val.toLowerCase() +'</a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
      var cssfile = '<a class="cssfile" data-action="cssfile' + count + '">'+ $val.toLowerCase() +'</a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
      var jsfile = '<a class="jsfile" data-action="jsfile' + count + '">'+ $val.toLowerCase() +'</a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
      
      // var htmlCodemirror = 'var htmlEditor'+ count +' = CodeMirror(document.getElementById("htmlfile'+ count +'"), {  mode: "text/html",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],  value: "<!-- comment -->"});';
      var cssCodemirror = 'var cssEditor'+ count +' = CodeMirror(document.getElementById("cssfile'+ count +'"), {  mode: "text/css",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  lint : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],  value: "/* comment */"}); var inlet = Inlet(cssEditor'+ count +'); cssEditor'+ count +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); cssEditor'+ count +'.on("drop", function() { cssEditor'+ count +'.setValue(""); });';
      var cssActiveEditor = '$("#cssfile'+ count +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "cssfile'+ count +'" ) { $(".activeEditor").val("cssfile'+ count +'"); } });';
      var cssUndo = "<textarea class='undocode hide'> else if ( $('.activeEditor').val() === 'cssfile"+ count +"' ) { cssEditor"+ count + ".undo(); $('.edit.active').trigger('click'); }</textarea>";
      var cssRedo = "<textarea class='redocode hide'> else if ( $('.activeEditor').val() === 'cssfile"+ count +"' ) { cssEditor"+ count + ".redo(); $('.edit.active').trigger('click'); }</textarea>";
      var cssUpdate = "<textarea class='updatepreviewcode hide'>\npreview.write('<style' + '>' + cssEditor"+ count +".getValue() + '<' + '/style' + '>');\n</textarea>";
      var cssJSZip = "<textarea class='jszipcode hide'>zip.file('css/"+ $val.toLowerCase() +"', cssEditor"+ count +".getValue()); </textarea>";
      var jsCodemirror = 'var jsEditor'+ count +' = CodeMirror(document.getElementById("jsfile'+ count +'"), {  mode: "text/javascript",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  lint : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],  value: "// comment"}); var inlet = Inlet(jsEditor'+ count +'); jsEditor'+ count +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); jsEditor'+ count +'.on("drop", function() { jsEditor'+ count +'.setValue(""); }); ';
      
      var jsActiveEditor = '$("#jsfile'+ count +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "jsfile'+ count +'" ) { $(".activeEditor").val("jsfile'+ count +'"); } });';
      // var jsActiveEditor = "<textarea class='calleditor hide'>if ( $(this).attr('id') === 'jsfile"+ count +"' ) { $('.activeEditor').val('jsfile"+ count +"'); }</textarea>";
      var jsUndo = "<textarea class='undocode hide'> else if ( $('.activeEditor').val() === 'jsfile"+ count +"' ) { jsEditor"+ count + ".undo(); $('.edit.active').trigger('click'); }</textarea>";
      var jsRedo = "<textarea class='redocode hide'> else if ( $('.activeEditor').val() === 'jsfile"+ count +"' ) { jsEditor"+ count + ".redo(); $('.edit.active').trigger('click'); }</textarea>";
      var jsUpdate = "<textarea class='updatepreviewcode hide'>\npreview.write('<script' + '>' + jsEditor"+ count +".getValue() + '<' + '/script' + '>');\n</textarea>";
      var jsJSZip = "<textarea class='jszipcode hide'>zip.file('js/"+ $val.toLowerCase() +"', jsEditor"+ count +".getValue()); </textarea>";
      
      if ($val.toLowerCase().substring($val.length - 5) === ".html") {
        // $(".html-editor").append( '<div id="htmlfile'+ count + '" class="htmlfile' + count + '"></div>' );
        // $(".vfiles").append( '<div class="htmlfile' + count + '">'+ htmlfile +'<script>' + htmlCodemirror + '<' + '/script></div>' );
        // alertify("NOTE: The live preview only applies to index.html");
      } else if ($val.toLowerCase().substring($val.length - 4) === ".css") {
        $(".css-editor").append( '<div id="cssfile'+ count + '" class="cssfile' + count + '"></div>' );
        $(".vfiles").append( '<div class="cssfile' + count + '">'+ cssfile +'<script>var activeEditor = $(".activeEditor"); ' + cssCodemirror + cssActiveEditor + '<' + '/script>'+ cssUndo + cssRedo + cssUpdate + cssJSZip + '</div>' );
      } else if ($val.toLowerCase().substring($val.length - 3) === ".js") {
        $(".js-editor").append( '<div id="jsfile'+ count + '" class="jsfile' + count + '"></div>' );
        $(".vfiles").append( '<div class="jsfile' + count + '">'+ jsfile + '<script>var activeEditor = $(".activeEditor"); ' + jsCodemirror + jsActiveEditor + '<' + '/script>'+ jsUndo + jsRedo + jsUpdate + jsJSZip + '</div>' );
      } else {
        alertify.error("Houston we have a problem!");
      }
      
      SelectFile();
      $(".vfilename").val("");

      // Delete Virtual File
      $("[data-action=delfile]").on("click", function() {
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
      });
    });
    $(".vfilename").keyup(function(e) {
      if ( e.keyCode == 13 ) {
        $(".addvfile").trigger("click");
      }
    });
  });
  
  // Add/Remove Libraries
  $("[data-action=check]").on("change", function() {
    var textarea = $("[data-action=library-code]");
    var value = $(this).parent().nextAll("div").children("textarea:first").val() + "\n";

    if ( $(this).prop("checked") === true ) {
      textarea.val( textarea.val() + value );
      yourRefs.setValue( textarea.val() );
    } else {
      textarea.val( textarea.val().replace( value, "") );
      yourRefs.setValue( textarea.val() );
    }
  });
  
  // Save to browser
  $("[data-action=save]").click(function() {
    alertify.error("Not yet available...");
  });
  
  // Dialog Dropdown
  $("header a:not(.skip, .dialog a)").on("click", function() {
    $(this).not(".dialog a").toggleClass("active");
    $(this).next(":not(#collaborate, .skip)").not(".dialog a").toggleClass("hide");

    if ( $(".open-libraries.active").is(":visible") ) {
      $("header a:not(#collaborate)").not(".dialog a, .skip").not(this).removeClass("active").next().addClass("hide");
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
  
  // New project dialog
  $("[data-action=newproj]").on("click", function() {
    $("[data-action=newprojdialog]").fadeIn();
  });
  $("[data-action=confirm-newproj]").click(function() {
    $("#applynewproject").html("").append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
    $("[data-action=newprojdialog]").fadeOut();
    alertify.success("New project created.");
    return false;
  });
  $("[data-action=cancel-newproj]").click(function() {
    alertify.error("New project aborted.");
    $("[data-action=newprojdialog]").fadeOut();
    return false;
  });
  $("[data-action=newprojdialog]").fadeOut();
});
