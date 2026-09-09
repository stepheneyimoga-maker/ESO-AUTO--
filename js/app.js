// ============================================================
// ESO AUTO - MAIN APPLICATION LOGIC
// ============================================================

// ---------- UTILITY FUNCTIONS ----------

function formatPrice(price) {
  return CURRENCY_SYMBOL + price.toLocaleString();
}

function getConditionClass(condition) {
  if (condition === 'Brand New') return 'brand-new';
  if (condition === 'Foreign Used') return 'foreign-used';
  if (condition === 'Nigerian Used') return 'nigerian-used';
  return '';
}

function generateYears() {
  const years = [];
  for (let y = YEAR_MAX; y >= YEAR_MIN; y--) {
    years.push(y);
  }
  return years;
}

function getValidCarImages(car) {
  if (!car || !Array.isArray(car.images)) return [];
  return car.images.filter(img => img && typeof img === 'string' && img.trim() !== '');
}

function getImageSrc(image) {
  return image.startsWith('images/') ? encodeURI(image) : image;
}

function preloadImage(image) {
  if (!image) return;
  const preload = new Image();
  preload.decoding = 'async';
  preload.src = getImageSrc(image);
}

function getCarsWithImages(cars = VEHICLES) {
  return cars.filter(car => getValidCarImages(car).length > 0);
}

function getDisplayImages(car) {
  const images = getValidCarImages(car);
  if (!images.length) return [];

  const priorityOrder = (img) => {
    const lower = img.toLowerCase();
    if (lower.includes('front side')) return 0;
    if (lower.includes('front') && !lower.includes('back') && !lower.includes('rear') && !lower.includes('side')) return 1;
    if (lower.includes('front sit') || lower.includes('front seat')) return 2;
    if (lower.includes('dashboard')) return 3;
    if (lower.includes('interior')) return 4;
    if (lower.includes('engine')) return 5;
    if (lower.includes('steering') || lower.includes('wheel')) return 6;
    if (lower.includes('boot') || lower.includes('back') || lower.includes('rear')) return 7;
    if (lower.includes('side')) return 8;
    return 9;
  };

  return [...images].sort((a, b) => priorityOrder(a) - priorityOrder(b));
}

function getModelsForMake(make) {
  if (!make || !BRANDS_MODELS[make]) return [];
  return BRANDS_MODELS[make].map(m => m.name);
}

function getCarCategory(make, model) {
  if (!BRANDS_MODELS[make]) return 'everyday';
  const entry = BRANDS_MODELS[make].find(m => m.name === model);
  return entry ? entry.category : 'everyday';
}

// Car image placeholder SVG
const CAR_PLACEHOLDER_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>`;

const PERSON_PLACEHOLDER_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;

const STORE_PLACEHOLDER_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-1h16v1zm0-3H4V7h16v8z"/></svg>`;

const IMAGE_UPLOAD_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v1.99H19zm-3 0V4H3v13h2v-2h2v2h2v-2h2v2h2v-2h2v2h2v-5h-2v-2h-1zm-4 9.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5.22-.5.5-.5.5.22.5.5zM5 16h8v-2H5v2z"/></svg>`;

const LOCATION_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;

const PHONE_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`;

const SEARCH_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`;

const WHATSAPP_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.004c6.552 0 11.888-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

const BACK_ICON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`;

const CHEVRON_LEFT = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;

const CHEVRON_RIGHT = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;

// ---------- RENDER CAR CARD ----------
function renderCarCard(car) {
  const displayImages = getDisplayImages(car);
  const primaryImage = displayImages[0] || '';
  const hasImage = !!primaryImage;

  const imgHTML = hasImage
    ? `<img src="${getImageSrc(primaryImage)}" alt="${car.make} ${car.model}" loading="eager" decoding="async" fetchpriority="low">`
    : `<div class="placeholder">${CAR_PLACEHOLDER_SVG}<span>Image Coming Soon</span></div>`;

  const categoryLabel = car.category === 'luxury' ? 'Luxury' : 'Everyday';
  const categoryClass = car.category === 'luxury' ? 'luxury' : 'everyday';

  const whatsappLink = `${WHATSAPP_BASE_URL}${car.seller.whatsapp}?text=${encodeURIComponent('Hello, I am interested in the ' + car.year + ' ' + car.make + ' ' + car.model + ' listed on ESO Auto.')}`;

  return `
    <div class="car-card" data-id="${car.id}" data-category="${car.category}" onclick="navigateToCar(${car.id})">
      <div class="car-image">
        ${imgHTML}
        <span class="car-category ${categoryClass}">${categoryLabel}</span>
      </div>
      <div class="car-body">
        <div class="car-title">${car.make} ${car.model.replace(car.make, '').trim()}</div>
        <div class="car-year">${car.year}</div>
        <div class="car-price">${formatPrice(car.price)}</div>
        <div class="car-meta">
          <span class="meta-tag">${car.condition}</span>
          <span class="meta-tag">${car.bodyType}</span>
          <span class="meta-tag">${car.transmission}</span>
        </div>
        <div class="car-seller">${PERSON_PLACEHOLDER_SVG.replace('width', 'width="16"').replace('height', 'height="16"')} ${car.seller.name}</div>
        <div class="car-location">${LOCATION_ICON.replace('width', '').replace('height', '').replace('<svg', '<svg width="14" height="14"')} ${car.seller.location}</div>
        <div class="car-actions">
          <a href="#car/${car.id}" class="btn btn-gold btn-sm btn-view" onclick="event.stopPropagation(); navigateToCar(${car.id})">View Car</a>
          <a href="${whatsappLink}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm btn-wa" onclick="event.stopPropagation()">${WHATSAPP_ICON.replace('<svg', '<svg width="16" height="16" style="fill:white"')} WhatsApp</a>
        </div>
      </div>
    </div>
  `;
}

// ---------- RENDER CAR DETAIL PAGE ----------
function renderCarDetail(carId) {
  const car = VEHICLES.find(v => v.id === carId);
  if (!car) return '<div class="empty-state"><h3>Vehicle not found</h3><p>The car you are looking for does not exist.</p></div>';

  const modelName = car.model.replace(car.make, '').trim();
  const whatsappLink = `${WHATSAPP_BASE_URL}${car.seller.whatsapp}?text=${encodeURIComponent('Hello, I am interested in the ' + car.year + ' ' + car.make + ' ' + modelName + ' listed on ESO Auto.')}`;

  const images = getDisplayImages(car);
  const hasAnyImage = images.length > 0;

  const mainImageHTML = (idx) => {
    const img = images[idx];
    if (img) {
      const priority = idx === 0 ? ' fetchpriority="high"' : '';
      return `<img src="${getImageSrc(img)}" alt="${car.make} ${modelName} - Image ${idx + 1}" loading="eager" decoding="async"${priority}>`;
    }
    return `<div class="placeholder">${CAR_PLACEHOLDER_SVG.replace('<svg', '<svg style="fill:#ccc"')}<span>Image ${idx + 1}</span></div>`;
  };

  const thumbsHTML = images.length
    ? images.map((img, i) => {
        const isActive = i === 0 ? 'active' : '';
        return `<div class="gallery-thumb ${isActive}" data-index="${i}" onclick="setGalleryImage(${carId}, ${i})"><img src="${getImageSrc(img)}" alt="Thumb ${i+1}" loading="lazy" decoding="async"></div>`;
      }).join('')
    : '<div class="gallery-thumb active" data-index="0"><div class="placeholder">' + CAR_PLACEHOLDER_SVG + '<span>No Images</span></div></div>';

  preloadImage(images[0]);
  preloadImage(images[1]);

  return `
    <div class="car-detail">
      <a href="#cars" class="car-detail-back" onclick="event.preventDefault(); navigateTo('cars')">${BACK_ICON} Back to Cars</a>
      <div class="car-detail-layout">
        <div class="detail-gallery">
          <div class="gallery-main" id="gallery-main">
            ${mainImageHTML(0)}
            <button class="gallery-nav-btn prev" onclick="galleryPrev(${carId})">${CHEVRON_LEFT}</button>
            <button class="gallery-nav-btn next" onclick="galleryNext(${carId})">${CHEVRON_RIGHT}</button>
          </div>
          <div class="gallery-thumbs" id="gallery-thumbs">
            ${thumbsHTML}
          </div>
        </div>
        <div class="detail-info">
          <div class="detail-title">${car.year} ${car.make} ${modelName}</div>
          <div class="detail-price">${formatPrice(car.price)}</div>
          <div class="detail-condition ${getConditionClass(car.condition)}">${car.condition}</div>
          <div class="detail-specs">
            <div class="spec-item"><span class="spec-label">Mileage</span><span class="spec-value">${car.mileage}</span></div>
            <div class="spec-item"><span class="spec-label">Transmission</span><span class="spec-value">${car.transmission}</span></div>
            <div class="spec-item"><span class="spec-label">Fuel Type</span><span class="spec-value">${car.fuelType}</span></div>
            <div class="spec-item"><span class="spec-label">Body Type</span><span class="spec-value">${car.bodyType}</span></div>
            <div class="spec-item"><span class="spec-label">Year</span><span class="spec-value">${car.year}</span></div>
            <div class="spec-item"><span class="spec-label">Location</span><span class="spec-value">${car.seller.location}</span></div>
          </div>
          <div class="detail-description">
            <h3>Description</h3>
            <p>${car.description}</p>
          </div>
          <div class="seller-card">
            <div class="seller-header">
              <div class="seller-avatar">${PERSON_PLACEHOLDER_SVG.replace('<svg', '<svg style="fill:#bbb"')}</div>
              <div>
                <div class="seller-name">${car.seller.name}</div>
                <div class="seller-type">${car.seller.type}</div>
              </div>
            </div>
            <div class="seller-details">
              <div class="seller-row">${PHONE_ICON} ${car.seller.phone}</div>
              <div class="seller-row">${LOCATION_ICON.replace('<svg', '<svg width="16" height="16"')} ${car.seller.location}</div>
            </div>
            <div class="seller-actions">
              <a href="${whatsappLink}" target="_blank" rel="noopener" class="btn btn-whatsapp">${WHATSAPP_ICON.replace('<svg', '<svg width="18" height="18" style="fill:white"')} Contact Seller on WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---------- GALLERY NAVIGATION ----------
let currentGalleryIndex = 0;

function setGalleryImage(carId, index) {
  const car = VEHICLES.find(v => v.id === carId);
  if (!car) return;

  const images = getDisplayImages(car);
  if (!images.length) {
    currentGalleryIndex = 0;
    const mainEl = document.getElementById('gallery-main');
    if (!mainEl) return;
    mainEl.innerHTML = `<div class="placeholder">${CAR_PLACEHOLDER_SVG.replace('<svg', '<svg style="fill:#ccc"')}<span>No Images</span></div>`;
    return;
  }

  currentGalleryIndex = index;

  const mainEl = document.getElementById('gallery-main');
  if (!mainEl) return;

  const img = images[index];
  const nextIndex = (index + 1) % images.length;
  preloadImage(images[nextIndex]);
  const imgHTML = `<img src="${getImageSrc(img)}" alt="${car.make} ${car.model} - Image ${index + 1}" loading="eager" decoding="async" fetchpriority="high">`;

  mainEl.innerHTML = imgHTML +
    `<button class="gallery-nav-btn prev" onclick="galleryPrev(${carId})">${CHEVRON_LEFT}</button>` +
    `<button class="gallery-nav-btn next" onclick="galleryNext(${carId})">${CHEVRON_RIGHT}</button>`;

  document.querySelectorAll('.gallery-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function galleryPrev(carId) {
  const car = VEHICLES.find(v => v.id === carId);
  if (!car) return;

  const images = getDisplayImages(car);
  if (!images.length) return;

  currentGalleryIndex = (currentGalleryIndex - 1 + images.length) % images.length;
  setGalleryImage(carId, currentGalleryIndex);
}

function galleryNext(carId) {
  const car = VEHICLES.find(v => v.id === carId);
  if (!car) return;

  const images = getDisplayImages(car);
  if (!images.length) return;

  currentGalleryIndex = (currentGalleryIndex + 1) % images.length;
  setGalleryImage(carId, currentGalleryIndex);
}

// ---------- NAVIGATION / ROUTING ----------
let currentPage = 'home';

function navigateTo(page, data) {
  currentPage = page;

  if (page === 'cars') {
    resetMarketplaceState();
    delete window._searchParams;
  }

  window.location.hash = data ? `${page}/${data}` : page;
  renderPage();
  window.scrollTo(0, 0);
  closeMobileMenu();
}

function navigateToCar(carId) {
  navigateTo('car', carId);
}

function getRouteFromHash() {
  const hash = window.location.hash.replace('#', '') || 'home';
  const parts = hash.split('/');
  return { page: parts[0], param: parts[1] || null };
}

// ---------- RENDER PAGE ----------
function renderPage() {
  const route = getRouteFromHash();
  const content = document.getElementById('main-content');
  if (!content) return;

  // Update nav active state
  document.querySelectorAll('.navbar-nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + route.page);
  });

  switch (route.page) {
    case 'home':
      renderHome(content);
      break;
    case 'cars':
      renderMarketplace(content);
      break;
    case 'best-value':
      renderBestValuePage(content);
      break;
    case 'car':
      renderCarPage(content, parseInt(route.param));
      break;
    case 'sell':
      renderSellPage(content);
      break;
    case 'auctions':
      renderAuctionsPlaceholder(content);
      break;
    case 'about':
      renderAboutPage(content);
      break;
    default:
      renderHome(content);
  }
}

async function loadApprovedListings() {
  const supabaseClient = window.supabase || window.ESO_AUTO_SUPABASE;

  if (!supabaseClient) {
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from('cars')
      .select('*')
      .eq('status', 'approved');

    if (error) {
      console.error('Failed to load approved cars from Supabase:', error);
      return;
    }

    if (Array.isArray(data) && data.length > 0) {
      const mappedCars = data.map((row, index) => ({
        id: row.id || index + 1,
        make: row.make,
        model: row.model,
        year: Number(row.year),
        price: Number(row.price),
        condition: row.condition,
        mileage: row.mileage,
        transmission: row.transmission,
        fuelType: row.fuel_type,
        bodyType: row.vehicle_type,
        category: getCarCategory(row.make, row.model),
        description: row.description,
        seller: {
          name: row.seller_name || 'Seller',
          phone: row.seller_phone || '',
          whatsapp: row.whatsapp_number || '',
          location: row.location || 'Lagos',
          type: 'Private Seller'
        },
        images: Array.isArray(row.images)
          ? row.images
          : (typeof row.images === 'string' && row.images.trim() !== '' ? row.images.split(',').map(v => v.trim()).filter(Boolean) : [])
      }));

      const existingMap = new Map();
      VEHICLES.forEach(car => existingMap.set(String(car.id), car));

      mappedCars.forEach(car => {
        if (car && car.make && car.model) {
          existingMap.set(String(car.id), { ...existingMap.get(String(car.id)), ...car });
        }
      });

      const mergedCars = Array.from(existingMap.values());
      VEHICLES.splice(0, VEHICLES.length, ...getCarsWithImages(mergedCars));
    }
  } catch (error) {
    console.error('Supabase approved listings load error:', error);
  }
}

// ---------- HOMEPAGE ----------
function renderHome(el) {
  const featured = getCarsWithImages(VEHICLES).slice().sort((a, b) => {
    const aFeatured = Number(a.featured || 0);
    const bFeatured = Number(b.featured || 0);
    if (aFeatured !== bFeatured) return bFeatured - aFeatured;
    return b.id - a.id;
  });

  const brandsHTML = Object.keys(BRANDS_MODELS).map(brand =>
    `<div class="brand-card" onclick="filterByBrand('${brand}')">${brand}</div>`
  ).join('');

  el.innerHTML = `
    <section class="hero">
      <div class="hero-content">
        <h1>Find Your Next Car <span class="gold-text">On ESO Auto</span></h1>
        <p>Discover cars from trusted sellers and dealers across Nigeria.</p>
        <div class="hero-search">
          <select id="hero-make" onchange="updateHeroModels()">
            <option value="">Any Make</option>
            ${Object.keys(BRANDS_MODELS).map(b => `<option value="${b}">${b}</option>`).join('')}
          </select>
          <select id="hero-model">
            <option value="">Any Model</option>
          </select>
          <select id="hero-year">
            <option value="">Any Year</option>
            ${generateYears().map(y => `<option value="${y}">${y}</option>`).join('')}
          </select>
          <select id="hero-price">
            <option value="">Any Price</option>
            <option value="0-5000000">Under ₦5M</option>
            <option value="5000000-15000000">₦5M – ₦15M</option>
            <option value="15000000-30000000">₦15M – ₦30M</option>
            <option value="30000000-60000000">₦30M – ₦60M</option>
            <option value="60000000-999999999">₦60M+</option>
          </select>
          <select id="hero-condition">
            <option value="">Any Condition</option>
            ${CONDITIONS.map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
          <div class="search-btn">
            <button class="btn btn-gold" style="width:100%" onclick="heroSearch()">
              ${SEARCH_ICON.replace('<svg', '<svg width="18" height="18" style="fill:black"')} Browse Cars
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="category-tabs" style="padding: 32px 20px; max-width: 1400px; margin: 0 auto; display:none;">
      <button class="category-tab active" onclick="navigateTo('cars')">All Cars</button>
    </section>

    <section style="padding: 0 20px 60px; max-width: 1400px; margin: 0 auto;">
      <div class="section-header">
        <h2>Featured Cars</h2>
        <p>Hand-picked vehicles from trusted sellers</p>
        <div class="gold-underline"></div>
      </div>
      <div class="car-grid">
        ${featured.map(c => renderCarCard(c)).join('')}
      </div>
      <div style="text-align:center; margin-top:32px;">
        <button class="btn btn-outline-gold" onclick="navigateTo('cars')">View All Cars</button>
      </div>
    </section>

    <section class="brands-section">
      <div class="section-header">
        <h2>Browse by Make</h2>
        <p>Find your preferred car brand</p>
        <div class="gold-underline"></div>
      </div>
      <div class="brands-grid">
        ${brandsHTML}
      </div>
    </section>
  `;
}

// Hero search
function updateHeroModels() {
  const make = document.getElementById('hero-make').value;
  const modelSelect = document.getElementById('hero-model');
  const models = getModelsForMake(make);
  modelSelect.innerHTML = '<option value="">Any Model</option>' +
    models.map(m => `<option value="${m}">${m}</option>`).join('');
}

function heroSearch() {
  const make = document.getElementById('hero-make').value;
  const model = document.getElementById('hero-model').value;
  const year = document.getElementById('hero-year').value;
  const price = document.getElementById('hero-price').value;
  const condition = document.getElementById('hero-condition').value;

  // Store search params and navigate
  window._searchParams = { make, model, year, price, condition };
  navigateTo('cars');
}

function filterByBrand(brand) {
  window._searchParams = { make: brand };
  navigateTo('cars');
}

function filterCategory(cat) {
  window._searchParams = { category: cat };
  navigateTo('cars');
}

// ---------- MARKETPLACE ----------
let currentFilters = {};
let currentSort = 'newest';
let currentCategoryFilter = 'all';
let currentSearchQuery = '';

function resetMarketplaceState() {
  currentFilters = {};
  currentCategoryFilter = 'all';
  currentSearchQuery = '';
  currentSort = 'newest';
}

function renderMarketplace(el, defaultCategory) {
  currentCategoryFilter = defaultCategory || 'all';

  resetMarketplaceState();

  if (window._searchParams) {
    currentFilters = {};
    currentSearchQuery = '';
  }

  // Apply saved search params if any
  if (window._searchParams) {
    currentFilters = { ...window._searchParams };
    if (currentFilters.category) {
      currentCategoryFilter = currentFilters.category;
      delete currentFilters.category;
    }
    if (currentFilters.searchQuery) {
      currentSearchQuery = currentFilters.searchQuery;
      delete currentFilters.searchQuery;
    }
    delete window._searchParams;
  }

  const pageTitle = currentCategoryFilter === 'luxury' ? 'Best Value Cars' : 'Cars';
  const pageDesc = currentCategoryFilter === 'luxury'
    ? 'Explore smart, affordable vehicles with great value for money'
    : 'Browse all available vehicles';

  el.innerHTML = `
    <div class="page-banner">
      <h1>${pageTitle}</h1>
      <p>${pageDesc}</p>
      <div class="gold-underline"></div>
    </div>
    <div class="marketplace-layout">
      <aside class="filter-sidebar" id="filter-sidebar">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="font-size:1.1rem; font-weight:700;">Filters</h3>
          <button class="btn btn-sm btn-dark" onclick="closeMobileFilter()" style="display:none;" id="filter-close-btn">Close</button>
        </div>
        ${renderFilters()}
      </aside>
      <main>
        <div class="sort-bar">
          <div>
            <span class="results-count" id="results-count">Loading...</span>
          </div>
          <div style="display:flex; gap:12px; align-items:center;">
            <label style="font-size:0.82rem; color:var(--dark-muted);">Sort by:</label>
            <select id="sort-select" onchange="applySort()">
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest</option>
              <option value="year-old">Year: Oldest</option>
            </select>
          </div>
        </div>
        <div class="category-tabs" style="margin-bottom:20px; display:none;">
          <button class="category-tab ${currentCategoryFilter === 'all' ? 'active' : ''}" onclick="setMarketplaceCategory('all')">All Cars</button>
        </div>
        <div class="car-grid" id="car-results">
          Loading...
        </div>
      </main>
    </div>
    <button class="mobile-filter-btn" id="mobile-filter-btn" onclick="openMobileFilter()">⚙</button>
  `;

  applyFilters();

  // Show close button on mobile
  if (window.innerWidth <= 768) {
    const closeBtn = document.getElementById('filter-close-btn');
    if (closeBtn) closeBtn.style.display = 'block';
  }
}

function renderFilters() {
  const makeOptions = Object.keys(BRANDS_MODELS).map(b =>
    `<option value="${b}" ${currentFilters.make === b ? 'selected' : ''}>${b}</option>`
  ).join('');

  const models = getModelsForMake(currentFilters.make || '');
  const modelOptions = models.map(m =>
    `<option value="${m}" ${currentFilters.model === m ? 'selected' : ''}>${m}</option>`
  ).join('');

  const yearOptions = generateYears().map(y =>
    `<option value="${y}" ${currentFilters.year == y ? 'selected' : ''}>${y}</option>`
  ).join('');

  const locationOptions = LOCATIONS.map(l =>
    `<option value="${l}" ${currentFilters.location === l ? 'selected' : ''}>${l}</option>`
  ).join('');

  return `
    <div class="filter-group" data-filter="make">
      <label>Make</label>
      <select id="f-make" onchange="onFilterMakeChange()">
        <option value="">All Makes</option>
        ${makeOptions}
      </select>
    </div>
    <div class="filter-group" data-filter="model">
      <label>Model</label>
      <select id="f-model" onchange="onFilterChange()">
        <option value="">All Models</option>
        ${modelOptions}
      </select>
    </div>
    <div class="filter-group" data-filter="year">
      <label>Year</label>
      <select id="f-year" onchange="onFilterChange()">
        <option value="">Any Year</option>
        ${yearOptions}
      </select>
    </div>
    <div class="filter-group" data-filter="price">
      <label>Price Range</label>
      <select id="f-price" onchange="onFilterChange()">
        <option value="">Any Price</option>
        <option value="0-5000000" ${currentFilters.price === '0-5000000' ? 'selected' : ''}>Under ₦5M</option>
        <option value="5000000-15000000" ${currentFilters.price === '5000000-15000000' ? 'selected' : ''}>₦5M – ₦15M</option>
        <option value="15000000-30000000" ${currentFilters.price === '15000000-30000000' ? 'selected' : ''}>₦15M – ₦30M</option>
        <option value="30000000-60000000" ${currentFilters.price === '30000000-60000000' ? 'selected' : ''}>₦30M – ₦60M</option>
        <option value="60000000-999999999" ${currentFilters.price === '60000000-999999999' ? 'selected' : ''}>₦60M+</option>
      </select>
    </div>
    <div class="filter-group" data-filter="condition">
      <label>Condition</label>
      <div class="checkbox-group">
        ${CONDITIONS.map(c => `<label><input type="checkbox" value="${c}" ${currentFilters.conditions && currentFilters.conditions.includes(c) ? 'checked' : ''} onchange="onFilterChange()"> ${c}</label>`).join('')}
      </div>
    </div>
    <div class="filter-group" data-filter="type">
      <label>Vehicle Type</label>
      <select id="f-type" onchange="onFilterChange()">
        <option value="">All Types</option>
        ${VEHICLE_TYPES.map(t => `<option value="${t}" ${currentFilters.type === t ? 'selected' : ''}>${t}</option>`).join('')}
      </select>
    </div>
    <div class="filter-group" data-filter="sellertype">
      <label>Seller Type</label>
      <div class="checkbox-group">
        ${SELLER_TYPES.map(s => `<label><input type="checkbox" value="${s}" ${currentFilters.sellerTypes && currentFilters.sellerTypes.includes(s) ? 'checked' : ''} onchange="onFilterChange()"> ${s}</label>`).join('')}
      </div>
    </div>
    <div class="filter-group" data-filter="location">
      <label>Location</label>
      <select id="f-location" onchange="onFilterChange()">
        <option value="">All Locations</option>
        ${locationOptions}
      </select>
    </div>
    <div class="filter-actions">
      <button class="btn btn-gold btn-sm" onclick="applyFilters()">Apply</button>
      <button class="btn btn-outline-gold btn-sm" onclick="clearFilters()">Clear</button>
    </div>
  `;
}

function onFilterMakeChange() {
  const make = document.getElementById('f-make').value;
  currentFilters.make = make;
  currentFilters.model = '';

  const modelSelect = document.getElementById('f-model');
  if (modelSelect) {
    const models = getModelsForMake(make);
    modelSelect.innerHTML = '<option value="">All Models</option>' +
      models.map(m => `<option value="${m}">${m}</option>`).join('');
  }
  applyFilters();
}

function onFilterChange() {
  readFilterValues();
  applyFilters();
}

function readFilterValues() {
  currentFilters.make = document.getElementById('f-make')?.value || '';
  currentFilters.model = document.getElementById('f-model')?.value || '';
  currentFilters.year = document.getElementById('f-year')?.value || '';
  currentFilters.price = document.getElementById('f-price')?.value || '';
  currentFilters.type = document.getElementById('f-type')?.value || '';
  currentFilters.location = document.getElementById('f-location')?.value || '';

  // Checkboxes - using data attributes for reliability
  currentFilters.conditions = [];
  document.querySelectorAll('#filter-sidebar [data-filter="condition"] input[type=checkbox]:checked').forEach(cb => {
    currentFilters.conditions.push(cb.value);
  });

  currentFilters.sellerTypes = [];
  document.querySelectorAll('#filter-sidebar [data-filter="sellertype"] input[type=checkbox]:checked').forEach(cb => {
    currentFilters.sellerTypes.push(cb.value);
  });
}

function applyFilters() {
  readFilterValues();

  let results = getCarsWithImages(VEHICLES);

  // Category filter
  if (currentCategoryFilter !== 'all') {
    results = results.filter(c => c.category === currentCategoryFilter);
  }

  // Make
  if (currentFilters.make) {
    results = results.filter(c => c.make === currentFilters.make);
  }

  // Model
  if (currentFilters.model) {
    results = results.filter(c => c.model === currentFilters.model);
  }

  // Year
  if (currentFilters.year) {
    results = results.filter(c => c.year === parseInt(currentFilters.year));
  }

  // Price range
  if (currentFilters.price) {
    const [min, max] = currentFilters.price.split('-').map(Number);
    results = results.filter(c => c.price >= min && c.price <= max);
  }

  // Conditions
  if (currentFilters.conditions && currentFilters.conditions.length > 0) {
    results = results.filter(c => currentFilters.conditions.includes(c.condition));
  }

  // Vehicle type
  if (currentFilters.type) {
    results = results.filter(c => c.bodyType === currentFilters.type);
  }

  // Seller type
  if (currentFilters.sellerTypes && currentFilters.sellerTypes.length > 0) {
    results = results.filter(c => currentFilters.sellerTypes.includes(c.seller.type));
  }

  // Location
  if (currentFilters.location) {
    results = results.filter(c => c.seller.location === currentFilters.location);
  }

  // Seller name (for dealer view)
  if (currentFilters.sellerName) {
    results = results.filter(c => c.seller.name === currentFilters.sellerName);
  }

  // Search relevance ranking for easier narrowing
  if (currentSearchQuery) {
    const ranked = getSortedSearchMatches(currentSearchQuery, results);
    results = ranked;
  }

  // Sort
  applySortToResults(results);
}

function applySort() {
  currentSort = document.getElementById('sort-select')?.value || 'newest';
  applyFilters();
}

function applySortToResults(results) {
  switch (currentSort) {
    case 'newest': results.sort((a, b) => b.id - a.id); break;
    case 'price-low': results.sort((a, b) => a.price - b.price); break;
    case 'price-high': results.sort((a, b) => b.price - a.price); break;
    case 'year-new': results.sort((a, b) => b.year - a.year); break;
    case 'year-old': results.sort((a, b) => a.year - b.year); break;
  }

  const container = document.getElementById('car-results');
  const countEl = document.getElementById('results-count');

  if (countEl) countEl.textContent = `${results.length} vehicle${results.length !== 1 ? 's' : ''} found`;

  if (container) {
    if (results.length === 0) {
      container.innerHTML = `<div class="empty-state"><h3>No vehicles found</h3><p>Try adjusting your filters to see more results.</p></div>`;
    } else {
      container.innerHTML = results.map(c => renderCarCard(c)).join('');
    }
  }
}

function clearFilters() {
  resetMarketplaceState();
  renderMarketplace(document.getElementById('main-content'));
}

function setMarketplaceCategory(cat) {
  currentCategoryFilter = cat;
  if (cat === 'all') {
    currentFilters = {};
    currentSearchQuery = '';
    currentSort = 'newest';
  }
  // Update tabs
  document.querySelectorAll('.category-tab').forEach(t => {
    t.classList.toggle('active', false);
  });
  if (event && event.target) {
    event.target.classList.add('active');
  }
  applyFilters();
}

function openMobileFilter() {
  const sidebar = document.getElementById('filter-sidebar');
  if (sidebar) sidebar.classList.add('active');
}

function closeMobileFilter() {
  const sidebar = document.getElementById('filter-sidebar');
  if (sidebar) sidebar.classList.remove('active');
}

// ---------- CAR DETAIL PAGE ----------
function renderCarPage(el, carId) {
  el.innerHTML = renderCarDetail(carId);
  currentGalleryIndex = 0;
}

function renderBestValuePage(el) {
  const valueCars = getCarsWithImages(VEHICLES).filter(car => {
    const price = Number(car.price || 0);
    return price > 0 && price <= 25000000;
  }).slice(0, 12);

  el.innerHTML = `
    <div class="page-banner">
      <h1>Best Value Cars</h1>
      <p>Affordable, dependable vehicles with strong value for money</p>
      <div class="gold-underline"></div>
    </div>
    <div style="padding: 32px 20px; max-width: 1400px; margin: 0 auto;">
      <div class="car-grid">
        ${valueCars.length > 0 ? valueCars.map(car => renderCarCard(car)).join('') : '<div class="empty-state"><h3>No best value cars yet</h3><p>Check back soon for more affordable listings.</p></div>'}
      </div>
    </div>
  `;
}

// ---------- SELL YOUR CAR PAGE ----------
function renderSellPage(el) {
  const makeOptions = Object.keys(BRANDS_MODELS).map(b => `<option value="${b}">${b}</option>`).join('');
  const listingSupportWhatsApp = '2349036386531';
  const listingSupportLink = `${WHATSAPP_BASE_URL}${listingSupportWhatsApp}?text=${encodeURIComponent('Hello, I would like to post a car on ESO Auto.')}`;

  el.innerHTML = `
    <div class="page-banner">
      <h1>Sell Your Car</h1>
      <p>List your vehicle on ESO Auto and reach buyers across Nigeria</p>
      <div class="gold-underline"></div>
    </div>
    <div class="sell-unavailable-notice" role="status">
      <strong>Online listing is currently unavailable.</strong>
      <span>To post a car, please contact us on WhatsApp at <a href="${listingSupportLink}" target="_blank" rel="noopener">09036386531</a>.</span>
      <a href="${listingSupportLink}" target="_blank" rel="noopener" class="btn btn-whatsapp">Contact us on WhatsApp</a>
    </div>
    <div class="sell-form-section">
      <form class="sell-form" id="sell-car-form">
        <div class="form-section-title">Seller Information</div>
        <div class="form-grid">
          <div class="form-group">
            <label for="seller_name">Full Name</label>
            <input id="seller_name" name="seller_name" type="text" placeholder="Enter your full name" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number (optional)</label>
            <input id="phone" name="phone" type="tel" placeholder="e.g. 08012345678">
          </div>
          <div class="form-group">
            <label for="whatsapp">WhatsApp Number (optional)</label>
            <input id="whatsapp" name="whatsapp" type="tel" placeholder="e.g. 08012345678">
          </div>
          <div class="form-group">
            <label for="email">Email (optional)</label>
            <input id="email" name="email" type="email" placeholder="your@email.com">
          </div>
          <div class="form-group full-width">
            <label for="location">Location</label>
            <select id="location" name="location" required>
              <option value="">Select Location</option>
              ${LOCATIONS.map(l => `<option value="${l}">${l}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-section-title">Vehicle Details</div>
        <div class="form-grid">
          <div class="form-group">
            <label for="sell-make">Make</label>
            <select id="sell-make" name="make" onchange="updateSellModels()" required>
              <option value="">Select Make</option>
              ${makeOptions}
            </select>
          </div>
          <div class="form-group">
            <label for="sell-model">Model</label>
            <select id="sell-model" name="model" required>
              <option value="">Select Model</option>
            </select>
          </div>
          <div class="form-group">
            <label for="year">Year</label>
            <select id="year" name="year" required>
              <option value="">Select Year</option>
              ${generateYears().map(y => `<option value="${y}">${y}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="price">Price (₦)</label>
            <input id="price" name="price" type="number" min="0" placeholder="e.g. 15000000" required>
          </div>
          <div class="form-group">
            <label for="condition">Condition</label>
            <select id="condition" name="condition" required>
              <option value="">Select Condition</option>
              ${CONDITIONS.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="mileage">Mileage</label>
            <input id="mileage" name="mileage" type="text" placeholder="e.g. 45,000 km" required>
          </div>
          <div class="form-group">
            <label for="transmission">Transmission</label>
            <select id="transmission" name="transmission" required>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div class="form-group">
            <label for="fuel_type">Fuel Type</label>
            <select id="fuel_type" name="fuel_type" required>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div class="form-group full-width">
            <label for="vehicle_type">Vehicle Type</label>
            <select id="vehicle_type" name="vehicle_type" required>
              <option value="">Select Vehicle Type</option>
              ${VEHICLE_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-section-title">Description</div>
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="description">Describe your vehicle</label>
            <textarea id="description" name="description" placeholder="Provide details about the car's features, history, and condition..." required></textarea>
          </div>
        </div>

        <div class="form-section-title">Upload Images (up to 12)</div>
        <div class="image-upload-area">
          ${Array.from({ length: 12 }, (_, i) => `
            <div class="image-upload-slot" data-slot-index="${i + 1}">
              <input type="file" class="image-file-input" accept="image/*" capture="environment" aria-label="Upload photo ${i + 1}">
              <input type="url" class="image-url-input" name="image_${i + 1}" placeholder="Image URL ${i + 1}" aria-label="Image URL ${i + 1}">
              <img class="image-preview" alt="Uploaded preview ${i + 1}" hidden>
              <button type="button" class="image-remove-btn" aria-label="Remove image ${i + 1}">×</button>
              ${IMAGE_UPLOAD_SVG}
            </div>
          `).join('')}
        </div>

        <div id="sell-form-message" style="margin-top: 18px; display:none; font-weight:600;"></div>

        <div style="text-align:center; margin-top:24px;">
          <button type="submit" class="btn btn-gold" style="min-width:200px;">Submit Listing</button>
        </div>
      </form>
    </div>
  `;

  const sellForm = document.getElementById('sell-car-form');
  if (sellForm) {
    sellForm.addEventListener('submit', handleSellCarSubmit);
    sellForm.addEventListener('input', saveSellFormDraft);
    sellForm.addEventListener('change', saveSellFormDraft);
    bindImageUploadSlots();
    restoreSellFormDraft();
  }
}

function getSellFormDraftKey() {
  return 'eso-auto-sell-form-draft';
}

function saveSellFormDraft() {
  const form = document.getElementById('sell-car-form');
  if (!form) return;

  const draft = {};
  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      draft[key] = value;
    }
  }

  const imageInputs = form.querySelectorAll('.image-url-input');
  imageInputs.forEach((input) => {
    const name = input.getAttribute('name');
    if (name) {
      draft[name] = input.value || '';
    }
  });

  sessionStorage.setItem(getSellFormDraftKey(), JSON.stringify(draft));
}

function restoreSellFormDraft() {
  const form = document.getElementById('sell-car-form');
  if (!form) return;

  try {
    const saved = sessionStorage.getItem(getSellFormDraftKey());
    if (!saved) return;

    const draft = JSON.parse(saved);
    if (!draft || typeof draft !== 'object') return;

    Object.entries(draft).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field && field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
        field.value = value || '';
      }
    });

    const imageInputs = form.querySelectorAll('.image-url-input');
    imageInputs.forEach((input) => {
      const name = input.getAttribute('name');
      const value = draft[name] || '';
      const slot = input.closest('.image-upload-slot');
      const preview = slot ? slot.querySelector('.image-preview') : null;

      if (value) {
        input.value = value;
        if (preview) {
          preview.src = value;
          preview.hidden = false;
          slot.classList.add('has-image');
        }
      }
    });
  } catch (error) {
    console.warn('Could not restore sell form draft:', error);
  }
}

function handleImageFileSelection(file, slot, urlInput, preview) {
  if (!file || !file.type || !file.type.startsWith('image/')) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const imageDataUrl = event.target.result;
    urlInput.value = imageDataUrl;
    preview.src = imageDataUrl;
    preview.hidden = false;
    slot.classList.add('has-image');
  };
  reader.readAsDataURL(file);
}

function bindImageUploadSlots() {
  const slots = document.querySelectorAll('.image-upload-slot');

  slots.forEach((slot) => {
    if (slot.dataset.bound === 'true') return;

    const urlInput = slot.querySelector('.image-url-input');
    const fileInput = slot.querySelector('.image-file-input');
    const preview = slot.querySelector('.image-preview');
    const removeBtn = slot.querySelector('.image-remove-btn');

    if (!urlInput || !fileInput || !preview || !removeBtn) return;

    slot.dataset.bound = 'true';

    const openPicker = (event) => {
      if (event && event.target && event.target.closest('.image-remove-btn')) return;
      if (event && event.target && event.target.closest('.image-url-input')) return;
      fileInput.click();
    };

    slot.addEventListener('click', openPicker);

    slot.addEventListener('dragenter', (event) => {
      event.preventDefault();
      slot.classList.add('is-dragover');
    });

    slot.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      slot.classList.add('is-dragover');
    });

    slot.addEventListener('dragleave', (event) => {
      if (!slot.contains(event.relatedTarget)) {
        slot.classList.remove('is-dragover');
      }
    });

    slot.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
      slot.classList.remove('is-dragover');

      const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
      if (file) {
        handleImageFileSelection(file, slot, urlInput, preview);
      }
    });

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        handleImageFileSelection(file, slot, urlInput, preview);
      }
      event.target.value = '';
    });

    removeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      urlInput.value = '';
      fileInput.value = '';
      preview.src = '';
      preview.hidden = true;
      slot.classList.remove('has-image', 'is-dragover');
    });
  });
}

async function handleSellCarSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const messageEl = document.getElementById('sell-form-message');

  if (!form || !messageEl) return;

  const formData = new FormData(form);
  const sellerName = (formData.get('seller_name') || '').toString().trim();
  const sellerPhone = (formData.get('phone') || '').toString().trim();
  const whatsappNumber = (formData.get('whatsapp') || '').toString().trim();
  const sellerEmail = (formData.get('email') || '').toString().trim();
  const location = (formData.get('location') || '').toString().trim();
  const make = (formData.get('make') || '').toString().trim();
  const model = (formData.get('model') || '').toString().trim();
  const year = Number(formData.get('year'));
  const price = Number(formData.get('price'));
  const condition = (formData.get('condition') || '').toString().trim();
  const mileage = (formData.get('mileage') || '').toString().trim();
  const transmission = (formData.get('transmission') || '').toString().trim();
  const fuelType = (formData.get('fuel_type') || '').toString().trim();
  const vehicleType = (formData.get('vehicle_type') || '').toString().trim();
  const description = (formData.get('description') || '').toString().trim();
  const images = Array.from(document.querySelectorAll('.image-url-input'))
    .map(input => (input.value || '').trim())
    .filter(Boolean);

  const missingFields = [];
  if (!sellerName) missingFields.push('Seller name');
  if (!location) missingFields.push('Location');
  if (!make) missingFields.push('Make');
  if (!model) missingFields.push('Model');
  if (!year) missingFields.push('Year');
  if (!price) missingFields.push('Price');
  if (!condition) missingFields.push('Condition');
  if (!mileage) missingFields.push('Mileage');
  if (!transmission) missingFields.push('Transmission');
  if (!description) missingFields.push('Description');

  if (missingFields.length > 0) {
    messageEl.style.display = 'block';
    messageEl.style.color = '#b42318';
    messageEl.textContent = 'Please complete all required fields before submitting your listing.';
    return;
  }

  const supabaseClient = window.ESO_AUTO_SUPABASE || window.supabase;

  if (!supabaseClient || typeof supabaseClient.from !== 'function') {
    messageEl.style.display = 'block';
    messageEl.style.color = '#b42318';
    messageEl.textContent = 'Supabase is not connected. Please check the project configuration and try again.';
    return;
  }

  const payload = {
    seller_name: sellerName,
    ...(sellerPhone ? { phone: sellerPhone } : {}),
    ...(whatsappNumber ? { whatsapp: whatsappNumber } : {}),
    ...(sellerEmail ? { email: sellerEmail } : {}),
    location,
    make,
    model,
    year,
    price,
    mileage,
    condition,
    transmission,
    description,
    images,
    status: 'pending'
  };

  messageEl.style.display = 'block';
  messageEl.style.color = '#a77b1a';
  messageEl.textContent = 'Submitting your vehicle listing...';

  try {
    const { data, error } = await supabaseClient
      .from('cars')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      messageEl.style.color = '#b42318';
      messageEl.textContent = error.message || 'Submission failed. Please check your form details and try again.';
      return;
    }

    console.log('Listing inserted successfully:', data);
    sessionStorage.removeItem(getSellFormDraftKey());
    form.reset();
    updateSellModels();
    messageEl.style.color = '#0f8b5d';
    messageEl.textContent = 'Your vehicle listing has been submitted successfully. ESO Auto will review your listing before it is published.';
  } catch (error) {
    console.error('Submission error:', error);
    messageEl.style.color = '#b42318';
    messageEl.textContent = error?.message || 'Submission failed. Please try again later.';
  }
}

function updateSellModels() {
  const make = document.getElementById('sell-make').value;
  const modelSelect = document.getElementById('sell-model');
  const models = getModelsForMake(make);
  modelSelect.innerHTML = '<option value="">Select Model</option>' +
    models.map(m => `<option value="${m}">${m}</option>`).join('');
}

// ---------- AUCTIONS PLACEHOLDER ----------
function renderAuctionsPlaceholder(el) {
  el.innerHTML = `
    <div class="page-banner">
      <h1>Auctions</h1>
      <p>Coming Soon to ESO Auto</p>
      <div class="gold-underline"></div>
    </div>
    <div class="empty-state" style="padding:80px 20px;">
      ${CAR_PLACEHOLDER_SVG.replace('<svg', '<svg style="fill:#ccc"')}
      <h3>Auction Marketplace Coming Soon</h3>
      <p>ESO Auto is building an exciting auction platform where you can bid on vehicles from trusted sellers and dealers. Stay tuned for updates.</p>
    </div>
  `;
}

// ---------- ABOUT PAGE ----------
function renderAboutPage(el) {
  el.innerHTML = `
    <div class="page-banner">
      <h1>About ESO Auto</h1>
      <p>Find. Trust. Drive.</p>
      <div class="gold-underline"></div>
    </div>
    <div style="max-width:1000px; margin:0 auto; padding:48px 20px 60px; color:var(--dark-muted);">
      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        ESO Auto is a modern automotive marketplace built to make buying and selling cars simpler, clearer, and more trustworthy.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        We connect car buyers, private sellers, and dealerships in one place, making it easier to discover the right vehicle and connect directly with the person selling it.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        Our goal is simple: make finding your next car easier and give sellers a better way to reach serious buyers.
      </p>

      <h2 style="font-size:1.6rem; font-weight:800; margin:32px 0 16px; color:var(--dark);">Our Mission</h2>
      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        The Nigerian car market is full of opportunities, but finding the right vehicle can still be frustrating. Buyers often have to search through countless listings, compare incomplete information, and deal with uncertainty about who they are buying from.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        ESO Auto is being built to change that.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        Our mission is to create a trusted automotive marketplace where buyers can discover vehicles with clear information and connect with sellers directly, while dealers and private sellers get the tools they need to showcase their cars and manage their listings.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        We believe buying a car should feel less like searching through chaos and more like making a confident decision.
      </p>

      <h2 style="font-size:1.6rem; font-weight:800; margin:32px 0 16px; color:var(--dark);">What We Offer</h2>
      <ul style="line-height:2; margin-bottom:30px; padding-left:20px; list-style:disc;">
        <li>Cars From Dealers &amp; Private Sellers</li>
        <li>Simple Car Discovery</li>
        <li>Direct Seller Contact</li>
        <li>Dealer Listings</li>
        <li>Sell Your Car</li>
        <li>Personal Accounts</li>
        <li>A Marketplace Built Around Trust</li>
      </ul>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        Discover vehicles from dealerships and individual sellers in one marketplace, with listings designed to give you the information you actually need.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        Browse vehicles by make, model, price, year, condition and other important details, making it easier to narrow down your options.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        Found a car you like? Contact the seller directly through WhatsApp and start the conversation without unnecessary middlemen.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        Private sellers can submit their vehicles to ESO Auto with details, pricing, descriptions and images. Listings are reviewed before being published, helping maintain the quality and reliability of the marketplace.
      </p>

      <h2 style="font-size:1.6rem; font-weight:800; margin:32px 0 16px; color:var(--dark);">Coming Soon</h2>
      <ul style="line-height:2; margin-bottom:30px; padding-left:20px; list-style:disc;">
        <li>Saved Cars</li>
        <li>Listing Alerts</li>
        <li>Dealer Dashboard</li>
        <li>Sales &amp; Lead Tracking</li>
        <li>ESO Auto Auctions</li>
        <li>Smarter Vehicle Discovery</li>
        <li>Verified Sellers &amp; Vehicles</li>
        <li>Premium Dealer Features</li>
      </ul>

      <h2 style="font-size:1.6rem; font-weight:800; margin:32px 0 16px; color:var(--dark);">Our Vision</h2>
      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        ESO Auto is being built with a bigger vision than simply becoming another place to post cars.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        We want to build a modern automotive ecosystem where buying, selling, discovering and managing vehicles can happen in one trusted platform.
      </p>

      <p style="font-size:1.05rem; line-height:1.9; margin-bottom:30px; color:var(--dark-muted);">
        From your first search to the moment you find the right car, ESO Auto is designed to make the journey simpler.
      </p>

      <p style="font-size:1.2rem; font-weight:700; margin:40px 0 10px; text-align:center; color:var(--dark);">Find. Trust. Drive.</p>
      <p style="font-size:1.05rem; text-align:center; margin-bottom:20px; color:var(--dark-muted);">Welcome to ESO Auto.</p>

      <div style="text-align:center; margin-top:40px;">
        <button class="btn btn-gold" onclick="navigateTo('cars')">Browse Cars Now</button>
      </div>
    </div>
  `;
}

// ---------- MOBILE MENU ----------
function toggleMobileMenu() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.mobile-menu');
  toggle.classList.toggle('active');
  menu.classList.toggle('active');
  document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle) toggle.classList.remove('active');
  if (menu) menu.classList.remove('active');
  document.body.style.overflow = '';
}

// ---------- SEARCH OVERLAY ----------
function openSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) {
    overlay.classList.add('active');
    const input = document.getElementById('search-input');
    if (input) setTimeout(() => input.focus(), 100);
  }
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.classList.remove('active');
}

function normalizeSearchText(value) {
  return (value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ');
}

function tokenizeSearchQuery(value) {
  return normalizeSearchText(value)
    .split(/\s+/)
    .filter(Boolean);
}

function scoreLocationMatch(query, location) {
  if (!query || !location) return 0;
  const normalizedQuery = normalizeSearchText(query);
  const normalizedLocation = normalizeSearchText(location);

  if (!normalizedLocation || !normalizedQuery) return 0;
  if (normalizedLocation === normalizedQuery) return 120;
  if (normalizedLocation.includes(normalizedQuery)) return 80;

  const queryWords = normalizedQuery.split(/\s+/);
  const locationWords = normalizedLocation.split(/\s+/);
  let common = 0;

  queryWords.forEach(word => {
    if (word.length < 2) return;
    const hasCloseWord = locationWords.some(locWord => {
      return locWord.startsWith(word) || word.startsWith(locWord);
    });
    if (hasCloseWord) common += 1;
  });

  return common > 0 ? common * 18 : 0;
}

function scoreCarMatch(car, query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 0;

  const queryTokens = tokenizeSearchQuery(normalizedQuery);
  if (!queryTokens.length) return 0;

  const searchable = {
    make: car.make || '',
    model: car.model || '',
    year: String(car.year || ''),
    condition: car.condition || '',
    bodyType: car.bodyType || '',
    location: car.seller && car.seller.location ? car.seller.location : '',
    seller: car.seller && car.seller.name ? car.seller.name : ''
  };

  const combinedText = Object.values(searchable).join(' ').toLowerCase();
  const queryText = normalizedQuery;

  let score = 0;

  if (combinedText.includes(queryText)) score += 120;

  const allFields = Object.values(searchable).map(value => normalizeSearchText(value));
  let tokenMatches = 0;

  queryTokens.forEach(token => {
    const matchFound = allFields.some(field => {
      if (!field) return false;
      return field.includes(token) || field.startsWith(token) || token.startsWith(field);
    });

    if (matchFound) {
      tokenMatches += 1;
      score += 35;
    }
  });

  if (searchable.make) {
    const makeText = normalizeSearchText(searchable.make);
    if (makeText.includes(queryText)) score += 90;
    if (queryTokens.some(token => makeText.includes(token))) score += 25;
  }

  if (searchable.model) {
    const modelText = normalizeSearchText(searchable.model);
    if (modelText.includes(queryText)) score += 100;
    if (queryTokens.some(token => modelText.includes(token))) score += 30;
  }

  if (searchable.bodyType) {
    const bodyText = normalizeSearchText(searchable.bodyType);
    if (queryTokens.some(token => bodyText.includes(token))) score += 15;
  }

  if (searchable.condition) {
    const condText = normalizeSearchText(searchable.condition);
    if (queryTokens.some(token => condText.includes(token))) score += 12;
  }

  if (searchable.location) score += scoreLocationMatch(queryText, searchable.location);
  if (searchable.seller) {
    const sellerText = normalizeSearchText(searchable.seller);
    if (queryTokens.some(token => sellerText.includes(token))) score += 18;
  }

  if (queryTokens.length > 1 && tokenMatches >= Math.min(2, queryTokens.length)) {
    score += 40;
  }

  return score;
}

function getSortedSearchMatches(query, sourceCars = VEHICLES) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [...sourceCars];

  return [...sourceCars]
    .map(car => ({ car, score: scoreCarMatch(car, normalizedQuery) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.car);
}

function liveSearch() {
  const query = normalizeSearchText(document.getElementById('search-input')?.value);
  const resultsEl = document.getElementById('search-results');

  if (!resultsEl) return;

  if (!query) {
    resultsEl.innerHTML = '';
    return;
  }

  const matches = getSortedSearchMatches(query, VEHICLES).slice(0, 8);

  if (matches.length === 0) {
    resultsEl.innerHTML = '<div class="no-results">No vehicles match your search.</div>';
  } else {
    resultsEl.innerHTML = matches.map(v => `
      <a href="#car/${v.id}" onclick="closeSearch()">
        <div>
          <div class="sr-title">${v.year} ${v.make} ${v.model.replace(v.make, '').trim()}</div>
          <div class="sr-price">${formatPrice(v.price)}</div>
          <div class="sr-meta">${v.condition} · ${v.seller.location}</div>
        </div>
      </a>
    `).join('');
  }
}

// ---------- MOBILE SEARCH ----------
function handleMobileSearch(value) {
  const query = normalizeSearchText(value);

  if (!query) return;

  currentFilters = {};
  currentSearchQuery = query;
  window._searchParams = { ...(window._searchParams || {}), searchQuery: query };
  navigateTo('cars');
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', async () => {
  await loadApprovedListings();

  // Render based on current hash
  renderPage();

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    renderPage();
  });

  // Close search on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeMobileMenu();
      closeMobileFilter();
    }
  });

  // Close search on clicking overlay background
  document.getElementById('search-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'search-overlay') closeSearch();
  });
});
