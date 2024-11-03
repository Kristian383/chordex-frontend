<template>
  <div class="privacy-policy">
    <h1>Privacy Policy for Chordex.net</h1>
    <p><strong>Effective Date:</strong> <span>November 2, 2024</span></p>
    
    <p>Thank you for visiting Chordex.net. Your privacy is important to us, and we are committed to protecting it. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your personal data.</p>

    <div class="policy-section">
      <h2>1. Information We Collect</h2>
      <p><strong>Personal Information:</strong> When you register, contact us, or use certain features on Chordex.net, we may collect information that can identify you, such as your name, email address, and other relevant data.</p>
      <p><strong>Non-Personal Information:</strong> We may collect non-identifiable information, such as browsing patterns, device information, and other analytics to improve our site.</p>
      <p><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to track your interactions with our site and improve user experience. You can manage your cookie preferences through your browser settings.</p>
    </div>

    <div class="policy-section">
      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul class="policy-section-list">
        <li>- Provide and maintain the services on Chordex.net.</li>
        <li>- Respond to inquiries and support requests.</li>
        <li>- Improve and personalize your experience on our website.</li>
      </ul>
    </div>

    <div class="policy-section">
      <h2>3. Data Sharing and Disclosure</h2>
      <p><strong>Third-Party Service Providers:</strong> We may share your information with third-party service providers who help us operate the site and perform essential services (e.g., hosting, analytics, customer support).</p>
      <p><strong>Legal Compliance:</strong> We may disclose your information to comply with applicable laws, regulations, or legal processes.</p>
    </div>

    <div class="policy-section">
      <h2>3. Data Sharing and Disclosure</h2>
      <p><strong>Third-Party Service Providers:</strong> We may share your information with third-party service providers who help us operate the site and perform essential services (e.g., hosting, analytics, customer support).</p>
      <p><strong>Legal Compliance:</strong> We may disclose your information to comply with applicable laws, regulations, or legal processes.</p>
    </div>

    <div class="policy-section">
      <h2>4. Your Rights and Choices</h2>
      <p><strong>Access and Update Information:</strong> You may request access to or correction of your personal data.</p>
      <p><strong>Data Deletion:</strong> You have the right to request deletion of your personal data, subject to legal obligations.</p>
    </div>

    <div class="policy-section">
      <h2>5. Data Security</h2>
      <p>We take security seriously and employ various safeguards to protect your data. However, no online transmission is 100% secure, so please take steps to secure your own information.</p>
    </div>

    <div class="policy-section">
      <h2>6. Third-Party Links</h2>
      <p>Chordex.net may contain links to external sites. We are not responsible for the privacy practices or content of these third-party sites.</p>
    </div>

    <div class="policy-section">
      <h2>7. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date."</p>
    </div>

    <div class="policy-section">
      <h2>Contact Us</h2>
      <p>If you have any questions or concerns regarding this Privacy Policy, please <router-link :to="{ path: '/about', hash: '#contact-me' }">contact us</router-link>.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.privacy-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.privacy-policy h1 {
  text-align: center;
}

.policy-section {
  margin-top: 1.25rem;

  .policy-section-list {
    padding: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 1rem;
    }
  }
}

.policy-section h2 {
  font-size: 1.5em;
  margin-bottom: 0.875rem;
}
</style>
