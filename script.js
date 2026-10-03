(() => {
  const header = document.querySelector("#site-header");
  const menuToggle = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#site-nav");
  const storeDialog = document.querySelector("#store-dialog");
  const checkoutButton = document.querySelector("#paypal-checkout-button");
  const storeStatus = document.querySelector("#store-status");
  const toast = document.querySelector("#toast");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setMenu = (open) => {
    menuToggle.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    menuToggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
  };

  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealElements = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealElements.forEach((element) => observer.observe(element));
  }

  const openStore = () => {
    setMenu(false);
    if (typeof storeDialog.showModal === "function") {
      storeDialog.showModal();
    } else {
      storeDialog.setAttribute("open", "");
    }
  };

  const closeStore = () => {
    if (typeof storeDialog.close === "function") {
      storeDialog.close();
    } else {
      storeDialog.removeAttribute("open");
    }
  };

  document.querySelectorAll("[data-open-store]").forEach((button) => {
    button.addEventListener("click", openStore);
  });

  document.querySelectorAll("[data-close-store]").forEach((button) => {
    button.addEventListener("click", closeStore);
  });

  storeDialog.addEventListener("click", (event) => {
    const bounds = storeDialog.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (outside) closeStore();
  });

  const storeConfig = window.RODNEY_STORE || {};
  const paypalPaymentLink = String(storeConfig.paypalPaymentLink || "").trim();
  const isPayPalLinkReady = /^https:\/\/(www\.)?paypal\.com\/paypalme\//i.test(paypalPaymentLink);

  if (!isPayPalLinkReady) {
    checkoutButton.classList.add("is-pending");
    checkoutButton.setAttribute("aria-disabled", "true");
    storeStatus.textContent = "PayPal preorder payment is being connected. Please check back shortly.";
  }

  checkoutButton.addEventListener("click", () => {
    if (!isPayPalLinkReady) {
      storeStatus.textContent = "PayPal preorder payment is being connected. Please check back shortly.";
      showToast("PayPal payment is not live yet.");
      return;
    }

    checkoutButton.disabled = true;
    checkoutButton.textContent = "Opening PayPal…";
    window.location.assign(paypalPaymentLink);
  });

  let toastTimer;
  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3000);
  };

  const sharePage = async () => {
    const shareData = {
      title: "From Surviving to Living: Globetown to Greatness",
      text: "Discover Rodney ‘Alamo’ Brown’s powerful new memoir.",
      url: window.location.href.split("#")[0]
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        showToast("Book page link copied.");
      } else {
        window.prompt("Copy this book page link:", shareData.url);
      }
    } catch (error) {
      if (error && error.name !== "AbortError") {
        showToast("The share option is unavailable. Please copy the address from your browser.");
      }
    }
  };

  document.querySelector("#share-button").addEventListener("click", sharePage);
  document.querySelector("#dialog-share-button").addEventListener("click", sharePage);
  document.querySelector("#podcast-share-button")?.addEventListener("click", sharePage);
  document.querySelector("#year").textContent = new Date().getFullYear();

})();
