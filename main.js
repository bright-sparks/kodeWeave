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
var siteTitle = CodeMirror(document.querySelector("#siteTitle"), {
  mode: "text/html"
});
var closeHTML = CodeMirror(document.querySelector("#closeHTML"), {
  mode: "text/html",
  value: "</title>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=9\" />\n"
});
var closeFinal = CodeMirror(document.querySelector("#closeFinal"), {
  mode: "text/html",
  value: "\n  </body>\n</html>"
});
var yourRefs = CodeMirror(document.querySelector("#libraries"), {
  mode: "text/html"
});
var closeRefs = CodeMirror(document.querySelector("#closeRefs"), {
  mode: "text/html",
  value: "  </head>\n  <body>\n"
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
