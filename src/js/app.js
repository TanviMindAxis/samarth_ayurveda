import { products } from '../data/products.js';
import { reviews } from '../data/reviews.js';
import { faqs } from '../data/faqs.js';
import { reels } from '../data/reels.js';
import { cart } from './cart.js';
import { initHeroSlideshow } from './slideshow.js';
import { initReels } from './reels.js';
import { initFAQ } from './faq.js';
import { initSearch } from './search.js';
import { renderProductDetail } from './pdp.js';
import { initOrderTracker } from './orderTracker.js';
import { initPolicyModal } from './policyModal.js';
import { initChatWidget } from './chat.js';

let currentCategory = 'All';
let currentView = 'home'; // 'home' | 'products' | 'contact' | 'pdp'

export function initApp() {
  cart.render();
  renderApp();
  setupGlobalEvents();
}

function renderApp() {
  const mainEl = document.getElementById('mainContent');
  if (!mainEl) return;

  if (currentView === 'home') {
    renderHomeView(mainEl);
  } else if (currentView === 'products') {
    renderProductsView(mainEl);
  } else if (currentView === 'contact') {
    renderContactView(mainEl);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================================
   RENDER HOMEPAGE
======================================================== */
function renderHomeView(mainEl) {
  mainEl.innerHTML = `
    <!-- 1. INSTAGRAM REEL STORIES -->
    <section class="reels-section">
      <div class="reels-container">
        <div class="reels-row">
          ${reels.map(r => `
            <button class="reel-item" data-index="${r.id}" type="button">
              <span class="reel-ring">
                <img class="reel-thumb" src="${r.thumb}" alt="${r.title}" loading="lazy" />
              </span>
              <span class="reel-title">${r.title}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 2. HERO SLIDESHOW -->
    <section class="hero-slideshow-section" id="heroSlideshow">
      <div class="hero-slides-wrapper">
        <!-- Slide 1 -->
        <div class="hero-slide active">
          <picture>
            <source media="(max-width: 749px)" srcset="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/Untitled_design_13.svg?v=1788326707" />
            <img src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/Untitled_design_62.png?v=1788326706" alt="Ayurveda Founder Award" loading="eager" />
          </picture>
        </div>

        <!-- Slide 2 -->
        <div class="hero-slide">
          <picture>
            <source media="(max-width: 749px)" srcset="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/Sona_Herbal_Founder_Award_Template_-_Portrait_2.svg?v=1788326706" />
            <img src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/Sona_Herbal_Founder_Award_Template_-_Landscape_1400_x_788_px.png?v=1788326706" alt="Ayurveda Founder Award" loading="lazy" />
          </picture>
        </div>

        <!-- Slide 3 -->
        <div class="hero-slide">
          <picture>
            <source media="(max-width: 749px)" srcset="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/ChatGPT_Image_Jul_9_2026_12_51_42_AM.png?v=1783538738" />
            <img src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/ChatGPT_Image_Jul_9_2026_12_01_08_AM.png?v=1783535534" alt="Ayurveda Range" loading="lazy" />
          </picture>
        </div>
      </div>

      <!-- Slideshow Navigation -->
      <button class="hero-nav-arrow hero-prev-arrow" type="button" aria-label="Previous Slide">‹</button>
      <button class="hero-nav-arrow hero-next-arrow" type="button" aria-label="Next Slide">›</button>

      <div class="hero-dots-container">
        <button class="hero-dot active" data-slide="0" aria-label="Slide 1"></button>
        <button class="hero-dot" data-slide="1" aria-label="Slide 2"></button>
        <button class="hero-dot" data-slide="2" aria-label="Slide 3"></button>
      </div>
    </section>

    <!-- 3. FEATURED COLLECTION / CURATED FOR YOU (Exact Reference Match) -->
    <section class="fc-clean" id="curatedSection">
      <div class="fc-shell">
        <div class="fc-header">
          <h2 class="fc-heading">Curated For You</h2>
          <a class="fc-viewall" href="#productsSection" id="homeViewAllBtn">View All</a>
        </div>

        <div class="fc-slider" id="homeProductsSlider">
          ${products.map(p => `
            <div class="fc-card" data-id="${p.id}">
              <a href="#product/${p.id}" class="fc-img-wrap" data-id="${p.id}">
                ${p.badge ? `<span class="fc-badge">${p.badge}</span>` : ''}
                <img src="${p.primaryImg}" alt="${p.title}" class="fc-img" loading="lazy" />
              </a>

              <div class="fc-info">
                <a href="#product/${p.id}" class="fc-title-product" data-id="${p.id}">
                  ${p.title}
                </a>

                <div class="fc-price-row">
                  <span class="fc-price">Rs. ${p.salePrice.toLocaleString()}.00</span>
                  ${p.regularPrice > p.salePrice ? `<span class="fc-compare">Rs. ${p.regularPrice.toLocaleString()}.00</span>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 3.5 BRAND TRUST TICKER RIBBON (Floating Green Line) -->
    <div class="sona-brand-ticker-ribbon" aria-label="Brand Trust Highlights">
      <div class="sona-brand-ticker-track">
        ${[...Array(4)].map(() => `
          <div class="sona-brand-ticker-item">
            <span class="ticker-text-normal">Trusted by 2.5L Customers</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-bold">100% Natural</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-normal">Original</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-bold">Official Ayurveda</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-normal">Authentic</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-bold">No Chemical Used</span>
            <span class="ticker-dot"></span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 4. LUXURY 3D UNIVERSAL SHOWCASE (Exact Reference Match) -->
    <section class="sona-luxury-3d-section">
      <div class="sona-luxury-bg"></div>
      <div class="sona-noise"></div>
      <div class="sona-orb sona-orb-1"></div>
      <div class="sona-orb sona-orb-2"></div>
      <div class="sona-orb sona-orb-3"></div>

      <div class="sona-luxury-container">
        <!-- Left Column: Heading, Description, 3 Points, Buttons & Tabs -->
        <div class="sona-copy" data-depth="0.08">
          <h2 class="sona-heading">
            stronger, smoother <span class="sona-heading-amp">&amp;</span>
            <span class="sona-heading-line2">healthier hair</span>
          </h2>

          <p class="sona-description">
            At Ayurveda, we bring together trusted herbal ingredients and thoughtful formulations to create haircare that feels natural, gentle, and effective. From herbal shampoo to nourishing hair oil and traditional mehandi care, every product is made to support healthy-looking hair with the goodness of nature.
          </p>

          <!-- 3 Accordion / Points Cards with Star Sparkle Icon -->
          <div class="sona-points">
            <div class="sona-point">
              <div class="sona-point-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#1b5e20">
                  <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z"/>
                </svg>
              </div>
              <div class="sona-point-text">
                <strong>Herbal shampoo for everyday care</strong>
                <span>Helps cleanse the scalp gently while leaving hair feeling fresh, smooth, and manageable.</span>
              </div>
            </div>

            <div class="sona-point">
              <div class="sona-point-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#1b5e20">
                  <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z"/>
                </svg>
              </div>
              <div class="sona-point-text">
                <strong>Nourishing herbal hair oil</strong>
                <span>Crafted to support your regular haircare routine with a rich blend inspired by traditional care.</span>
              </div>
            </div>

            <div class="sona-point">
              <div class="sona-point-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#1b5e20">
                  <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z"/>
                </svg>
              </div>
              <div class="sona-point-text">
                <strong>Rooted in natural ingredients</strong>
                <span>Made for those who prefer herbal, nature-inspired haircare for everyday use.</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons (Shop Herbal Haircare & Know More About Us) -->
          <div class="sona-luxury-actions">
            <a href="#productsSection" class="sona-btn-shop">Shop Herbal Haircare</a>
            <a href="#founderSection" class="sona-btn-know-more">Know More About Us</a>
          </div>

          <!-- Bottom Feature Tabs / Cards -->
          <div class="sona-luxury-tabs">
            <div class="sona-tab-card">
              <h4>Herbal Shampoo</h4>
              <p>Gentle cleansing with a natural care feel</p>
            </div>
            <div class="sona-tab-card">
              <h4>Hair Oil</h4>
              <p>Nourishing care for your regular routine</p>
            </div>
            <div class="sona-tab-card">
              <h4>Natural Care</h4>
              <p>Inspired by trusted herbal traditions</p>
            </div>
          </div>
        </div>

        <!-- Right Column: 3D Interactive Stage -->
        <div class="sona-stage" id="sonaStage">
          <div class="sona-stage-glow"></div>
          <div class="sona-ring ring-a"></div>
          <div class="sona-ring ring-b"></div>

          <div class="sona-spotlight" id="sonaSpotlight" data-depth="0.10">
            <div class="sona-spotlight-shadow"></div>

            <div class="sona-main-visual" id="sonaMainVisual">
              <!-- Left Side Card (Tilted) -->
              <div class="sona-side-card side-card-left">
                <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/Oil_edited.png?v=1774590337" alt="Ayurveda herbal hair oil" />
              </div>

              <!-- Main Front Card (Central) -->
              <div class="sona-main-card front-card">
                <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN4.png?v=1774590149" alt="Ayurveda herbal shampoo premium product" />
              </div>

              <!-- Right Side Card (Tilted with Herbal Haircare Chip) -->
              <div class="sona-side-card side-card-right">
                <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN10.png?v=1774590040" alt="Ayurveda herbal product combo" />
                <span class="chip-on-card">Herbal Haircare</span>
              </div>
            </div>

            <!-- Floating Traditional Care Card (Overlapping mid-left of visual) -->
            <div class="sona-float-card float-card-mid-left" data-depth="0.22">
              <span class="sona-float-badge">Traditional Care</span>
              <p>Inspired by time-trusted herbal hair rituals for everyday beauty and care.</p>
            </div>

            <!-- Floating Pill Chips -->
            <div class="sona-chip chip-bottom-left" data-depth="0.28">Naturally Inspired</div>
            <div class="sona-chip chip-bottom-right" data-depth="0.30">Shampoo • Oil • Mehandi</div>
          </div>

          <!-- Gallery Strip at Bottom -->
          <div class="sona-gallery-strip">
            <div class="sona-gallery-card">
              <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN3.png?v=1774590337" alt="Ayurveda combo photo" />
            </div>
            <div class="sona-gallery-card">
              <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN9.png?v=1774590040" alt="Ayurveda shampoo setup" />
            </div>
            <div class="sona-gallery-card">
              <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN10.png?v=1774590040" alt="Ayurveda herbal product shot" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. CUSTOMER LOVE / REVIEWS SECTION (Exact Reference Match) -->
    <section class="sona-reviews-section">
      <div class="sona-reviews-inner">
        <div class="sona-reviews-eyebrow">Customer Love</div>
        <h2 class="sona-reviews-title">Loved by Happy Customers</h2>
        <p class="sona-reviews-subtitle">Real reviews from customers who trusted Ayurveda for natural hair care.</p>
      </div>

      <div class="sona-reviews-marquee">
        <div class="sona-reviews-track">
          ${[...reviews, ...reviews].map(r => `
            <div class="sona-review-card">
              <div>
                <div class="sona-review-stars">★★★★★</div>
                <div class="sona-review-product">${r.product}</div>
                <p class="sona-review-text">${r.text}</p>
              </div>
              <div class="sona-review-user">
                <div class="sona-review-avatar">${r.avatar}</div>
                <div>
                  <p class="sona-review-name">${r.author}</p>
                  <p class="sona-review-city">${r.city}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="sona-reviews-inner">
        <div class="sona-review-badges">
          <div class="sona-review-badge">★★★★★ Rated by Customers</div>
          <div class="sona-review-badge">Natural Hair Care</div>
          <div class="sona-review-badge">Fast Delivery</div>
          <div class="sona-review-badge">Trusted Herbal Products</div>
        </div>
      </div>
    </section>

    <!-- 6. FEATURED IN NEWS SECTION (Exact reference match) -->
    <section class="sona-news-feature">
      <div class="sona-news-wrap">
        <div class="sona-news-image">
          <img
            src="./images/sona-news-feature.jpg"
            alt="Ayurveda featured in newspaper"
            onerror="this.src='https://cdn.shopify.com/s/files/1/0601/8242/9745/files/SnapInsta.to_731702558_18000499061956624_3334212273510406262_n.jpg?v=1783541788'"
            loading="lazy"
          />
        </div>

        <div class="sona-news-content">
          <div class="sona-news-eyebrow">Featured in News</div>
          <h2>From a Small Village to Thousands of Homes</h2>
          <p>Ayurveda’s journey has been featured in the news for bringing homemade herbal hair care from Hirakani Sonali Waghmode to customers across India.</p>

          <div class="sona-news-points">
            <div class="sona-news-point">Founder-led homemade herbal brand</div>
            <div class="sona-news-point">Rooted in traditional hair care wisdom</div>
            <div class="sona-news-point">Trusted by thousands of happy customers</div>
          </div>

          <div>
            <div class="sona-news-badge">Recognised for Natural Hair Care</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. FREQUENTLY ASKED QUESTIONS -->
    <section class="faq-section" id="faqSection">
      <div class="faq-container">
        <div class="faq-header">
          <div class="faq-eyebrow">FAQs</div>
          <h2 class="faq-title">Frequently Asked Questions</h2>
          <p class="faq-subtitle">Everything you need to know about Ayurveda’s natural hair care products.</p>
        </div>

        <div class="faq-list">
          ${faqs.map((f, i) => `
            <div class="faq-item ${i === 0 ? 'active' : ''}">
              <button class="faq-question-btn" type="button">
                <span>${f.question}</span>
                <span class="faq-toggle-icon" aria-hidden="true">
                  <svg class="faq-icon-svg" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </button>
              <div class="faq-answer-wrap">
                <div class="faq-answer-inner">${f.answer}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 8. MEET OUR FOUNDER (Exact Reference Match) -->
    <section class="sona-founder" id="founderSection">
      <div class="sf-wrap">
        <div class="sf-image">
          <img
            src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/0Q7A2433.jpg_1_1.jpg?v=1783542548"
            alt="Sonali Waghmode Founder of Ayurveda"
            loading="lazy"
          />
          <div class="sf-badge">
            <span>Founder</span>
            Sonali Waghmode
          </div>
        </div>

        <div class="sf-content">
          <div class="sf-eyebrow">Meet Our Founder</div>
          <h2>Rooted in Tradition, Made with Care.</h2>
          <p>Ayurveda was started by Sonali Waghmode with a simple belief — hair care should be natural, honest and trusted by every family.</p>
          <p>Inspired by traditional herbal knowledge, every product is thoughtfully prepared to bring pure, effective and gentle hair care into Indian homes.</p>

          <div class="sf-quote">
            “Our goal is to make herbal hair care simple, trustworthy and accessible for every home.”
          </div>

          <div class="sf-name">
            <div>
              <div class="sf-sign">Sonali</div>
              <div class="sf-role">Founder, Ayurveda</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. OUR PROMISE & STATS (Exact Reference Match) -->
    <section class="sona-promise-white">
      <div class="spw-wrap">
        <div class="spw-head">
          <div class="spw-eyebrow">Our Promise</div>
          <h2>Pure Ingredients.<br>Honest Hair Care.</h2>
          <p>Every Ayurveda product is thoughtfully prepared using traditional herbal ingredients to nourish your hair naturally.</p>
        </div>

        <div class="spw-grid">
          <div class="spw-card">
            <div class="spw-icon">
              <svg viewBox="0 0 24 24"><path d="M5 21c8-1 14-7 15-18C10 4 4 10 3 20"/><path d="M4 20c4-5 8-8 14-11"/></svg>
            </div>
            <h3>100% Herbal</h3>
            <p>Prepared with carefully selected herbal ingredients inspired by traditional Indian hair care.</p>
          </div>

          <div class="spw-card">
            <div class="spw-icon">
              <svg viewBox="0 0 24 24"><path d="M9 2h6"/><path d="M10 2v6l-5 9a4 4 0 0 0 3.5 6h7a4 4 0 0 0 3.5-6l-5-9V2"/><path d="M7 16h10"/></svg>
            </div>
            <h3>No Harsh Chemicals</h3>
            <p>Gentle formulas made without unnecessary harsh chemicals for everyday family use.</p>
          </div>

          <div class="spw-card">
            <div class="spw-icon">
              <svg viewBox="0 0 24 24"><path d="M7 10h10"/><path d="M8 10l1 10h6l1-10"/><path d="M9 6a3 3 0 0 1 6 0v4"/><path d="M4 20h16"/></svg>
            </div>
            <h3>Traditional Formula</h3>
            <p>Rooted in age-old herbal wisdom and prepared with care for healthy-looking hair.</p>
          </div>

          <div class="spw-card">
            <div class="spw-icon">
              <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9z"/></svg>
            </div>
            <h3>Trusted by 2.5L+</h3>
            <p>Loved by thousands of customers across India as part of their hair care routine.</p>
          </div>
        </div>

        <div class="spw-stats">
          <div class="spw-stat">
            <strong>2.5L+</strong>
            <span>Happy Customers</span>
          </div>
          <div class="spw-stat">
            <strong>100%</strong>
            <span>Herbal Focus</span>
          </div>
          <div class="spw-stat">
            <strong>4.8★</strong>
            <span>Customer Rating</span>
          </div>
        </div>
      </div>
    </section>
  `;

  // Initialize interactive subcomponents
  initHeroSlideshow();
  initReels();
  initFAQ();
  initProductSlider();
  attachHomeEventListeners();
  initLuxury3DStage();
}

/* ========================================================
   RENDER ALL PRODUCTS VIEW
======================================================== */
function renderProductsView(mainEl) {
  mainEl.innerHTML = `
    <div style="padding: 40px 0 80px; background: #f8f8f8;">
      <div class="site-container">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: clamp(32px, 4vw, 44px); font-weight: 900; margin-bottom: 12px;">Our Complete Collection</h1>
          <p style="color: #666; max-width: 600px; margin: 0 auto;">
            Explore our authentic, homemade Ayurvedic hair care range prepared with love and natural botanicals.
          </p>
        </div>

        <!-- Category Filters -->
        <div class="category-filter-bar" style="justify-content: center; margin-bottom: 36px;">
          <button class="filter-pill ${currentCategory === 'All' ? 'active' : ''}" data-cat="All">All Products (12)</button>
          <button class="filter-pill ${currentCategory === 'Combos & Kits' ? 'active' : ''}" data-cat="Combos & Kits">Combos & Kits (6)</button>
          <button class="filter-pill ${currentCategory === 'Hair Oils' ? 'active' : ''}" data-cat="Hair Oils">Hair Oils</button>
          <button class="filter-pill ${currentCategory === 'Shampoos & Conditioners' ? 'active' : ''}" data-cat="Shampoos & Conditioners">Shampoos & Conditioners</button>
          <button class="filter-pill ${currentCategory === 'Hair Sprays & Mehndi' ? 'active' : ''}" data-cat="Hair Sprays & Mehndi">Sprays & Mehndi</button>
        </div>

        <!-- Grid -->
        <div class="products-grid" id="catalogProductsGrid">
          ${renderProductCards(getFilteredProducts())}
        </div>
      </div>
    </div>
  `;

  attachProductCardEvents();

  // Filter click
  mainEl.querySelectorAll('.filter-pill').forEach(pill => {
    pill.onclick = () => {
      currentCategory = pill.dataset.cat;
      renderProductsView(mainEl);
    };
  });
}

/* ========================================================
   RENDER CONTACT VIEW
======================================================== */
function renderContactView(mainEl) {
  mainEl.innerHTML = `
    <section class="contact-section">
      <div class="site-container">
        <div class="contact-header">
          <h1 class="contact-title">Contact Us</h1>
          <p class="contact-subtitle">
            Have questions about our herbal formulations or your order? We’re always here to help you.
          </p>
        </div>

        <div class="contact-grid">
          <!-- Form -->
          <div class="contact-form-card">
            <form class="contact-form" id="contactForm">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Your Name</label>
                  <input class="form-input" type="text" name="name" required placeholder="Sonali Sharma" />
                </div>
                <div class="form-group">
                  <label class="form-label">Email *</label>
                  <input class="form-input" type="email" name="email" required placeholder="you@example.com" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input class="form-input" type="tel" name="phone" placeholder="9876543210" />
                </div>
                <div class="form-group">
                  <label class="form-label">Order Number (if any)</label>
                  <input class="form-input" type="text" name="order" placeholder="SONA-1024" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Country</label>
                <select class="form-select" name="country">
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Other">Other Country</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Your Message *</label>
                <textarea class="form-textarea" name="message" required placeholder="How can we assist you with our herbal hair care products?"></textarea>
              </div>

              <button class="contact-submit-btn" type="submit" id="contactSubmitBtn">
                Send Message
              </button>
            </form>
          </div>

          <!-- Store Info Cards -->
          <div class="contact-info-wrap">
            <div class="contact-card">
              <div class="contact-card-icon">📞</div>
              <div class="contact-card-body">
                <h3>Call or WhatsApp Us</h3>
                <p>Support line: <a href="tel:9325260725">+91 9325260725</a></p>
                <p style="font-size: 12px; color: #888; margin-top: 4px;">Mon - Sat, 9:00 AM – 7:00 PM IST</p>
              </div>
            </div>

            <div class="contact-card">
              <div class="contact-card-icon">✉️</div>
              <div class="contact-card-body">
                <h3>Email Support</h3>
                <p><a href="mailto:Jitwellness2025@gmail.com">Jitwellness2025@gmail.com</a></p>
                <p style="font-size: 12px; color: #888; margin-top: 4px;">Replies typically within 24 hours</p>
              </div>
            </div>

            <div class="contact-card">
              <div class="contact-card-icon">📍</div>
              <div class="contact-card-body">
                <h3>Facility Address</h3>
                <p>Oil company SR No. 8/3 Khopdenagar, Katraj, Pune, Maharashtra 411046.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('contactSubmitBtn');
      btn.textContent = 'Message Sent! ✓';
      btn.style.backgroundColor = '#0a9b61';
      setTimeout(() => {
        alert('Thank you! Your message has been received by Ayurveda team. We will get back to you shortly.');
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.style.backgroundColor = '';
      }, 500);
    });
  }
}

/* ========================================================
   RENDER PRODUCT CARDS
======================================================== */
function getFilteredProducts() {
  if (currentCategory === 'All') return products;
  return products.filter(p => p.category === currentCategory);
}

function renderProductCards(list) {
  return list.map(p => {
    const hasSecondary = Boolean(p.secondaryImg);
    const badgeClass = p.badge?.toLowerCase().includes('sale') || p.badge?.includes('%') ? 'sale' : 'bestseller';
    return `
      <div class="product-card ${hasSecondary ? '' : 'single-img'}" data-id="${p.id}">
        <div class="product-card-media" data-id="${p.id}">
          ${p.badge ? `<div class="product-badge-wrap"><span class="product-badge ${badgeClass}">${p.badge}</span></div>` : ''}
          <img class="product-card-img primary-img" src="${p.primaryImg}" alt="${p.title}" loading="lazy" />
          ${hasSecondary ? `<img class="product-card-img secondary-img" src="${p.secondaryImg}" alt="${p.title}" loading="lazy" />` : ''}
        </div>

        <div class="product-card-body">
          <div class="product-card-rating">
            <span class="stars-gold">★★★★★</span>
            <span class="rating-count">(${p.reviewsCount})</span>
          </div>

          <h3 class="product-card-title" data-id="${p.id}">${p.title}</h3>

          <div class="product-price-row">
            <span class="sale-price">Rs. ${p.salePrice.toLocaleString()}.00</span>
            ${p.regularPrice > p.salePrice ? `<span class="regular-price">Rs. ${p.regularPrice.toLocaleString()}.00</span>` : ''}
          </div>

          <button class="add-to-cart-btn" data-id="${p.id}" type="button">
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function initProductSlider() {
  const slider = document.getElementById('homeProductsSlider');
  if (!slider) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  function getStep() {
    const card = slider.querySelector('.fc-card') || slider.querySelector('.product-card');
    return card ? card.offsetWidth + 18 : 338;
  }

  function slideNext() {
    const step = getStep();
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft >= maxScroll - 15) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: step, behavior: 'smooth' });
    }
  }

  function startAuto() {
    stopAuto();
    productSliderAutoTimer = setInterval(slideNext, 3500);
  }

  function stopAuto() {
    if (productSliderAutoTimer) clearInterval(productSliderAutoTimer);
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    stopAuto();
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      startAuto();
    }
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.3;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchstart', stopAuto, { passive: true });
  slider.addEventListener('touchend', startAuto, { passive: true });

  startAuto();
}

/* ========================================================
   EVENT LISTENERS & NAVIGATION
======================================================== */
function attachHomeEventListeners() {
  // Category filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      currentCategory = pill.dataset.cat;
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.toggle('active', p === pill));
      const slider = document.getElementById('homeProductsSlider');
      if (slider) {
        slider.innerHTML = renderProductCards(getFilteredProducts());
        slider.scrollLeft = 0;
        attachProductCardEvents();
        initProductSlider();
      }
    });
  });

  const viewAllBtn = document.getElementById('homeViewAllBtn');
  if (viewAllBtn) {
    viewAllBtn.onclick = (e) => {
      e.preventDefault();
      currentView = 'products';
      currentCategory = 'All';
      renderApp();
    };
  }

  const luxuryShopBtn = document.getElementById('luxuryShopBtn');
  if (luxuryShopBtn) {
    luxuryShopBtn.onclick = (e) => {
      e.preventDefault();
      currentView = 'products';
      renderApp();
    };
  }

  const luxuryAboutBtn = document.getElementById('luxuryAboutBtn');
  if (luxuryAboutBtn) {
    luxuryAboutBtn.onclick = (e) => {
      e.preventDefault();
      const el = document.getElementById('founderSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
  }

  attachProductCardEvents();
}

function attachProductCardEvents() {
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      cart.addItem(id, 1);
      btn.classList.add('added');
      btn.querySelector('span').textContent = 'Added ✓';
      setTimeout(() => {
        btn.classList.remove('added');
        btn.querySelector('span').textContent = 'Add to Cart';
      }, 1200);
    };
  });

  // Product media or title click -> Open PDP
  document.querySelectorAll('.product-card-media, .product-card-title, .fc-img-wrap, .fc-title-product, .fc-card').forEach(el => {
    el.onclick = (e) => {
      if (e.target.closest('.add-to-cart-btn')) return;
      const id = Number(el.dataset.id || el.closest('[data-id]')?.dataset.id);
      if (id) {
        e.preventDefault();
        openProductDetailPage(id);
      }
    };
  });
}

function openProductDetailPage(productId) {
  currentView = 'pdp';
  const mainEl = document.getElementById('mainContent');
  renderProductDetail(productId, mainEl);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Breadcrumb back links
  mainEl.querySelectorAll('[data-nav]').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const nav = link.dataset.nav;
      currentView = nav;
      renderApp();
    };
  });
}

/* ========================================================
   LUXURY 3D INTERACTIVE STAGE TILT
======================================================== */
function initLuxury3DStage() {
  const stage = document.getElementById('sonaStage');
  const mainVisual = document.getElementById('sonaMainVisual');
  const spotlight = document.getElementById('sonaSpotlight');
  if (!stage) return;

  const section = stage.closest('.sona-luxury-3d-section') || document;
  const layers = section.querySelectorAll('[data-depth]');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouch) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
        const moveX = x * depth * 85;
        const moveY = y * depth * 85;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      if (mainVisual) {
        const rotateY = x * 14;
        const rotateX = -y * 12;
        mainVisual.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    stage.addEventListener('mouseleave', () => {
      layers.forEach(layer => {
        layer.style.transform = 'translate3d(0, 0, 0)';
      });
      if (mainVisual) {
        mainVisual.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
      }
    });
  }
}

/* ========================================================
   GLOBAL EVENTS SETUP
======================================================== */
function setupGlobalEvents() {
  // 1. Navigation links
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.dataset.route;
      currentView = route;
      renderApp();

      // Close mobile drawer if open
      closeMobileDrawer();
    });
  });

  // 2. Mobile Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileClose = document.getElementById('mobileDrawerClose');
  const backdrop = document.getElementById('modalBackdrop');

  function openMobileDrawer() {
    if (mobileDrawer && backdrop) {
      mobileDrawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer && backdrop) {
      mobileDrawer.classList.remove('open');
      if (!document.getElementById('cartDrawer')?.classList.contains('open')) {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }

  if (mobileToggle) mobileToggle.onclick = openMobileDrawer;
  if (mobileClose) mobileClose.onclick = closeMobileDrawer;

  // 3. Cart Drawer Toggle
  document.querySelectorAll('.cart-drawer-trigger').forEach(btn => {
    btn.onclick = () => cart.openDrawer();
  });

  const cartClose = document.getElementById('cartDrawerClose');
  if (cartClose) cartClose.onclick = () => cart.closeDrawer();

  if (backdrop) {
    backdrop.onclick = () => {
      closeMobileDrawer();
      cart.closeDrawer();
    };
  }

  // 4. Cart Promo Code Apply
  const promoBtn = document.getElementById('cartPromoBtn');
  const promoInput = document.getElementById('cartPromoInput');
  if (promoBtn && promoInput) {
    promoBtn.onclick = () => {
      const res = cart.applyPromo(promoInput.value);
      alert(res.message);
    };
  }

  // 5. Checkout Button in Drawer
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (cart.items.length === 0) {
        alert('Your cart is empty! Add products to proceed.');
        return;
      }
      alert(`Proceeding to Fastrr / Shiprocket 1-Click Secure Checkout for Rs. ${cart.getTotal().toLocaleString()}.00 (Prepaid Orders qualify for Extra ₹200 OFF).`);
    };
  }

  // 6. Language Selector Dropdown
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  if (langBtn && langDropdown) {
    langBtn.onclick = (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    };

    document.querySelectorAll('.lang-item').forEach(item => {
      item.onclick = (e) => {
        e.stopPropagation();
        const code = item.dataset.lang;
        const name = item.dataset.name;
        document.getElementById('currentLangCode').textContent = code;
        langDropdown.classList.remove('open');
      };
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('open');
    });
  }

  // 7. Search Modal
  initSearch((productId) => {
    openProductDetailPage(productId);
  });

  // 8. Order Tracking Modal
  initOrderTracker();

  // 9. Policies Modal
  initPolicyModal();

  // 10. Footer Newsletter Form & Language selector
  const newsletterForm = document.getElementById('footerNewsletterForm');
  if (newsletterForm) {
    newsletterForm.onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById('footerEmailInput');
      if (input && input.value) {
        alert(`Thank you for subscribing! A 10% welcome discount voucher (HERBAL10) has been sent to ${input.value}.`);
        newsletterForm.reset();
      }
    };
  }

  const footerLangSelect = document.getElementById('footerLanguageSelect');
  if (footerLangSelect) {
    footerLangSelect.addEventListener('change', (e) => {
      const code = e.target.value.toUpperCase();
      const currentCodeEl = document.getElementById('currentLangCode');
      if (currentCodeEl) currentCodeEl.textContent = code;
    });
  }

  // 11. Floating Chat with Sona Widget & Chat Application
  initChatWidget();
}
