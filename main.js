var widgets = [];
function updateJSHints() {
  jsEditor.operation(function(){
    for (var i = 0; i < widgets.length; ++i)
      jsEditor.removeLineWidget(widgets[i]);
    widgets.length = 0;

    JSHINT(jsEditor.getValue());
    for (var i = 0; i < JSHINT.errors.length; ++i) {
      var err = JSHINT.errors[i];
      if (!err) continue;
      var msg = document.createElement("div");
      var icon = msg.appendChild(document.createElement("span"));
      icon.innerHTML = "!!";
      icon.className = "lint-error-icon";
      msg.appendChild(document.createTextNode(err.reason));
      msg.className = "lint-error";
      widgets.push(jsEditor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
    }
  });
  var info = jsEditor.getScrollInfo();
  var after = jsEditor.charCoords({line: jsEditor.getCursor().line + 1, ch: 0}, "local").top;
  if (info.top + info.clientHeight < after)
    jsEditor.scrollTo(null, after - info.clientHeight + 3);
}
function updateCSSHints() {
  cssEditor.operation(function(){
    for (var i = 0; i < widgets.length; ++i){
      cssEditor.removeLineWidget(widgets[i]);
    }

    widgets.length = 0;

    var result = CSSLint.verify(cssEditor.getValue());

    for (var i = 0; i < result.messages.length; ++i) {
      var err = result.messages[i];
      if (!err) continue;
      var msg = document.createElement("div");
      var icon = msg.appendChild(document.createElement("span"));
      icon.innerHTML = "!!";
      icon.className = "lint-error-icon";
      //***** HERE *****
      msg.appendChild(document.createTextNode(err.message));
      msg.className = "lint-error";
      widgets.push(cssEditor.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
    }
  });// end of cssEditor.operation
}// end of updateCSSHints
// Handles CodeMirror Preview Delay
var delay;
var cssWaiting;
var jsWaiting;

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
// Initialize Open and Close for HTML editor
var openFinal = CodeMirror(document.querySelector(".openFinal"), {
  mode: "text/html",
  value: "<!DOCTYPE html>\n<html>\n  <head>\n    <title>site name</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n  </head>\n  <body>\n"
});
var closeFinal = CodeMirror(document.querySelector(".closeFinal"), {
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
cssEditor.on("change", function() {
  clearTimeout(delay);
  clearTimeout(cssWaiting);
  delay = setTimeout(updatePreview, 300);
  cssWaiting = setTimeout(updateCSSHints, 300);
});
jsEditor.on("change", function() {
  clearTimeout(delay);
  clearTimeout(jsWaiting);
  delay = setTimeout(updatePreview, 300);
  jsWaiting = setTimeout(updateJSHints, 300);
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

function updatePreview() {
  var previewFrame = document.getElementById("preview");
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
  preview.open();
  preview.write('<style type="text/css">' + cssEditor.getValue() + '</style>'); 
  preview.write(openFinal.getValue() + htmlEditor.getValue() + closeFinal.getValue());
  preview.write('<scr' + 'ipt type="text/javascript">' + jsEditor.getValue() + '</scr' + 'ipt>');
  preview.close();
}
setTimeout(updatePreview, 300);
setTimeout(updateCSSHints, 300);
setTimeout(updateJSHints, 300);
