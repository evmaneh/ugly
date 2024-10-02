function getSite(url) {
  document.getElementById("loading").style.display = "flex";
  setTimeout(function () {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }
    const encodedValue = btoa(url);
    window.location.href = "/web/_" + encodedValue + "_/";
    document.getElementById("loading").remove();
  }, 2000);
}

function autosearch(url) {
  document.getElementById("urlInput").value = url;
  getSite(url);
}

function saveBookmark() {
  var url = document.getElementById("urlInput").value;
  var link = document.createElement("a");
  link.href = "#";
  link.onclick = function () {
    getSite(url);
  };
  link.innerText = url;
  var removeButton = document.createElement("button");
  removeButton.innerHTML = '<i class="far fa-times-circle"></i>';
  removeButton.onclick = function () {
    this.parentElement.remove();
    updateCookie();
  };
  var bookmarksList = document.createElement("li");
  bookmarksList.appendChild(link);
  bookmarksList.appendChild(removeButton);
  document.getElementById("customBookmarksList").appendChild(bookmarksList);
  updateCookie();
}

function updateCookie() {
  var bookmarks = [];
  var customBookmarks = document.querySelectorAll("#customBookmarksList li a");
  customBookmarks.forEach(function (bookmark) {
    bookmarks.push(bookmark.innerText);
  });
  var expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 100);
  var bookmarksJSON = JSON.stringify(bookmarks);
  document.cookie =
    "bookmarks=" +
    bookmarksJSON +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function loadBookmarksFromCookie() {
  var bookmarks = getCookie("bookmarks");
  if (bookmarks) {
    bookmarks = JSON.parse(bookmarks);
    bookmarks.forEach(function (bookmark) {
      var link = document.createElement("a");
      link.href = "#";
      link.onclick = function () {
        getSite(bookmark);
      };
      link.innerText = bookmark;
      var removeButton = document.createElement("button");
      removeButton.innerHTML = '<i class="far fa-times-circle"></i>';
      removeButton.onclick = function () {
        this.parentElement.remove();
        updateCookie();
      };
      var bookmarksList = document.createElement("li");
      bookmarksList.appendChild(link);
      bookmarksList.appendChild(removeButton);
      document.getElementById("customBookmarksList").appendChild(bookmarksList);
    });
  }
}

loadBookmarksFromCookie();

document.querySelector("#urlInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getSite(this.value);
  }
});

function openNewSession() {
  var currentURL = window.location.href;
  var domain = currentURL.split("/")[2];
  var desiredPart = domain.split(".")[0];

  window.open("https://" + desiredPart + ".fc-us-0.pitcher.csb.app/", "_blank");
}
