export function initOrderTracker() {
  const modal = document.getElementById('orderTrackModal');
  const openBtns = document.querySelectorAll('.track-order-trigger');
  const closeBtn = document.getElementById('trackModalClose');
  const form = document.getElementById('orderTrackForm');
  const resultBox = document.getElementById('orderTrackResult');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (resultBox) resultBox.style.display = 'none';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(b => b.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('trackOrderInput').value.trim();
      if (!input) return;

      const orderId = input.toUpperCase().startsWith('SONA-') ? input.toUpperCase() : `SONA-${input}`;

      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="background: #f7faf7; border: 1px solid #c2e2c8; border-radius: 16px; padding: 24px; margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <span style="font-size: 12px; color: #666; font-weight: 700;">ORDER NUMBER</span>
              <h4 style="font-size: 18px; color: #084e10; font-weight: 900;">${orderId}</h4>
            </div>
            <span style="background: #e8f5e9; color: #1b5e20; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px;">
              IN TRANSIT (FAST DELIVERY)
            </span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; position: relative; padding-left: 20px; border-left: 2px solid #084e10; margin: 20px 0;">
            <div>
              <strong style="display: block; font-size: 14px; color: #111;">Out for Delivery</strong>
              <span style="font-size: 12px; color: #777;">Expected today by 7:00 PM via Shiprocket Express</span>
            </div>
            <div>
              <strong style="display: block; font-size: 14px; color: #111;">Dispatched from Pune Hub</strong>
              <span style="font-size: 12px; color: #777;">Katraj Processing Facility, Pune, Maharashtra</span>
            </div>
            <div>
              <strong style="display: block; font-size: 14px; color: #111;">Order Confirmed & Prepared</strong>
              <span style="font-size: 12px; color: #777;">Fresh batch packed with genuine herbal extracts</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 18px;">
            <a href="https://wa.me/919325260725?text=Hi%20Sona%20Herbal,%20checking%20status%20of%20order%20${orderId}" target="_blank" style="flex: 1; text-align: center; background: #25D366; color: #fff; padding: 10px; border-radius: 20px; font-size: 13px; font-weight: 700;">
              WhatsApp Support
            </a>
            <a href="tel:9325260725" style="flex: 1; text-align: center; background: #084e10; color: #fff; padding: 10px; border-radius: 20px; font-size: 13px; font-weight: 700;">
              Call 9325260725
            </a>
          </div>
        </div>
      `;
    });
  }
}
