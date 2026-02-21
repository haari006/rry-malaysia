import { COMPANY_INFO } from '@/lib/company'

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-soft-grey py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">Terms of Service</h1>
          <p className="text-deep-grey">Last updated: {new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Agreement to Terms</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of the RRY Malaysia website and services. By accessing or using our website, you agree to be bound by these Terms.
            </p>
            <p className="text-deep-grey leading-relaxed">
              If you do not agree with these Terms, you must not access or use our services.
            </p>
          </section>

          {/* Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Our Services</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              RRY Malaysia provides trading services for:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li>Heavy machinery (used and reconditioned construction equipment)</li>
              <li>Scrap metal (ferrous and non-ferrous materials)</li>
              <li>Spare parts and related equipment</li>
            </ul>
            <p className="text-deep-grey leading-relaxed mt-4">
              All transactions are subject to availability, pricing, and terms agreed upon between parties.
            </p>
          </section>

          {/* User Obligations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">User Obligations</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              By using our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not engage in any fraudulent or deceptive practices</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not interfere with or disrupt our services</li>
            </ul>
          </section>

          {/* Transactions and Pricing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Transactions and Pricing</h2>
            
            <h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">Pricing</h3>
            <p className="text-deep-grey leading-relaxed mb-4">
              All prices are subject to change without notice. Prices quoted are valid only for the period specified in the quotation. We reserve the right to modify prices at any time.
            </p>

            <h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">Payment Terms</h3>
            <p className="text-deep-grey leading-relaxed mb-4">
              Payment terms will be specified in individual contracts or quotations. Unless otherwise agreed:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li>Payment is due as specified in the invoice</li>
              <li>Late payments may incur additional charges</li>
              <li>We reserve the right to suspend services for non-payment</li>
            </ul>

            <h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">Quality and Inspection</h3>
            <p className="text-deep-grey leading-relaxed">
              All machinery and materials are sold "as-is" unless otherwise specified in writing. Buyers are encouraged to inspect items before purchase. We provide accurate descriptions to the best of our knowledge.
            </p>
          </section>

          {/* Delivery and Risk */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Delivery and Risk</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              Delivery terms will be specified in individual contracts. Unless otherwise agreed:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li>Risk of loss passes to the buyer upon delivery or collection</li>
              <li>Delivery dates are estimates and not guaranteed</li>
              <li>We are not liable for delays beyond our reasonable control</li>
              <li>Buyers are responsible for arranging and paying for transportation unless otherwise agreed</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Intellectual Property</h2>
            <p className="text-deep-grey leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is the property of RRY Malaysia or its licensors and is protected by Malaysian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Limitation of Liability</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li>We are not liable for any indirect, incidental, or consequential damages</li>
              <li>Our total liability shall not exceed the amount paid by you for the specific service or product</li>
              <li>We do not warrant that our services will be uninterrupted or error-free</li>
              <li>We are not responsible for third-party content or services</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Indemnification</h2>
            <p className="text-deep-grey leading-relaxed">
              You agree to indemnify and hold harmless RRY Malaysia, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services or violation of these Terms.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Dispute Resolution</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              These Terms shall be governed by the laws of Malaysia. Any disputes arising from these Terms or our services shall be:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li>First attempted to be resolved through good faith negotiation</li>
              <li>If unresolved, submitted to mediation</li>
              <li>If still unresolved, subject to the exclusive jurisdiction of the courts of Malaysia</li>
            </ul>
          </section>

          {/* Termination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Termination</h2>
            <p className="text-deep-grey leading-relaxed">
              We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Changes to Terms</h2>
            <p className="text-deep-grey leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Contact Us</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-soft-grey p-6 rounded-lg">
              <p className="text-charcoal font-semibold mb-2">{COMPANY_INFO.name}</p>
              <p className="text-deep-grey">Email: {COMPANY_INFO.email}</p>
              <p className="text-deep-grey">Phone: {COMPANY_INFO.phone}</p>
              <p className="text-deep-grey">Address: {COMPANY_INFO.address}</p>
            </div>
          </section>

          {/* Severability */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Severability</h2>
            <p className="text-deep-grey leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
