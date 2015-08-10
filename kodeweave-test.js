// Handles CodeMirror Preview Delay
var delay;

// Initialize HTML editor
var htmlEditor = CodeMirror(document.querySelector("#htmlEditor"), {
  mode: "text/html",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  value: "<!-- comment -->\nhello world!"
});
var inlet = Inlet(htmlEditor);
var cssEditor = CodeMirror(document.querySelector("#cssEditor"), {
  mode: "text/css",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
});
var inlet = Inlet(cssEditor);
var jsEditor = CodeMirror(document.querySelector("#jsEditor"), {
  mode: "text/javascript",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
});
var inlet = Inlet(jsEditor);
// Initialize Open and Close for HTML editor
var openHTML = CodeMirror(document.querySelector("#openHTML"), {
  mode: "text/html",
  value: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>"
});
var closeHTML = CodeMirror(document.querySelector("#closeHTML"), {
  mode: "text/html",
  value: "</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n"
});
var yourRefs = CodeMirror(document.querySelector("#libraries"), {
  mode: "text/html"
});
var closeRefs = CodeMirror(document.querySelector("#closeRefs"), {
  mode: "text/html",
  value: "  </head>\n  <body>\n"
});
var closeFinal = CodeMirror(document.querySelector("#closeFinal"), {
  mode: "text/html",
  value: "\n  </body>\n</html>"
});

// Live preview
htmlEditor.on("change", function() {
  clearTimeout(delay);
  delay = setTimeout(updatePreview, 300);
  //for (var i = 0; i < widgets.length; ++i) {
    //cssEditor.removeLineWidget(widgets[i]);
    //jsEditor.removeLineWidget(widgets[i]);
  //}
});
yourRefs.on("change", function() {
  clearTimeout(delay);
  delay = setTimeout(updatePreview, 300);
});
cssEditor.on("change", function() {
  clearTimeout(delay);
  delay = setTimeout(updatePreview, 300);
});
jsEditor.on("change", function() {
  clearTimeout(delay);
  delay = setTimeout(updatePreview, 300);
});

// Don't add to code, replace with new drop file's code
htmlEditor.on("drop", function() {
  htmlEditor.setValue("");
});
cssEditor.on("drop", function() {
  cssEditor.setValue("");
});
jsEditor.on("drop", function() {
  jsEditor.setValue("");
});

$(document).ready(function() {
  var activeEditor = $(".activeEditor"),
      download_to_textbox = function (url, el) {
        return $.get(url, null, function (data) {
          el.val(data);
        }, 'text');
      };
  
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

      // Delete Virtual File
      $("[data-action=delfile]").click(function(event) {
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
        
        var delfile = $(".vfiles").html();
        if (TogetherJS.running) {
          TogetherJS.send({
            type: "del-file",
            output: delfile
          });
        }
      });

      // Detect Active Editor
      $("[data-action=fullactiveeditorcode]").val(function() {
        return $.map($(".calleditor"), function (el) {
          return el.value;
        }).join("");
      });

      // Update Preview Script (Applied dynamically from HTML div )
      $("[data-action=fullpreviewcode]").val(function() {
        return $.map($(".updatepreviewcode"), function (el) {
          return el.value;
        }).join("");
      });
      // Update JSZipHREF's (Applied dynamically from HTML div )
      $("[data-action=zipfileshrefcode]").val(function() {
        return $.map($(".zipfileshref"), function (el) {
          return el.value;
        }).join("\n    ");
      });
      // Update JSZip (Applied dynamically from HTML div )
      $("[data-action=fulljszipcode]").val(function() {
        return $.map($(".jszipcode"), function (el) {
          return el.value;
        }).join("\n");
      });

      // Apply Update Code
      $("#applyfullpreview").empty().append( "<script>" + $("[data-action=fullpreviewcode]").val() + "<" + "/script>" );

      // Call Active Editor      
      $("#applyactiveeditorcode").empty().append( "<script>" + $("[data-action=fullactiveeditorcode]").val() + "<" + "/script>" );

      // Add Link/Source HREF's
      closeFinal.setValue("\n" + $("[data-action=zipfileshrefcode]").val() + "\n  </body>\n</html>");

      // Apply Export Function
      $("#applyjszip script").remove();
      $("#applyjszip").empty().append( "<script>" + $("[data-action=fulljszipcode]").val() + "<" + "/script>" );

      return false;
    }
    SelectFile();
    
    // Adds a new custom file
    $(".addvfile").click(function() {
      var count = Date.now();
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
      var cssUpdate = "<textarea class='updatepreviewcode hide'>\npreview.write('<st' + 'yle' + '>' + cssEditor"+ count +".getValue() + '</st' + 'yle>');\n</textarea>";
      var cssJSZipHREF = "<textarea class='zipfileshref hide'><link rel=\"stylesheet\" href=\"css/"+ $val.toLowerCase() +"\" /></textarea>";
      var cssJSZip = "<textarea class='jszipcode hide'>zip.file('css/"+ $val.toLowerCase() +"', cssEditor"+ count +".getValue()); </textarea>";
      var jsCodemirror = 'var jsEditor'+ count +' = CodeMirror(document.getElementById("jsfile'+ count +'"), {  mode: "text/javascript",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  lint : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],  value: "// comment"}); var inlet = Inlet(jsEditor'+ count +'); jsEditor'+ count +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); jsEditor'+ count +'.on("drop", function() { jsEditor'+ count +'.setValue(""); }); ';
      
      var jsActiveEditor = '$("#jsfile'+ count +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "jsfile'+ count +'" ) { $(".activeEditor").val("jsfile'+ count +'"); } });';
      // var jsActiveEditor = "<textarea class='calleditor hide'>if ( $(this).attr('id') === 'jsfile"+ count +"' ) { $('.activeEditor').val('jsfile"+ count +"'); }</textarea>";
      var jsUndo = "<textarea class='undocode hide'> else if ( $('.activeEditor').val() === 'jsfile"+ count +"' ) { jsEditor"+ count + ".undo(); $('.edit.active').trigger('click'); }</textarea>";
      var jsRedo = "<textarea class='redocode hide'> else if ( $('.activeEditor').val() === 'jsfile"+ count +"' ) { jsEditor"+ count + ".redo(); $('.edit.active').trigger('click'); }</textarea>";
      var jsUpdate = "<textarea class='updatepreviewcode hide'>\npreview.write('<scr' + 'ipt>' + jsEditor"+ count +".getValue() + '</scr' + 'ipt>');\n</textarea>";
      var jsJSZipHREF = "<textarea class='zipfileshref hide'><script src=\"js/"+ $val.toLowerCase() +"\"></script></textarea>";
      var jsJSZip = "<textarea class='jszipcode hide'>zip.file('js/"+ $val.toLowerCase() +"', jsEditor"+ count +".getValue()); </textarea>";
      
      if ($val.toLowerCase().substring($val.length - 5) === ".html") {
        // $(".html-editor").append( '<li id="htmlfile'+ count + '" class="htmlfile' + count + '"></li>' );
        // $(".vfiles").append( '<li class="htmlfile' + count + '">'+ htmlfile +'<script>' + htmlCodemirror + '<' + '/script></li>' );
        // alertify("NOTE: The live preview only applies to index.html");
      } else if ($val.toLowerCase().substring($val.length - 4) === ".css") {
        $(".css-editor").append( '<div id="cssfile'+ count + '" class="cssfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="cssfile' + count + '">'+ cssfile +'<script>var activeEditor = $(".activeEditor"); ' + cssCodemirror + cssActiveEditor + '<' + '/script>'+ cssUndo + cssRedo + cssUpdate + cssJSZipHREF + cssJSZip + '</li>' );
        TogetherJS.reinitialize();
      } else if ($val.toLowerCase().substring($val.length - 3) === ".js") {
        $(".js-editor").append( '<div id="jsfile'+ count + '" class="jsfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="jsfile' + count + '">'+ jsfile + '<script>var activeEditor = $(".activeEditor"); ' + jsCodemirror + jsActiveEditor + '<' + '/script>'+ jsUndo + jsRedo + jsUpdate + jsJSZipHREF + jsJSZip + '</li>' );
        TogetherJS.reinitialize();
      } else {
        alertify.error("Houston we have a problem!");
      }
      
      SelectFile();

      var newfile = $(".vfiles").html();
      if (TogetherJS.running) {
        TogetherJS.send({
          type: "new-file",
          output: newfile
        });
      }
      
      if ($val.toLowerCase().substring($val.length - 4) === ".css") {
        var csseditor = $(".css-editor").html();
        if (TogetherJS.running) {
          TogetherJS.send({
            type: "new-css",
            output: csseditor
          });
        }
      } else if ($val.toLowerCase().substring($val.length - 3) === ".js") {
        var jseditor = $(".js-editor").html();
        if (TogetherJS.running) {
          TogetherJS.send({
            type: "new-js",
            output: jseditor
          });
        }
      }

      $(".vfilename").val("");
    });
    
    $(".vfilename").keyup(function(event) {
      if ( event.which == 13 ) {
        $(".addvfile").click();
      }
    });
    TogetherJS.hub.on("new-file", function (msg) {
      if (! msg.sameUrl) {
        return;
      }
      $(".vfiles").html(msg.output);
      SelectFile();
      TogetherJS.reinitialize();
    });
    TogetherJS.hub.on("new-css", function (msg) {
      if (! msg.sameUrl) {
        return;
      }
      $(".css-editor").html(msg.output);
      SelectFile();
    });
    TogetherJS.hub.on("new-js", function (msg) {
      if (! msg.sameUrl) {
        return;
      }
      $(".js-editor").html(msg.output);
      SelectFile();
    });
    TogetherJS.hub.on("del-file", function (msg) {
      if (! msg.sameUrl) {
        return;
      }
      $(".vfiles").html(msg.output);
      SelectFile();
    });
  });
  
  // Add/Remove Libraries
  $("[data-action=check]").on("change", function() {
    var textarea = $("[data-action=library-code]");
    var value = $(this).parent().nextAll("div").children(".libsources:first").val() + "\n";
    
    if ( $("#alertify").is(":checked") ) {
      $('.alertifyjs').val("");
      download_to_textbox('libraries/alertify/themes/alertify.core.css', $('.alertifyjs1'));
      download_to_textbox('libraries/alertify/themes/alertify.default.css', $('.alertifyjs2'));
      download_to_textbox('libraries/alertify/alertify.min.js', $('.alertifyjs3'));
      $(".alertifyzip").val("zip.file('libraries/alertify/themes/alertify.core.css', $(\".alertifyjs1\").val());\nzip.file('libraries/alertify/themes/alertify.default.css', $(\".alertifyjs2\").val());\nzip.file('libraries/alertify/alertify.min.js', $(\".alertifyjs3\").val());");
    } else {
      $('.alertifyjs, .alertifyzip').val("");
    }
    
    if ( $("#bootstrap").is(":checked") ) {
      $('.bootstrap').val("");
      download_to_textbox('libraries/bootstrap/bootstrap.css', $('.bootstrap1'));
      download_to_textbox('libraries/bootstrap/bootstrap.js', $('.bootstrap2'));
      $('.bootstrap1, .bootstrap2').trigger("change");
      $(".bootstrapzip").val("zip.file('libraries/bootstrap/bootstrap.css', $('.bootstrap1').val());\n  zip.file('libraries/bootstrap/bootstrap.js', $('.bootstrap2').val());");
    } else {
      $('.bootstrap, .bootstrapzip').val("");
    }
    
    if ( $("#chartjs").is(":checked") ) {
      $('.chartjs').val("");
      download_to_textbox('libraries/chartjs/chart.min.js', $('.chartjs'));
      $('.chartjs').trigger("change");
      $(".chartjszip").val("zip.file('libraries/chartjs/chart.min.js', $('.chartjs').val());");
    } else {
      $('.chartjs, .chartjszip').val("");
    }
    if ( $("#createjs").is(":checked") ) {
      $('.createjs').val("");
      download_to_textbox('libraries/createjs/createjs.min.js', $('.createjs1'));
      download_to_textbox('libraries/createjs/easeljs.min.js', $('.createjs2'));
      download_to_textbox('libraries/createjs/tweenjs.min.js', $('.createjs3'));
      download_to_textbox('libraries/createjs/soundjs.min.js', $('.createjs4'));
      download_to_textbox('libraries/createjs/preloadjs.min.js', $('.createjs5'));
      $('.createjs').trigger("change");
      $(".createjszip").val("zip.file('libraries/createjs/createjs.min.js', $('.createjs1').val());\nzip.file('libraries/createjs/easeljs.min.js', $('.createjs2').val());\nzip.file('libraries/createjs/tweenjs.min.js', $('.createjs3').val());\nzip.file('libraries/createjs/soundjs.min.js', $('.createjs4').val());\nzip.file('libraries/createjs/preloadjs.min.js', $('.createjs5').val());");
    } else {
      $('.createjs, .createjszip').val("");
    }
    if ( $("#d3").is(":checked") ) {
      $('.d3').val("");
      download_to_textbox('libraries/d3/d3.js', $('.d3'));
      $('.d3').trigger("change");
      $(".d3zip").val("zip.file('libraries/d3/d3.js', $(\".d3\").val());");
    } else {
      $('.d3, .d3zip').val("");
    }
    if ( $("#dojo").is(":checked") ) {
      $('.dojo').val("");
      download_to_textbox('libraries/dojo/dojo.js', $('.dojo'));
      $('.dojo').trigger("change");
      $(".dojozip").val("zip.file('libraries/dojo/dojo.js', $(\".dojo\").val());");
    } else {
      $('.dojo, .dojozip').val("");
    }
    if ( $("#fabric").is(":checked") ) {
      $('.fabric').val("");
      download_to_textbox('libraries/fabric/fabric.min.js', $('.fabric'));
      $('.fabric').trigger("change");
      $(".fabriczip").val("zip.file('libraries/fabric/fabric.min.js', $(\".fabric\").val());");
    } else {
      $('.fabric, .fabriczip').val("");
    }
    if ( $("#jquery").is(":checked") ) {
      $('.jquery').val("");
      download_to_textbox('libraries/jquery/jquery.js', $('.jquery'));
      $('.jquery').trigger("change");
      $(".jqueryzip").val("zip.file('libraries/jquery/jquery.js', $(\".jquery\").val());");
    } else {
      $('.jquery, .jqueryzip').val("");
    }
    if ( $("#jqueryui").is(":checked") ) {
      $('.jqueryui').val("");
      download_to_textbox('libraries/jqueryui/jqueryui.css', $('.jqueryui1'));
      download_to_textbox('libraries/jqueryui/jqueryui.min.js', $('.jqueryui2'));
      download_to_textbox('libraries/jqueryui/jquery.ui.touch-punch.min.js', $('.jqueryui3'));
      $('.jqueryui').trigger("change");
      $(".jqueryuizip").val("zip.file('libraries/jqueryui/jqueryui.css', $(\".jqueryui1\").val());\nzip.file('libraries/jqueryui/jqueryui.min.js', $(\".jqueryui2\").val());\nzip.file('libraries/jqueryui/jquery.ui.touch-punch.min.js', $(\".jqueryui3\").val());");
    } else {
      $('.jqueryui, .jqueryuizip').val("");
    }
    if ( $("#jquerytools").is(":checked") ) {
      $('.jquerytools').val("");
      download_to_textbox('libraries/jquerytools/jquery.tools.min.js', $('.jquerytools'));
      $('.jquerytools').trigger("change");
      $(".jquerytoolszip").val("zip.file('libraries/jquerytools/jquery.tools.min.js', $(\".jquerytools\").val());");
    } else {
      $('.jquerytools, .jquerytoolszip').val("");
    }
    if ( $("#jszip").is(":checked") ) {
      $('.jszip').val("");
      download_to_textbox('libraries/jquery/jquery.js', $('.jszip'));
      $('.jszip').trigger("change");
      $(".jszipzip").val("zip.file('libraries/jszip/jszip.min.js', $(\".jszip\").val());\nzip.file('libraries/jszip/jszip-utils.js', $(\".jszip\").val());\nzip.file('libraries/jszip/FileSaver.js', $(\".jszip\").val());");
    } else {
      $('.jszip, .jszipzip').val("");
    }
    if ( $("#jquerytools").is(":checked") ) {
      $('.jquerytools').val("");
      download_to_textbox('libraries/jquerytools/jquery.tools.min.js', $('.jquerytools'));
      $('.jquerytools').trigger("change");
      $(".jquerytoolszip").val("zip.file('libraries/jquerytools/jquery.tools.min.js', $(\".jquerytools\").val());");
    } else {
      $('.jquerytools, .jquerytoolszip').val("");
    }
    if ( $("#kinetic").is(":checked") ) {
      $('.kinetic').val("");
      download_to_textbox('libraries/kinetic/kinetic.js', $('.kinetic'));
      $('.kinetic').trigger("change");
      $(".kineticzip").val("zip.file('libraries/kinetic/kinetic.js', $(\".kinetic\").val());");
    } else {
      $('.kinetic, .kineticzip').val("");
    }
    if ( $("#knockout").is(":checked") ) {
      $('.knockout').val("");
      download_to_textbox('libraries/knockout/knockout.js', $('.knockout'));
      $('.knockout').trigger("change");
      $(".knockoutzip").val("zip.file('libraries/knockout/knockout.js', $(\".knockout\").val());");
    } else {
      $('.knockout, .knockoutzip').val("");
    }
    if ( $("#modernizer").is(":checked") ) {
      $('.modernizer').val("");
      download_to_textbox('libraries/modernizer/modernizer.js', $('.modernizer'));
      $('.modernizer').trigger("change");
      $(".modernizerzip").val("zip.file('libraries/modernizer/modernizer.js', $(\".modernizer\").val());");
    } else {
      $('.modernizer, .modernizerzip').val("");
    }
    if ( $("#mootools").is(":checked") ) {
      $('.mootools').val("");
      download_to_textbox('libraries/mootools/mootools-yui-compressed.js', $('.mootools'));
      $('.mootools').trigger("change");
      $(".mootoolszip").val("zip.file('libraries/mootools/mootools-yui-compressed.js', $(\".mootools\").val());");
    } else {
      $('.mootools, .mootoolszip').val("");
    }
    if ( $("#normalize").is(":checked") ) {
      $('.normalize').val("");
      download_to_textbox('libraries/normalize/normalize.css', $('.normalize'));
      $('.normalize').trigger("change");
      $(".normalizezip").val("zip.file('libraries/normalize/normalize.css', $(\".normalize\").val());");
    } else {
      $('.normalize, .normalizezip').val("");
    }
    if ( $("#paperjs").is(":checked") ) {
      $('.paperjs').val("");
      download_to_textbox('libraries/paperjs/paperjs.js', $('.paperjs'));
      $('.paperjs').trigger("change");
      $(".paperjszip").val("zip.file('libraries/paperjs/paperjs.js', $(\".paperjs\").val());");
    } else {
      $('.paperjs, .paperjszip').val("");
    }
    if ( $("#processingjs").is(":checked") ) {
      $('.processingjs').val("");
      download_to_textbox('libraries/processingjs/processingjs.js', $('.processingjs'));
      $('.processingjs').trigger("change");
      $(".processingjszip").val("zip.file('libraries/processingjs/processingjs.js', $(\".processingjs\").val());");
    } else {
      $('.processingjs, .processingjsszip').val("");
    }
    if ( $("#prototypejs").is(":checked") ) {
      $('.prototypejs').val("");
      download_to_textbox('libraries/processingjs/prototypejs.js', $('.prototypejs'));
      $('.prototypejs').trigger("change");
      $(".prototypejszip").val("zip.file('libraries/prototypejs/prototypejs.js', $(\".prototypejs\").val());");
    } else {
      $('.prototypejs, .prototypejszip').val("");
    }
    if ( $("#qooxdoo").is(":checked") ) {
      $('.qooxdoo').val("");
      download_to_textbox('libraries/qooxdoo/qooxdoo.js', $('.qooxdoo'));
      $('.qooxdoo').trigger("change");
      $(".qooxdooszip").val("zip.file('libraries/qooxdoo/qooxdoo.js', $(\".qooxdoo\").val());");
    } else {
      $('.qooxdoo, .qooxdooszip').val("");
    }
    if ( $("#raphael").is(":checked") ) {
      $('.raphael').val("");
      download_to_textbox('libraries/raphael/raphael.js', $('.raphael'));
      $('.raphael').trigger("change");
      $(".raphaelzip").val("zip.file('libraries/raphael/raphael.js', $(\".raphael\").val());");
    } else {
      $('.raphael, .raphaelzip').val("");
    }
    if ( $("#requirejs").is(":checked") ) {
      $('.requirejs').val("");
      download_to_textbox('libraries/require/require.js', $('.requirejs'));
      $('.requirejs').trigger("change");
      $(".requirejszip").val("zip.file('libraries/require/require.js', $(\".requirejs\").val());");
    } else {
      $('.requirejs, .requirejszip').val("");
    }
    if ( $("#scriptaculous").is(":checked") ) {
      $('.scriptaculous').val("");
      download_to_textbox('libraries/scriptaculous/scriptaculous.js', $('.scriptaculous'));
      $('.scriptaculous').trigger("change");
      $(".scriptaculouszip").val("zip.file('libraries/scriptaculous/scriptaculous.js', $(\".scriptaculous\").val());");
    } else {
      $('.scriptaculous, .scriptaculouszip').val("");
    }
    if ( $("#snapsvg").is(":checked") ) {
      $('.snapsvg').val("");
      download_to_textbox('libraries/snap-svg/snap-svg.js', $('.snapsvg'));
      $('.snapsvg').trigger("change");
      $(".snapsvgzip").val("zip.file('libraries/snap-svg/snap-svg.js', $(\".snapsvg\").val());");
    } else {
      $('.snapsvg, .snapsvgzip').val("");
    }
    if ( $("#svgjs").is(":checked") ) {
      $('.svgjs').val("");
      download_to_textbox('libraries/svg-svg/svg-svg.js', $('.svgjs'));
      $('.svgjs').trigger("change");
      $(".svgjszip").val("zip.file('libraries/svg-svg/svg-svg.js', $(\".svgjs\").val());");
    } else {
      $('.svgjs, .svgjszip').val("");
    }
    if ( $("#threejs").is(":checked") ) {
      $('.threejs').val("");
      download_to_textbox('libraries/threejs/three.min.js', $('.threejs'));
      $('.threejs').trigger("change");
      $(".threejszip").val("zip.file('libraries/threejs/three.min.js', $(\".threejs\").val());");
    } else {
      $('.threejs, .threejszip').val("");
    }
    if ( $("#underscorejs").is(":checked") ) {
      $('.underscorejs').val("");
      download_to_textbox('libraries/underscore/underscore.js', $('.underscorejs'));
      $('.underscorejs').trigger("change");
      $(".underscorejszip").val("zip.file('libraries/underscore/underscore.js', $(\".underscorejs\").val());");
    } else {
      $('.underscorejs, .underscorejszip').val("");
    }
    if ( $("#webfontloader").is(":checked") ) {
      $('.webfontloader').val("");
      download_to_textbox('libraries/webfont/webfont.js', $('.webfontloader'));
      $('.webfontloader').trigger("change");
      $(".webfontloaderzip").val("zip.file('libraries/webfont/webfont.js', $(\".webfontloader\").val());");
    } else {
      $('.webfontloader, .webfontloaderzip').val("");
    }
    if ( $("#yui").is(":checked") ) {
      $('.yui').val("");
      download_to_textbox('libraries/yui/yui.js', $('.yui'));
      $('.yui').trigger("change");
      $(".yuizip").val("zip.file('libraries/yui/yui.js', $(\".yui\").val());");
    } else {
      $('.yui, .yuizip').val("");
    }
    if ( $("#zepto").is(":checked") ) {
      $('.zepto').val("");
      download_to_textbox('libraries/zepto/zepto.js', $('.zepto'));
      $('.zepto').trigger("change");
      $(".zeptozip").val("zip.file('libraries/zepto/zepto.js', $(\".zepto\").val());");
    } else {
      $('.zepto, .zeptozip').val("");
    }

    if ( $(this).prop("checked") === true ) {
      textarea.val( textarea.val() + value );
      yourRefs.setValue( textarea.val() );
    } else {
      textarea.val( textarea.val().replace( value, "") );
      yourRefs.setValue( textarea.val() );
    }
    
    // Update JSZip (Applied dynamically from HTML div )
    $("[data-action=fulljszipcode]").val(function() {
      return $.map($(".jszipcode"), function (el) {
        return el.value;
      }).join("");
    });
    $("#applyjszip script").remove();
    $("#applyjszip").empty().append( "<script>" + $("[data-action=fulljszipcode]").val() + "<" + "/script>" );
  });
  
  // Teamwork
  $("[data-action=teamwork]").click(function() {
    TogetherJS(this); 
    alertify.log("This is an experimental feature, and is still very buggy. <br><br> <strong>Use at your own risk!</strong>");
    return false;
  });
  
  // Save to browser
  $("[data-action=save]").click(function() {
    alertify.error("Not yet available...");
  });
  
  // Dialog Dropdown
  $("header a:not(.skip, .dialog a)").on("click", function() {
    $(this).not(".dialog a").toggleClass("active");
    $(this).next(":not(.skip)").not(".dialog a").toggleClass("hide");

    if ( $(".open-libraries.active").is(":visible") ) {
      $("header a").not(".dialog a, .skip").not(this).removeClass("active").next().addClass("hide");
    }

    if ( $(window).width() > 830 ) {
      $(".dialog.fl").css({
        "left": $(this).offset().left - 250
      });
    } else {
      $(".dialog.fl").css({
        "left": $(this).offset().left
      });
    }
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
    $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
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
