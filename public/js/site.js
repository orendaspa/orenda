/* Orenda Spa — shared behaviour for every page:
   mobile menu, privacy/terms pop-ups, today's opening hours, booking form, contact form. */

(function () {
  'use strict';

  // ---- Mobile menu ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---- Privacy policy / Terms of service pop-ups ----
  // The text lives here so it only has to be edited in one place.
  var POLICIES = {
    privacy: { title: 'Privacy Policy', html: "<p>At Orenda Spa, your privacy is very important to us. Any personal information you provide as part of booking an appointment will only be used for service provision and communication related to your booking. We do not share your details with third parties except as required by law. All online data is transmitted securely. By booking you agree to our use of your data as outlined here. You may request to view, edit, or permanently delete your data at any time by contacting us.</p> <div> <h3>1. What Information We Collect</h3> <ul> <li><strong>Personal Details:</strong> Name, contact info, birthdate (for age verification), and payment details.</li> <li><strong>Health/Preferences:</strong> Skin concerns, allergies, or service notes (so we can keep you safe and pampered).</li> <li><strong>Automated Data:</strong> Website usage via cookies (like how long you stared at our CBD massage page).</li> </ul> </div> <div> <h3>2. How We Use Your Info</h3> <ul> <li><strong>To Spa Like a Boss:</strong> Book appointments, customize treatments, and send confirmations.</li> <li><strong>For Legal &amp; Safety Reasons:</strong> Comply with Maryland licensing laws or process insurance claims.</li> <li><strong>Marketing (Only with Consent!):</strong> Occasional emails about new services or promos (opt-out anytime).</li> </ul> </div> <div> <h3>3. Who We Share With</h3> <ul> <li><strong>Never Sold:</strong> We don't trade your data for mani-pedis or crypto.</li> <li><strong>Trusted Partners:</strong> Payment processors or software providers (they're legally bound to protect you).</li> <li><strong>If Required by Law:</strong> Like a court order (we'll object unless totally necessary).</li> </ul> </div> <div> <h3>4. Your Rights</h3> <ul> <li><strong>Access/Update:</strong> Email <a href=\"mailto:orendaspa2025@gmail.com\">orendaspa2025@gmail.com</a> to correct your preferences (e.g., \"Stop calling me 'Dry Skin Sally'\").</li> <li><strong>Delete Data:</strong> Request removal unless legally required to keep it.</li> <li><strong>Opt-Out:</strong> Unsubscribe from emails via the link in every message.</li> </ul> </div> <div> <h3>5. Security Measures</h3> <ul> <li>We use encryption (fancy tech armor) and limit staff access to your data.</li> <li>No Wi-Fi is 100% hacker-proof—so we don't store sensitive info like full credit card numbers.</li> </ul> </div> <div> <h3>6. Policy Updates</h3> <ul> <li>Changes will be posted here (we'll pinky-swear not to sneak anything shady).</li> </ul> </div>" },
    terms: { title: 'Terms of Service', html: "<p> By booking with Orenda Spa, you agree to our policies regarding appointments, cancellations, and payments. Please arrive on time for your session. Late arrivals may result in shortened treatment time. Cancellations should be made at least 24 hours in advance. Failure to do so may result in a cancellation fee. Our staff is committed to providing you with a safe, clean, and relaxing environment. Please notify us of any health conditions or concerns before your treatment. </p> <div> <h3>1. Spa Etiquette (AKA Don't Be That Person)</h3> <ul> <li><strong>Late Arrivals:</strong> Arriving more than 15 minutes late means your service may be shortened (we love you, but our next client does too).</li> <li><strong>Cancellations:</strong> Please give at least 24 hours' notice or a 50% fee applies (emergencies? Just talk to us—we're human).</li> <li><strong>No-Shows:</strong> Will be charged the full price (we'll cry while depositing your payment).</li> </ul> </div> <div> <h3>2. Health &amp; Safety</h3> <ul> <li><strong>Patch Tests:</strong> Required for certain treatments (unless you <em>want</em> to audition for a lobster role).</li> <li><strong>Medical Conditions:</strong> Please disclose allergies, pregnancy, or anything else we should know—we're estheticians, not psychics.</li> <li><strong>Illness:</strong> If you have a fever or cold, please reschedule (we'll reward you with extra hand-holding next time).</li> </ul> </div> <div> <h3>3. Payments &amp; Refunds</h3> <ul> <li><strong>Cards on File:</strong> Required for all bookings (no, we don't accept IOUs or TikTok fame).</li> <li><strong>Gift Cards:</strong> No refunds, but they never expire (unlike your ex's apologies).</li> <li><strong>Service Issues:</strong> Tell us within 48 hours for a fix—silent suffering isn't a loyalty program.</li> </ul> </div> <div> <h3>4. Liability</h3> <ul> <li><strong>Skin Reactions:</strong> Rare, but possible—we'll do everything to prevent them (but you can't sue us over that one blackhead).</li> <li><strong>Lost Items:</strong> We can't be responsible for left-behind earrings or emotional baggage.</li> </ul> </div> <div> <h3>5. Intellectual Property</h3> <ul> <li>Our spa name, logo, and secret serum blends are &copy; Orenda Spa (but feel free to tag us in your selfies!).</li> </ul> </div> <div> <h3>6. Changes to Terms</h3> <ul> <li>Any updates will be posted here. By continuing to book, you're pinky-swearing you agree.</li> </ul> </div>" }
  };

  function openPolicy(key) {
    var policy = POLICIES[key];
    if (!policy) return;
    var dialog = document.getElementById('policy-' + key);
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'policy-' + key;
      dialog.className = 'policy';
      dialog.innerHTML =
        '<div class="policy-inner">' +
          '<div class="policy-head"><h2>' + policy.title + '</h2>' +
          '<button class="policy-close" type="button" aria-label="Close">&times;</button></div>' +
          '<div class="policy-body">' + policy.html + '</div>' +
          '<div class="policy-foot"><button class="btn btn-small" type="button">Acknowledge</button></div>' +
        '</div>';
      document.body.appendChild(dialog);
      dialog.addEventListener('click', function (e) {
        if (e.target === dialog || e.target.closest('button')) dialog.close();
      });
    }
    dialog.showModal();
  }

  document.querySelectorAll('[data-policy]').forEach(function (button) {
    button.addEventListener('click', function () { openPolicy(button.dataset.policy); });
  });

  // ---- Highlight today's row in the opening-hours table ----
  var today = String(new Date().getDay());
  document.querySelectorAll('.hours tr[data-day="' + today + '"]').forEach(function (row) {
    row.classList.add('is-today');
  });

  function setMessage(el, text, kind) {
    el.textContent = text;
    el.className = 'form-message' + (kind ? ' is-' + kind : '');
  }

  // ---- Booking form (booking.html) -> POST /api/bookings ----
  var bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    var dateInput = bookingForm.querySelector('[name="date"]');
    var now = new Date();
    dateInput.min = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

    bookingForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var submitBtn = document.getElementById('submit-btn');
      var msg = document.getElementById('booking-message');
      setMessage(msg, '');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Booking...';

      var time = bookingForm.querySelector('[name="time"]:checked');
      var therapist = bookingForm.querySelector('[name="therapist"]:checked');
      var data = {
        service: bookingForm.querySelector('[name="service"]').value,
        date: dateInput.value,
        time: time ? time.value : '',
        therapist: therapist ? therapist.value : '',
        name: bookingForm.querySelector('[name="client-name"]').value,
        email: bookingForm.querySelector('[name="client-email"]').value,
        phone: bookingForm.querySelector('[name="client-phone"]').value
      };

      try {
        var res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        var result = {};
        try { result = await res.json(); } catch (err) { /* no JSON body */ }
        if (res.ok) {
          setMessage(msg, 'Appointment booked. We will be in touch to confirm your time.', 'ok');
          bookingForm.reset();
        } else {
          setMessage(msg, 'Your booking was not sent. Please try again, or call (227) 268-3171.', 'error');
        }
      } catch (err) {
        setMessage(msg, 'No connection. Check your internet and try again, or call (227) 268-3171.', 'error');
      }
      submitBtn.disabled = false;
      submitBtn.textContent = 'Book appointment';
    });
  }

  // ---- Contact form (contact.html) -> POST /send ----
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var status = document.getElementById('contact-status');
      var button = document.getElementById('contact-submit');
      var fields = {
        name: document.getElementById('contact-name'),
        email: document.getElementById('contact-email'),
        subject: document.getElementById('contact-subject'),
        message: document.getElementById('contact-message')
      };
      var name = fields.name.value.trim();
      var email = fields.email.value.trim();
      var subject = fields.subject.value.trim();
      var message = fields.message.value.trim();

      if (!name) { setMessage(status, 'Please enter your name.', 'error'); fields.name.focus(); return; }
      if (!email) { setMessage(status, 'Please enter your email.', 'error'); fields.email.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMessage(status, 'Please enter a valid email address.', 'error'); fields.email.focus(); return; }
      if (!subject) { setMessage(status, 'Please enter the subject.', 'error'); fields.subject.focus(); return; }

      button.disabled = true;
      button.textContent = 'Sending...';
      try {
        var res = await fetch('/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
        });
        var data = await res.json();
        if (data.success) {
          setMessage(status, 'Message sent. We will reply by email.', 'ok');
          contactForm.reset();
        } else {
          setMessage(status, 'Your message was not sent. Please try again, or email orendaspa2025@gmail.com.', 'error');
        }
      } catch (err) {
        setMessage(status, 'Your message was not sent. Please try again, or email orendaspa2025@gmail.com.', 'error');
      }
      button.disabled = false;
      button.textContent = 'Send message';
    });
  }
})();
