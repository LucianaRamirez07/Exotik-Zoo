(function () {
  var STORAGE_KEY = 'exotikzoo_carrito';
  var WHATSAPP_NUMBER = '573332248448';

  function getCarrito() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }

  function guardarCarrito(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    actualizarContador();
    renderCarrito();
  }

  function agregarProducto(producto) {
    var items = getCarrito();
    var existente = items.filter(function (i) { return i.id === producto.id; })[0];
    if (existente) { existente.cantidad += 1; }
    else { producto.cantidad = 1; items.push(producto); }
    guardarCarrito(items);
    abrirCarrito();
  }

  function quitarProducto(id) {
    guardarCarrito(getCarrito().filter(function (i) { return i.id !== id; }));
  }

  function actualizarContador() {
    var items = getCarrito();
    var total = items.reduce(function (sum, i) { return sum + i.cantidad; }, 0);
    document.querySelectorAll('#cart-count').forEach(function (el) {
      el.textContent = total;
      el.classList.toggle('hidden', total === 0);
    });
  }

  function crearDrawer() {
    if (document.getElementById('cart-drawer')) return;

    var overlay = document.createElement('div');
    overlay.id = 'cart-overlay';
    overlay.className = 'fixed inset-0 bg-black/40 z-[60] hidden';

    var drawer = document.createElement('aside');
    drawer.id = 'cart-drawer';
    drawer.className = 'fixed top-0 right-0 h-full w-full sm:w-[420px] bg-surface z-[70] translate-x-full transition-transform duration-300 shadow-2xl flex flex-col';
    drawer.innerHTML =
      '<div class="flex items-center justify-between px-6 py-5 border-b border-outline-variant/40">' +
        '<h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-2" style="font-size:24px"><span class="material-symbols-outlined text-primary">shopping_bag</span>Tu bolsa</h2>' +
        '<button id="cart-close" class="text-on-surface-variant hover:text-primary" aria-label="Cerrar bolsa"><span class="material-symbols-outlined">close</span></button>' +
      '</div>' +
      '<div id="cart-items" class="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3"></div>' +
      '<div class="border-t border-outline-variant/40 px-6 py-5">' +
        '<a id="cart-whatsapp" href="#" target="_blank" class="flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-4 rounded-lg font-body-lg text-body-lg hover:bg-primary-container transition-colors w-full opacity-50 pointer-events-none">' +
          '<span class="material-symbols-outlined">chat</span>Pedir por WhatsApp' +
        '</a>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    overlay.addEventListener('click', cerrarCarrito);
    document.getElementById('cart-close').addEventListener('click', cerrarCarrito);
  }

  function abrirCarrito() {
    document.getElementById('cart-overlay').classList.remove('hidden');
    requestAnimationFrame(function () {
      document.getElementById('cart-drawer').classList.remove('translate-x-full');
    });
  }

  function cerrarCarrito() {
    document.getElementById('cart-drawer').classList.add('translate-x-full');
    setTimeout(function () { document.getElementById('cart-overlay').classList.add('hidden'); }, 300);
  }

  function renderCarrito() {
    var cont = document.getElementById('cart-items');
    if (!cont) return;
    var items = getCarrito();

    if (items.length === 0) {
      cont.innerHTML = '<p class="font-body-sm text-body-sm text-on-surface-variant text-center py-10">Tu bolsa está vacía.</p>';
    } else {
      cont.innerHTML = items.map(function (item) {
        return '<div class="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3">' +
          '<div class="w-16 h-16 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-outline-variant/20"><img src="' + item.imagen + '" alt="' + item.nombre + '" class="w-full h-full object-contain"></div>' +
          '<div class="flex-1 min-w-0">' +
            '<p class="font-body-sm text-body-sm font-semibold text-on-surface truncate">' + item.nombre + '</p>' +
            '<p class="font-body-sm text-body-sm text-on-surface-variant">Cantidad: ' + item.cantidad + '</p>' +
          '</div>' +
          '<button data-quitar="' + item.id + '" class="text-on-surface-variant hover:text-secondary flex-shrink-0" aria-label="Quitar de la bolsa"><span class="material-symbols-outlined" style="font-size:20px">delete</span></button>' +
        '</div>';
      }).join('');
      cont.querySelectorAll('[data-quitar]').forEach(function (btn) {
        btn.addEventListener('click', function () { quitarProducto(btn.getAttribute('data-quitar')); });
      });
    }

    var wa = document.getElementById('cart-whatsapp');
    if (wa) {
      if (items.length === 0) {
        wa.classList.add('opacity-50', 'pointer-events-none');
      } else {
        wa.classList.remove('opacity-50', 'pointer-events-none');
        var mensaje = 'Hola, quiero pedir:\n' + items.map(function (i) {
          return '- ' + i.nombre + ' (x' + i.cantidad + ')';
        }).join('\n');
        wa.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(mensaje);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    crearDrawer();
    renderCarrito();
    actualizarContador();

    document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        agregarProducto({
          id: btn.getAttribute('data-id'),
          nombre: btn.getAttribute('data-nombre'),
          imagen: btn.getAttribute('data-imagen')
        });
      });
    });

    document.querySelectorAll('#cart-btn').forEach(function (btn) {
      btn.addEventListener('click', abrirCarrito);
    });
  });
})();
