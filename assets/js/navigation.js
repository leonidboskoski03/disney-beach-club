(function () {
  function isEditableElement(element) {
    if (!element) return false;

    const tagName = element.tagName;
    return (
      element.isContentEditable ||
      tagName === "INPUT" ||
      tagName === "TEXTAREA" ||
      tagName === "SELECT"
    );
  }

  function getHomePath() {
    const inPagesFolder = window.location.pathname.includes("/pages/");
    return inPagesFolder ? "../index.html" : "index.html";
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented || isEditableElement(event.target)) {
      return;
    }

    event.preventDefault();

    if (window.location.pathname.includes("/pages/")) {
      window.location.href = getHomePath();
    }
  });
})();
