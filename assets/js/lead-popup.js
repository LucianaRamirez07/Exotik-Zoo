(function () {
  var SHOWN_KEY = 'exotikzoo_lead_popup_shown';
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdaqwerg';

  if (sessionStorage.getItem(SHOWN_KEY)) return;

  function marcarMostrado() {
    sessionStorage.setItem(SHOWN_KEY, '1');
  }

  function crearPopup() {
    var overlay = document.createElement('div');
    overlay.id = 'lead-overlay';
    overlay.className = 'fixed inset-0 bg-black/50 z-[90] flex items-center justify-center px-4 opacity-0 transition-opacity duration-300';

    var modal = document.createElement('div');
    modal.id = 'lead-modal';
    modal.className = 'bg-surface rounded-lg shadow-2xl max-w-md w-full p-8 relative scale-95 transition-transform duration-300';
    modal.innerHTML =
      '<button id="lead-close" class="absolute top-4 right-4 text-on-surface-variant hover:text-primary" aria-label="Cerrar"><span class="material-symbols-outlined">close</span></button>' +
      '<div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"><span class="material-symbols-outlined text-primary" style="font-size:24px">eco</span></div>' +
      '<h2 class="font-headline-md text-headline-md text-on-surface mb-2" style="font-size:28px">Recomendaciones para tu mascota</h2>' +
      '<p class="font-body-sm text-body-sm text-on-surface-variant mb-6">Dejanos tu correo y qué mascota tienes, y te enviamos consejos y ofertas pensadas para ella.</p>' +
      '<form id="lead-form" class="flex flex-col gap-3">' +
        '<input type="email" name="Correo" id="lead-email" required placeholder="Tu correo electrónico" class="w-full px-4 py-3 rounded-lg border border-outline-variant/50 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40">' +
        '<input type="tel" name="Teléfono" id="lead-telefono" required placeholder="Tu número de teléfono" class="w-full px-4 py-3 rounded-lg border border-outline-variant/50 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40">' +
        '<input type="text" name="Mascota" id="lead-mascota" required placeholder="¿Qué mascota tienes? (ej. periquito, hámster...)" class="w-full px-4 py-3 rounded-lg border border-outline-variant/50 bg-surface-container-lowest font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40">' +
        '<p id="lead-error" class="hidden font-body-sm text-body-sm text-secondary">Hubo un problema al enviar. Intenta de nuevo.</p>' +
        '<button type="submit" id="lead-submit" class="mt-1 flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-body-lg text-body-lg hover:bg-primary-container transition-colors"><span class="material-symbols-outlined">mail</span>Quiero recibirlas</button>' +
      '</form>' +
      '<div id="lead-success" class="hidden text-center py-6">' +
        '<span class="material-symbols-outlined text-primary" style="font-size:40px">check_circle</span>' +
        '<p class="font-body-lg text-body-lg text-on-surface font-semibold mt-3">¡Listo! Ya quedaste registrado.</p>' +
        '<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">Pronto te enviaremos recomendaciones para tu mascota.</p>' +
      '</div>' +
      '<button id="lead-skip" class="w-full text-center mt-3 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">Ahora no</button>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
      overlay.classList.remove('opacity-0');
      modal.classList.remove('scale-95');
    });

    function cerrar() {
      overlay.classList.add('opacity-0');
      modal.classList.add('scale-95');
      setTimeout(function () { overlay.remove(); }, 300);
      marcarMostrado();
    }

    overlay.addEventListener('click', function (e) { if (e.target === overlay) cerrar(); });
    document.getElementById('lead-close').addEventListener('click', cerrar);
    document.getElementById('lead-skip').addEventListener('click', cerrar);

    document.getElementById('lead-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.target;
      var submitBtn = document.getElementById('lead-submit');
      var errorMsg = document.getElementById('lead-error');
      errorMsg.classList.add('hidden');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (res.ok) {
          form.classList.add('hidden');
          document.getElementById('lead-success').classList.remove('hidden');
          marcarMostrado();
          setTimeout(cerrar, 2500);
        } else {
          throw new Error('submit-failed');
        }
      }).catch(function () {
        errorMsg.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-symbols-outlined">mail</span>Quiero recibirlas';
      });
    });
  }

  window.addEventListener('load', function () {
    setTimeout(crearPopup, 1500);
  });
})();
