// Handles CodeMirror Preview Delay
var delay,
  loader = $("[data-action=load]"),
  c16 = $("[data-action=n16]"),
  c32 = $("[data-action=n32]"),
  c64 = $("[data-action=n64]"),
  canvas = $("[data-action=holder]"),
  ctx16 = c16[0].getContext("2d"),
  ctx32 = c32[0].getContext("2d"),
  ctx64 = c64[0].getContext("2d"),
  ctx = canvas[0].getContext("2d");

function displayPreview(file) {
  var reader = new FileReader();

  reader.onload = function(e) {
    var img = new Image();
    var img16 = new Image();
    var img32 = new Image();
    var img64 = new Image();
    img.src = e.target.result;
    img16.src = e.target.result;
    img32.src = e.target.result;
    img64.src = e.target.result;
    img16.onload = function() {
      // x, y, width, height
      ctx16.clearRect(0, 0, 16, 16);
      ctx16.drawImage(img16, 0, 0, 16, 16);
    };
    img32.onload = function() {
      // x, y, width, height
      ctx32.clearRect(0, 0, 32, 32);
      ctx32.drawImage(img32, 0, 0, 32, 32);
    };
    img64.onload = function() {
      // x, y, width, height
      ctx64.clearRect(0, 0, 64, 64);
      ctx64.drawImage(img64, 0, 0, 64, 64);
    };
    img.onload = function() {
      // x, y, width, height
      ctx.clearRect(0, 0, 128, 128);
      ctx.drawImage(img, 0, 0, 128, 128);
    };
  };
  reader.readAsDataURL(file);
}

// Rules Specified for HTML Validation
var ruleSets = {
  "tagname-lowercase": true,
  "attr-lowercase": true,
  "attr-value-double-quotes": true,
  "doctype-first": false,
  "tag-pair": true,
  "spec-char-escape": true,
  "id-unique": true,
  "src-not-empty": true,
  "attr-no-duplication": true
};

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
  lint: true,
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
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
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
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
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});
var inlet = Inlet(jsEditor);
var otherEditor = CodeMirror(document.querySelector("#otherEditor"), {
  mode: "text/x-markdown",
  value: "Application Name\n----------------\n\n**About application**\ndescription...\n"
});
var inlet = Inlet(otherEditor);

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
  var counter = 0,
      activeEditor = $(".activeEditor"),
      download_to_textbox = function (url, el) {
        return $.get(url, null, function (data) {
          el.val(data);
        }, 'text');
      },
      responsiveMagic = function() {
        $(window).on("load resize", function() {
          $("#mainSplitter, #splitContainer, #leftSplitter, #rightSplitter").jqxSplitter({
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
              width: "",
              padding: ""
            });
            $(".menubarsize").addClass("hide");
          } else {
            $(".head").css({
              padding: "10px 0 0 0"
            });
            if ( $("#toggle").is(":checked") ) {
              $("#toggle").trigger("click");
            }
            $(".menubarsize").removeClass("hide");
          }
          
          // Dropdown Styles Libraries
          if ( $(this).width() > 924 ) {
            if ( $(this).height() > 552 ) {
              $(".libraries-dialog").css({
                "width": "auto",
                "height": "auto",
                "overflow-y": "auto"
              });
            } else {
              $(".libraries-dialog").css({
                "width": "auto",
                "overflow-y": "auto",
                "height": $(window).height() - 100 + "px"
              });
            }
          } else {
            if ( $(this).height() < 552 ) {
              $(".libraries-dialog").css({
                "height": $(window).height() - 100 + "px",
                "overflow-y": "auto"
              });
            } else {
              $(".libraries-dialog").css({
                "height": $(window).height() - 100 + "px",
                "overflow-y": "auto"
              });
            }
            
            if ( $(this).width() > 551 ) {
              $(".libraries-dialog").css({
                "width": "212px"
              });
            }
          }
          
          // Dropdown Styles Demos
          if ( $(this).width() > 550 ) {
            if ( $(this).height() > 330 ) {
              $(".demos-dialog").css({
                "width": "auto",
                "height": "233px",
                "overflow-y": "visible"
              });
            } else {
              $(".demos-dialog").css({
                "width": "auto",
                "height": $(window).height() - 100 + "px",
                "overflow-y": "auto"
              });
            }
          } else {
            if ( $(this).height() < 335 ) {
              $(".demos-dialog").css({
                "height": $(window).height() - 100 + "px",
                "overflow-y": "auto"
              });
            } else {
              $(".demos-dialog").css({
                "height": $(window).height() - 100 + "px",
                "overflow-y": "auto"
              });
            }
            
            if ( $(this).width() > 538 ) {
              $(".demos-dialog").css({
                "width": "212px"
              });
            }
          }
        });

        var BoxSplitter = function() {
          $("#mainSplitter").jqxSplitter({
            height: "auto",
            width: "100%",
            orientation: "horizontal",
            showSplitBar: true,
            panels: [{ size: '70%',collapsible:false },
                     { size: '30%' }]
          }).jqxSplitter('collapse');
          $("#splitContainer").jqxSplitter({
            height: "auto",
            width: "100%",
            orientation: "horizontal",
            showSplitBar: true,
            panels: [{ size: "50%",collapsible:false },
                     { size: "50%" }]
          });
          $("#leftSplitter").jqxSplitter({
            width: "100%",
            height: "100%",
            orientation: "vertical",
            showSplitBar: true,
            panels: [{
              size: "50%",
              collapsible: false
            }]
          });
          $("#rightSplitter").jqxSplitter({
            width: "100%",
            height: "100%",
            orientation: "vertical",
            showSplitBar: true,
            panels: [{
              size: "50%",
              collapsible: false
            }]
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
            $("#mainSplitter").jqxSplitter({
              height: "auto",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: true,
              panels: [{ size: '100%',collapsible:false },
                       { size: '0%' }]
            });
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
            $("#mainSplitter").jqxSplitter({
              height: "auto",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: true,
              panels: [{ size: '100%',collapsible:false },
                       { size: '0%' }]
            });
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
            $("#mainSplitter").jqxSplitter({
              height: "auto",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: true,
              panels: [{ size: '100%',collapsible:false },
                       { size: '0%' }]
            });
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
            $("#mainSplitter").jqxSplitter({
              height: "auto",
              width: "100%",
              orientation: "horizontal",
              showSplitBar: true,
              panels: [{ size: '100%',collapsible:false },
                       { size: '0%' }]
            });
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

        // Dialog Dropdown
        $("header a:not(.skip, .dialog a)").on("click", function() {
          $(this).not(".dialog a").toggleClass("active");
          $(this).next(":not(.skip)").not(".dialog a").toggleClass("hide");

          if ( ($(".open-libraries.active").is(":visible")) || ($(".open-demos.active").is(":visible")) ) {
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
      },
      newProject = function() {
        $("[data-action=newproj]").on("click", function() {
          $("[data-action=newprojdialog]").fadeIn();
        });
        $("[data-action=confirm-newproj]").click(function() {
          $("#todos, #css-editor, #js-editor, #other-editor").empty();
          $(".check").attr("checked", false).trigger("change");
          htmlEditor.setValue("");
          cssEditor.setValue("");
          jsEditor.setValue("");
          $(".vprojectname, #description, [data-action=outputkeycode]").val("");
          if ( $(".newfile").is(":visible") ) {
            $(".newfile").remove();
          }
          $("[data-action=newprojdialog]").fadeOut();
          alertify.success("New project created.");
          $("#todos, #css-editor, #js-editor, #other-editor").empty();
          save();
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({type: "init-items", items: []});
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          SelectFile();
          return false;
        });
        $("[data-action=cancel-newproj]").click(function() {
          $("[data-action=newprojdialog]").fadeOut();
          return false;
        });
        $("[data-action=newprojdialog]").fadeOut();
      },
      shortcutKeys = function() {
        // New Project
        shortcut.add("Ctrl+N", function() {
          $("[data-action=confirm-newproj]").trigger("click");
        });
        // Save Project
        shortcut.add("Ctrl+S", function() {
          $("[data-action=export]").trigger("click");
        });
      },
      appDemos = function() {
        $("[data-action=alphabetizer]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Alphabetizer");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <a class=\"btn--default\" data-action=\"alphabetize\">Alphabetize</a>\n    <textarea class=\"form__input\" data-action=\"input-list\" rows=\"7\" placeholder=\"Alphabetize your text here...\">China\nIndia\nUnited States of America\nIndonesia\nBrazil\nPakistan\nNigeria\nBangladesh\nRussia\nJapan\nMexico\nPhilippines\nEthiopia\nVietnam\nEgypt\nGermany\nIran\nTurkey\nDemocratic Republic of the Congo\nFrance</textarea>\n  </div>\n</div>");
          cssEditor.setValue("@import url(\"http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900\");\n\na {\n  cursor: pointer;\n}\n\n.grid:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.srt, .form__label--hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.panel--centered, .panel--padded--centered, [class^=\"btn--\"] {\n  text-align: center; }\n\n[class^=\"progbar__\"]:after, .icn--nav-toggle:before {\n  display: block;\n  content: '';\n  position: absolute; }\n\n.centered, .grid {\n  float: none;\n  margin-left: auto;\n  margin-right: auto; }\n\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\n*\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbody {\n  color: #797e83;\n  font-size: 16px;\n  font-family: \"Lato\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.5; }\n\nh3 {\n  font-size: 1.125em; }\n\nh4 {\n  margin-top: 1.375em;\n  margin-bottom: 2.57143em;\n  color: #d6d7d9;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 400;\n  font-size: 0.875em; }\n  @media (min-width: 769px) {\n    h4 {\n      margin-top: 2.625em; } }\n\na {\n  color: #656a6e;\n  text-decoration: none;\n  font-weight: 400; }\n\np {\n  margin: 0 0 1.66667em;\n  font-weight: 300;\n  font-size: 1.125em;\n  line-height: 1.5; }\n\nblockquote {\n  font-weight: 300;\n  font-style: italic;\n  font-size: 1.25em; }\n  @media (min-width: 769px) {\n    blockquote {\n      margin: 1.33333em 0;\n      padding: 0 0 0 5%;\n      border-left: 0.33333em solid #ebecec;\n      font-size: 1.5em; } }\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n  list-style-type: none; }\n\nimg {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  height: auto; }\n\ninput,\ntextarea {\n  display: block;\n  padding: 15px;\n  width: 100%;\n  outline: 0;\n  border: 0; }\n\ninput:focus,\ntextarea:focus {\n  transition: 0.3s; }\n\nbutton {\n  outline: 0; }\n\nfooter {\n  border-top: 1px solid #ebecec; }\n  footer p {\n    font-size: 1em;\n    margin-top: 1.375em; }\n\n.panel, .panel--centered {\n  padding-top: 1.875em; }\n  @media (min-width: 769px) {\n    .panel, .panel--centered {\n      padding-bottom: 1.25em; } }\n\n.panel--padded, .panel--padded--centered {\n  padding-top: 2.125em; }\n  @media (min-width: 769px) {\n    .panel--padded, .panel--padded--centered {\n      padding-top: 5em;\n      padding-bottom: 2.125em; } }\n\n.grid {\n  width: 90%; }\n  [class*=\"grid__col--\"] > .grid {\n    width: 100%; }\n  @media (min-width: 1100px) {\n    .grid {\n      max-width: 1050px; } }\n\n@media (min-width: 769px) {\n  .grid__col--1 {\n    width: 6.5%; }\n  .grid__col--2 {\n    width: 15%; }\n  .grid__col--3 {\n    width: 23.5%; }\n  .grid__col--4 {\n    width: 32%; }\n  .grid__col--5 {\n    width: 40.5%; }\n  .grid__col--6 {\n    width: 49%; }\n  .grid__col--7 {\n    width: 57.5%; }\n  .grid__col--8 {\n    width: 66%; }\n  .grid__col--9 {\n    width: 74.5%; }\n  .grid__col--10 {\n    width: 83%; }\n  .grid__col--11 {\n    width: 91.5%; }\n  .grid__col--12 {\n    width: 100%; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  [class^=\"grid__col--\"] {\n    margin-top: 0.75em;\n    margin-bottom: 0.75em; } }\n@media (min-width: 769px) {\n  [class^=\"grid__col--\"] {\n    float: left;\n    min-height: 1px;\n    padding-left: 10px;\n    padding-right: 10px; }\n    [class^=\"grid__col--\"] + [class^=\"grid__col--\"] {\n      margin-left: 2%; }\n    [class^=\"grid__col--\"]:last-of-type {\n      float: right; } }\n\n.theme__poly .grid [class*=\"grid__col\"] {\n  font-weight: 100;\n  margin-bottom: 1em;\n  padding: 1.75%; }\n\n@media (min-width: 769px) {\n  .nav__item, .nav__item--current {\n    display: inline-block;\n    margin: 0 0.625em; } }\n\n.nav__item--current a, .nav__item a {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    .nav__item--current a, .nav__item a {\n      border-bottom-color: #ebecec;\n      padding-top: 0.77778em;\n      padding-bottom: 0.77778em; } }\n\n.nav__item--current a, .nav__item a:hover {\n  color: #0b0b0b;\n  border-color: #52bab3; }\n\nh1, .headline-primary, .headline-primary--grouped {\n  color: #525559;\n  font-weight: 300;\n  font-size: 2.625em;\n  line-height: 1.09524;\n  margin-top: 0; }\n\nh2, .headline-secondary, .headline-secondary--grouped {\n  color: #999da1;\n  letter-spacing: 1px;\n  font-weight: 100;\n  font-size: 1.5em;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n\n.form__btn, [class^=\"btn--\"] {\n  padding: 15px 30px;\n  border: 0;\n  border-radius: 0.4em;\n  color: #fff;\n  text-transform: uppercase;\n  font-size: 0.875em;\n  font-weight: 400;\n  transition: opacity 0.3s;\n  display: block; }\n  .form__btn:hover, [class^=\"btn--\"]:hover {\n    opacity: .75; }\n  .form__btn:active, [class^=\"btn--\"]:active {\n    opacity: initial; }\n\n.menu__link, .menu__link--end {\n  display: block;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px rgba(11, 11, 11, 0.2);\n  font-size: 1.125em; }\n\n.icn--nav-toggle, .icn--close {\n  line-height: 0;\n  cursor: pointer; }\n\n.img--wrap {\n  border: 1px solid #d6d7d9;\n  padding: 0.75em; }\n.img--avatar {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 50%; }\n  @media (min-width: 769px) {\n    .img--avatar {\n      margin-top: 1.5em; } }\n@media (min-width: 769px) {\n  .img--hero {\n    margin-bottom: 2.625em; } }\n\n.headline-primary {\n  margin-bottom: 1.66667em; }\n  .headline-primary--grouped {\n    margin-bottom: 0; }\n.headline-secondary {\n  margin-bottom: 0.91667em; }\n  .headline-secondary--grouped {\n    margin-top: 0.41667em;\n    margin-bottom: 2.25em; }\n\n.form__label {\n  display: block;\n  margin-bottom: 0.625em; }\n.form__input {\n  font-size: 1.125em;\n  margin-bottom: 1.11111em;\n  border-bottom: 6px solid #d6d7d9;\n  border-radius: 0.4em;\n  background: #ebecec;\n  color: black;\n  font-weight: 300; }\n  .form__input:focus {\n    border-color: #52bab3; }\n.form__btn {\n  background: #52bab3; }\n\n.btn--default {\n  background-color: #52bab3; }\n.btn--success {\n  background-color: #5ece7f; }\n.btn--error {\n  background-color: #e67478; }\n.btn--warning {\n  background-color: #ff784f; }\n.btn--info {\n  background-color: #9279c3; }\n\n[class^=\"btn--\"] {\n  margin-bottom: 1.42857em; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    [class^=\"btn--\"] {\n      width: 100%; } }\n  @media (min-width: 769px) {\n    [class^=\"btn--\"] {\n      width: auto;\n      display: inline-block; }\n      [class^=\"btn--\"] + [class^=\"btn--\"] {\n        margin-left: 20px; } }\n\n.navbar {\n  position: relative; }\n  @media (min-width: 769px) {\n    .navbar {\n      margin-top: 3.375em;\n      margin-bottom: 0; } }\n\n.nav {\n  margin-top: 1.25em;\n  margin-bottom: 1.875em; }\n  .nav__item a {\n    color: #797e83; }\n\n.offcanvas {\n  position: relative;\n  padding: 0.625em;\n  letter-spacing: 1px;\n  background: #39add1;\n  background: linear-gradient(45deg, rgba(94, 206, 127, 0.8) 0%, #39add1 100%); }\n\n.menu {\n  margin-top: 1.25em; }\n  .menu__link {\n    border-bottom: solid 1px rgba(255, 255, 255, 0.3); }\n\n.progbar {\n  height: 4px;\n  border-radius: 2px;\n  background: #d6d7d9;\n  position: relative;\n  margin-bottom: 2.875em; }\n  .progbar__status--default {\n    background-color: #52bab3; }\n    .progbar__status--default:after {\n      background-color: #6fc6c0; }\n  .progbar__status--success {\n    background-color: #5ece7f; }\n    .progbar__status--success:after {\n      background-color: #7dd898; }\n  .progbar__status--error {\n    background-color: #e67478; }\n    .progbar__status--error:after {\n      background-color: #ec979a; }\n  .progbar__status--warning {\n    background-color: #ff784f; }\n    .progbar__status--warning:after {\n      background-color: #ff9778; }\n  .progbar__status--info {\n    background-color: #9279c3; }\n    .progbar__status--info:after {\n      background-color: #a995d0; }\n\n[class^=\"progbar__\"] {\n  display: block;\n  width: 50%;\n  height: 100%;\n  border-radius: inherit;\n  position: relative; }\n  [class^=\"progbar__\"]:after {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    right: -10px;\n    top: -8px; }\n\n.site-logo {\n  background-image: url(\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/logo.svg\");\n  background-repeat: no-repeat;\n  width: 115px;\n  height: 45px;\n  display: inline-block; }\n\n.icn--nav-toggle {\n  width: 25px;\n  height: 17px;\n  border-top: solid 3px #797e83;\n  border-bottom: solid 3px #797e83;\n  position: relative; }\n  .icn--nav-toggle:before {\n    width: 25px;\n    height: 3px;\n    background: #999da1;\n    top: 4px; }\n.icn--close {\n  background-image: url(\"img/icn-close.svg\");\n  background-repeat: no-repeat;\n  width: 20px;\n  height: 20px;\n  display: block;\n  position: absolute;\n  right: 4%;\n  top: 4%; }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-displayed-mobile {\n    display: block; }\n    .is-hidden-mobile {\n      display: none; } }\n@media (min-width: 769px) {\n  .is-displayed-mobile {\n    display: none; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-collapsed-mobile {\n    visibility: collapse;\n    padding: 0;\n    height: 0;\n    margin: 0;\n    line-height: 0; } }\n\n.theme__poly .grid__col--12 {\n  background-color: #DEF4E5; }\n\n.theme__poly .grid__col--8 {\n  background-color: #DCE0F2; }\n\n.theme__poly .grid__col--7 {\n  background-color: #DCF0EF; }\n\n.theme__poly .grid__col--6 {\n  background-color: #FFE3DB; }\n\n.theme__poly .grid__col--4 {\n  background-color: #F8EDD0; }\n\n.theme__poly .grid__col--5 {\n  background-color: #EAEBEC; }\n\n.theme__poly .grid__col--2 {\n  background-color: #C5E2CE; }\n\n.theme__poly .grid__col--3 {\n  background-color: #D6EEF5; }\n\n/*# sourceMappingURL=application.css.map */\n\n/* Tabs */\n.tabs input[type=radio] {\n  display: none;\n}\n.tabs {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n}\n.tabs li {\n  float: left;\n}\n.tabs label {\n  display: inline-block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.tabs label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.tab-content {\n  z-index: 2;\n  display: none;\n  left: 0;\n  width: 100%;\n  padding: 1em 0.4em;\n  position: absolute;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=tab]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=tab]:checked ~ [id^=tab-content] {\n  display: block;\n}\n\n/* Accordion */\n.accordion input[type=radio] {\n  display: none;\n}\n.accordion {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n  margin-top: 1.25em;\n}\n.accordion label {\n  display: block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.accordion label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.acc-content {\n  z-index: 2;\n  display: none;\n  width: 100%;\n  padding: 1em 0.4em;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=acc]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=acc]:checked ~ [id^=acc-content] {\n  display: block;\n}\n.grid {\n  text-align: left;\n}\n");
          jsEditor.setValue("var txt = document.querySelector(\"[data-action=input-list]\");\ndocument.querySelector(\"[data-action=alphabetize]\").addEventListener(\"click\", function() {\n  txt.value = (txt.value.split(\"\\n\").sort(caseInsensitive).join(\"\\n\"));\n\n  function caseInsensitive(a, b) {\n    return a.toLowerCase().localeCompare(b.toLowerCase());\n  }\n});\n");
          $(".open-demos, #normalize").trigger("click");
        });
        $("[data-action=applicator]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Code Applicator");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<textarea id=\"addcode\" placeholder=\"Encode here...\"></textarea>\n<textarea id=\"encode\" readonly placeholder=\"Encoded code goes here...\"></textarea>\n<div id=\"decode\">Preview code here.</div>");
          cssEditor.setValue("body {\n  margin: 0;\n}\n\n::-webkit-input-placeholder { /* WebKit browsers */\n  color: #555;\n}\n:-moz-placeholder { /* Mozilla Firefox 4 to 18 */\n  color: #555;\n}\n::-moz-placeholder { /* Mozilla Firefox 19+ */\n  color: #555;\n}\n:-ms-input-placeholder { /* Internet Explorer 10+ */\n  color: #555;\n}\n\n#addcode, #encode, #decode {\n  position: absolute;\n  font-family: monospace;\n  line-height: 1.4em;\n  font-size: 1em;\n  overflow: auto;\n  resize: none;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n#encode, #decode {\n  left: 0;\n  width: 50%;\n  height: 50%;\n  background-color: #fff;\n}\n\n#addcode {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  width: 50%;\n  height: 100%;\n  min-height: 1.4em;\n  border: 0;\n  border-radius: 0;\n  resize: none;\n  color: #ccc;\n  background-color: #111;\n}\n\n#encode {\n  top: 0;\n}\n\n#decode {\n  bottom: 0;\n}\n");
          jsEditor.setValue("document.querySelector(\"#addcode\").addEventListener(\"keyup\", function() {\n  document.querySelector(\"#encode\").textContent = this.value;\n  document.querySelector(\"#encode\").textContent = document.querySelector(\"#encode\").innerHTML;\n  document.querySelector(\"#decode\").innerHTML = this.value;\n  return false;\n});\n\ndocument.querySelector(\"#encode\").addEventListener(\"click\", function() {\n  this.select();\n  return false;\n});\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=codeeditor]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Code Editor");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<script src=\"http://codemirror.net/lib/codemirror.js\"></script>\n<script src=\"http://codemirror.net/javascripts/code-completion.js\"></script>\n<script src=\"http://codemirror.net/javascripts/css-completion.js\"></script>\n<script src=\"http://codemirror.net/javascripts/html-completion.js\"></script>\n<script src=\"http://codemirror.net/mode/javascript/javascript.js\"></script>\n<script src=\"http://codemirror.net/mode/xml/xml.js\"></script>\n<script src=\"http://codemirror.net/mode/css/css.js\"></script>\n<script src=\"http://codemirror.net/mode/htmlmixed/htmlmixed.js\"></script>\n<script src=\"http://codemirror.net/addon/edit/closetag.js\"></script>\n<script src=\"http://codemirror.net/addon/edit/matchbrackets.js\"></script>\n<script src=\"http://codemirror.net/addon/selection/active-line.js\"></script>\n<script src=\"http://codemirror.net/keymap/extra.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/foldcode.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/foldgutter.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/brace-fold.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/xml-fold.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/comment-fold.js\"></script>\n\n<textarea id=\"code\" name=\"code\"><!doctype html>\n<html>\n  <head>\n    <meta charset=utf-8>\n    <title>HTML5 canvas demo</title>\n    <style>p {font-family: monospace;}</style>\n  </head>\n  <body>\n    <p>Canvas pane goes here:</p>\n    <canvas id=pane width=300 height=200></canvas>\n\n    <script>\n      var canvas = document.getElementById(\"pane\");\n      var context = canvas.getContext(\"2d\");\n\n      context.fillStyle = \"rgb(250,0,0)\";\n      context.fillRect(10, 10, 55, 50);\n\n      context.fillStyle = \"rgba(0, 0, 250, 0.5)\";\n      context.fillRect(30, 30, 55, 50);\n    </script>\n  </body>\n</html></textarea>\n\n<iframe id=\"preview\"></iframe>");
          cssEditor.setValue("@import url(\"http://codemirror.net/lib/codemirror.css\");\n@import url(\"http://codemirror.net/addon/fold/foldgutter.css\");\n\n.CodeMirror {\n  float: left;\n  width: 50%;\n  border: 1px solid black;\n}\n\niframe {\n  width: 49%;\n  float: left;\n  height: 300px;\n  border: 1px solid black;\n  border-left: 0;\n}");
          jsEditor.setValue("var delay;\n\n// Initialize CodeMirror editor\nvar editor = CodeMirror.fromTextArea(document.getElementById(\"code\"), {\n  mode: \"text/html\",\n  tabMode: \"indent\",\n  styleActiveLine: true,\n  lineNumbers: true,\n  lineWrapping: true,\n  autoCloseTags: true,\n  foldGutter: true,\n  dragDrop : true,\n  gutters: [\"CodeMirror-linenumbers\", \"CodeMirror-foldgutter\"]\n});\n\n// Live preview\neditor.on(\"change\", function() {\n  clearTimeout(delay);\n  delay = setTimeout(updatePreview, 300);\n});\n\nfunction updatePreview() {\n  var previewFrame = document.getElementById(\"preview\");\n  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;\n  preview.open();\n  preview.write(editor.getValue());\n  preview.close();\n}\nsetTimeout(updatePreview, 300);\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=dateclock]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Date and Time");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<span class=\"date\" data-action=\"leftdate\"></span>\n<span class=\"date fr\" data-action=\"rightdate\"></span>\n<div class=\"clock\" data-action=\"clock\"></div>\n");
          cssEditor.setValue(".date {\n  font-family: arial;\n}\n\n.fr {\n  float: right;\n}\n\n.clock {\n  font: bold 1.5em sans;\n  text-align: center;\n}");
          jsEditor.setValue("// Define a function to display the current time\nfunction displayTime() {\n  var now = new Date();\n  document.querySelector('[data-action=clock]').innerHTML =  now.toLocaleTimeString();\n  setTimeout(displayTime, 1000);\n}\ndisplayTime();\n\n// Date\nvar currentTime = new Date();\nvar month = currentTime.getMonth() + 1;\nvar date = currentTime.getDate();\nvar year = currentTime.getFullYear();\ndocument.querySelector('[data-action=leftdate]').innerHTML = month + '/' + date + '/' + year;\n\nvar today = new Date();\nif (year < 1000)\n  year += 1900;\nvar day = today.getDay();\nvar monthname = today.getMonth();\nif (date < 10)\n  date = '0' + date;\nvar dayarray = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');\nvar montharray = new Array('January','February','March','April','May','June','July','August','September','October','November','December');\ndocument.querySelector('[data-action=rightdate]').innerHTML = dayarray[day] + ', ' + montharray[monthname] + ' ' + date + ', ' + year;\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=detectorientation]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Detect Orientation");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<h1 class=\"portrait\">Portrait</h1>\n<h1 class=\"landscape\">Landscape</h1>\n<footer class=\"foot\"></footer>");
          cssEditor.setValue("body {\n  font: 26px arial;\n}\n.portrait, .landscape, .foot {\n  text-align: center;\n}\n.foot {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 26px;\n}\n");
          jsEditor.setValue("var detectOrientation = function() {\n  if ( window.innerWidth > window.innerHeight ) {\n    document.querySelector(\".landscape\").style.display = \"block\";\n    document.querySelector(\".portrait\").style.display = \"none\";\n  } else if ( window.innerWidth < window.innerHeight ) {\n    document.querySelector(\".landscape\").style.display = \"none\";\n    document.querySelector(\".portrait\").style.display = \"block\";\n  }\n  document.querySelector(\".foot\").innerHTML =  window.innerWidth + \"px, \" + window.innerHeight + \"px\";\n};\n\nwindow.addEventListener(\"resize\", function() {\n  detectOrientation();\n});\n\ndetectOrientation();\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=osdisplay]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Detect Operating System");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<div data-output=\"os\"></div>");
          jsEditor.setValue("document.addEventListener(\"DOMContentLoaded\", function() {\n  document.querySelector(\"[data-output=os]\").innerHTML = \"<strong>Operating System</strong>: \" + navigator.platform;\n});");
          $(".open-demos").trigger("click");
        });
        $("[data-action=packagezipfiles]").on("click", function() {
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Package Zip Files [JSZip Demo]");
          htmlEditor.setValue("<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <button class=\"btn--default download\">Run</button>\n    <textarea class=\"form__input\" id=\"jszipdemo\" rows=\"7\" placeholder=\"Demo code here...\">var zip = new JSZip();\nzip.file(\"Hello.txt\", \"Hello World\");\nvar folder = zip.folder(\"images\");\nfolder.file(\"folder.txt\", \"I'm a file in a new folder\");\nvar content = zip.generate({type:\"blob\"});\n// see FileSaver.js\nsaveAs(content, \"example.zip\");</textarea>\n  </div>\n</div>\n");
          cssEditor.setValue("");
          jsEditor.setValue("$(\".download\").click(function() {\n  eval( $(\"#jszipdemo\").val() );\n});\n");
          $(".open-demos, #polyui, #jquery, #jszip").trigger("click");
        });
        $("[data-action=passwordgen]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Password Generator");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" data-action=\"genoutput\" />\n        <span class=\"input-group-btn\">\n          <button class=\"btn btn-default btn-primary\" type=\"button\" data-action=\"gen\">\n            Generate!\n          </button>\n        </span>\n      </div>\n    </div>\n  </div>\n</div>");
          cssEditor.setValue("html, body {\n  height: 100%;\n}\n\nbody {\n  padding: 1em 0;\n  background: #0072ff;\n}\n\n.input-group {\n  box-shadow: 0 0 25px #00162d;\n}\n\n.input-group, .form-control, .input-group-btn, .btn {\n  border-radius: 5px;\n}");
          jsEditor.setValue("function PasswordGen() {\n  var char = \"0123456789abcdefghijklmnopqrstuvwxyz\";\n    var fullchar = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\";\n    var genHash = \"\";\n    var i;\n    \n    for (i = 0; i < 8; i++) {\n      var rnum = Math.floor(Math.random() * char.length);\n      genHash += char.substring(rnum, rnum + 1);\n    }\n    \n    $(\"[data-action=genoutput]\").val(genHash);\n}\n\n$(\"[data-action=gen]\").click(function() {\n  PasswordGen();\n});\n\nPasswordGen();\n");
          $(".open-demos, #jquery, #bootstrap").trigger("click");
        });

        $("[data-action=picgallery]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Fotorama Gallery");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<script src=\"http://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.js\"></script>\n\n<div class=\"fotorama\" data-allowfullscreen=\"true\" \n     data-width=\"100%\"\n     data-height=\"90%\"\n     data-nav=\"thumbs\"\n     data-fit=\"cover\"\n     data-keyboard=\"true\">\n  <a href=\"http://i.fotorama.io/ac2c2fe6-30fe-4695-876b-ce185ed408cf/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/ac2c2fe6-30fe-4695-876b-ce185ed408cf/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n  <a href=\"http://i.fotorama.io/5c22d9ee-a631-44bd-b848-363e5f2695cd/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/5c22d9ee-a631-44bd-b848-363e5f2695cd/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n  <a href=\"http://i.fotorama.io/a5c42bf0-0160-4b3e-867a-f9dfd7ad70d6/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/a5c42bf0-0160-4b3e-867a-f9dfd7ad70d6/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n  <a href=\"http://i.fotorama.io/aa11819e-f614-46bd-8858-752b6fcb0ca3/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/aa11819e-f614-46bd-8858-752b6fcb0ca3/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n</div>");
          cssEditor.setValue("@import url(\"http://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.css\");");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        $("[data-action=picviewer]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("FileReader Picture Viewer");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<div id=\"holder\">\n  Drag and drop image <a data-action=\"call\" href=\"javascript:void()\">here</a>...\n</div> \n\n<div class=\"fill check hide\" align=\"center\">\n  <canvas class=\"logo\" width=\"128\" height=\"128\"></canvas>\n</div>\n\n<div class=\"hide\">\n  <input type=\"file\" data-action=\"load\">\n</div>\n\n<p id=\"status\">\n  File API &amp; FileReader API not supported\n</p>");
          cssEditor.setValue("#holder {\n  border: 10px dashed #ccc;\n  margin: 0 auto;\n  margin: 20px auto;\n  text-align: center;\n}\n#holder.hover {\n  border: 10px dashed #333;\n}\n\n.hide {\n  display: none;\n}\n.fill {\n  width: 100%;\n}");
          jsEditor.setValue("var canvas = $(\".logo\"),\n    ctx = canvas[0].getContext(\"2d\"),\n    holder = document.getElementById(\"holder\"),\n    state = document.getElementById(\"status\");\n\nif (typeof window.FileReader === \"undefined\") {\n  state.className = \"fail\";\n} else {\n  state.className = \"success\";\n  state.innerHTML = \"File API & FileReader available\";\n}\n\nfunction displayPreview(file) {\n  var reader = new FileReader();\n\n  reader.onload = function(e) {\n    var img = new Image();\n    img.src = e.target.result;\n    img.onload = function() {\n      // x, y, width, height\n      ctx.clearRect(0, 0, 128, 128);\n      ctx.drawImage(img, 0, 0, 128, 128);\n    };\n  };\n  reader.readAsDataURL(file);\n}\n\n$(\"[data-action=call]\").click(function() {\n  $(\"[data-action=load]\").trigger(\"click\");\n});\n\n$(\"[data-action=load]\").change(function(e) {\n  var file = e.target.files[0];\n  displayPreview(file);\n  $(\".check\").removeClass(\"hide\");\n});\n\n// Drag and drop image load\nholder.ondragover = function () {\n  this.className = \"hover\";\n  return false;\n};\nholder.ondragend = function () {\n  this.className = \"\";\n  return false;\n};\nholder.ondrop = function(e) {\n  this.className = \"\";\n  e.preventDefault();\n  var file = e.dataTransfer.files[0];\n  displayPreview(file);\n  $(\".check\").removeClass(\"hide\");\n};\n");
          $(".open-demos, #jquery").trigger("click");
        });
        $("[data-action=polyui]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Poly UI Kit");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<div class=\"grid\">\n  <header class=\"grid__col--12 panel--padded--centered\" role=\"banner\"> \n    <a class=\"site-logo\" href=\"javascript:void(0)\">\n      <b class=\"srt\">Poly - UI Toolkit</b>\n    </a>\n    <nav class=\"navbar\" role=\"navigation\">\n      <span id=\"toggle\" class=\"icn--nav-toggle is-displayed-mobile\">\n        <b class=\"srt\">Toggle</b>\n      </span>   \n      <ul class=\"nav is-collapsed-mobile\" role=\"navigation\">\n        <li class=\"nav__item\"><a href=\"#type\">Typography</a></li>\n        <li class=\"nav__item\"><a href=\"#buttons\">Buttons</a></li>\n        <li class=\"nav__item\"><a href=\"#forms\">Form</a></li>\n        <li class=\"nav__item\"><a href=\"#images\">Images</a></li>\n        <li class=\"nav__item\"><a href=\"#grid\">Grid</a></li>\n        <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li>\n        <!-- Current Page Class Style -->\n        <!-- <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li> -->\n      </ul>\n    </nav>\n  </header>\n</div>\n\n<div class=\"grid is-hidden-mobile\">\n  <div class=\"grid__col--12\">\n    <img class=\"img--hero\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/hero.jpg\" alt=\"Poly - A simple UI Kit\">\n  </div>\n</div>\n\n<h4 id=\"type\" class=\"grid\">Typography</h4>\n\n<div class=\"grid\">\n  <div class=\"centered grid__col--8\">\n    <h1 class=\"headline-primary--grouped\">Take a look at this amazing headline</h1>\n    <h2 class=\"headline-secondary--grouped\">Don't forget about the subtitle</h2>\n    <p>This is a typical paragraph for the UI Kit. <a href=\"#\">Here is what a link might look like</a>. The typical font family for this kit is Helvetica Neue.  This kit is intended for clean and refreshing web layouts. No jazz hands here, just the essentials to make dreams come true, with minimal clean web design. The kit comes fully equipped with everything from full responsive media styling to buttons to form fields. <em>I enjoy using italics as well from time to time</em>. Fell free to create the most amazing designs ever with this kit. I truly hope you enjoy not only the kit but this amazing paragraph as well. :)</p>\n    <blockquote>You know what really gets me going? A really nice set of block quotes.  That's right, block quotes that say, \"Hey, I'm an article you want to read and nurture.\"</blockquote>\n  </div>\n</div>\n\n<h4 id=\"buttons\" class=\"grid\">Buttons</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <a class=\"btn--default\" href=\"#\">Button Default</a>\n    <a class=\"btn--success\" href=\"#\">Button Success</a>\n    <a class=\"btn--error\" href=\"#\">Button Error</a>\n    <button class=\"btn--warning\">Button Warning</button>\n    <button class=\"btn--info\">Button Info</button>\n  </div>\n</div>\n\n<h4 id=\"forms\" class=\"grid\">Form Elements</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--7\"> \n    <form class=\"form\">\n      <label class=\"form__label--hidden\" for=\"name\">Name:</label> \n      <input class=\"form__input\" type=\"text\" id=\"name\" placeholder=\"Name\">\n\n      <label class=\"form__label--hidden\" for=\"email\">Email:</label>\n      <input class=\"form__input\" type=\"email\" id=\"email\" placeholder=\"email@website.com\">\n\n      <label class=\"form__label--hidden\" for=\"msg\">Message:</label>\n      <textarea class=\"form__input\" id=\"msg\" placeholder=\"Message...\" rows=\"7\"></textarea>\n\n      <input class=\"btn--default\" type=\"submit\" value=\"Submit\">\n      <input class=\"btn--warning\" type=\"reset\" value=\"Reset\">\n    </form>\n  </div>\n  <div class=\"grid__col--4\">\n    <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n    <form>\n      <label class=\"form__label--hidden\" for=\"username\">Username:</label> \n      <input class=\"form__input\" type=\"text\" id=\"username\" placeholder=\"Username\">\n      <label class=\"form__label--hidden\" for=\"password\">Password:</label>\n      <input class=\"form__input\" type=\"password\" id=\"password\" placeholder=\"Password\">\n      <input class=\"form__btn\" type=\"submit\" value=\"Login\">\n    </form>\n  </div>\n</div>\n\n<h4 id=\"images\" class=\"grid\">Images</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--5\">\n    <img src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n  </div>\n  <div class=\"grid__col--5\">\n    <img class=\"img--wrap\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n  </div>\n  <div class=\"grid__col--2\">\n    <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n  </div>\n</div>\n\n<h4 id=\"grid\" class=\"grid\">Grid System</h4>\n\n<div class=\"theme__poly\">\n  <div class=\"grid\">\n    <div class=\"grid__col--12\">.grid__col--12</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--6\">.grid__col--6</div>\n    <div class=\"grid__col--6\">.grid__col--6</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--4\">.grid__col--4</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--5\">.grid__col--5</div>\n    <div class=\"grid__col--7\">.grid__col--7</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--8\">.grid__col--8</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"centered grid__col--7\">.centered .grid__col--7</div>\n  </div>\n</div>\n\n<div class=\"grid\">\n  <div class=\"grid__col--7\">\n    <h4 id=\"nav\">Navigation</h4>\n    <ul class=\"nav\" role=\"navigation\">\n      <li class=\"nav__item\"><a href=\"#\">Nav Link</a></li>\n      <li class=\"nav__item\"><a href=\"#\">Nav Link 2</a></li>\n      <li class=\"nav__item--current\"><a href=\"#\">Nav Current</a></li>\n    </ul>\n    <p>This is what the navigation menu looks like when the screen is at 769px or higher. When the screen is less than 769px, you will have the option to display a toggle menu icon.</p>\n  </div>\n\n  <div class=\"grid__col--4\">\n    <h4>Offcanvas Menu</h4>\n    <div class=\"offcanvas\">\n      <span class=\"icn--close\">\n        <b class=\"srt\">close</b>\n      </span>\n      <ul class=\"menu\" role=\"navigation\">\n        <a class=\"menu__link\" href=\"#\">Link 1</a>\n        <a class=\"menu__link\" href=\"#\">Link 2</a>\n        <a class=\"menu__link\" href=\"#\">Link 3</a>\n        <a class=\"menu__link--end\" href=\"#\">Link 4</a>\n      </ul>\n    </div>\n  </div>\n</div>");
          cssEditor.setValue("");
          jsEditor.setValue("// Toggle Menu for Phones\n$(\"#toggle\").click(function() {\n  $(this).next(\".nav\").toggleClass(\"is-collapsed-mobile\");\n});\n\n// Handles Navigation Style Classes\n$(\".nav__item\").on(\"click\", function() {\n  $(this).parent().find(\"li\").removeClass(\"nav__item--current\").addClass(\"nav__item\");\n  $(this).addClass(\"nav__item--current\").removeClass(\"nav__item\");\n});");
          $(".open-demos, #polyui, #jquery").trigger("click");
        });
        $("[data-action=simpleslideshow]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Simplest jQuery Slideshow");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<div class=\"fadelinks\">\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2610/4148988872_990b6da667.jpg\">\n  </a>\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2597/4121218611_040cd7b3f2.jpg\">\n  </a>\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2531/4121218751_ac8bf49d5d.jpg\">\n  </a>\n</div>\n");
          cssEditor.setValue("body {\n  font-family: arial, helvetica, sans-serif;\n  font-size: 12px;\n}\n\n.fadelinks {\n  position: relative;\n  height: 332px;\n  width: 500px;\n}\n\n.fadelinks > a {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n}");
          jsEditor.setValue("$(document).ready(function(){\n  $('.fadelinks > :gt(0)').hide();\n  setInterval(function() {\n    $('.fadelinks > :first-child').fadeOut().next().fadeIn().end().appendTo('.fadelinks');\n  }, 3000);\n});");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        $("[data-action=splitter]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("JQWidgets Splitter");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/scripts/jquery-1.11.1.min.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/jqxcore.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/jqxsplitter.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/scripts/demos.js\"></script>\n\n<div id=\"mainSplitter\">\n  <div>\n    <div id=\"firstNested\">\n      <div>\n        <div id=\"secondNested\">\n          <div>\n            <span>Panel 1</span></div>\n          <div>\n            <span>Panel 2</span></div>\n        </div>\n      </div>\n      <div>\n        <span>Panel 3</span></div>\n    </div>\n  </div>\n  <div>\n    <div id=\"thirdNested\">\n      <div>\n        <span>Panel 4</span></div>\n      <div>\n        <span>Panel 5</span></div>\n    </div>\n  </div>\n</div>\n");
          cssEditor.setValue("@import url(\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/styles/jqx.base.css\");");
          jsEditor.setValue("$(document).ready(function () {\n  $(\"#mainSplitter\").jqxSplitter({\n    width: 850,\n    height: 850,\n    orientation: \"horizontal\",\n    panels: [{\n      size: 300,\n      collapsible: false\n    }]\n  });\n  $(\"#firstNested\").jqxSplitter({\n    width: \"100%\",\n    height: \"100%\",\n    orientation: \"vertical\",\n    panels: [{\n      size: 300,\n      collapsible: false\n    }]\n  });\n  $(\"#secondNested\").jqxSplitter({\n    width: \"100%\", \n    height: \"100%\", \n    orientation: \"horizontal\",\n    panels: [{ size: 150 }]\n  });\n  $(\"#thirdNested\").jqxSplitter({\n    width: \"100%\",\n    height: \"100%\", \n    orientation: \"horizontal\",\n    panels: [{\n      size: 150,\n      collapsible: false\n    }]\n  });\n});\n");
          $(".open-demos, #jquery").trigger("click");
        });
        $("[data-action=whiteboard]").on("click", function() {
          $("#todos").empty();
          $(".check").attr("checked", false).trigger("change");
          $(".vprojectname").val("Canvas Drawing Board");
          var demotitle = $(".vprojectname").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "demo-title",
              output: demotitle
            });
          }
          htmlEditor.setValue("<canvas id=\"myCanvas\">\n  Sorry, your browser does not support HTML5 canvas technology.\n</canvas>");
          cssEditor.setValue("body, html {\n  height: 100%;\n  margin: 0;\n}\n\n#myCanvas {\n  cursor: crosshair;\n  position: fixed;\n}\n");
          jsEditor.setValue("var myCanvas = document.getElementById(\"myCanvas\");\nvar ctx = myCanvas.getContext(\"2d\");\n\n// Fill Window Width and Height\nmyCanvas.width = window.innerWidth;\nmyCanvas.height = window.innerHeight;\n\n// Set Background Color\nctx.fillStyle=\"#fff\";\nctx.fillRect(0,0,myCanvas.width,myCanvas.height);\n\n// Mouse Event Handlers\nif(myCanvas){\n  var isDown = false;\n  var canvasX, canvasY;\n  ctx.lineWidth = 5;\n  \n  $(myCanvas)\n  .mousedown(function(e){\n    isDown = true;\n    ctx.beginPath();\n    canvasX = e.pageX - myCanvas.offsetLeft;\n    canvasY = e.pageY - myCanvas.offsetTop;\n    ctx.moveTo(canvasX, canvasY);\n  })\n  .mousemove(function(e){\n    if(isDown !== false) {\n      canvasX = e.pageX - myCanvas.offsetLeft;\n      canvasY = e.pageY - myCanvas.offsetTop;\n      ctx.lineTo(canvasX, canvasY);\n      ctx.strokeStyle = \"#000\";\n      ctx.stroke();\n    }\n  })\n  .mouseup(function(e){\n    isDown = false;\n    ctx.closePath();\n  });\n}\n\n// Touch Events Handlers\ndraw = {\nstarted: false,\n start: function(evt) {\n   \n   ctx.beginPath();\n   ctx.moveTo(\n   evt.touches[0].pageX,\n    evt.touches[0].pageY\n   );\n   \n   this.started = true;\n   \n },\n move: function(evt) {\n   \n   if (this.started) {\n     ctx.lineTo(\n     evt.touches[0].pageX,\n      evt.touches[0].pageY\n     );\n     \n     ctx.strokeStyle = \"#000\";\n     ctx.lineWidth = 5;\n     ctx.stroke();\n   }\n   \n },\n end: function(evt) {\n   this.started = false;\n }\n};\n\n// Touch Events\nmyCanvas.addEventListener(\"touchstart\", draw.start, false);\nmyCanvas.addEventListener(\"touchend\", draw.end, false);\nmyCanvas.addEventListener(\"touchmove\", draw.move, false);\n\n// Disable Page Move\ndocument.body.addEventListener(\"touchmove\",function(evt){\n  evt.preventDefault();\n},false);\n");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        TogetherJS.hub.on("demo-title", function(msg) {
          if (! msg.sameUrl) {
            return;
          }
          $(".vprojectname").val(msg.output);
        });
      },
      FileManager = function() {
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
                $(".css-editor > li").addClass("hide");
                $("#css-editor > li").addClass("hide");
                $("#" + $(this).parent().attr("class").replace(/list-group-item /g,'') ).removeClass("hide");
              }
              $(this).addClass("css-selected");
              $("#" + $(this).parent().attr("class").replace(/list-group-item /g,'') ).removeClass("hide");
            } else if ( $(this).hasClass("jsfile") ) {
              if ( $(".js-selected").is(":visible") ) {
                $(".js-selected").removeClass("js-selected");
                $(".js-editor > li").addClass("hide");
                $("#js-editor > li").addClass("hide");
                $("#" + $(this).parent().attr("class") ).removeClass("hide");
              }
              $(this).addClass("js-selected");
              $("#" + $(this).parent().attr("class").replace(/list-group-item /g,'') ).removeClass("hide");
            } else if ( $(this).hasClass("otherfile") ) {
              if ( $(".other-selected").is(":visible") ) {
                $(".other-selected").removeClass("other-selected");
                $(".other-editor > li").addClass("hide");
                $("#other-editor > li").addClass("hide");
                $("#" + $(this).parent().attr("class") ).removeClass("hide");
              }
              $(this).addClass("other-selected");
              $("#" + $(this).parent().attr("class").replace(/list-group-item /g,'') ).removeClass("hide");
            }
            return false;
          });

          if ( !$(".css-selected").is(":visible") ) {
            $(".req-css").trigger("click");
          } else if ( !$(".js-selected").is(":visible") ) {
            $(".req-js").trigger("click");
          } else if ( !$(".other-selected").is(":visible") ) {
            $(".req-other").trigger("click");
          }

          // Delete Virtual File
          $("[data-action=delfile]").on("click", function() {
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
            } else if ( $(this).prev().hasClass("otherfile") ) {
              if ( $(this).prev().hasClass("other-selected") ) {
                if ( !$(".req-other").hasClass("other-selected") ) {
                  $(".req-other").trigger("click");
                }
              }
            }
            $("#" + $(this).parent().attr("class").replace(/list-group-item /g,'') ).remove();
            $(this).parent().remove();
            save();
            if (TogetherJS.running) {
              TogetherJS.send({type: "init-items", items: getItems()});
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

          if (TogetherJS.running) {
            TogetherJS.reinitialize();
          }

          return false;
        }
        SelectFile();
        
        $("#add").click(function() {
          var Description = $("#description").val();
          if (! $("#description").val()) {
            alertify.error("<strong>Oops!</strong> Please enter an item above.");
            return false;
          }
          var id = "" + Date.now();
          $("#description").val("").change();
          addItem(Description, id);
          save();
          if (TogetherJS.running) {
            TogetherJS.send({type: "new-item", description: Description, id: id});
          }
          SelectFile();
          var clearfilename = $("#description").val();
          if (TogetherJS.running) {
            TogetherJS.send({
              type: "clear-filename",
              output: clearfilename
            });
          }
          return false;
        });
        TogetherJS.hub.on("clear-filename", function(msg) {
          if (! msg.sameUrl) {
            return;
          }
          $("#description").val(msg.output);
        });

        $("#description").on("keyup", function(event) {
          if ( this.value === "clear" ) {
            // $("#todos").empty();
            $("#todos").empty();
            save();
            if (TogetherJS.running) {
              TogetherJS.send({type: "init-items", items: []});
            }
            this.value = "";
          }
          if (event.which == 13) {
            $("#add").click();
          }
        });
        
        function addItem(description, id) {
          var existing = $("#" + id);
          if (existing.length) {
            // Already exists...
            existing.closest("li").find(".description").text(description);
            return;
          }
          
          if (description.toLowerCase().substring(description.length - 5) === ".html") {
            var htmlAlert = "Sorry we don't allow you to add any other html files. <br /> Because the live preview only applies to index.html";
            alertify.error("<span style=\"font:11px Lato;\">" + htmlAlert + "</span>");
          } else if (description.toLowerCase().substring(description.length - 4) === ".css") {
            var cssCodemirror = 'var cssEditor'+ id +' = CodeMirror(document.getElementById("cssfile'+ id +'"), {  mode: "text/css",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  lint : true,  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],  value: "/* comment */"}); var inlet = Inlet(cssEditor'+ id +'); cssEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); cssEditor'+ id +'.on("drop", function() { cssEditor'+ id +'.setValue(""); });';
            var cssActiveEditor = '$("#cssfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "cssfile'+ id +'" ) { $(".activeEditor").val("cssfile'+ id +'"); } });';
            var cssUpdate = "<textarea class='updatepreviewcode hide'>\npreview.write('<st' + 'yle' + '>' + cssEditor"+ id +".getValue() + '</st' + 'yle>');\n</textarea>";
            var cssJSZipHREF = "<textarea class='zipfileshref hide'><link rel=\"stylesheet\" href=\"css/"+ description +"\" /></textarea>";
            var cssJSZip = "<textarea class='jszipcode hide'>zip.file('css/"+ description +"', cssEditor"+ id +".getValue()); </textarea>";

            var cssfile = '<a class="cssfile description" data-action="cssfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item cssfile'+ id +'">'+ cssfile +'<script>var activeEditor = $(".activeEditor"); ' + cssCodemirror + cssActiveEditor + '<' + '/script>'+ cssUpdate + cssJSZipHREF + cssJSZip + '</li>');
            var editor = $('<li id="cssfile'+ id +'" class="newfile cssfile'+ id +'"></li>');

            file.find(".cssfile").attr("data-action", id).text(description);
            $("#css-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 3) === ".js") {
            var jsCodemirror = 'var jsEditor'+ id +' = CodeMirror(document.getElementById("jsfile'+ id +'"), {  mode: "text/javascript",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  lint : true,  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],  value: "// comment"}); var inlet = Inlet(jsEditor'+ id +'); jsEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); jsEditor'+ id +'.on("drop", function() { jsEditor'+ id +'.setValue(""); });';
            var jsActiveEditor = '$("#jsfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "jsfile'+ id +'" ) { $(".activeEditor").val("jsfile'+ id +'"); } });';
            var jsUpdate = "<textarea class='updatepreviewcode hide'>\npreview.write('<sc' + 'ript' + '>' + jsEditor"+ id +".getValue() + '</sc' + 'ript>');\n</textarea>";
            var jsJSZipHREF = "<textarea class='zipfileshref hide'><script src=\"js/"+ description +"\"></script></textarea>";
            var jsJSZip = "<textarea class='jszipcode hide'>zip.file('js/"+ description +"', jsEditor"+ id +".getValue()); </textarea>";

            var jsfile = '<a class="jsfile description" data-action="jsfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item jsfile'+ id +'">'+ jsfile +'<script>var activeEditor = $(".activeEditor"); ' + jsCodemirror + jsActiveEditor + '<' + '/script>'+ jsUpdate + jsJSZipHREF + jsJSZip + '</li>');
            var editor = $('<li id="jsfile'+ id +'" class="newfile jsfile'+ id +'"></li>');

            file.find(".jsfile").attr("data-action", id).text(description);
            $("#js-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 7) === ".coffee") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-coffeescript",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 5) === ".haml") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-haml",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 5) === ".jade") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-jade",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 5) === ".json") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "application/json",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 3) === ".ls") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-livescript",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 3) === ".md") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-markdown",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 3) === ".pl") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-perl",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 4) === ".php") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "application/x-httpd-php",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 3) === ".py") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-python",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 3) === ".rb") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-ruby",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 5) === ".sass") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "text/x-sass",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else if (description.toLowerCase().substring(description.length - 4) === ".xml") {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  mode: "application/xml",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          } else {
            var otherCodemirror = 'var otherEditor'+ id +' = CodeMirror(document.getElementById("otherfile'+ id +'"), {  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ id +'); otherEditor'+ id +'.on("change", function() { clearTimeout(delay); delay = setTimeout(updatePreview, 300); }); otherEditor'+ id +'.on("drop", function() { otherEditor'+ id +'.setValue(""); });';
            var otherActiveEditor = '$("#otherfile'+ id +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ id +'" ) { $(".activeEditor").val("otherfile'+ id +'"); } });';
            var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ description +"', otherEditor"+ id +".getValue()); </textarea>";

            var otherfile = '<a class="otherfile description" data-action="otherfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
            var file = $('<li class="list-group-item otherfile'+ id +'">'+ otherfile +'<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>'+ otherJSZip + '</li>');
            var editor = $('<li id="otherfile'+ id +'" class="newfile otherfile'+ id +'"></li>');

            file.find(".otherfile").attr("data-action", id).text(description);
            $("#other-editor").append(editor);
            $("#todos").append(file);
          }
          
          //var htmlfile = '<a class="htmlfile description" data-action="htmlfile"></a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
          //var li = $('<li class="list-group-item">'+ htmlfile +'</li>');
          //li.find("input").attr("id", id);
          //li.find(".description").text(description);
          //$("#todos").append(li);
          SelectFile();
        }
        
        TogetherJS.hub.on("new-item", function(msg) {
          addItem(msg.description, msg.id);
          SelectFile();
          save();
        });
        
        TogetherJS.hub.on("init-items", function(msg) {
          $("#todos, #css-editor, #js-editor, #other-editor").empty();
          msg.items.forEach(function (item) {
            addItem(item.description, item.id);
          });
          save();
          SelectFile();
        });
        
        TogetherJS.hub.on("togetherjs.hello togetherjs.hello-back", function() {
          TogetherJS.send({type: "init-items", items: getItems()});
          SelectFile();
          TogetherJS.reinitialize();
        });
        
        function getItems() {
          var result = [];
          $("#todos li.list-group-item").each(function() {
            var $this = $(this);
            result.push({
              id: $this.find("a").not("[data-action=delfile]").attr("data-action"),
              description: $this.find(".description").text()
            });
          });
          $("#css-editor li.newfile").each(function() {
            var $this = $(this);
            result.push({
              id: $this
            });
          });
          $("#js-editor li.newfile").each(function() {
            var $this = $(this);
            result.push({
              id: $this
            });
          });
          $("#other-editor li.newfile").each(function() {
            var $this = $(this);
            result.push({
              id: $this
            });
          });
          SelectFile();
          return result;
        }
        
        if (localStorage.getItem("todos")) {
          JSON.parse(localStorage.getItem("todos")).forEach(function (item) {
            addItem(item.description, item.id);
            SelectFile();
            BoxSplitter();
          });
        }
        
        function save() {
          localStorage.setItem("todos", JSON.stringify(getItems()));
        }
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
  }).trigger("change");

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
    if ( $("#polyui").is(":checked") ) {
      $('.polyui').val("");
      download_to_textbox('libraries/polyui/polyui.css', $('.polyui'));
      $('.polyui').trigger("change");
      $(".polyuizip").val("zip.file('libraries/processingjs/polyui.css', $(\".polyui\").val());");
    } else {
      $('.polyui, .polyuizip').val("");
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

    // Update JSZip (Applied dynamically from HTML div )
    $("[data-action=ziplibs]").val(function() {
      return $.map($(".jsziplibs"), function (el) {
        return el.value;
      }).join("");
    });
    
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

  // Initiate Teamwork
  $("[data-action=teamwork]").click(function() {
    TogetherJS(this); 
    alertify.log("This is an experimental feature, and is still very buggy. <br><br> <strong>Use at your own risk!</strong>");
    return false;
  });

  // Get Keycode/Which
  $("[data-action=outputkeycode]").on("keydown", function(e) {
    this.value = e.which;
     e.preventDefault();
  }).on("click", function() {
    this.select();
  });

  // Check Application Fields (For Download)
  $("[data-action=load]").on("change", function(evt) {
    if ( $(this).val() === "" ) {
      $(".watch").addClass("hide");
    } else {
      $(".watch").removeClass("hide");
      var file = evt.target.files[0];
      displayPreview(file);

      var reader = new FileReader();

      reader.onload = function(e) {
        // Download as Windows App
        $("[data-action=export-as-win-app]").on("click", function() {
          $("[data-action=download]").trigger("click");

          JSZipUtils.getBinaryContent("YourWinApp.zip", function(err, data) {
            if(err) {
              throw err; // or handle err
            }

            var zip = new JSZip(data);

            // Your Web App
            var htmlContent = openHTML.getValue() + $(".vprojectname").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
            var Img16 = c16[0].toDataURL("image/png");
            var Img32 = c32[0].toDataURL("image/png");
            var Img64 = c64[0].toDataURL("image/png");
            var Img128 = canvas[0].toDataURL("image/png");
            zip.file("data/content/icons/16.png", Img16.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/32.png", Img32.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/64.png", Img64.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/128.png", Img128.split('base64,')[1],{base64: true});

            var htmlContent = openHTML.getValue() + $(".vprojectname").val() + closeHTML.getValue() + yourRefs.getValue() + closeRefs.getValue() + htmlEditor.getValue() + closeFinal.getValue();
            zip.file("data/content/index.html", htmlContent);
            zip.file("data/content/css/style.css", cssEditor.getValue());
            zip.file("data/content/js/index.js", jsEditor.getValue());
            zip.file("README.md", otherEditor.getValue());
            eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"data/content/libraries") );
            eval( $("[data-action=fulljszipcode]").val().split("css/").join("data/content/css/").split("js/").join("data/content/js/") );
            var content = zip.generate({type:"blob"});
            saveAs(content, $(".vprojectname").val().replace(/ /g, "-") + "-mac.zip");
          });
        });

        // Download as Mac App
        $("[data-action=export-as-mac-app]").on("click", function() {
          $("[data-action=download]").trigger("click");

          JSZipUtils.getBinaryContent("YourMacApp.zip", function(err, data) {
            if(err) {
              throw err; // or handle err
            }

            var zip = new JSZip(data);

            // Your Web App
            var htmlContent = openHTML.getValue() + $(".vprojectname").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
            var Img16 = c16[0].toDataURL("image/png");
            var Img32 = c32[0].toDataURL("image/png");
            var Img64 = c64[0].toDataURL("image/png");
            var Img128 = canvas[0].toDataURL("image/png");
            zip.file("data/content/icons/16.png", Img16.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/32.png", Img32.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/64.png", Img64.split('base64,')[1],{base64: true});
            zip.file("data/content/icons/128.png", Img128.split('base64,')[1],{base64: true});

            var htmlContent = openHTML.getValue() + $(".vprojectname").val() + closeHTML.getValue() + yourRefs.getValue() + closeRefs.getValue() + htmlEditor.getValue() + closeFinal.getValue();
            zip.file("data/content/index.html", htmlContent);
            zip.file("data/content/css/style.css", cssEditor.getValue());
            zip.file("data/content/js/index.js", jsEditor.getValue());
            zip.file("README.md", otherEditor.getValue());
            eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"data/content/libraries") );
            eval( $("[data-action=fulljszipcode]").val().split("css/").join("data/content/css/").split("js/").join("data/content/js/") );
            var content = zip.generate({type:"blob"});
            saveAs(content, $(".vprojectname").val().replace(/ /g, "-") + "-mac.zip");
          });
        });

        // Download as Linux App
        $("[data-action=export-as-lin-app]").on("click", function() {
          $("[data-action=download]").trigger("click");

          JSZipUtils.getBinaryContent("YourLinApp.zip", function(err, data) {
            if(err) {
              throw err; // or handle err
            }

            var zip = new JSZip(data);

            // Your Web App
            var htmlContent = openHTML.getValue() + $(".vprojectname").val() + closeHTML.getValue() + $("[data-action=library-code]").val() + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/font-awesome.css\">\n" + "    <link rel=\"stylesheet\" href=\"libraries/font-awesome/macset.css\">\n" + "    <link rel=\"stylesheet\" href=\"css/index.css\">\n" + closeRefs.getValue() + "\n" + htmlEditor.getValue() + "\n\n    <script src=\"js/index.js\"></script>" + closeFinal.getValue();
            var Img16 = c16[0].toDataURL("image/png");
            var Img32 = c32[0].toDataURL("image/png");
            var Img64 = c64[0].toDataURL("image/png");
            var Img128 = canvas[0].toDataURL("image/png");
            zip.file("resources/default_app/icons/16.png", Img16.split('base64,')[1],{base64: true});
            zip.file("resources/default_app/icons/32.png", Img32.split('base64,')[1],{base64: true});
            zip.file("resources/default_app/icons/64.png", Img64.split('base64,')[1],{base64: true});
            zip.file("resources/default_app/icons/128.png", Img128.split('base64,')[1],{base64: true});

            var htmlContent = openHTML.getValue() + $(".vprojectname").val() + closeHTML.getValue() + yourRefs.getValue() + closeRefs.getValue() + htmlEditor.getValue() + closeFinal.getValue();
            zip.file("resources/default_app/index.html", htmlContent);
            zip.file("resources/default_app/css/style.css", cssEditor.getValue());
            zip.file("resources/default_app/js/index.js", jsEditor.getValue());
            zip.file("README.md", otherEditor.getValue());
            eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"resources/default_app/libraries") );
            eval( $("[data-action=fulljszipcode]").val().split("css/").join("resources/default_app/css/").split("js/").join("resources/default_app/js/") );

            zip.file($(".vprojectname").val().replace(/ /g, "-") +".desktop", "[Desktop Entry]\nName="+ $(".vprojectname").val() +"\nPath=/home/kodeweave/"+ $(".vprojectname").val().replace(/ /g, "-") +"\nActions=sudo;\nExec=./"+ $(".vprojectname").val().replace(/ /g, "-") +"/electron\nIcon=/home/kodeweave/"+ $(".vprojectname").val().replace(/ /g, "-") +"/resources/default_app/icons/128.png\nTerminal=true\nType=Application\nStartupNotify=true\n\n");
            zip.file("resources/default_app/package.json", "{\n  \"name\": \""+ $(".vprojectname").val() +"\",\n  \"productName\": \""+ $(".vprojectname").val() +"\",\n  \"version\": \"0.1.0\",\n  \"main\": \"default_app.js\",\n  \"license\": \"BSD-2-Clause\"\n}\n");
            
            // zip.file("source.c", "/*\n  Save this file as main.c and compile it using this command\n  (those are backticks, not single quotes):\n    gcc -Wall -g -o main main.c `pkg-config --cflags --libs gtk+-2.0 webkit-1.0` -export-dynamic\n  \n  Then execute it using:\n  ./main\n  \n  If you can't compile chances are you don't have gcc installed.\n  Install gcc/c with the following terminal command. (This command is for Debian based Linux distros)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc\n  \n  WebKit requires libraries to successfully aquire, configure, and compile. You can get libraries by issuing the following command in your terminal:\n    sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n  \n  Ubuntu Webkit information - https://help.ubuntu.com/community/WebKit\n    sudo apt-get install libwebkitgtk-dev python-webkit-dev python-webkit\n  \n  Required dependencies for this build: (If you installed all the above this is not needed)\n    sudo apt-get install libgtk2.0-dev libgtk2.0-doc libglib2.0-doc subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev libwebkitgtk-dev\n*/\n\n#include <limits.h>\n#include <gtk/gtk.h>\n#include <webkit/webkit.h>\n\nstatic GtkWidget* window;\nstatic WebKitWebView* web_view;\n\nstatic void destroy_cb (GtkWidget* widget, gpointer data) {\n  gtk_main_quit();\n}\n\nstatic GtkWidget* create_browser() {\n  GtkWidget* scrolled_window = gtk_scrolled_window_new (NULL, NULL);\n  gtk_scrolled_window_set_policy (GTK_SCROLLED_WINDOW (scrolled_window), GTK_POLICY_AUTOMATIC, GTK_POLICY_AUTOMATIC);\n\n  web_view = WEBKIT_WEB_VIEW (webkit_web_view_new ());\n  gtk_container_add (GTK_CONTAINER (scrolled_window), GTK_WIDGET (web_view));\n\n  return scrolled_window;\n}\n\nint main (int argc, char* argv[]) {\n  gtk_init (&argc, &argv);\n\n  GtkWidget* vbox = gtk_vbox_new (FALSE, 0);\n  gtk_box_pack_start (GTK_BOX (vbox), create_browser(), TRUE, TRUE, 0);\n\n  GtkWidget* window = gtk_window_new (GTK_WINDOW_TOPLEVEL);\n  gtk_window_set_default_size (GTK_WINDOW (window), 800, 560);\n  gtk_widget_set_name (window, \"" + $(".vprojectname").val().replace(/ /g, "-") + "\");\n  /* gtk_window_set_icon_from_file(window, \"app/logo.png\", NULL); */\n  g_signal_connect (G_OBJECT (window), \"destroy\", G_CALLBACK (destroy_cb), NULL);\n  gtk_container_add (GTK_CONTAINER (window), vbox);\n  \n  char uri[PATH_MAX];\n  char cwd[PATH_MAX];\n\n  getcwd(cwd, sizeof(cwd));\n\n  if (argc > 1)\n      snprintf(uri, sizeof(uri), \"%s\", argv[1]);\n  else\n      snprintf(uri, sizeof(uri), \"file://%s/" + $(".vprojectname").val().replace(/ /g, "-") + "/app/index.html\", cwd);\n  \n  webkit_web_view_open (web_view, uri);\n\n  gtk_widget_grab_focus (GTK_WIDGET (web_view));\n  gtk_widget_show_all (window);\n  gtk_main ();\n\n  return 0;\n}\n");
            // zip.file("README", "This application for Linux relies on the following dependencies...\n  sudo apt-get install subversion gtk-doc-tools autoconf automake libtool libgtk2.0-dev libpango1.0-dev libicu-dev libxslt-dev libsoup2.4-dev libsqlite3-dev gperf bison flex libjpeg62-dev libpng12-dev libxt-dev autotools-dev libgstreamer-plugins-base0.10-dev libenchant-dev libgail-dev\n\nIf kodeWeave was at all helpful for you. Would you consider donating to the project?\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSYGA2RB5ZJCC\n\n");
            var content = zip.generate({type:"blob"});
            saveAs(content, $(".vprojectname").val().replace(/ /g, "-") + "-lin.zip");
          });
        });

        // Download as Chrome App
        $("[data-action=export-as-chrome-app]").on("click", function() {
          $("[data-action=download]").trigger("click");
          $("[data-action=chromedialog]").fadeIn();
        });
        $("[data-action=cancel]").on("click", function() {
          $("[data-action=chromedialog]").fadeOut();
        });
        $("[data-action=confirm]").on("click", function() {
          if ( ($(".vprojectname").val() === "") || ($("[data-action=descr]").val() === "") ) {
            alertify.error("Download failed! Please fill in all required fields.");
          } else {
            JSZipUtils.getBinaryContent("font-awesome-chrome.zip", function(err, data) {
              if(err) {
                throw err; // or handle err
              }

              var zip = new JSZip(data);

              // Your Web App
              var htmlContent = openHTML.getValue() + $(".vprojectname").val() + closeHTML.getValue() + yourRefs.getValue() + closeRefs.getValue() + htmlEditor.getValue() + closeFinal.getValue();
              zip.file("app/index.html", htmlContent);
              zip.file("app/css/style.css", cssEditor.getValue());
              zip.file("app/js/index.js", jsEditor.getValue());
              zip.file("README.md", otherEditor.getValue());
              eval( $("[data-action=ziplibs]").val().replace(/libraries/g,"app/libraries") );
              eval( $("[data-action=fulljszipcode]").val().split("css/").join("app/css/").split("js/").join("app/js/") );
              var Img16 = c16[0].toDataURL("image/png");
              var Img32 = c32[0].toDataURL("image/png");
              var Img64 = c64[0].toDataURL("image/png");
              var Img128 = canvas[0].toDataURL("image/png");
              zip.file("assets/16.png", Img16.split('base64,')[1],{base64: true});
              zip.file("assets/32.png", Img32.split('base64,')[1],{base64: true});
              zip.file("assets/64.png", Img64.split('base64,')[1],{base64: true});
              zip.file("assets/128.png", Img128.split('base64,')[1],{base64: true});
              zip.file("css/index.css", "html, body {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n}\n\nwebview, iframe {\n  width: 100%;\n  height: 100%;\n  border: 0;\n}");
              zip.file("index.html", "<!DOCTYPE html>\n<html>\n  <head>\n    <title>"+ $(".vprojectname").val() +"</title>\n    <link rel=\"stylesheet\" href=\"css/index.css\" />\n  </head>\n  <body>\n    <iframe src=\"app/index.html\">\n      Your Chromebook does not support the iFrame html element.\n    </iframe>\n  </body>\n</html>");

              if ( $(".offline-mode").is(":checked") ) {
                zip.file("manifest.json", '{\n  "manifest_version": 2,\n  "name": "'+ $(".vprojectname").val() +'",\n  "short_name": "'+ $(".vprojectname").val() +'",\n  "description": "'+ $("[data-action=descr]").val() +'",\n  "version": "1.0",\n  "minimum_chrome_version": "38",\n  "offline_enabled": true,\n  "permissions": [ "storage", "fileSystem", "unlimitedStorage", "http://*/", "https://*/" ],\n  "icons": {\n    "16": "assets/16.png",\n    "32": "assets/32.png",\n    "64": "assets/64.png",\n    "128": "assets/128.png"\n  },\n\n  "app": {\n    "background": {\n      "scripts": ["background.js"]\n    }\n  }\n}\n');
                if ( $(".frame-mode").is(":checked") ) {
                  zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      frame: 'none',\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
                } else {
                  zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
                }
              } else {
                zip.file("manifest.json", '{\n  "manifest_version": 2,\n  "name": "'+ $(".vprojectname").val() +'",\n  "short_name": "'+ $(".vprojectname").val() +'",\n  "description": "'+ $("[data-action=descr]").val() +'",\n  "version": "1.0",\n  "minimum_chrome_version": "38",\n  "offline_enabled": false,\n  "permissions": [ "storage", "fileSystem", "unlimitedStorage", "http://*/", "https://*/" ],\n  "icons": {\n    "16": "assets/16.png",\n    "32": "assets/32.png",\n    "64": "assets/64.png",\n    "128": "assets/128.png"\n  },\n\n  "app": {\n    "background": {\n      "scripts": ["background.js"]\n    }\n  }\n}\n');
                if ( $(".frame-mode").is(":checked") ) {
                  zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      frame: 'none',\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
                } else {
                  zip.file("background.js", "/**\n * Listens for the app launching, then creates the window.\n *\n * @see http://developer.chrome.com/apps/app.runtime.html\n * @see http://developer.chrome.com/apps/app.window.html\n */\nchrome.app.runtime.onLaunched.addListener(function(launchData) {\n  chrome.app.window.create(\n    'app/index.html',\n    {\n      id: 'mainWindow',\n      innerBounds: {\n        'width': 800,\n        'height': 600\n      }\n    }\n  );\n});");
                }
              }

              var content = zip.generate({type:"blob"});
              saveAs(content, $(".vprojectname").val().replace(/ /g, "-") + "-chrome.zip");
              $(".dialog-bg").fadeOut();
            });
          }
          return false;
        });
        return false;
      };
      reader.readAsArrayBuffer(file);
    }
  });
  
  // Export zip file
  $("[data-action=export]").click(function() {
    $("[data-action=download]").trigger("click");
    
    JSZipUtils.getBinaryContent("font-awesome.zip", function(err, data) {
      if(err) {
        throw err; // or handle err
      }

      var zip = new JSZip(data);
      
      // Your Web App
      var htmlContent = openHTML.getValue() + $(".vprojectname").val() + closeHTML.getValue() + yourRefs.getValue() + closeRefs.getValue() + htmlEditor.getValue() + closeFinal.getValue();
      zip.file("index.html", htmlContent);
      zip.file("css/style.css", cssEditor.getValue());
      zip.file("js/index.js", jsEditor.getValue());
      eval( $("[data-action=ziplibs]").val() );
      eval( $("[data-action=fulljszipcode]").val() );
      zip.file("README.md", otherEditor.getValue());
      var content = zip.generate({type:"blob"});
      saveAs(content, $(".vprojectname").val().replace(/ /g, "-") + ".zip");
    });
  });
  
  // Save to browser
  $("[data-action=save]").click(function() {
    alertify.error("Not yet available...");
  });

  appDemos();
  newProject();
  responsiveMagic();
  FileManager();
});
