// The mobile menu is a native popover (<nav popover>), opened by its button
// without any JavaScript. This only closes it once a section link is chosen.
(() => {
  const menu = document.getElementById("mobile-menu");
  if (!menu || typeof menu.hidePopover !== "function") return;

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) menu.hidePopover();
  });
})();
