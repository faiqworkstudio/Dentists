(() => {
  document.documentElement.classList.remove("no-js");

  // Clinic hours in Bangkok time. Closing time (20:00, open daily) is from the
  // clinic's door signage; TODO: confirm the opening hour with the clinic.
  const HOURS = { open: 10, close: 20 };

  const TH = document.documentElement.lang === "th";
  const say = (en, th) => (TH ? th : en);

  /* ---------- Sticky nav ---------- */
  const nav = document.querySelector("[data-nav]");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector("[data-nav-toggle]");
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  nav.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  document.addEventListener("click", (e) => !nav.contains(e.target) && setOpen(false));

  /* ---------- Open / closed pill (Asia/Bangkok) ---------- */
  const status = document.querySelector("[data-open-status]");
  const dot = document.querySelector(".pill__dot");
  if (status) try {
    const hour = Number(
      new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Bangkok" }).format(new Date())
    );
    if (hour >= HOURS.open && hour < HOURS.close) {
      status.textContent = say("Open now · until 8 PM", "เปิดอยู่ · ถึง 20:00 น.");
    } else {
      status.textContent = hour < HOURS.open
        ? say("Opens later today", "เปิดวันนี้ · ยังไม่ถึงเวลาเปิด")
        : say("Closed now · open tomorrow", "ปิดแล้ว · เปิดอีกครั้งพรุ่งนี้");
      dot.classList.add("is-closed");
    }
  } catch (_) {
    /* keep the static text */
  }

  /* ---------- Scroll reveals with stagger ---------- */
  const items = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains("reveal-on-scroll"));
          entry.target.style.setProperty("--stagger", `${siblings.indexOf(entry.target) * 80}ms`);
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Booking form ---------- */
  const form = document.querySelector("[data-book-form]");
  const note = document.querySelector("[data-form-note]");
  if (form) {
    form.elements.date.min = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok" }).format(new Date());

    // Preselect the treatment chosen in the home page "What brings you in?" links
    const wanted = new URLSearchParams(location.search).get("service");
    const option = wanted && form.querySelector(`option[data-key="${CSS.escape(wanted)}"]`);
    if (option) option.selected = true;

    form.addEventListener("input", (e) => {
      if (e.target.classList.contains("is-invalid") && e.target.value) e.target.classList.remove("is-invalid");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const required = [...form.querySelectorAll("[required]")];
      const missing = required.filter((el) => !el.value.trim());
      required.forEach((el) => el.classList.toggle("is-invalid", missing.includes(el)));

      if (missing.length) {
        note.classList.remove("is-success");
        note.textContent = say("Please add your name, phone number and a preferred date.", "กรุณากรอกชื่อ เบอร์โทรศัพท์ และวันที่สะดวก");
        missing[0].focus();
        return;
      }

      const data = new FormData(form);
      const [y, m, d] = data.get("date").split("-").map(Number);
      const when = new Date(y, m - 1, d).toLocaleDateString(say("en-GB", "th-TH"), { weekday: "long", day: "numeric", month: "long" });
      const name = data.get("name").trim();
      note.classList.add("is-success");
      note.innerHTML = "";
      note.append(
        say(
          `Thank you, ${name}. Your request: ${data.get("service")} on ${when} (${data.get("time").toLowerCase()}). `,
          `ขอบคุณค่ะ คุณ${name} คำขอของคุณ: ${data.get("service")} ${when} (ช่วง${data.get("time")}) `
        )
      );
      const call = document.createElement("a");
      call.href = "tel:+66641965596";
      call.textContent = say("Call 064 196 5596", "โทร 064 196 5596");
      note.append(call, say(" to confirm your time.", " เพื่อยืนยันเวลานัด"));
      // TODO: send the request to the clinic (LINE OA, email or a form backend).
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
})();
