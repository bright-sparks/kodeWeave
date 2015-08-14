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
            if ( $(this).height() > 320 ) {
              $(".demos-dialog").css({
                "width": "auto",
                "height": "215px",
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
      },
      newProject = function() {
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
      },
      appDemos = function() {
        $("[data-action=alphabetizer]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Alphabetizer");
          htmlEditor.setValue("<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <a class=\"btn--default\" data-action=\"alphabetize\">Alphabetize</a>\n    <textarea class=\"form__input\" data-action=\"input-list\" rows=\"7\" placeholder=\"Alphabetize your text here...\">China\nIndia\nUnited States of America\nIndonesia\nBrazil\nPakistan\nNigeria\nBangladesh\nRussia\nJapan\nMexico\nPhilippines\nEthiopia\nVietnam\nEgypt\nGermany\nIran\nTurkey\nDemocratic Republic of the Congo\nFrance</textarea>\n  </div>\n</div>");
          cssEditor.setValue("@import url(\"http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900\");\n\na {\n  cursor: pointer;\n}\n\n.grid:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.srt, .form__label--hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.panel--centered, .panel--padded--centered, [class^=\"btn--\"] {\n  text-align: center; }\n\n[class^=\"progbar__\"]:after, .icn--nav-toggle:before {\n  display: block;\n  content: '';\n  position: absolute; }\n\n.centered, .grid {\n  float: none;\n  margin-left: auto;\n  margin-right: auto; }\n\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\n*\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbody {\n  color: #797e83;\n  font-size: 16px;\n  font-family: \"Lato\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.5; }\n\nh3 {\n  font-size: 1.125em; }\n\nh4 {\n  margin-top: 1.375em;\n  margin-bottom: 2.57143em;\n  color: #d6d7d9;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 400;\n  font-size: 0.875em; }\n  @media (min-width: 769px) {\n    h4 {\n      margin-top: 2.625em; } }\n\na {\n  color: #656a6e;\n  text-decoration: none;\n  font-weight: 400; }\n\np {\n  margin: 0 0 1.66667em;\n  font-weight: 300;\n  font-size: 1.125em;\n  line-height: 1.5; }\n\nblockquote {\n  font-weight: 300;\n  font-style: italic;\n  font-size: 1.25em; }\n  @media (min-width: 769px) {\n    blockquote {\n      margin: 1.33333em 0;\n      padding: 0 0 0 5%;\n      border-left: 0.33333em solid #ebecec;\n      font-size: 1.5em; } }\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n  list-style-type: none; }\n\nimg {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  height: auto; }\n\ninput,\ntextarea {\n  display: block;\n  padding: 15px;\n  width: 100%;\n  outline: 0;\n  border: 0; }\n\ninput:focus,\ntextarea:focus {\n  transition: 0.3s; }\n\nbutton {\n  outline: 0; }\n\nfooter {\n  border-top: 1px solid #ebecec; }\n  footer p {\n    font-size: 1em;\n    margin-top: 1.375em; }\n\n.panel, .panel--centered {\n  padding-top: 1.875em; }\n  @media (min-width: 769px) {\n    .panel, .panel--centered {\n      padding-bottom: 1.25em; } }\n\n.panel--padded, .panel--padded--centered {\n  padding-top: 2.125em; }\n  @media (min-width: 769px) {\n    .panel--padded, .panel--padded--centered {\n      padding-top: 5em;\n      padding-bottom: 2.125em; } }\n\n.grid {\n  width: 90%; }\n  [class*=\"grid__col--\"] > .grid {\n    width: 100%; }\n  @media (min-width: 1100px) {\n    .grid {\n      max-width: 1050px; } }\n\n@media (min-width: 769px) {\n  .grid__col--1 {\n    width: 6.5%; }\n  .grid__col--2 {\n    width: 15%; }\n  .grid__col--3 {\n    width: 23.5%; }\n  .grid__col--4 {\n    width: 32%; }\n  .grid__col--5 {\n    width: 40.5%; }\n  .grid__col--6 {\n    width: 49%; }\n  .grid__col--7 {\n    width: 57.5%; }\n  .grid__col--8 {\n    width: 66%; }\n  .grid__col--9 {\n    width: 74.5%; }\n  .grid__col--10 {\n    width: 83%; }\n  .grid__col--11 {\n    width: 91.5%; }\n  .grid__col--12 {\n    width: 100%; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  [class^=\"grid__col--\"] {\n    margin-top: 0.75em;\n    margin-bottom: 0.75em; } }\n@media (min-width: 769px) {\n  [class^=\"grid__col--\"] {\n    float: left;\n    min-height: 1px;\n    padding-left: 10px;\n    padding-right: 10px; }\n    [class^=\"grid__col--\"] + [class^=\"grid__col--\"] {\n      margin-left: 2%; }\n    [class^=\"grid__col--\"]:last-of-type {\n      float: right; } }\n\n.theme__poly .grid [class*=\"grid__col\"] {\n  font-weight: 100;\n  margin-bottom: 1em;\n  padding: 1.75%; }\n\n@media (min-width: 769px) {\n  .nav__item, .nav__item--current {\n    display: inline-block;\n    margin: 0 0.625em; } }\n\n.nav__item--current a, .nav__item a {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    .nav__item--current a, .nav__item a {\n      border-bottom-color: #ebecec;\n      padding-top: 0.77778em;\n      padding-bottom: 0.77778em; } }\n\n.nav__item--current a, .nav__item a:hover {\n  color: #0b0b0b;\n  border-color: #52bab3; }\n\nh1, .headline-primary, .headline-primary--grouped {\n  color: #525559;\n  font-weight: 300;\n  font-size: 2.625em;\n  line-height: 1.09524;\n  margin-top: 0; }\n\nh2, .headline-secondary, .headline-secondary--grouped {\n  color: #999da1;\n  letter-spacing: 1px;\n  font-weight: 100;\n  font-size: 1.5em;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n\n.form__btn, [class^=\"btn--\"] {\n  padding: 15px 30px;\n  border: 0;\n  border-radius: 0.4em;\n  color: #fff;\n  text-transform: uppercase;\n  font-size: 0.875em;\n  font-weight: 400;\n  transition: opacity 0.3s;\n  display: block; }\n  .form__btn:hover, [class^=\"btn--\"]:hover {\n    opacity: .75; }\n  .form__btn:active, [class^=\"btn--\"]:active {\n    opacity: initial; }\n\n.menu__link, .menu__link--end {\n  display: block;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px rgba(11, 11, 11, 0.2);\n  font-size: 1.125em; }\n\n.icn--nav-toggle, .icn--close {\n  line-height: 0;\n  cursor: pointer; }\n\n.img--wrap {\n  border: 1px solid #d6d7d9;\n  padding: 0.75em; }\n.img--avatar {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 50%; }\n  @media (min-width: 769px) {\n    .img--avatar {\n      margin-top: 1.5em; } }\n@media (min-width: 769px) {\n  .img--hero {\n    margin-bottom: 2.625em; } }\n\n.headline-primary {\n  margin-bottom: 1.66667em; }\n  .headline-primary--grouped {\n    margin-bottom: 0; }\n.headline-secondary {\n  margin-bottom: 0.91667em; }\n  .headline-secondary--grouped {\n    margin-top: 0.41667em;\n    margin-bottom: 2.25em; }\n\n.form__label {\n  display: block;\n  margin-bottom: 0.625em; }\n.form__input {\n  font-size: 1.125em;\n  margin-bottom: 1.11111em;\n  border-bottom: 6px solid #d6d7d9;\n  border-radius: 0.4em;\n  background: #ebecec;\n  color: black;\n  font-weight: 300; }\n  .form__input:focus {\n    border-color: #52bab3; }\n.form__btn {\n  background: #52bab3; }\n\n.btn--default {\n  background-color: #52bab3; }\n.btn--success {\n  background-color: #5ece7f; }\n.btn--error {\n  background-color: #e67478; }\n.btn--warning {\n  background-color: #ff784f; }\n.btn--info {\n  background-color: #9279c3; }\n\n[class^=\"btn--\"] {\n  margin-bottom: 1.42857em; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    [class^=\"btn--\"] {\n      width: 100%; } }\n  @media (min-width: 769px) {\n    [class^=\"btn--\"] {\n      width: auto;\n      display: inline-block; }\n      [class^=\"btn--\"] + [class^=\"btn--\"] {\n        margin-left: 20px; } }\n\n.navbar {\n  position: relative; }\n  @media (min-width: 769px) {\n    .navbar {\n      margin-top: 3.375em;\n      margin-bottom: 0; } }\n\n.nav {\n  margin-top: 1.25em;\n  margin-bottom: 1.875em; }\n  .nav__item a {\n    color: #797e83; }\n\n.offcanvas {\n  position: relative;\n  padding: 0.625em;\n  letter-spacing: 1px;\n  background: #39add1;\n  background: linear-gradient(45deg, rgba(94, 206, 127, 0.8) 0%, #39add1 100%); }\n\n.menu {\n  margin-top: 1.25em; }\n  .menu__link {\n    border-bottom: solid 1px rgba(255, 255, 255, 0.3); }\n\n.progbar {\n  height: 4px;\n  border-radius: 2px;\n  background: #d6d7d9;\n  position: relative;\n  margin-bottom: 2.875em; }\n  .progbar__status--default {\n    background-color: #52bab3; }\n    .progbar__status--default:after {\n      background-color: #6fc6c0; }\n  .progbar__status--success {\n    background-color: #5ece7f; }\n    .progbar__status--success:after {\n      background-color: #7dd898; }\n  .progbar__status--error {\n    background-color: #e67478; }\n    .progbar__status--error:after {\n      background-color: #ec979a; }\n  .progbar__status--warning {\n    background-color: #ff784f; }\n    .progbar__status--warning:after {\n      background-color: #ff9778; }\n  .progbar__status--info {\n    background-color: #9279c3; }\n    .progbar__status--info:after {\n      background-color: #a995d0; }\n\n[class^=\"progbar__\"] {\n  display: block;\n  width: 50%;\n  height: 100%;\n  border-radius: inherit;\n  position: relative; }\n  [class^=\"progbar__\"]:after {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    right: -10px;\n    top: -8px; }\n\n.site-logo {\n  background-image: url(\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/logo.svg\");\n  background-repeat: no-repeat;\n  width: 115px;\n  height: 45px;\n  display: inline-block; }\n\n.icn--nav-toggle {\n  width: 25px;\n  height: 17px;\n  border-top: solid 3px #797e83;\n  border-bottom: solid 3px #797e83;\n  position: relative; }\n  .icn--nav-toggle:before {\n    width: 25px;\n    height: 3px;\n    background: #999da1;\n    top: 4px; }\n.icn--close {\n  background-image: url(\"img/icn-close.svg\");\n  background-repeat: no-repeat;\n  width: 20px;\n  height: 20px;\n  display: block;\n  position: absolute;\n  right: 4%;\n  top: 4%; }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-displayed-mobile {\n    display: block; }\n    .is-hidden-mobile {\n      display: none; } }\n@media (min-width: 769px) {\n  .is-displayed-mobile {\n    display: none; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-collapsed-mobile {\n    visibility: collapse;\n    padding: 0;\n    height: 0;\n    margin: 0;\n    line-height: 0; } }\n\n.theme__poly .grid__col--12 {\n  background-color: #DEF4E5; }\n\n.theme__poly .grid__col--8 {\n  background-color: #DCE0F2; }\n\n.theme__poly .grid__col--7 {\n  background-color: #DCF0EF; }\n\n.theme__poly .grid__col--6 {\n  background-color: #FFE3DB; }\n\n.theme__poly .grid__col--4 {\n  background-color: #F8EDD0; }\n\n.theme__poly .grid__col--5 {\n  background-color: #EAEBEC; }\n\n.theme__poly .grid__col--2 {\n  background-color: #C5E2CE; }\n\n.theme__poly .grid__col--3 {\n  background-color: #D6EEF5; }\n\n/*# sourceMappingURL=application.css.map */\n\n/* Tabs */\n.tabs input[type=radio] {\n  display: none;\n}\n.tabs {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n}\n.tabs li {\n  float: left;\n}\n.tabs label {\n  display: inline-block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.tabs label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.tab-content {\n  z-index: 2;\n  display: none;\n  left: 0;\n  width: 100%;\n  padding: 1em 0.4em;\n  position: absolute;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=tab]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=tab]:checked ~ [id^=tab-content] {\n  display: block;\n}\n\n/* Accordion */\n.accordion input[type=radio] {\n  display: none;\n}\n.accordion {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n  margin-top: 1.25em;\n}\n.accordion label {\n  display: block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.accordion label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.acc-content {\n  z-index: 2;\n  display: none;\n  width: 100%;\n  padding: 1em 0.4em;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=acc]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=acc]:checked ~ [id^=acc-content] {\n  display: block;\n}\n.grid {\n  text-align: left;\n}\n");
          jsEditor.setValue("var txt = document.querySelector(\"[data-action=input-list]\");\ndocument.querySelector(\"[data-action=alphabetize]\").addEventListener(\"click\", function() {\n  txt.value = (txt.value.split(\"\\n\").sort(caseInsensitive).join(\"\\n\"));\n\n  function caseInsensitive(a, b) {\n    return a.toLowerCase().localeCompare(b.toLowerCase());\n  }\n});\n");
          $(".open-demos, #normalize").trigger("click");
        });
        $("[data-action=applicator]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Code Applicator");
          htmlEditor.setValue("<textarea id=\"addcode\" placeholder=\"Encode here...\"></textarea>\n<textarea id=\"encode\" readonly placeholder=\"Encoded code goes here...\"></textarea>\n<div id=\"decode\">Preview code here.</div>");
          cssEditor.setValue("body {\n  margin: 0;\n}\n\n::-webkit-input-placeholder { /* WebKit browsers */\n  color: #555;\n}\n:-moz-placeholder { /* Mozilla Firefox 4 to 18 */\n  color: #555;\n}\n::-moz-placeholder { /* Mozilla Firefox 19+ */\n  color: #555;\n}\n:-ms-input-placeholder { /* Internet Explorer 10+ */\n  color: #555;\n}\n\n#addcode, #encode, #decode {\n  position: absolute;\n  font-family: monospace;\n  line-height: 1.4em;\n  font-size: 1em;\n  overflow: auto;\n  resize: none;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n#encode, #decode {\n  left: 0;\n  width: 50%;\n  height: 50%;\n  background-color: #fff;\n}\n\n#addcode {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  width: 50%;\n  height: 100%;\n  min-height: 1.4em;\n  border: 0;\n  border-radius: 0;\n  resize: none;\n  color: #ccc;\n  background-color: #111;\n}\n\n#encode {\n  top: 0;\n}\n\n#decode {\n  bottom: 0;\n}\n");
          jsEditor.setValue("document.querySelector(\"#addcode\").addEventListener(\"keyup\", function() {\n  document.querySelector(\"#encode\").textContent = this.value;\n  document.querySelector(\"#encode\").textContent = document.querySelector(\"#encode\").innerHTML;\n  document.querySelector(\"#decode\").innerHTML = this.value;\n  return false;\n});\n\ndocument.querySelector(\"#encode\").addEventListener(\"click\", function() {\n  this.select();\n  return false;\n});\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=codeeditor]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Code Editor");
          htmlEditor.setValue("<script src=\"http://codemirror.net/lib/codemirror.js\"></script>\n<script src=\"http://codemirror.net/javascripts/code-completion.js\"></script>\n<script src=\"http://codemirror.net/javascripts/css-completion.js\"></script>\n<script src=\"http://codemirror.net/javascripts/html-completion.js\"></script>\n<script src=\"http://codemirror.net/mode/javascript/javascript.js\"></script>\n<script src=\"http://codemirror.net/mode/xml/xml.js\"></script>\n<script src=\"http://codemirror.net/mode/css/css.js\"></script>\n<script src=\"http://codemirror.net/mode/htmlmixed/htmlmixed.js\"></script>\n<script src=\"http://codemirror.net/addon/edit/closetag.js\"></script>\n<script src=\"http://codemirror.net/addon/edit/matchbrackets.js\"></script>\n<script src=\"http://codemirror.net/addon/selection/active-line.js\"></script>\n<script src=\"http://codemirror.net/keymap/extra.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/foldcode.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/foldgutter.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/brace-fold.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/xml-fold.js\"></script>\n<script src=\"http://codemirror.net/addon/fold/comment-fold.js\"></script>\n\n<textarea id=\"code\" name=\"code\"><!doctype html>\n<html>\n  <head>\n    <meta charset=utf-8>\n    <title>HTML5 canvas demo</title>\n    <style>p {font-family: monospace;}</style>\n  </head>\n  <body>\n    <p>Canvas pane goes here:</p>\n    <canvas id=pane width=300 height=200></canvas>\n\n    <script>\n      var canvas = document.getElementById(\"pane\");\n      var context = canvas.getContext(\"2d\");\n\n      context.fillStyle = \"rgb(250,0,0)\";\n      context.fillRect(10, 10, 55, 50);\n\n      context.fillStyle = \"rgba(0, 0, 250, 0.5)\";\n      context.fillRect(30, 30, 55, 50);\n    </script>\n  </body>\n</html></textarea>\n\n<iframe id=\"preview\"></iframe>");
          cssEditor.setValue("@import url(\"http://codemirror.net/lib/codemirror.css\");\n@import url(\"http://codemirror.net/addon/fold/foldgutter.css\");\n\n.CodeMirror {\n  float: left;\n  width: 50%;\n  border: 1px solid black;\n}\n\niframe {\n  width: 49%;\n  float: left;\n  height: 300px;\n  border: 1px solid black;\n  border-left: 0;\n}");
          jsEditor.setValue("var delay;\n\n// Initialize CodeMirror editor\nvar editor = CodeMirror.fromTextArea(document.getElementById(\"code\"), {\n  mode: \"text/html\",\n  tabMode: \"indent\",\n  styleActiveLine: true,\n  lineNumbers: true,\n  lineWrapping: true,\n  autoCloseTags: true,\n  foldGutter: true,\n  dragDrop : true,\n  gutters: [\"CodeMirror-linenumbers\", \"CodeMirror-foldgutter\"]\n});\n\n// Live preview\neditor.on(\"change\", function() {\n  clearTimeout(delay);\n  delay = setTimeout(updatePreview, 300);\n});\n\nfunction updatePreview() {\n  var previewFrame = document.getElementById(\"preview\");\n  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;\n  preview.open();\n  preview.write(editor.getValue());\n  preview.close();\n}\nsetTimeout(updatePreview, 300);\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=dateclock]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Date and Time");
          htmlEditor.setValue("<span class=\"date\" data-action=\"leftdate\"></span>\n<span class=\"date fr\" data-action=\"rightdate\"></span>\n<div class=\"clock\" data-action=\"clock\"></div>\n");
          cssEditor.setValue(".date {\n  font-family: arial;\n}\n\n.fr {\n  float: right;\n}\n\n.clock {\n  font: bold 1.5em sans;\n  text-align: center;\n}");
          jsEditor.setValue("// Define a function to display the current time\nfunction displayTime() {\n  var now = new Date();\n  document.querySelector('[data-action=clock]').innerHTML =  now.toLocaleTimeString();\n  setTimeout(displayTime, 1000);\n}\ndisplayTime();\n\n// Date\nvar currentTime = new Date();\nvar month = currentTime.getMonth() + 1;\nvar date = currentTime.getDate();\nvar year = currentTime.getFullYear();\ndocument.querySelector('[data-action=leftdate]').innerHTML = month + '/' + date + '/' + year;\n\nvar today = new Date();\nif (year < 1000)\n  year += 1900;\nvar day = today.getDay();\nvar monthname = today.getMonth();\nif (date < 10)\n  date = '0' + date;\nvar dayarray = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');\nvar montharray = new Array('January','February','March','April','May','June','July','August','September','October','November','December');\ndocument.querySelector('[data-action=rightdate]').innerHTML = dayarray[day] + ', ' + montharray[monthname] + ' ' + date + ', ' + year;\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=detectorientation]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Detect Orientation");
          htmlEditor.setValue("<h1 class=\"portrait\">Portrait</h1>\n<h1 class=\"landscape\">Landscape</h1>\n<footer class=\"foot\"></footer>");
          cssEditor.setValue("body {\n  font: 26px arial;\n}\n.portrait, .landscape, .foot {\n  text-align: center;\n}\n.foot {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 26px;\n}\n");
          jsEditor.setValue("var detectOrientation = function() {\n  if ( window.innerWidth > window.innerHeight ) {\n    document.querySelector(\".landscape\").style.display = \"block\";\n    document.querySelector(\".portrait\").style.display = \"none\";\n  } else if ( window.innerWidth < window.innerHeight ) {\n    document.querySelector(\".landscape\").style.display = \"none\";\n    document.querySelector(\".portrait\").style.display = \"block\";\n  }\n  document.querySelector(\".foot\").innerHTML =  window.innerWidth + \"px, \" + window.innerHeight + \"px\";\n};\n\nwindow.addEventListener(\"resize\", function() {\n  detectOrientation();\n});\n\ndetectOrientation();\n");
          $(".open-demos").trigger("click");
        });
        $("[data-action=osdisplay]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Detect Operating System");
          htmlEditor.setValue("<div data-output=\"os\"></div>");
          jsEditor.setValue("document.addEventListener(\"DOMContentLoaded\", function() {\n  document.querySelector(\"[data-output=os]\").innerHTML = \"<strong>Operating System</strong>: \" + navigator.platform;\n});");
          $(".open-demos").trigger("click");
        });
        $("[data-action=passwordgen]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Password Generator");
          htmlEditor.setValue("<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-lg-12\">\n      <div class=\"input-group\">\n        <input type=\"text\" class=\"form-control\" data-action=\"genoutput\" />\n        <span class=\"input-group-btn\">\n          <button class=\"btn btn-default btn-primary\" type=\"button\" data-action=\"gen\">\n            Generate!\n          </button>\n        </span>\n      </div>\n    </div>\n  </div>\n</div>");
          cssEditor.setValue("html, body {\n  height: 100%;\n}\n\nbody {\n  padding: 1em 0;\n  background: #0072ff;\n}\n\n.input-group {\n  box-shadow: 0 0 25px #00162d;\n}\n\n.input-group, .form-control, .input-group-btn, .btn {\n  border-radius: 5px;\n}");
          jsEditor.setValue("function PasswordGen() {\n  var char = \"0123456789abcdefghijklmnopqrstuvwxyz\";\n    var fullchar = \"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\";\n    var genHash = \"\";\n    var i;\n    \n    for (i = 0; i < 8; i++) {\n      var rnum = Math.floor(Math.random() * char.length);\n      genHash += char.substring(rnum, rnum + 1);\n    }\n    \n    $(\"[data-action=genoutput]\").val(genHash);\n}\n\n$(\"[data-action=gen]\").click(function() {\n  PasswordGen();\n});\n\nPasswordGen();\n");
          $(".open-demos, #jquery, #bootstrap").trigger("click");
        });

        $("[data-action=picgallery]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Fotorama Gallery");
          htmlEditor.setValue("<script src=\"http://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.js\"></script>\n\n<div class=\"fotorama\" data-allowfullscreen=\"true\" \n     data-width=\"100%\"\n     data-height=\"90%\"\n     data-nav=\"thumbs\"\n     data-fit=\"cover\"\n     data-keyboard=\"true\">\n  <a href=\"http://i.fotorama.io/ac2c2fe6-30fe-4695-876b-ce185ed408cf/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/ac2c2fe6-30fe-4695-876b-ce185ed408cf/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n  <a href=\"http://i.fotorama.io/5c22d9ee-a631-44bd-b848-363e5f2695cd/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/5c22d9ee-a631-44bd-b848-363e5f2695cd/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n  <a href=\"http://i.fotorama.io/a5c42bf0-0160-4b3e-867a-f9dfd7ad70d6/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/a5c42bf0-0160-4b3e-867a-f9dfd7ad70d6/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n  <a href=\"http://i.fotorama.io/aa11819e-f614-46bd-8858-752b6fcb0ca3/-/stretch/off/-/resize/1280x/\"><img src=\"http://i.fotorama.io/aa11819e-f614-46bd-8858-752b6fcb0ca3/-/stretch/off/-/resize/1280x/\" width=\"250\" height=\"150\"></a>\n</div>");
          cssEditor.setValue("@import url(\"http://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.3/fotorama.css\");");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        $("[data-action=picviewer]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("FileReader Picture Viewer");
          htmlEditor.setValue("<div id=\"holder\">\n  Drag and drop image <a data-action=\"call\" href=\"javascript:void()\">here</a>...\n</div> \n\n<div class=\"fill check hide\" align=\"center\">\n  <canvas class=\"logo\" width=\"128\" height=\"128\"></canvas>\n</div>\n\n<div class=\"hide\">\n  <input type=\"file\" data-action=\"load\">\n</div>\n\n<p id=\"status\">\n  File API &amp; FileReader API not supported\n</p>");
          cssEditor.setValue("#holder {\n  border: 10px dashed #ccc;\n  margin: 0 auto;\n  margin: 20px auto;\n  text-align: center;\n}\n#holder.hover {\n  border: 10px dashed #333;\n}\n\n.hide {\n  display: none;\n}\n.fill {\n  width: 100%;\n}");
          jsEditor.setValue("var canvas = $(\".logo\"),\n    ctx = canvas[0].getContext(\"2d\"),\n    holder = document.getElementById('holder'),\n    state = document.getElementById('status');\n\nif (typeof window.FileReader === 'undefined') {\n  state.className = 'fail';\n} else {\n  state.className = 'success';\n  state.innerHTML = 'File API & FileReader available';\n}\n\nfunction displayPreview(file) {\n  var reader = new FileReader();\n\n  reader.onload = function(e) {\n    var img = new Image();\n    img.src = e.target.result;\n    img.onload = function() {\n      // x, y, width, height\n      ctx.drawImage(img, 0, 0, 128, 128);\n    };\n  };\n  reader.readAsDataURL(file);\n}\n\n$(\"[data-action=call]\").click(function() {\n  $(\"[data-action=load]\").trigger(\"click\");\n});\n\n$(\"[data-action=load]\").change(function(e) {\n  var file = e.target.files[0];\n  displayPreview(file);\n  $(\".check\").removeClass(\"hide\");\n});\n\n// Drag and drop image load\nholder.ondragover = function () {\n  this.className = 'hover';\n  return false;\n};\nholder.ondragend = function () {\n  this.className = '';\n  return false;\n};\nholder.ondrop = function(e) {\n  this.className = '';\n  e.preventDefault();\n  var file = e.dataTransfer.files[0];\n  displayPreview(file);\n  $(\".check\").removeClass(\"hide\");\n};\n");
          $(".open-demos, #jquery").trigger("click");
        });
        $("[data-action=polyui]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Poly UI Kit");
          htmlEditor.setValue("<div class=\"grid\">\n  <header class=\"grid__col--12 panel--padded--centered\" role=\"banner\"> \n    <a class=\"site-logo\" href=\"javascript:void(0)\">\n      <b class=\"srt\">Poly - UI Toolkit</b>\n    </a>\n    <nav class=\"navbar\" role=\"navigation\">\n      <span id=\"toggle\" class=\"icn--nav-toggle is-displayed-mobile\">\n        <b class=\"srt\">Toggle</b>\n      </span>   \n      <ul class=\"nav is-collapsed-mobile\" role=\"navigation\">\n        <li class=\"nav__item\"><a href=\"#type\">Typography</a></li>\n        <li class=\"nav__item\"><a href=\"#buttons\">Buttons</a></li>\n        <li class=\"nav__item\"><a href=\"#forms\">Form</a></li>\n        <li class=\"nav__item\"><a href=\"#images\">Images</a></li>\n        <li class=\"nav__item\"><a href=\"#grid\">Grid</a></li>\n        <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li>\n        <!-- Current Page Class Style -->\n        <!-- <li class=\"nav__item--current\"><a href=\"#nav\">Navigation</a></li> -->\n      </ul>\n    </nav>\n  </header>\n</div>\n\n<div class=\"grid is-hidden-mobile\">\n  <div class=\"grid__col--12\">\n    <img class=\"img--hero\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/hero.jpg\" alt=\"Poly - A simple UI Kit\">\n  </div>\n</div>\n\n<h4 id=\"type\" class=\"grid\">Typography</h4>\n\n<div class=\"grid\">\n  <div class=\"centered grid__col--8\">\n    <h1 class=\"headline-primary--grouped\">Take a look at this amazing headline</h1>\n    <h2 class=\"headline-secondary--grouped\">Don't forget about the subtitle</h2>\n    <p>This is a typical paragraph for the UI Kit. <a href=\"#\">Here is what a link might look like</a>. The typical font family for this kit is Helvetica Neue.  This kit is intended for clean and refreshing web layouts. No jazz hands here, just the essentials to make dreams come true, with minimal clean web design. The kit comes fully equipped with everything from full responsive media styling to buttons to form fields. <em>I enjoy using italics as well from time to time</em>. Fell free to create the most amazing designs ever with this kit. I truly hope you enjoy not only the kit but this amazing paragraph as well. :)</p>\n    <blockquote>You know what really gets me going? A really nice set of block quotes.  That's right, block quotes that say, \"Hey, I'm an article you want to read and nurture.\"</blockquote>\n  </div>\n</div>\n\n<h4 id=\"buttons\" class=\"grid\">Buttons</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--12\">\n    <a class=\"btn--default\" href=\"#\">Button Default</a>\n    <a class=\"btn--success\" href=\"#\">Button Success</a>\n    <a class=\"btn--error\" href=\"#\">Button Error</a>\n    <button class=\"btn--warning\">Button Warning</button>\n    <button class=\"btn--info\">Button Info</button>\n  </div>\n</div>\n\n<h4 id=\"forms\" class=\"grid\">Form Elements</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--7\"> \n    <form class=\"form\">\n      <label class=\"form__label--hidden\" for=\"name\">Name:</label> \n      <input class=\"form__input\" type=\"text\" id=\"name\" placeholder=\"Name\">\n\n      <label class=\"form__label--hidden\" for=\"email\">Email:</label>\n      <input class=\"form__input\" type=\"email\" id=\"email\" placeholder=\"email@website.com\">\n\n      <label class=\"form__label--hidden\" for=\"msg\">Message:</label>\n      <textarea class=\"form__input\" id=\"msg\" placeholder=\"Message...\" rows=\"7\"></textarea>\n\n      <input class=\"btn--default\" type=\"submit\" value=\"Submit\">\n      <input class=\"btn--warning\" type=\"reset\" value=\"Reset\">\n    </form>\n  </div>\n  <div class=\"grid__col--4\">\n    <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n    <form>\n      <label class=\"form__label--hidden\" for=\"username\">Username:</label> \n      <input class=\"form__input\" type=\"text\" id=\"username\" placeholder=\"Username\">\n      <label class=\"form__label--hidden\" for=\"password\">Password:</label>\n      <input class=\"form__input\" type=\"password\" id=\"password\" placeholder=\"Password\">\n      <input class=\"form__btn\" type=\"submit\" value=\"Login\">\n    </form>\n  </div>\n</div>\n\n<h4 id=\"images\" class=\"grid\">Images</h4>\n\n<div class=\"grid\">\n  <div class=\"grid__col--5\">\n    <img src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n  </div>\n  <div class=\"grid__col--5\">\n    <img class=\"img--wrap\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/sample.jpg\" alt=\"sample image\">\n  </div>\n  <div class=\"grid__col--2\">\n    <img class=\"img--avatar\" src=\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/avatar.png\" alt=\"Avatar\">\n  </div>\n</div>\n\n<h4 id=\"grid\" class=\"grid\">Grid System</h4>\n\n<div class=\"theme__poly\">\n  <div class=\"grid\">\n    <div class=\"grid__col--12\">.grid__col--12</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--6\">.grid__col--6</div>\n    <div class=\"grid__col--6\">.grid__col--6</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--4\">.grid__col--4</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n    <div class=\"grid__col--3\">.grid__col--3</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--5\">.grid__col--5</div>\n    <div class=\"grid__col--7\">.grid__col--7</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"grid__col--8\">.grid__col--8</div>\n    <div class=\"grid__col--4\">.grid__col--4</div>\n  </div>\n  <div class=\"grid\">\n    <div class=\"centered grid__col--7\">.centered .grid__col--7</div>\n  </div>\n</div>\n\n<div class=\"grid\">\n  <div class=\"grid__col--7\">\n    <h4 id=\"nav\">Navigation</h4>\n    <ul class=\"nav\" role=\"navigation\">\n      <li class=\"nav__item\"><a href=\"#\">Nav Link</a></li>\n      <li class=\"nav__item\"><a href=\"#\">Nav Link 2</a></li>\n      <li class=\"nav__item--current\"><a href=\"#\">Nav Current</a></li>\n    </ul>\n    <p>This is what the navigation menu looks like when the screen is at 769px or higher. When the screen is less than 769px, you will have the option to display a toggle menu icon.</p>\n  </div>\n\n  <div class=\"grid__col--4\">\n    <h4>Offcanvas Menu</h4>\n    <div class=\"offcanvas\">\n      <span class=\"icn--close\">\n        <b class=\"srt\">close</b>\n      </span>\n      <ul class=\"menu\" role=\"navigation\">\n        <a class=\"menu__link\" href=\"#\">Link 1</a>\n        <a class=\"menu__link\" href=\"#\">Link 2</a>\n        <a class=\"menu__link\" href=\"#\">Link 3</a>\n        <a class=\"menu__link--end\" href=\"#\">Link 4</a>\n      </ul>\n    </div>\n  </div>\n</div>");
          cssEditor.setValue("@import url(\"http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900\");\n\n.grid:after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.srt, .form__label--hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.panel--centered, .panel--padded--centered, [class^=\"btn--\"] {\n  text-align: center; }\n\n[class^=\"progbar__\"]:after, .icn--nav-toggle:before {\n  display: block;\n  content: '';\n  position: absolute; }\n\n.centered, .grid {\n  float: none;\n  margin-left: auto;\n  margin-right: auto; }\n\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\n*\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n* {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbody {\n  color: #797e83;\n  font-size: 16px;\n  font-family: \"Lato\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  line-height: 1.5; }\n\nh3 {\n  font-size: 1.125em; }\n\nh4 {\n  margin-top: 1.375em;\n  margin-bottom: 2.57143em;\n  color: #d6d7d9;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  font-weight: 400;\n  font-size: 0.875em; }\n  @media (min-width: 769px) {\n    h4 {\n      margin-top: 2.625em; } }\n\na {\n  color: #656a6e;\n  text-decoration: none;\n  font-weight: 400; }\n\np {\n  margin: 0 0 1.66667em;\n  font-weight: 300;\n  font-size: 1.125em;\n  line-height: 1.5; }\n\nblockquote {\n  font-weight: 300;\n  font-style: italic;\n  font-size: 1.25em; }\n  @media (min-width: 769px) {\n    blockquote {\n      margin: 1.33333em 0;\n      padding: 0 0 0 5%;\n      border-left: 0.33333em solid #ebecec;\n      font-size: 1.5em; } }\n\nul,\nli {\n  margin: 0;\n  padding: 0;\n  list-style-type: none; }\n\nimg {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  height: auto; }\n\ninput,\ntextarea {\n  display: block;\n  padding: 15px;\n  width: 100%;\n  outline: 0;\n  border: 0; }\n\ninput:focus,\ntextarea:focus {\n  transition: 0.3s; }\n\nbutton {\n  outline: 0; }\n\nfooter {\n  border-top: 1px solid #ebecec; }\n  footer p {\n    font-size: 1em;\n    margin-top: 1.375em; }\n\n.panel, .panel--centered {\n  padding-top: 1.875em; }\n  @media (min-width: 769px) {\n    .panel, .panel--centered {\n      padding-bottom: 1.25em; } }\n\n.panel--padded, .panel--padded--centered {\n  padding-top: 2.125em; }\n  @media (min-width: 769px) {\n    .panel--padded, .panel--padded--centered {\n      padding-top: 5em;\n      padding-bottom: 2.125em; } }\n\n.grid {\n  width: 90%; }\n  [class*=\"grid__col--\"] > .grid {\n    width: 100%; }\n  @media (min-width: 1100px) {\n    .grid {\n      max-width: 1050px; } }\n\n@media (min-width: 769px) {\n  .grid__col--1 {\n    width: 6.5%; }\n  .grid__col--2 {\n    width: 15%; }\n  .grid__col--3 {\n    width: 23.5%; }\n  .grid__col--4 {\n    width: 32%; }\n  .grid__col--5 {\n    width: 40.5%; }\n  .grid__col--6 {\n    width: 49%; }\n  .grid__col--7 {\n    width: 57.5%; }\n  .grid__col--8 {\n    width: 66%; }\n  .grid__col--9 {\n    width: 74.5%; }\n  .grid__col--10 {\n    width: 83%; }\n  .grid__col--11 {\n    width: 91.5%; }\n  .grid__col--12 {\n    width: 100%; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  [class^=\"grid__col--\"] {\n    margin-top: 0.75em;\n    margin-bottom: 0.75em; } }\n@media (min-width: 769px) {\n  [class^=\"grid__col--\"] {\n    float: left;\n    min-height: 1px;\n    padding-left: 10px;\n    padding-right: 10px; }\n    [class^=\"grid__col--\"] + [class^=\"grid__col--\"] {\n      margin-left: 2%; }\n    [class^=\"grid__col--\"]:last-of-type {\n      float: right; } }\n\n.theme__poly .grid [class*=\"grid__col\"] {\n  font-weight: 100;\n  margin-bottom: 1em;\n  padding: 1.75%; }\n\n@media (min-width: 769px) {\n  .nav__item, .nav__item--current {\n    display: inline-block;\n    margin: 0 0.625em; } }\n\n.nav__item--current a, .nav__item a {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    .nav__item--current a, .nav__item a {\n      border-bottom-color: #ebecec;\n      padding-top: 0.77778em;\n      padding-bottom: 0.77778em; } }\n\n.nav__item--current a, .nav__item a:hover {\n  color: #0b0b0b;\n  border-color: #52bab3; }\n\nh1, .headline-primary, .headline-primary--grouped {\n  color: #525559;\n  font-weight: 300;\n  font-size: 2.625em;\n  line-height: 1.09524;\n  margin-top: 0; }\n\nh2, .headline-secondary, .headline-secondary--grouped {\n  color: #999da1;\n  letter-spacing: 1px;\n  font-weight: 100;\n  font-size: 1.5em;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n\n.form__btn, [class^=\"btn--\"] {\n  padding: 15px 30px;\n  border: 0;\n  border-radius: 0.4em;\n  color: #fff;\n  text-transform: uppercase;\n  font-size: 0.875em;\n  font-weight: 400;\n  transition: opacity 0.3s;\n  display: block; }\n  .form__btn:hover, [class^=\"btn--\"]:hover {\n    opacity: .75; }\n  .form__btn:active, [class^=\"btn--\"]:active {\n    opacity: initial; }\n\n.menu__link, .menu__link--end {\n  display: block;\n  padding-top: 1em;\n  padding-bottom: 1em;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px rgba(11, 11, 11, 0.2);\n  font-size: 1.125em; }\n\n.icn--nav-toggle, .icn--close {\n  line-height: 0;\n  cursor: pointer; }\n\n.img--wrap {\n  border: 1px solid #d6d7d9;\n  padding: 0.75em; }\n.img--avatar {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  border-radius: 50%; }\n  @media (min-width: 769px) {\n    .img--avatar {\n      margin-top: 1.5em; } }\n@media (min-width: 769px) {\n  .img--hero {\n    margin-bottom: 2.625em; } }\n\n.headline-primary {\n  margin-bottom: 1.66667em; }\n  .headline-primary--grouped {\n    margin-bottom: 0; }\n.headline-secondary {\n  margin-bottom: 0.91667em; }\n  .headline-secondary--grouped {\n    margin-top: 0.41667em;\n    margin-bottom: 2.25em; }\n\n.form__label {\n  display: block;\n  margin-bottom: 0.625em; }\n.form__input {\n  font-size: 1.125em;\n  margin-bottom: 1.11111em;\n  border-bottom: 6px solid #d6d7d9;\n  border-radius: 0.4em;\n  background: #ebecec;\n  color: black;\n  font-weight: 300; }\n  .form__input:focus {\n    border-color: #52bab3; }\n.form__btn {\n  background: #52bab3; }\n\n.btn--default {\n  background-color: #52bab3; }\n.btn--success {\n  background-color: #5ece7f; }\n.btn--error {\n  background-color: #e67478; }\n.btn--warning {\n  background-color: #ff784f; }\n.btn--info {\n  background-color: #9279c3; }\n\n[class^=\"btn--\"] {\n  margin-bottom: 1.42857em; }\n  @media (min-width: 1px) and (max-width: 768px) {\n    [class^=\"btn--\"] {\n      width: 100%; } }\n  @media (min-width: 769px) {\n    [class^=\"btn--\"] {\n      width: auto;\n      display: inline-block; }\n      [class^=\"btn--\"] + [class^=\"btn--\"] {\n        margin-left: 20px; } }\n\n.navbar {\n  position: relative; }\n  @media (min-width: 769px) {\n    .navbar {\n      margin-top: 3.375em;\n      margin-bottom: 0; } }\n\n.nav {\n  margin-top: 1.25em;\n  margin-bottom: 1.875em; }\n  .nav__item a {\n    color: #797e83; }\n\n.offcanvas {\n  position: relative;\n  padding: 0.625em;\n  letter-spacing: 1px;\n  background: #39add1;\n  background: linear-gradient(45deg, rgba(94, 206, 127, 0.8) 0%, #39add1 100%); }\n\n.menu {\n  margin-top: 1.25em; }\n  .menu__link {\n    border-bottom: solid 1px rgba(255, 255, 255, 0.3); }\n\n.progbar {\n  height: 4px;\n  border-radius: 2px;\n  background: #d6d7d9;\n  position: relative;\n  margin-bottom: 2.875em; }\n  .progbar__status--default {\n    background-color: #52bab3; }\n    .progbar__status--default:after {\n      background-color: #6fc6c0; }\n  .progbar__status--success {\n    background-color: #5ece7f; }\n    .progbar__status--success:after {\n      background-color: #7dd898; }\n  .progbar__status--error {\n    background-color: #e67478; }\n    .progbar__status--error:after {\n      background-color: #ec979a; }\n  .progbar__status--warning {\n    background-color: #ff784f; }\n    .progbar__status--warning:after {\n      background-color: #ff9778; }\n  .progbar__status--info {\n    background-color: #9279c3; }\n    .progbar__status--info:after {\n      background-color: #a995d0; }\n\n[class^=\"progbar__\"] {\n  display: block;\n  width: 50%;\n  height: 100%;\n  border-radius: inherit;\n  position: relative; }\n  [class^=\"progbar__\"]:after {\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    right: -10px;\n    top: -8px; }\n\n.site-logo {\n  background-image: url(\"http://treehouse-code-samples.s3.amazonaws.com/poly/img/logo.svg\");\n  background-repeat: no-repeat;\n  width: 115px;\n  height: 45px;\n  display: inline-block; }\n\n.icn--nav-toggle {\n  width: 25px;\n  height: 17px;\n  border-top: solid 3px #797e83;\n  border-bottom: solid 3px #797e83;\n  position: relative; }\n  .icn--nav-toggle:before {\n    width: 25px;\n    height: 3px;\n    background: #999da1;\n    top: 4px; }\n.icn--close {\n  background-image: url(\"img/icn-close.svg\");\n  background-repeat: no-repeat;\n  width: 20px;\n  height: 20px;\n  display: block;\n  position: absolute;\n  right: 4%;\n  top: 4%; }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-displayed-mobile {\n    display: block; }\n    .is-hidden-mobile {\n      display: none; } }\n@media (min-width: 769px) {\n  .is-displayed-mobile {\n    display: none; } }\n\n@media (min-width: 1px) and (max-width: 768px) {\n  .is-collapsed-mobile {\n    visibility: collapse;\n    padding: 0;\n    height: 0;\n    margin: 0;\n    line-height: 0; } }\n\n.theme__poly .grid__col--12 {\n  background-color: #DEF4E5; }\n\n.theme__poly .grid__col--8 {\n  background-color: #DCE0F2; }\n\n.theme__poly .grid__col--7 {\n  background-color: #DCF0EF; }\n\n.theme__poly .grid__col--6 {\n  background-color: #FFE3DB; }\n\n.theme__poly .grid__col--4 {\n  background-color: #F8EDD0; }\n\n.theme__poly .grid__col--5 {\n  background-color: #EAEBEC; }\n\n.theme__poly .grid__col--2 {\n  background-color: #C5E2CE; }\n\n.theme__poly .grid__col--3 {\n  background-color: #D6EEF5; }\n\n/*# sourceMappingURL=application.css.map */\n\n/* Tabs */\n.tabs input[type=radio] {\n  display: none;\n}\n.tabs {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n}\n.tabs li {\n  float: left;\n}\n.tabs label {\n  display: inline-block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.tabs label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.tab-content {\n  z-index: 2;\n  display: none;\n  left: 0;\n  width: 100%;\n  padding: 1em 0.4em;\n  position: absolute;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=tab]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=tab]:checked ~ [id^=tab-content] {\n  display: block;\n}\n\n/* Accordion */\n.accordion input[type=radio] {\n  display: none;\n}\n.accordion {\n  float: none;\n  list-style: none;\n  position: relative;\n  padding: 0;\n  margin-top: 1.25em;\n}\n.accordion label {\n  display: block;\n  margin: 0 0.625em 2em 0.625em;\n  cursor: pointer;\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid transparent;\n}\n.accordion label:hover {\n  color: #0B0B0B;\n  border-color: #52BAB3;\n}\n.acc-content {\n  z-index: 2;\n  display: none;\n  width: 100%;\n  padding: 1em 0.4em;\n  box-sizing: border-box;\n  background: #fff;\n}\n[id^=acc]:checked + label {\n  font-weight: 300;\n  text-align: center;\n  font-size: 1.125em;\n  display: block;\n  padding: 0.4em;\n  border-bottom: 1px solid #52BAB3;\n}\n[id^=acc]:checked ~ [id^=acc-content] {\n  display: block;\n}\n.grid {\n  text-align: left;\n}\n");
          jsEditor.setValue("// Toggle Menu for Phones\n$(\"#toggle\").click(function() {\n  $(this).next(\".nav\").toggleClass(\"is-collapsed-mobile\");\n});\n\n// Handles Navigation Style Classes\n$(\".nav__item\").on(\"click\", function() {\n  $(this).parent().find(\"li\").removeClass(\"nav__item--current\").addClass(\"nav__item\");\n  $(this).addClass(\"nav__item--current\").removeClass(\"nav__item\");\n});");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        $("[data-action=simpleslideshow]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Simplest jQuery Slideshow");
          htmlEditor.setValue("<div class=\"fadelinks\">\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2610/4148988872_990b6da667.jpg\">\n  </a>\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2597/4121218611_040cd7b3f2.jpg\">\n  </a>\n  <a>\n    <img src=\"http://farm3.static.flickr.com/2531/4121218751_ac8bf49d5d.jpg\">\n  </a>\n</div>\n");
          cssEditor.setValue("body {\n  font-family: arial, helvetica, sans-serif;\n  font-size: 12px;\n}\n\n.fadelinks {\n  position: relative;\n  height: 332px;\n  width: 500px;\n}\n\n.fadelinks > a {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n}");
          jsEditor.setValue("$(document).ready(function(){\n  $('.fadelinks > :gt(0)').hide();\n  setInterval(function() {\n    $('.fadelinks > :first-child').fadeOut().next().fadeIn().end().appendTo('.fadelinks');\n  }, 3000);\n});");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
        $("[data-action=splitter]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("JQWidgets Splitter");
          htmlEditor.setValue("<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/scripts/jquery-1.11.1.min.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/jqxcore.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/jqxsplitter.js\"></script>\n<script src=\"http://www.jqwidgets.com/jquery-widgets-demo/scripts/demos.js\"></script>\n\n<div id=\"mainSplitter\">\n  <div>\n    <div id=\"firstNested\">\n      <div>\n        <div id=\"secondNested\">\n          <div>\n            <span>Panel 1</span></div>\n          <div>\n            <span>Panel 2</span></div>\n        </div>\n      </div>\n      <div>\n        <span>Panel 3</span></div>\n    </div>\n  </div>\n  <div>\n    <div id=\"thirdNested\">\n      <div>\n        <span>Panel 4</span></div>\n      <div>\n        <span>Panel 5</span></div>\n    </div>\n  </div>\n</div>\n");
          cssEditor.setValue("@import url(\"http://www.jqwidgets.com/jquery-widgets-demo/jqwidgets/styles/jqx.base.css\");");
          jsEditor.setValue("$(document).ready(function () {\n  $(\"#mainSplitter\").jqxSplitter({\n    width: 850,\n    height: 850,\n    orientation: \"horizontal\",\n    panels: [{\n      size: 300,\n      collapsible: false\n    }]\n  });\n  $(\"#firstNested\").jqxSplitter({\n    width: \"100%\",\n    height: \"100%\",\n    orientation: \"vertical\",\n    panels: [{\n      size: 300,\n      collapsible: false\n    }]\n  });\n  $(\"#secondNested\").jqxSplitter({\n    width: \"100%\", \n    height: \"100%\", \n    orientation: \"horizontal\",\n    panels: [{ size: 150 }]\n  });\n  $(\"#thirdNested\").jqxSplitter({\n    width: \"100%\",\n    height: \"100%\", \n    orientation: \"horizontal\",\n    panels: [{\n      size: 150,\n      collapsible: false\n    }]\n  });\n});\n");
          $(".open-demos, #jquery").trigger("click");
        });
        $("[data-action=whiteboard]").on("click", function() {
          $("#applynewproject").empty().append( "<script>" + "$('[data-action=delfile]').trigger('click'); $('.check').attr('checked', false).trigger('change'); htmlEditor.setValue(''); cssEditor.setValue(''); jsEditor.setValue('');" + "<" + "/script>" );
          $(".vprojectname").val("Canvas Drawing Board");
          htmlEditor.setValue("<canvas id=\"myCanvas\">\n  Sorry, your browser does not support HTML5 canvas technology.\n</canvas>");
          cssEditor.setValue("body, html {\n  height: 100%;\n  margin: 0;\n}\n\n#myCanvas {\n  cursor: crosshair;\n  position: fixed;\n}\n");
          jsEditor.setValue("var myCanvas = document.getElementById(\"myCanvas\");\nvar ctx = myCanvas.getContext(\"2d\");\n\n// Fill Window Width and Height\nmyCanvas.width = window.innerWidth;\nmyCanvas.height = window.innerHeight;\n\n// Set Background Color\nctx.fillStyle=\"#fff\";\nctx.fillRect(0,0,myCanvas.width,myCanvas.height);\n\n// Mouse Event Handlers\nif(myCanvas){\n  var isDown = false;\n  var canvasX, canvasY;\n  ctx.lineWidth = 5;\n  \n  $(myCanvas)\n  .mousedown(function(e){\n    isDown = true;\n    ctx.beginPath();\n    canvasX = e.pageX - myCanvas.offsetLeft;\n    canvasY = e.pageY - myCanvas.offsetTop;\n    ctx.moveTo(canvasX, canvasY);\n  })\n  .mousemove(function(e){\n    if(isDown !== false) {\n      canvasX = e.pageX - myCanvas.offsetLeft;\n      canvasY = e.pageY - myCanvas.offsetTop;\n      ctx.lineTo(canvasX, canvasY);\n      ctx.strokeStyle = \"#000\";\n      ctx.stroke();\n    }\n  })\n  .mouseup(function(e){\n    isDown = false;\n    ctx.closePath();\n  });\n}\n\n// Touch Events Handlers\ndraw = {\nstarted: false,\n start: function(evt) {\n   \n   ctx.beginPath();\n   ctx.moveTo(\n   evt.touches[0].pageX,\n    evt.touches[0].pageY\n   );\n   \n   this.started = true;\n   \n },\n move: function(evt) {\n   \n   if (this.started) {\n     ctx.lineTo(\n     evt.touches[0].pageX,\n      evt.touches[0].pageY\n     );\n     \n     ctx.strokeStyle = \"#000\";\n     ctx.lineWidth = 5;\n     ctx.stroke();\n   }\n   \n },\n end: function(evt) {\n   this.started = false;\n }\n};\n\n// Touch Events\nmyCanvas.addEventListener(\"touchstart\", draw.start, false);\nmyCanvas.addEventListener(\"touchend\", draw.end, false);\nmyCanvas.addEventListener(\"touchmove\", draw.move, false);\n\n// Disable Page Move\ndocument.body.addEventListener(\"touchmove\",function(evt){\n  evt.preventDefault();\n},false);\n");
          $(".open-demos, #normalize, #jquery").trigger("click");
        });
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
        } else if ( $(this).hasClass("otherfile") ) {
          if ( $(".other-selected").is(":visible") ) {
            $(".other-selected").removeClass("other-selected");
            $(".other-editor > div").addClass("hide");
            $("#" + $(this).parent().attr("class") ).removeClass("hide");
          }
          $(this).addClass("other-selected");
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
        } else if ( $(this).prev().hasClass("otherfile") ) {
          if ( $(this).prev().hasClass("other-selected") ) {
            if ( !$(".req-other").hasClass("other-selected") ) {
              $(".req-other").trigger("click");
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
    $(".addvfile").click(function(event) {
      var count = Date.now();
      var $val = $(".vfilename").val();
      var myjs = ".js";
      var findJS = myjs.substr(myjs.length - 3); // => ".js"
      var mycss = ".css";
      var findCSS = mycss.substr(mycss.length - 4); // => ".css"
      // var htmlfile = '<a class="htmlfile" data-action="htmlfile' + count + '">'+ $val.toLowerCase() +'</a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
      var cssfile = '<a class="cssfile" data-action="cssfile' + count + '">'+ $val.toLowerCase() +'</a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
      var jsfile = '<a class="jsfile" data-action="jsfile' + count + '">'+ $val.toLowerCase() +'</a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
      var otherfile = '<a class="otherfile" data-action="otherfile' + count + '">'+ $val.toLowerCase() +'</a> <a class="fr" data-action="delfile"><i class="fa fa-times"></i></a>';
      
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

      var coffeeCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-coffeescript",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var hamlCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-haml",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var jadeCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-jade",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var jsonCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "application/json",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  lint : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var livescriptCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-livescript",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var markdownCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-markdown",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var perlCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-perl",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var phpCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "application/x-httpd-php",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var pythonCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-python",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var rubyCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-ruby",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var sassCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "text/x-sass",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var xmlCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  mode: "application/xml",  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true,  lineWrapping: true,  autoCloseTags: true,  foldGutter: true,  dragDrop : true,  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]}); var inlet = Inlet(otherEditor'+ count +'); otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      
      var otherCodemirror = 'var otherEditor'+ count +' = CodeMirror(document.getElementById("otherfile'+ count +'"), {  tabMode: "indent",  styleActiveLine: true,  lineNumbers: true, dragDrop : true, gutters: ["CodeMirror-linenumbers"]}); var inlet = Inlet(otherEditor'+ count +');  otherEditor'+ count +'.on("drop", function() { otherEditor'+ count +'.setValue(""); }); ';
      var otherActiveEditor = '$("#otherfile'+ count +'").on("mouseup touchend", function() { if ( $(this).attr("id") === "otherfile'+ count +'" ) { $(".activeEditor").val("otherfile'+ count +'"); } });';
      // var jsActiveEditor = "<textarea class='calleditor hide'>if ( $(this).attr('id') === 'jsfile"+ count +"' ) { $('.activeEditor').val('jsfile"+ count +"'); }</textarea>";
      var otherJSZip = "<textarea class='jszipcode hide'>zip.file('"+ $val.toLowerCase() +"', otherEditor"+ count +".getValue()); </textarea>";
      
      if ($val.toLowerCase().substring($val.length - 5) === ".html") {
        // $(".html-editor").append( '<li id="htmlfile'+ count + '" class="htmlfile' + count + '"></li>' );
        // $(".vfiles").append( '<li class="htmlfile' + count + '">'+ htmlfile +'<script>' + htmlCodemirror + '<' + '/script></li>' );
        // alertify("NOTE: The live preview only applies to index.html");
      } else if ($val.toLowerCase().substring($val.length - 4) === ".css") {
        $(".css-editor").append( '<div id="cssfile'+ count + '" class="cssfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="cssfile' + count + '">'+ cssfile +'<script>var activeEditor = $(".activeEditor"); ' + cssCodemirror + cssActiveEditor + '<' + '/script>'+ cssUndo + cssRedo + cssUpdate + cssJSZipHREF + cssJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 3) === ".js") {
        $(".js-editor").append( '<div id="jsfile'+ count + '" class="jsfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="jsfile' + count + '">'+ jsfile + '<script>var activeEditor = $(".activeEditor"); ' + jsCodemirror + jsActiveEditor + '<' + '/script>'+ jsUndo + jsRedo + jsUpdate + jsJSZipHREF + jsJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 7) === ".coffee") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + coffeeCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 5) === ".haml") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + hamlCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 5) === ".jade") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + jsonCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 5) === ".json") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + jsonCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 3) === ".ls") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + livescriptCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 3) === ".md") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + markdownCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 3) === ".pl") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + perlCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 4) === ".php") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + phpCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 3) === ".py") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + pythonCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 3) === ".rb") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + rubyCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 5) === ".sass") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + sassCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else if ($val.toLowerCase().substring($val.length - 4) === ".xml") {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + xmlCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
      } else {
        $(".other-editor").append( '<div id="otherfile'+ count + '" class="otherfile' + count + '"></div>' );
        $(".vfiles").append( '<li class="otherfile' + count + '">'+ otherfile + '<script>var activeEditor = $(".activeEditor"); ' + otherCodemirror + otherActiveEditor + '<' + '/script>' + otherJSZip + '</li>' );
        alertify.error("Added file not detected!<br />Editor may encounter problems!");
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
      } else {
        var othereditor = $(".other-editor").html();
        if (TogetherJS.running) {
          TogetherJS.send({
            type: "new-other",
            output: othereditor
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
    TogetherJS.hub.on("new-other", function (msg) {
      if (! msg.sameUrl) {
        return;
      }
      $(".other-editor").html(msg.output);
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
  
  // Initiate Demos
  appDemos();
  
  // Initiate Teamwork
  $("[data-action=teamwork]").click(function() {
    TogetherJS(this); 
    alertify.log("This is an experimental feature, and is still very buggy. <br><br> <strong>Use at your own risk!</strong>");
    return false;
  });
  
  // Get Keycode/Which
  $("[data-action=outputkeycode]").on("keyup", function(e) {
    $(this).val(e.which);
  }).on("click", function() {
    $(this).select();
  });
  
  // New project Dialog
  newProject();
  
  // Save to browser
  $("[data-action=save]").click(function() {
    alertify.error("Not yet available...");
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
  
  responsiveMagic();
});
