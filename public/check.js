window.onload = function () {
  var userAgent = navigator.userAgent;
  var os = navigator.platform;
  if (!(os === "Linux x86_64" && userAgent.includes("Chrome/121.0.0.0"))) {
    window.location.href = "404.html";
  }
};
