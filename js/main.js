// The mobile menu is a native popover (<nav popover>), opened by its button
// without any JavaScript. This only closes it once a section link is chosen.
(() => {
  const menu = document.getElementById("mobile-menu");
  if (!menu || typeof menu.hidePopover !== "function") return;

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) menu.hidePopover();
  });
})();

// Project screenshots are cropped in the grid; clicking one opens it whole in a
// <dialog>, which brings the top layer, Escape and focus trapping for free.
(() => {
  const dialog = document.getElementById("lightbox");
  const triggers = document.querySelectorAll("[data-lightbox]");
  if (!dialog || typeof dialog.showModal !== "function" || !triggers.length) return;

  const full = dialog.querySelector(".lightbox__img");
  const close = dialog.querySelector(".lightbox__close");

  // Widest candidate of a srcset, i.e. the full-size file the build generated.
  const widest = (srcset) =>
    (srcset ?? "")
      .split(",")
      .map((candidate) => candidate.trim().split(/\s+/))
      .filter(([url, width]) => url && /^\d+w$/.test(width ?? ""))
      .sort((a, b) => parseInt(a[1], 10) - parseInt(b[1], 10))
      .at(-1)?.[0];

  // The build wraps each <img> in a <picture>: a WebP <source> plus a JPEG/PNG
  // srcset on the <img> itself. Prefer WebP (~40% lighter at full size), fall
  // back to the <img> srcset, then to plain src on the unbuilt source files.
  const largestSource = (img) => {
    const webp = img.parentElement?.querySelector?.('source[type="image/webp"]');
    const supportsWebp = !webp || img.currentSrc.endsWith(".webp");

    return (
      (supportsWebp ? widest(webp?.getAttribute("srcset")) : null) ??
      widest(img.getAttribute("srcset")) ??
      img.currentSrc ??
      img.src
    );
  };

  for (const trigger of triggers) {
    trigger.addEventListener("click", () => {
      const img = trigger.querySelector("img");
      if (!img) return;

      full.src = largestSource(img);
      full.alt = img.alt;
      dialog.showModal();
    });
  }

  close.addEventListener("click", () => dialog.close());

  // The dialog fills the viewport, so a click lands on the backdrop only when
  // it misses the image and the close button.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  // Dropping the source frees the decoded image and avoids a flash of the
  // previous screenshot the next time the dialog opens.
  dialog.addEventListener("close", () => {
    full.removeAttribute("src");
    full.alt = "";
  });
})();
