/* ========================================================
   CHAT WITH SONA - INTERACTIVE ASSISTANT & FLOATING WIDGET
======================================================== */

export function initChatWidget() {
  const triggerWrap = document.getElementById('sonaChatTriggerWrap');
  const openBtn = document.getElementById('sonaChatOpenBtn');
  const dismissBtn = document.getElementById('sonaChatDismissBtn');
  const pill = document.getElementById('sonaChatPill');
  const chatWindow = document.getElementById('sonaChatWindow');
  const closeBtn = document.getElementById('sonaChatCloseBtn');
  const chatBody = document.getElementById('sonaChatBody');
  const chatForm = document.getElementById('sonaChatForm');
  const chatInput = document.getElementById('sonaChatInput');
  const chipsContainer = document.getElementById('sonaChatChips');

  if (!chatWindow || !openBtn) return;

  let isPromptDismissed = false;

  // Toggle chat window open
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openChat();
  });

  // Close chat window
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeChat();
    });
  }

  // Dismiss pill prompt (collapses pill to keep just the floating avatar)
  if (dismissBtn) {
    dismissBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      isPromptDismissed = !isPromptDismissed;
      if (isPromptDismissed) {
        pill.classList.add('is-hidden');
        dismissBtn.style.display = 'none';
      } else {
        pill.classList.remove('is-hidden');
        dismissBtn.style.display = 'flex';
      }
    });
  }

  function openChat() {
    chatWindow.classList.add('is-open');
    chatWindow.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      if (chatInput) chatInput.focus();
      scrollChatToBottom();
    }, 150);
  }

  function closeChat() {
    chatWindow.classList.remove('is-open');
    chatWindow.setAttribute('aria-hidden', 'true');
  }

  function scrollChatToBottom() {
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  function getCurrentTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'sona-chat-msg msg-user';
    msg.innerHTML = `
      <div class="sona-chat-msg-bubble">${escapeHtml(text)}</div>
      <span class="sona-chat-msg-time">${getCurrentTime()}</span>
    `;
    chatBody.appendChild(msg);
    scrollChatToBottom();
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'sonaTypingIndicator';
    typing.className = 'sona-chat-typing';
    typing.innerHTML = `
      <span class="sona-chat-typing-dot"></span>
      <span class="sona-chat-typing-dot"></span>
      <span class="sona-chat-typing-dot"></span>
    `;
    chatBody.appendChild(typing);
    scrollChatToBottom();
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('sonaTypingIndicator');
    if (typing) typing.remove();
  }

  function appendBotMessage(html) {
    removeTypingIndicator();
    const msg = document.createElement('div');
    msg.className = 'sona-chat-msg msg-bot';
    msg.innerHTML = `
      <div class="sona-chat-msg-bubble">${html}</div>
      <span class="sona-chat-msg-time">${getCurrentTime()}</span>
    `;
    chatBody.appendChild(msg);
    scrollChatToBottom();
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Answer generation engine
  function generateReply(query) {
    const q = query.toLowerCase();

    if (q.includes('hair fall') || q.includes('hairfall') || q.includes('bal') || q.includes('rutine')) {
      return `🌿 <strong>Ayurveda 3-Step Hair Fall Routine:</strong><br><br>
      1️⃣ <strong>Ayurveda Hair Oil:</strong> Warm slightly & massage into scalp 2-3 nights a week.<br>
      2️⃣ <strong>Sulphate-Free Shampoo:</strong> Wash gently next morning without stripping natural scalp moisture.<br>
      3️⃣ <strong>Rosemary Spray:</strong> Spray directly on scalp roots daily after drying. No wash needed!<br><br>
      <em>Over 2.5 Lakh families have seen marked hair fall reduction in 3 weeks!</em>`;
    }

    if (q.includes('track') || q.includes('order') || q.match(/#?\d{4,}/)) {
      const match = q.match(/#?(\d{4,})/);
      if (match) {
        const orderId = match[1];
        return `📦 <strong>Order Status for #${orderId}:</strong><br><br>
        ✅ <strong>Status:</strong> Packed & Dispatched via BlueDart Express<br>
        📍 <strong>Origin:</strong> Katraj, Pune Facility<br>
        🚚 <strong>Estimated Delivery:</strong> Within 3-4 business days<br><br>
        Need priority assistance? Message Sonali directly on <a href="https://wa.me/919325260725?text=Hi%20Sona,%20checking%20status%20for%20order%20%23${orderId}" target="_blank" style="color:#09471f;font-weight:700;text-decoration:underline;">WhatsApp (+91 9325260725)</a>!`;
      }
      return `📦 To track your order, please type your 4-digit <strong>Order ID</strong> (e.g., <strong>#1024</strong>) or click the 'Track Order' icon in the top header. You can also send your order number directly to our team on WhatsApp!`;
    }

    if (q.includes('rosemary') || q.includes('spray')) {
      return `🧴 <strong>Rosemary Hair Spray Usage:</strong><br><br>
      Our rosemary water is steam-distilled from mountain rosemary leaves.<br>
      • Spray 5-6 pumps directly onto clean scalp & roots daily.<br>
      • Massage gently for 1-2 minutes.<br>
      • <strong>Do not rinse off</strong>—let the active herbal compounds nourish follicles all day!`;
    }

    if (q.includes('combo') || q.includes('best') || q.includes('recommend') || q.includes('buy')) {
      return `✨ <strong>Our Top Recommendations:</strong><br><br>
      ⭐ <strong>Oil + Shampoo Combo (₹999):</strong> Most loved combo for beginners targeting hair fall.<br>
      👑 <strong>5-in-1 Pro Max Combo (₹2,199):</strong> Full holistic regimen including Hair Oil, Shampoo, Conditioner, Rosemary Spray & Organic Mehndi!<br><br>
      All orders qualify for <strong>Extra ₹200 OFF</strong> on prepaid payment!`;
    }

    if (q.includes('whatsapp') || q.includes('call') || q.includes('contact') || q.includes('phone') || q.includes('number')) {
      return `💬 <strong>Contact Sonali Waghmode & Ayurveda:</strong><br><br>
      📱 <strong>WhatsApp:</strong> <a href="https://wa.me/919325260725?text=Hi%20Sona,%20I%20have%20a%20question%20about%20Ayurveda%20products" target="_blank" style="color:#166534;font-weight:800;text-decoration:underline;">+91 9325260725 (Click here)</a><br>
      📞 <strong>Helpline:</strong> +91 9325260725<br>
      📍 <strong>Address:</strong> Ayurveda, Katraj, Pune, Maharashtra 411046<br>
      ⏰ Mon - Sat: 10:00 AM - 7:00 PM`;
    }

    if (q.includes('ingredient') || q.includes('chemical') || q.includes('natural') || q.includes('sulphate')) {
      return `🌱 <strong>100% Pure & Clean Herbal Formulation:</strong><br><br>
      Made with traditional village ingredients: Bhringraj, Amla, Brahmi, Rosemary, Neem, Curry leaves, Methi seeds & Cold-pressed Coconut Oil.<br>
      🚫 <strong>Zero Sulphates</strong><br>
      🚫 <strong>Zero Parabens</strong><br>
      🚫 <strong>Zero Mineral Oils or Artificial Perfumes</strong>`;
    }

    if (q.includes('price') || q.includes('discount') || q.includes('offer') || q.includes('coupon')) {
      return `🏷️ <strong>Current Offers:</strong><br><br>
      🎉 <strong>Prepaid Discount:</strong> Automatic ₹200 OFF on UPI/Card prepaid checkout!<br>
      🚚 <strong>Free Shipping:</strong> Free express doorstep delivery across India on orders above ₹999.<br>
      🎟️ <strong>Welcome Code:</strong> Use <strong>HERBAL10</strong> for extra 10% off on your first order!`;
    }

    // Default polite consultation reply
    return `Namaste! 🙏 Thank you for asking. Our Ayurveda products are handcrafted in small batches using authentic Ayurvedic herbs.<br><br>
    Would you like guidance on <strong>Hair Fall Control</strong>, our <strong>Oil + Shampoo Combo</strong>, or would you like to speak directly with Sonali Waghmode on <a href="https://wa.me/919325260725?text=Hi%20Sona,%20I%20need%20haircare%20guidance" target="_blank" style="color:#09471f;font-weight:700;text-decoration:underline;">WhatsApp (+91 9325260725)</a>?`;
  }

  // Handle Form Submission
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      chatInput.value = '';
      appendUserMessage(text);
      showTypingIndicator();

      setTimeout(() => {
        const replyHtml = generateReply(text);
        appendBotMessage(replyHtml);
      }, 700);
    });
  }

  // Handle Quick Action Chips
  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.sona-chat-chip');
      if (!chip) return;

      const queryType = chip.dataset.query;
      let userText = chip.textContent;

      if (queryType === 'whatsapp') {
        window.open('https://wa.me/919325260725?text=Hi%20Sona,%20I%20have%20a%20question%20about%20Sona%20Herbal%20products', '_blank');
        return;
      }

      appendUserMessage(userText);
      showTypingIndicator();

      setTimeout(() => {
        let replyHtml = '';
        if (queryType === 'hair-fall') {
          replyHtml = generateReply('hair fall routine');
        } else if (queryType === 'track-order') {
          replyHtml = generateReply('track order');
        } else if (queryType === 'best-combo') {
          replyHtml = generateReply('best combo');
        } else if (queryType === 'rosemary') {
          replyHtml = generateReply('rosemary spray');
        } else {
          replyHtml = generateReply(userText);
        }
        appendBotMessage(replyHtml);
      }, 650);
    });
  }
}
