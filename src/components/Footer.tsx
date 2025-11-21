import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex-shrink-0 inline-block mb-4">
              <Image
                src="/logo.png"
                alt="RRY Malaysia Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-deep-grey max-w-md leading-relaxed">
              Your trusted partner in heavy machinery and scrap metal trading. 
              Delivering quality, reliability, and fair pricing across Malaysia and beyond.
            </p>
          </div>
          
          <div>
            <h3 className="text-charcoal font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-deep-grey hover:text-royal-blue transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-deep-grey hover:text-royal-blue transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-deep-grey hover:text-royal-blue transition-colors">Contact</Link></li>
              <li><Link href="/studio" className="text-deep-grey hover:text-royal-blue transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-charcoal font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-deep-grey">
              <li>Kuala Lumpur, Malaysia</li>
              <li>contact@rrymalaysia.com</li>
              <li>+60 12-345 6789</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} RRY Malaysia. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-royal-blue transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-royal-blue transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
