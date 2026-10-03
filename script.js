(() => {
  document.documentElement.classList.remove("no-js");

  // Clinic hours in Bangkok time. Closing time (20:00, open daily) is from the
  // clinic's door signage; TODO: confirm the opening hour with the clinic.
  const HOURS = { open: 10, close: 20 };

  const TH = document.documentElement.lang === "th";
  const say = (en, th) => (TH ? th : en);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: solid after scrolling, tucks away going down, returns going up ---------- */
  const nav = document.querySelector("[data-nav]");
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 12);
    if (y > 480 && y > lastY + 6 && !nav.classList.contains("is-open")) nav.classList.add("is-hidden");
    else if (y < lastY - 6 || y <= 480) nav.classList.remove("is-hidden");
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Smooth wheel scrolling (mouse/trackpad on desktop) ---------- */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    let target = window.scrollY;
    let current = window.scrollY;
    let running = false;
    const maxY = () => document.documentElement.scrollHeight - window.innerHeight;
    const step = () => {
      current += (target - current) * 0.11;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        running = false;
      }
      window.scrollTo({ top: current, behavior: "instant" });
      if (running) requestAnimationFrame(step);
    };
    window.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        if (e.target.closest && e.target.closest("iframe, select, textarea, [data-native-scroll]")) return;
        e.preventDefault();
        if (!running) target = current = window.scrollY;
        const delta = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
        target = Math.max(0, Math.min(maxY(), target + delta));
        if (!running) {
          running = true;
          requestAnimationFrame(step);
        }
      },
      { passive: false }
    );
    // Keyboard, scrollbar and anchor jumps: keep the smoother in sync
    window.addEventListener("scroll", () => { if (!running) target = current = window.scrollY; }, { passive: true });
  }

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

  /* ---------- Count-up numbers ---------- */
  const countUp = (el) => {
    const end = parseFloat(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1400);
      el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Scroll reveals: text fades up, photos wipe open, journey line draws ---------- */
  const revealables = document.querySelectorAll(".reveal-on-scroll, .img-reveal, .journey, [data-count]");
  const reveal = (el) => {
    el.classList.add("is-in");
    if (el.dataset.count && !reduceMotion) countUp(el);
  };
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains("reveal-on-scroll")) {
            const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal-on-scroll"));
            el.style.setProperty("--stagger", `${Math.min(siblings.indexOf(el), 6) * 90}ms`);
          }
          reveal(el);
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Gentle parallax on large photos ---------- */
  const parallax = [...document.querySelectorAll("[data-parallax]")];
  if (parallax.length && !reduceMotion) {
    let queued = false;
    const update = () => {
      queued = false;
      const vh = window.innerHeight;
      parallax.forEach((img) => {
        const box = img.parentElement.getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) return;
        const limit = box.height * 0.05; // stays inside the 1.12x zoom, so edges never show
        const raw = (box.top + box.height / 2 - vh / 2) * parseFloat(img.dataset.parallax);
        const offset = Math.max(-limit, Math.min(limit, raw));
        img.style.setProperty("--py", `${offset.toFixed(1)}px`);
      });
    };
    window.addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Photo carousels: buttons + drag with the mouse ---------- */
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel__track");
    const stepBy = () => (track.querySelector(".slide")?.offsetWidth || 320) + 16;
    carousel.querySelector("[data-prev]").addEventListener("click", () => track.scrollBy({ left: -stepBy(), behavior: "smooth" }));
    carousel.querySelector("[data-next]").addEventListener("click", () => track.scrollBy({ left: stepBy(), behavior: "smooth" }));
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add("is-dragging");
    });
    window.addEventListener("pointermove", (e) => { if (dragging) track.scrollLeft = startLeft - (e.clientX - startX); });
    window.addEventListener("pointerup", () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("is-dragging");
    });
  });

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
