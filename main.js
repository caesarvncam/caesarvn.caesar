function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

function toggleFaqItem(item) {
  const open = item.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach((it) => {
    it.classList.remove("active");
    const icon = it.querySelector(".faq-question strong");
    if (icon) icon.textContent = "+";
  });

  if (!open) {
    item.classList.add("active");
    const icon = item.querySelector(".faq-question strong");
    if (icon) icon.textContent = "−";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Nút dùng data-scroll
  document.querySelectorAll("[data-scroll]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = el.getAttribute("data-scroll");
      if (!target || !target.startsWith("#")) return;
      const id = target.slice(1);
      const section = document.getElementById(id);
      if (!section) return;
      e.preventDefault();
      smoothScrollToId(id);
    });
  });

  // Anchor href="#..."
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const id = href.slice(1);
      if (!id) return;
      const section = document.getElementById(id);
      if (!section) return;
      e.preventDefault();
      smoothScrollToId(id);
    });
  });

  // FAQ toggle
  document.querySelectorAll(".faq-question").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      if (!item) return;
      toggleFaqItem(item);
    });
  });

  // Tooltip cho phần TÍNH NĂNG: click/giữ để mở trên mobile
  const featureCards = document.querySelectorAll(".feature-card");

  if (featureCards.length) {
    featureCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = card.classList.contains("feature-open");
        featureCards.forEach((c) => c.classList.remove("feature-open"));
        if (!isOpen) {
          card.classList.add("feature-open");
        }
      });
    });

    document.addEventListener("click", () => {
      featureCards.forEach((c) => c.classList.remove("feature-open"));
    });
  }

  // DEMO VIDEO LOCAL
  const demoOverlay = document.querySelector(".demo-video-overlay");
  const demoVideo = document.getElementById("demoVideo");

  if (demoOverlay && demoVideo) {
    demoOverlay.addEventListener("click", () => {
      try {
        // bật controls khi bắt đầu xem
        demoVideo.setAttribute("controls", "controls");
        demoVideo.play();
      } catch (e) {
        // ignore
      }
      demoOverlay.classList.add("playing");
    });

    // nếu người dùng bấm trực tiếp lên video khi overlay đã ẩn
    demoVideo.addEventListener("click", () => {
      if (demoVideo.paused) {
        demoVideo.play();
      }
    });
  }

  // DOWNLOAD MODAL
  const downloadButtons = document.querySelectorAll(".download-btn");
  const downloadModal = document.getElementById("downloadModal");
  const downloadConfirm = document.querySelector(".download-confirm-btn");
  const downloadClose = document.querySelector(".download-modal-close");

  const DRIVE_URL =
    "https://t.me/caesar_files";

  if (downloadModal && downloadButtons.length) {
    const openModal = (e) => {
      e.preventDefault();
      downloadModal.classList.add("is-open");
      downloadModal.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
      downloadModal.classList.remove("is-open");
      downloadModal.setAttribute("aria-hidden", "true");
    };

    downloadButtons.forEach((btn) => {
      btn.addEventListener("click", openModal);
    });

    if (downloadConfirm) {
      downloadConfirm.addEventListener("click", () => {
        closeModal();
        window.open(DRIVE_URL, "_blank");
      });
    }

    if (downloadClose) {
      downloadClose.addEventListener("click", closeModal);
    }

    // click ra ngoài để đóng
    downloadModal.addEventListener("click", (e) => {
      if (e.target === downloadModal) {
        closeModal();
      }
    });

    // ESC để đóng
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && downloadModal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

});
