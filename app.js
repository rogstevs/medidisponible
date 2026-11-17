/**
 * ==============================================================================
 * MEDIDISPONIBLE - LÓGICA PRINCIPAL DE LA APLICACIÓN (LANDING PAGE)
 * ==============================================================================
 * Plataforma: MediDisponible - Consulta de Medicamentos y Puntos de Dispensación
 * Descripción: Control integral de la interfaz interactiva, navegación fluida,
 *              motor de búsqueda y filtrado en tiempo real, geolocalización en mapa
 *              interactivo (Leaflet), renderizado de tabla, acordeón de preguntas
 *              frecuentes y gestión accesible de modales.
 * ==============================================================================
 */

(function () {
  'use strict';

  /* ============================================================================
   * 1. BASE DE DATOS Y CONSTANTES (MOCK DATA)
   * ============================================================================ */

  /**
   * Colección de puntos de dispensación y farmacias georreferenciadas.
   * Basada en el mockup de diseño y flujos de usuario de Figma.
   * @type {Array<Object>}
   */
  const PHARMACIES_DATA = [
    {
      id: 1,
      name: "Farmacia #1 - Kennedy Central",
      city: "BOG",
      status: "Cancelled",
      statusText: "Agotado",
      code: "394221D9-004",
      medication: "Losartán",
      presentation: "50 mg",
      availableUnits: 0,
      address: "Cra 81 # 46 - 13",
      neighborhood: "Kennedy Central",
      lat: 4.6242,
      lng: -74.1545,
      phone: "(601) 745-1200",
      hours: "Lunes a Sábado: 7:00 AM - 8:00 PM",
      image: "assets/pharmacy-store.jpg"
    },
    {
      id: 2,
      name: "Farmacia #2 - Marsella",
      city: "BOG",
      status: "Disponible",
      statusText: "Disponible ✓",
      code: "394221D9-003",
      medication: "Losartán",
      presentation: "50 mg",
      availableUnits: 2,
      address: "Av 85 # 12 - 40",
      neighborhood: "Marsella",
      lat: 4.6395,
      lng: -74.1360,
      phone: "(601) 745-1201",
      hours: "Lunes a Domingo: 24 Horas",
      image: "assets/pharmacy-store.jpg"
    },
    {
      id: 3,
      name: "Farmacia #3 - Castilla",
      city: "BOG",
      status: "Disponible",
      statusText: "Disponible ✓",
      code: "394221D9-002",
      medication: "Losartán",
      presentation: "50 mg",
      availableUnits: 5,
      address: "Cll 25 # 40 - 50",
      neighborhood: "Castilla",
      lat: 4.6480,
      lng: -74.1480,
      phone: "(601) 745-1202",
      hours: "Lunes a Sábado: 8:00 AM - 7:00 PM",
      image: "assets/pharmacy-store.jpg"
    },
    {
      id: 4,
      name: "Farmacia #4 - Timiza",
      city: "BOG",
      status: "Disponible",
      statusText: "Disponible ✓",
      code: "394221D9-001",
      medication: "Losartán",
      presentation: "50 mg",
      availableUnits: 3,
      address: "Av 38 # 37 - 72",
      neighborhood: "Timiza / Kennedy",
      lat: 4.6180,
      lng: -74.1450,
      phone: "(601) 745-1203",
      hours: "Lunes a Domingo: 7:00 AM - 9:00 PM",
      image: "assets/pharmacy-store.jpg"
    },
    {
      id: 5,
      name: "Farmacia #5 - Tintal Plaza",
      city: "BOG",
      status: "Disponible",
      statusText: "Disponible ✓",
      code: "394221D9-005",
      medication: "Losartán",
      presentation: "50 mg",
      availableUnits: 8,
      address: "Av. Ciudad de Cali # 6c - 09",
      neighborhood: "Tintal Plaza",
      lat: 4.6465,
      lng: -74.1680,
      phone: "(601) 745-1204",
      hours: "Lunes a Domingo: 8:00 AM - 10:00 PM",
      image: "assets/pharmacy-store.jpg"
    },
    {
      id: 6,
      name: "Farmacia #6 - Plaza Américas",
      city: "BOG",
      status: "Disponible",
      statusText: "Disponible ✓",
      code: "394221D9-006",
      medication: "Losartán",
      presentation: "50 mg",
      availableUnits: 4,
      address: "Transversal 71D # 26 - 94 Sur",
      neighborhood: "Plaza de las Américas",
      lat: 4.6210,
      lng: -74.1350,
      phone: "(601) 745-1205",
      hours: "Lunes a Domingo: 9:00 AM - 9:00 PM",
      image: "assets/pharmacy-store.jpg"
    }
  ];

  /**
   * Catálogo de Preguntas Frecuentes (FAQ) con contenidos detallados.
   * @type {Array<Object>}
   */
  const FAQ_DATA = [
    {
      id: 1,
      title: "¿Qué es MediDisponible?",
      shortDesc: "Es una plataforma que facilita la consulta de posibles puntos de dispensación de medicamentos formulados.",
      fullDesc: `MediDisponible es una iniciativa tecnológica que busca facilitar el acceso a la información sobre la disponibilidad de medicamentos formulados en diferentes puntos de dispensación.\n\nNuestra propuesta nace de una situación frecuente: muchas personas deben desplazarse hasta un punto de entrega de medicamentos sin saber si el producto que necesitan se encuentra disponible. Esto puede generar pérdida de tiempo, gastos de transporte y desplazamientos innecesarios.\n\nA través de MediDisponible, los usuarios podrán ingresar el nombre de su medicamento, seleccionar su presentación o concentración y consultar los posibles puntos de dispensación donde podrían encontrarlo, junto con información que les permita identificar su ubicación.\n\nNuestro propósito es hacer que este proceso sea más sencillo, práctico y accesible, ayudando a las personas a tomar decisiones informadas antes de salir de casa.`,
      image: "assets/faq-1.jpg"
    },
    {
      id: 2,
      title: "¿Necesito registrarme para consultar?",
      shortDesc: "No. Puedes realizar búsquedas inmediatas y gratuitas sin necesidad de crear una cuenta.",
      fullDesc: `No es necesario registrarse ni crear una cuenta para consultar la disponibilidad de tus medicamentos en MediDisponible.\n\nNuestra herramienta está diseñada para ser de acceso rápido, público e inmediato para cualquier ciudadano. Simplemente ingresas el nombre del medicamento, filtras por presentación y ciudad, y accedes al mapa o lista de dispensación al instante.`,
      image: "assets/faq-2.jpg"
    },
    {
      id: 3,
      title: "¿La disponibilidad está garantizada?",
      shortDesc: "No. La información es orientativa y debe confirmarse telefónicamente con el punto de dispensación.",
      fullDesc: `La información de disponibilidad provista por MediDisponible es referencial y orientativa según los reportes periódicos de inventario de las redes de farmacias y gestores farmacéuticos.\n\nDebido a la alta rotación de inventarios en puntos de entrega, te recomendamos siempre verificar telefónicamente o a través de los canales de tu dispensador antes de desplazarte físicamente.`,
      image: "assets/faq-3.jpg"
    },
    {
      id: 4,
      title: "¿Qué hago si no encuentro mi medicamento?",
      shortDesc: "Verifica los datos ingresados o consulta directamente con tu EPS o gestor farmacéutico asignado.",
      fullDesc: `Si tu medicamento no aparece disponible en los puntos consultados:\n\n1. Verifica que el nombre genérico y la concentración coincidan exactamente con tu fórmula médica.\n2. Amplía el radio de búsqueda seleccionando zonas o localidades aledañas.\n3. Comunícate directamente con la línea de atención de tu EPS o gestor farmacéutico asignado (ej. Cruz Verde, Audifarma, Cafam, Eticos) para consultar fechas estimadas de reabastecimiento o solicitar entrega prioritaria a domicilio si aplica para tu caso.`,
      image: "assets/faq-4.jpg"
    }
  ];

  /* ============================================================================
   * 2. ESTADO GLOBAL DE LA APLICACIÓN (STATE MANAGEMENT)
   * ============================================================================ */

  /** @type {Array<Object>} Lista de resultados filtrados actualmente en memoria */
  let currentResults = [...PHARMACIES_DATA];

  /** @type {Object} Farmacia seleccionada para visualización de detalle y mapa */
  let selectedPharmacy = PHARMACIES_DATA[1] || PHARMACIES_DATA[0];

  /** @type {L.Map|null} Instancia del mapa Leaflet */
  let leafletMap = null;

  /** @type {Array<L.Marker>} Colección de marcadores activos en el mapa */
  let mapMarkers = [];

  /* ============================================================================
   * 3. INICIALIZACIÓN PRINCIPAL (DOM READY)
   * ============================================================================ */

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initQuickSearchChips();
    initSearchEngine();
    initMap();
    initResultsTable(currentResults);
    initFAQSection();
    initContactForm();
    initBackToTop();
    initAccessibilityHotkeys();

    // Actualiza la tarjeta de la farmacia inicial
    if (selectedPharmacy) {
      updatePharmacyDetailCard(selectedPharmacy);
    }
  });

  /* ============================================================================
   * 4. CONTROL DE NAVEGACIÓN Y SCROLL SPY (STICKY HEADER & SMOOTH SCROLL)
   * ============================================================================ */

  /**
   * Configura la barra de navegación sticky, el scrollspy para resaltar
   * el enlace activo según la sección visible y el menú móvil responsive.
   */
  function initNavigation() {
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Efecto de sombra al hacer scroll en la barra sticky
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    // Alternar apertura y cierre del menú móvil
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileMenu.classList.contains('hidden');
        if (isExpanded) {
          mobileMenu.classList.remove('hidden');
          hamburgerIcon?.classList.add('hidden');
          closeIcon?.classList.remove('hidden');
          mobileToggle.setAttribute('aria-expanded', 'true');
        } else {
          mobileMenu.classList.add('hidden');
          hamburgerIcon?.classList.remove('hidden');
          closeIcon?.classList.add('hidden');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Cerrar menú móvil al pulsar cualquier enlace
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          hamburgerIcon?.classList.remove('hidden');
          closeIcon?.classList.add('hidden');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // ScrollSpy mediante IntersectionObserver para resaltar enlace activo
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            updateActiveNavLink(currentId);
          }
        });
      }, observerOptions);

      sections.forEach(sec => observer.observe(sec));
    }
  }

  /**
   * Actualiza las clases visuales de los botones de navegación.
   * @param {string} sectionId - Identificador de la sección actualmente visible
   */
  function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('[data-nav-link]');
    navLinks.forEach(link => {
      const target = link.getAttribute('data-nav-link');
      if (target === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Asocia eventos a las etiquetas/chips de búsqueda rápida del Hero.
   */
  function initQuickSearchChips() {
    const chips = document.querySelectorAll('[data-quick-med]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const medName = chip.getAttribute('data-quick-med');
        const inputMed = document.getElementById('input-med-name');
        const homeInput = document.getElementById('home-search-input');
        
        if (inputMed) inputMed.value = medName;
        if (homeInput) homeInput.value = medName;
        
        performSearch();
        smoothScrollTo('#buscar');
      });
    });
  }

  /**
   * Desplazamiento suave programático hacia un ancla específico.
   * @param {string} selector - Selector CSS del elemento de destino
   */
  function smoothScrollTo(selector) {
    const targetEl = document.querySelector(selector);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ============================================================================
   * 5. MOTOR DE BÚSQUEDA Y FILTRADO EN TIEMPO REAL
   * ============================================================================ */

  /**
   * Inicializa los formularios y listeners del motor de búsqueda.
   */
  function initSearchEngine() {
    const searchForm = document.getElementById('search-form');
    const homeSearchInput = document.getElementById('home-search-input');
    const homeSearchBtn = document.getElementById('home-search-btn');
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    const viewToggleSelect = document.getElementById('view-toggle-select');

    // Buscador rápido ubicado en el Hero
    if (homeSearchBtn && homeSearchInput) {
      const triggerHomeSearch = () => {
        const query = homeSearchInput.value.trim();
        const mainInput = document.getElementById('input-med-name');
        if (mainInput) {
          mainInput.value = query || 'Losartán';
        }
        performSearch();
        smoothScrollTo('#buscar');
      };

      homeSearchBtn.addEventListener('click', triggerHomeSearch);
      homeSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          triggerHomeSearch();
        }
      });
    }

    // Formulario principal de búsqueda avanzada
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        performSearch();
      });
    }

    // Botón de restablecer filtros
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        const inputMed = document.getElementById('input-med-name');
        const inputPres = document.getElementById('input-presentation');
        const inputLoc = document.getElementById('input-location');
        const homeInput = document.getElementById('home-search-input');

        if (inputMed) inputMed.value = '';
        if (inputPres) inputPres.value = '';
        if (inputLoc) inputLoc.value = '';
        if (homeInput) homeInput.value = '';

        currentResults = [...PHARMACIES_DATA];
        initResultsTable(currentResults);
        updateMapMarkers(currentResults);
        updateResultsCountText(currentResults.length);
      });
    }

    // Selector de modo de visualización (Ambos, Solo Tabla, Solo Mapa)
    if (viewToggleSelect) {
      viewToggleSelect.addEventListener('change', (e) => {
        const mode = e.target.value;
        const tableView = document.getElementById('table-results-view');
        const mapView = document.getElementById('map-results-view');

        if (mode === 'map') {
          tableView?.classList.add('hidden');
          mapView?.classList.remove('hidden');
          if (leafletMap) leafletMap.invalidateSize();
        } else if (mode === 'table') {
          mapView?.classList.add('hidden');
          tableView?.classList.remove('hidden');
        } else {
          tableView?.classList.remove('hidden');
          mapView?.classList.remove('hidden');
          if (leafletMap) leafletMap.invalidateSize();
        }
      });
    }
  }

  /**
   * Ejecuta el filtrado de datos combinando medicamento, presentación y ubicación.
   */
  function performSearch() {
    const medName = (document.getElementById('input-med-name')?.value || '').trim().toLowerCase();
    const presentation = (document.getElementById('input-presentation')?.value || '').trim().toLowerCase();
    const location = (document.getElementById('input-location')?.value || '').trim().toLowerCase();

    currentResults = PHARMACIES_DATA.filter(item => {
      const matchMed = !medName || item.medication.toLowerCase().includes(medName);
      const matchPres = !presentation || item.presentation.toLowerCase().includes(presentation);
      const matchLoc = !location || 
        item.address.toLowerCase().includes(location) || 
        item.neighborhood.toLowerCase().includes(location) || 
        item.city.toLowerCase().includes(location);

      return matchMed && matchPres && matchLoc;
    });

    initResultsTable(currentResults);
    updateMapMarkers(currentResults);
    updateResultsCountText(currentResults.length);

    // Si hay resultados y la farmacia seleccionada ya no figura, selecciona la primera
    if (currentResults.length > 0) {
      const stillSelected = currentResults.find(p => p.id === selectedPharmacy?.id);
      if (!stillSelected) {
        selectPharmacy(currentResults[0]);
      }
    }
  }

  /**
   * Actualiza el indicador numérico de resultados encontrados.
   * @param {number} count - Cantidad de farmacias coincidentes
   */
  function updateResultsCountText(count) {
    const label = document.getElementById('results-count-text');
    if (!label) return;

    if (count === 0) {
      label.textContent = "No se encontraron farmacias con los filtros seleccionados.";
    } else if (count === 1) {
      label.textContent = "Se encontró 1 punto de dispensación disponible para tu consulta:";
    } else {
      label.textContent = `Se encontraron ${count} puntos de dispensación para tu consulta:`;
    }
  }

  /* ============================================================================
   * 6. RENDERIZADO DE TABLA Y SELECCIÓN DE FARMACIA
   * ============================================================================ */

  /**
   * Renderiza las filas de la tabla con los resultados filtrados.
   * @param {Array<Object>} results - Puntos de dispensación a desplegar
   */
  function initResultsTable(results) {
    const tbody = document.getElementById('results-tbody');
    if (!tbody) return;

    if (results.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-slate-500 bg-slate-50/50">
            <div class="max-w-md mx-auto space-y-2">
              <svg class="w-10 h-10 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <p class="font-bold text-slate-700">Sin coincidencias de inventario</p>
              <p class="text-xs text-slate-500">Intenta buscando "Losartán", "50 mg" o amplía la ubicación a "Bogotá" o "Kennedy".</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = results.map(item => {
      const isSelected = selectedPharmacy && selectedPharmacy.id === item.id;
      const isAvailable = item.status === 'Disponible';
      
      return `
        <tr class="pharmacy-table-row border-b border-slate-100 ${isSelected ? 'selected' : ''}" data-pharmacy-id="${item.id}">
          <td class="py-3.5 px-4 font-semibold text-slate-800">
            <div class="flex items-center gap-2">
              <span>${item.name}</span>
              <span class="text-[11px] text-slate-400 font-bold bg-slate-100 px-1.5 py-0.5 rounded">${item.city}</span>
              <span class="${isAvailable ? 'badge-available' : 'badge-cancelled'}">
                ${isAvailable ? 'Disponible &#10003;' : 'Agotado'}
              </span>
            </div>
          </td>
          <td class="py-3.5 px-4 text-xs font-mono text-slate-500">${item.code}</td>
          <td class="py-3.5 px-4 text-sm font-semibold text-slate-800">${item.medication}</td>
          <td class="py-3.5 px-4 text-sm text-slate-600">${item.presentation}</td>
          <td class="py-3.5 px-4 text-sm font-bold ${item.availableUnits > 0 ? 'text-sky-700' : 'text-slate-400'}">
            ${item.availableUnits} unds
          </td>
          <td class="py-3.5 px-4 text-sm text-slate-600">${item.address}</td>
        </tr>
      `;
    }).join('');

    // Asignar listeners de selección en cada fila
    tbody.querySelectorAll('.pharmacy-table-row').forEach(row => {
      row.addEventListener('click', () => {
        const id = parseInt(row.getAttribute('data-pharmacy-id'), 10);
        const pharmacy = PHARMACIES_DATA.find(x => x.id === id);
        if (pharmacy) {
          selectPharmacy(pharmacy);
        }
      });
    });
  }

  /**
   * Selecciona una farmacia activa, actualiza su tarjeta y centra el mapa.
   * @param {Object} pharmacy - Objeto de la farmacia a activar
   */
  function selectPharmacy(pharmacy) {
    selectedPharmacy = pharmacy;
    
    // Resalta visualmente la fila en la tabla
    document.querySelectorAll('.pharmacy-table-row').forEach(row => {
      const rowId = parseInt(row.getAttribute('data-pharmacy-id'), 10);
      if (rowId === pharmacy.id) {
        row.classList.add('selected');
      } else {
        row.classList.remove('selected');
      }
    });

    updatePharmacyDetailCard(pharmacy);

    // Centrado suave en el mapa Leaflet
    if (leafletMap && pharmacy.lat && pharmacy.lng) {
      leafletMap.flyTo([pharmacy.lat, pharmacy.lng], 15, { animate: true, duration: 0.8 });
    }
  }

  /**
   * Actualiza el contenido HTML de la tarjeta de detalle lateral.
   * @param {Object} p - Datos de la farmacia seleccionada
   */
  function updatePharmacyDetailCard(p) {
    const card = document.getElementById('selected-pharmacy-card');
    if (!card) return;

    const isAvailable = p.status === 'Disponible';
    const encodedAddress = encodeURIComponent(`${p.address}, ${p.neighborhood}, Bogotá`);

    card.innerHTML = `
      <div class="overflow-hidden rounded-t-2xl relative bg-slate-100">
        <img src="${p.image}" alt="${p.name}" class="w-full h-44 object-cover">
        <div class="absolute top-3 right-3">
          <span class="${isAvailable ? 'badge-available' : 'badge-cancelled'} shadow-md">
            ${isAvailable ? 'Disponible &#10003;' : 'Agotado'}
          </span>
        </div>
      </div>

      <div class="p-5 space-y-4">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-sky-600">Punto de Dispensación</span>
          <h3 class="text-lg font-extrabold text-slate-900 leading-tight mt-0.5">${p.name}</h3>
          <p class="text-xs text-slate-500 mt-0.5">${p.neighborhood} &bull; Código: <span class="font-mono">${p.code}</span></p>
        </div>

        <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs sm:text-sm">
          <div class="flex justify-between">
            <span class="text-slate-500 font-medium">Medicamento:</span>
            <span class="font-bold text-slate-900">${p.medication} (${p.presentation})</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500 font-medium">Stock estimado:</span>
            <span class="font-bold ${p.availableUnits > 0 ? 'text-sky-700' : 'text-red-500'}">${p.availableUnits} unidades</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500 font-medium">Dirección:</span>
            <span class="font-medium text-slate-800 text-right">${p.address}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500 font-medium">Horario:</span>
            <span class="text-slate-700 text-right text-[11px] sm:text-xs">${p.hours}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <button type="button" onclick="window.openPharmacyModal(${p.id})" class="w-full sm:flex-1 btn-primary py-2.5 px-4 text-xs font-semibold">
            Ver Ficha Completa
          </button>
          
          <a href="https://maps.google.com/?q=${encodedAddress}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto p-2.5 rounded-full border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 flex items-center justify-center transition" title="Abrir en Google Maps" aria-label="Abrir en Google Maps">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </div>
    `;
  }

  /* ============================================================================
   * 7. CONTROLADOR DEL MAPA INTERACTIVO (LEAFLET MAP)
   * ============================================================================ */

  /**
   * Inicializa la vista y capas del mapa geográfico Leaflet.
   */
  function initMap() {
    const mapContainer = document.getElementById('leaflet-map');
    if (!mapContainer || typeof L === 'undefined') return;

    // Coordenadas iniciales centradas en la localidad de Kennedy, Bogotá
    leafletMap = L.map('leaflet-map', {
      center: [4.628, -74.148],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false // Evita interferir con el scroll de la landing page
    });

    // Capa de teselas de OpenStreetMap estándar
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(leafletMap);

    // Permite activar zoom al hacer clic en el mapa
    leafletMap.on('focus', () => {
      leafletMap.scrollWheelZoom.enable();
    });
    leafletMap.on('blur', () => {
      leafletMap.scrollWheelZoom.disable();
    });

    updateMapMarkers(currentResults);
  }

  /**
   * Genera los pines y popups para las farmacias activas en el mapa.
   * @param {Array<Object>} pharmacies - Farmacias a mostrar
   */
  function updateMapMarkers(pharmacies) {
    if (!leafletMap || typeof L === 'undefined') return;

    // Limpia marcadores anteriores
    mapMarkers.forEach(m => leafletMap.removeLayer(m));
    mapMarkers = [];

    const customPinIcon = L.divIcon({
      className: 'custom-pin',
      iconSize: [30, 40],
      iconAnchor: [15, 40],
      popupAnchor: [0, -40]
    });

    pharmacies.forEach(p => {
      if (p.lat && p.lng) {
        const marker = L.marker([p.lat, p.lng], { icon: customPinIcon }).addTo(leafletMap);

        const isAvailable = p.status === 'Disponible';
        const popupContent = `
          <div class="space-y-1 font-sans text-xs">
            <strong class="text-sky-700 block text-sm">${p.name}</strong>
            <p class="text-slate-600">${p.address}</p>
            <p class="font-bold ${isAvailable ? 'text-emerald-600' : 'text-red-500'}">
              ${isAvailable ? `${p.availableUnits} unidades disponibles` : 'Sin existencias'}
            </p>
            <button onclick="window.selectPharmacyById(${p.id})" class="mt-2 text-[11px] font-bold text-sky-600 hover:underline block">
              Seleccionar este punto &rarr;
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on('click', () => {
          selectPharmacy(p);
        });

        mapMarkers.push(marker);
      }
    });

    // Ajuste de encuadre en el mapa si hay múltiples puntos
    if (pharmacies.length > 1) {
      const bounds = L.latLngBounds(pharmacies.map(p => [p.lat, p.lng]));
      leafletMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }

  // Método expuesto globalmente para ser invocado desde los popups HTML del mapa
  window.selectPharmacyById = function (id) {
    const pharmacy = PHARMACIES_DATA.find(p => p.id === id);
    if (pharmacy) {
      selectPharmacy(pharmacy);
      smoothScrollTo('#buscar');
    }
  };

  /* ============================================================================
   * 8. SECCIÓN DE PREGUNTAS FRECUENTES (FAQ & ACORDEÓN)
   * ============================================================================ */

  /**
   * Inicializa las tarjetas visuales de FAQ y el acordeón interactivo.
   */
  function initFAQSection() {
    renderFAQCards();
    renderFAQAccordion();
  }

  /**
   * Renderiza las 4 tarjetas de FAQ con fotografías originales del Figma Mockup.
   */
  function renderFAQCards() {
    const container = document.getElementById('faq-cards-container');
    if (!container) return;

    container.innerHTML = FAQ_DATA.map(item => `
      <div class="mockup-card overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300">
        <div>
          <div class="h-44 overflow-hidden bg-slate-100">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
          </div>
          <div class="p-5">
            <h4 class="text-sky-700 font-bold text-base mb-2 leading-snug">${item.title}</h4>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">${item.shortDesc}</p>
          </div>
        </div>
        <div class="p-5 pt-0">
          <button type="button" onclick="window.openFAQModal(${item.id})" class="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 hover:text-sky-800 transition">
            <span>Más información</span>
            <span class="w-4 h-4 rounded-full border border-sky-600 flex items-center justify-center text-[10px]">&gt;</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  /**
   * Renderiza el componente de acordeón para lectura ágil sin abrir modales.
   */
  function renderFAQAccordion() {
    const accordionContainer = document.getElementById('faq-accordion-container');
    if (!accordionContainer) return;

    accordionContainer.innerHTML = FAQ_DATA.map((item, index) => `
      <div class="faq-accordion-item">
        <button type="button" class="faq-accordion-btn" data-faq-index="${index}" aria-expanded="false">
          <span class="text-sm font-bold text-slate-800">${item.title}</span>
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="faq-accordion-content hidden" id="faq-content-${index}">
          <p class="whitespace-pre-line text-xs sm:text-sm text-slate-600">${item.shortDesc}</p>
          <button type="button" onclick="window.openFAQModal(${item.id})" class="mt-2 text-xs font-bold text-sky-600 hover:underline">
            Ver detalle completo &rarr;
          </button>
        </div>
      </div>
    `).join('');

    // Listener para abrir y cerrar paneles del acordeón
    accordionContainer.querySelectorAll('.faq-accordion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-faq-index');
        const content = document.getElementById(`faq-content-${index}`);
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Cierra otros acordeones para mantener orden visual
        accordionContainer.querySelectorAll('.faq-accordion-btn').forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            const otherIdx = otherBtn.getAttribute('data-faq-index');
            document.getElementById(`faq-content-${otherIdx}`)?.classList.add('hidden');
          }
        });

        if (isExpanded) {
          btn.setAttribute('aria-expanded', 'false');
          content?.classList.add('hidden');
        } else {
          btn.setAttribute('aria-expanded', 'true');
          content?.classList.remove('hidden');
        }
      });
    });
  }

  /* ============================================================================
   * 9. SISTEMA DE MODALES Y ACCESIBILIDAD
   * ============================================================================ */

  /**
   * Abre el modal genérico con la respuesta exhaustiva de la pregunta frecuente.
   * @param {number} id - ID de la pregunta en FAQ_DATA
   */
  window.openFAQModal = function (id) {
    const faq = FAQ_DATA.find(x => x.id === id);
    if (!faq) return;

    const modal = document.getElementById('generic-modal');
    const modalContent = document.getElementById('modal-body-content');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="flex flex-col md:flex-row gap-6 items-start">
        <div class="w-full md:w-1/3 flex-shrink-0">
          <img src="${faq.image}" alt="${faq.title}" class="w-full h-48 object-cover rounded-2xl shadow-sm">
        </div>
        <div class="w-full md:w-2/3 space-y-3">
          <span class="text-xs font-bold uppercase tracking-wider text-sky-600">Pregunta Frecuente</span>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900">${faq.title}</h3>
          <div class="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
            ${faq.fullDesc}
          </div>
          <div class="pt-4 border-t border-slate-100 flex justify-end">
            <button onclick="window.closeGenericModal()" class="btn-primary px-6 py-2.5 text-xs font-semibold">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  /**
   * Abre el modal genérico con la ficha detallada de una farmacia.
   * @param {number} id - ID de la farmacia en PHARMACIES_DATA
   */
  window.openPharmacyModal = function (id) {
    const p = PHARMACIES_DATA.find(x => x.id === id);
    if (!p) return;

    const modal = document.getElementById('generic-modal');
    const modalContent = document.getElementById('modal-body-content');
    if (!modal || !modalContent) return;

    const isAvailable = p.status === 'Disponible';
    const encodedAddress = encodeURIComponent(`${p.address}, ${p.neighborhood}, Bogotá`);

    modalContent.innerHTML = `
      <div class="flex flex-col md:flex-row gap-6 items-start">
        <div class="w-full md:w-1/2 flex-shrink-0">
          <img src="${p.image}" alt="${p.name}" class="w-full h-60 object-cover rounded-2xl shadow-md">
        </div>
        <div class="w-full md:w-1/2 space-y-4">
          <div>
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-2xl font-bold text-slate-900">${p.name}</h3>
              <span class="${isAvailable ? 'badge-available' : 'badge-cancelled'} text-xs">
                ${isAvailable ? 'Disponible &#10003;' : 'Agotado'}
              </span>
            </div>
            <p class="text-xs text-slate-500 font-medium">Punto de dispensación certificado &bull; Código: ${p.code}</p>
          </div>

          <div class="border-t border-b border-slate-100 py-3 space-y-2 text-xs sm:text-sm text-slate-700">
            <p><strong class="text-slate-900">Medicamento:</strong> ${p.medication} (${p.presentation})</p>
            <p><strong class="text-slate-900">Existencias reportadas:</strong> <span class="font-bold text-sky-600">${p.availableUnits} unidades</span></p>
            <p><strong class="text-slate-900">Dirección:</strong> ${p.address}, ${p.neighborhood}</p>
            <p><strong class="text-slate-900">Teléfono directo:</strong> ${p.phone}</p>
            <p><strong class="text-slate-900">Horario de entrega:</strong> ${p.hours}</p>
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-1">
            <a href="https://maps.google.com/?q=${encodedAddress}" target="_blank" rel="noopener noreferrer" class="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold">
              <span>Abrir en Google Maps</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <button onclick="window.closeGenericModal()" class="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  /**
   * Cierra el modal genérico y reanuda el scroll normal.
   */
  window.closeGenericModal = function () {
    const modal = document.getElementById('generic-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  /**
   * Cierra el modal de confirmación de contacto.
   */
  window.closeSuccessModal = function () {
    const successModal = document.getElementById('contact-success-modal');
    if (successModal) {
      successModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  /**
   * Configura listeners de accesibilidad para cerrar modales con la tecla Escape
   * o al pulsar sobre el fondo traslúcido.
   */
  function initAccessibilityHotkeys() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeGenericModal();
        window.closeSuccessModal();
      }
    });

    // Cerrar al hacer clic en el backdrop
    const genericModal = document.getElementById('generic-modal');
    if (genericModal) {
      genericModal.addEventListener('click', (e) => {
        if (e.target === genericModal) {
          window.closeGenericModal();
        }
      });
    }

    const successModal = document.getElementById('contact-success-modal');
    if (successModal) {
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
          window.closeSuccessModal();
        }
      });
    }
  }

  /* ============================================================================
   * 10. FORMULARIO DE CONTACTO Y RETROALIMENTACIÓN
   * ============================================================================ */

  /**
   * Controla el envío y validación del formulario de contacto.
   */
  function initContactForm() {
    const contactForm = document.getElementById('support-contact-form');
    const successModal = document.getElementById('contact-success-modal');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();
        const terms = document.getElementById('terms-agree')?.checked;

        if (!name || !email || !message) {
          alert('Por favor completa todos los campos obligatorios.');
          return;
        }

        if (!terms) {
          alert('Debes aceptar los términos y condiciones de tratamiento de datos para continuar.');
          return;
        }

        // Despliega el modal de confirmación fiel al diseño de Figma
        if (successModal) {
          successModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          contactForm.reset();
        }
      });
    }
  }

  /* ============================================================================
   * 11. BOTÓN FLOTANTE "VOLVER ARRIBA" (BACK TO TOP)
   * ============================================================================ */

  /**
   * Controla la visibilidad y acción del botón flotante para volver arriba.
   */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
