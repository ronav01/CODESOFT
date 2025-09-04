

// downlod resume 
const downlodBtn = document.querySelectorAll("#downlodBtn")
downlodBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "ronav_resume.pdf";
    link.download = "Ronav-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// downlod resume for resume section 
const downlodBtn1 = document.querySelector("#downlodBtn1");
downlodBtn1.addEventListener("click", () => {
  const a = document.createElement("a");
  a.location.href = window.open("ronav_resume.pdf", "_blank");
  a.downlodBtn = "Ronav-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
});




// Basic validation + mailto fallback + local storage store (null-safe)
(function () {
  // Grab elements (may be null if missing in HTML)
  const form = document.getElementById('contactForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const subjectEl = document.getElementById('subject'); // optional
  const messageEl = document.getElementById('message');
  const phoneEl = document.getElementById('phone');   // optional
  const statusEl = document.getElementById('status');

  // Helper: safely set error text if the target exists
  function setError(id, text) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`[contact] Missing error holder: #${id}`);
      return;
    }
    el.textContent = text || '';
  }

  function setStatus(htmlOrText, asHtml = true) {
    if (!statusEl) {
      console.warn('[contact] Missing #status element');
      return;
    }
    if (asHtml) statusEl.innerHTML = htmlOrText || '';
    else statusEl.textContent = htmlOrText || '';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (!form) {
    console.warn('[contact] Missing #contactForm — submit handler not attached.');
    return; // nothing more we can do
  }
  if (!nameEl || !emailEl || !messageEl) {
    console.warn('[contact] One or more required inputs (#name, #email, #message) are missing.');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // clear previous errors/status
    setError('err-name', '');
    setError('err-email', '');
    setError('err-message', '');
    setStatus('', false);

    let valid = true;

    const name = (nameEl?.value || '').trim();
    const email = (emailEl?.value || '').trim();
    const subject = (subjectEl?.value || '').trim();
    const message = (messageEl?.value || '').trim();
    const phone = (phoneEl?.value || '').trim();

    if (name.length < 2) {
      setError('err-name', 'Please enter your name (2+ characters).');
      valid = false;
    }
    if (!validateEmail(email)) {
      setError('err-email', 'Please enter a valid email.');
      valid = false;
    }
    if (message.length < 10) {
      setError('err-message', 'Please write a message (10+ characters).');
      valid = false;
    }

    if (!valid) return;

    // Save to localStorage (best-effort)
    try {
      const key = 'contactMessages';
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      stored.push({
        name, email, phone, subject, message,
        date: new Date().toISOString()
      });
      localStorage.setItem(key, JSON.stringify(stored));
    } catch (err) {
      console.warn('[contact] localStorage failed:', err);
    }

    // Prepare mailto
    const to = 'yourname@example.com'; // <- apna email daalo
    const fallbackSubject = subject || `Contact from website: ${name}`;
    const bodyPlain =
      `Name: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\n\nMessage:\n${message}`;

    const mailSub = encodeURIComponent(fallbackSubject);
    const mailBody = encodeURIComponent(bodyPlain);
    const mailto = `mailto:${to}?subject=${mailSub}&body=${mailBody}`;

    // Indicate success to user
    setStatus('<span class="success">Message ready — opening email client...</span>', true);

    // Open mail client and reset
    setTimeout(() => {
      window.location.href = mailto;
      form.reset();
      setTimeout(() => setStatus('', false), 3500);
    }, 450);
  });

  // Clear button (optional)
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      form.reset();
      setError('err-name', '');
      setError('err-email', '');
      setError('err-message', '');
      setStatus('', false);
    });
  } else {
    // Not critical, just a heads-up
    console.warn('[contact] Optional #clearBtn not found.');
  }
})();


// upperCase nav-link
let navLink = document.querySelectorAll(".nav-link");
navLink.forEach(link => {
  link.style.textTransform = "uppercase";
});

