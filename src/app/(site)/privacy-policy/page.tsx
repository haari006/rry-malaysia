export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-soft-grey py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">Privacy Policy</h1>
          <p className="text-deep-grey">Last updated: {new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Introduction</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              RRY Malaysia ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            <p className="text-deep-grey leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">Personal Information</h3>
            <p className="text-deep-grey leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2 mb-6">
              <li>Contact us through our website or email</li>
              <li>Request information about our services</li>
              <li>Engage in business transactions with us</li>
              <li>Subscribe to our newsletter or marketing communications</li>
            </ul>
            <p className="text-deep-grey leading-relaxed">
              This information may include: name, email address, phone number, company name, business address, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-deep-grey leading-relaxed">
              When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">How We Use Your Information</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Process your business transactions</li>
              <li>Send you marketing and promotional communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraudulent transactions and protect our business</li>
            </ul>
          </section>

          {/* Disclosure of Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Disclosure of Your Information</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li><strong>Business Partners:</strong> We may share your information with business partners to provide you with certain services</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, sale, or acquisition</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Data Security</h2>
            <p className="text-deep-grey leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Your Rights</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              Under Malaysian Personal Data Protection Act 2010 (PDPA), you have the right to:
            </p>
            <ul className="list-disc pl-6 text-deep-grey space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Withdraw consent for processing your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Limit the use and disclosure of your personal data</li>
            </ul>
          </section>

          {/* Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Contact Us</h2>
            <p className="text-deep-grey leading-relaxed mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-soft-grey p-6 rounded-lg">
              <p className="text-charcoal font-semibold mb-2">RRY Malaysia</p>
              <p className="text-deep-grey">Email: contact@rrymalaysia.com</p>
              <p className="text-deep-grey">Phone: +60 12-345 6789</p>
              <p className="text-deep-grey">Address: Kuala Lumpur, Malaysia</p>
            </div>
          </section>

          {/* Updates */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Updates to This Policy</h2>
            <p className="text-deep-grey leading-relaxed">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
