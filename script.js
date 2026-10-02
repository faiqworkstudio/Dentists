(() => {
  const root = document.documentElement;
  root.classList.remove("no-js");

  // Clinic hours in Bangkok time. Closing time is from the Google listing;
  // TODO: confirm opening time and any closed days with the clinic.
  const HOURS = { open: 10, close: 20 };

  /* ---------- Sticky nav shadow ---------- */
  const nav = document.querySelector("[data-nav]");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Open / closed badge (Asia/Bangkok) ---------- */
  const status = document.querySelector("[data-open-status]");
  const dot = document.querySelector(".eyebrow .dot");
  try {
    const hour = Number(
      new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Bangkok" }).format(new Date())
    );
    if (hour >= HOURS.open && hour < HOURS.close) {
      status.textContent = "Open now · until 8 PM";
    } else {
      status.textContent = hour < HOURS.open ? "Opens later today" : "Closed now · open tomorrow";
      dot.classList.add("is-closed");
    }
  } catch (_) {
    /* keep the static fallback text */
  }

  /* ---------- Scroll reveals with stagger ---------- */
  const items = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains("reveal-on-scroll"));
          entry.target.style.setProperty("--stagger", `${siblings.indexOf(entry.target) * 90}ms`);
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Booking form → live ticket ---------- */
  const form = document.querySelector("[data-book-form]");
  const pass = document.querySelector("[data-pass]");
  const note = document.querySelector("[data-form-note]");
  const out = {
    name: pass.querySelector("[data-pass-name]"),
    service: pass.querySelector("[data-pass-service]"),
    date: pass.querySelector("[data-pass-date]"),
    time: pass.querySelector("[data-pass-time]"),
  };

  const dateInput = form.elements.date;
  const todayISO = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok" }).format(new Date());
  dateInput.min = todayISO;

  const fmtDate = (value) => {
    if (!value) return "—";
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  };

  const render = () => {
    const data = new FormData(form);
    out.name.textContent = data.get("name").trim() || "Your name";
    out.service.textContent = data.get("service");
    out.date.textContent = fmtDate(data.get("date"));
    out.time.textContent = data.get("time");
    pass.classList.remove("is-bump");
    void pass.offsetWidth; // restart animation
    pass.classList.add("is-bump");
  };

  form.addEventListener("input", (e) => {
    if (e.target.classList.contains("is-invalid") && e.target.value) e.target.classList.remove("is-invalid");
    pass.classList.remove("is-stamped");
    render();
  });
  form.addEventListener("change", render);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = [...form.querySelectorAll("[required]")];
    const missing = required.filter((el) => !el.value.trim());
    required.forEach((el) => el.classList.toggle("is-invalid", missing.includes(el)));

    if (missing.length) {
      note.classList.remove("is-success");
      note.textContent = "Just need your name, phone and a preferred date.";
      missing[0].focus();
      return;
    }

    render();
    pass.classList.add("is-stamped");
    note.classList.add("is-success");
    note.innerHTML = 'Ticket printed. To lock in your seat, call <a href="tel:+66641965596">064&nbsp;196&nbsp;5596</a> and mention your preferred time.';
    // TODO: send this request to the clinic (LINE OA, email or a form backend).
  });

  render();
  pass.classList.remove("is-bump");

  /* ---------- Footer year ---------- */
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
})();
