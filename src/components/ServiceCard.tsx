import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export default function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <Link href={href} className="group block p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-royal-blue group-hover:bg-royal-blue group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-royal-blue transition-colors">{title}</h3>
      <p className="text-deep-grey mb-6 line-clamp-3">{description}</p>
      <div className="flex items-center text-royal-blue font-medium group-hover:gap-2 transition-all">
        Learn more <ArrowRight size={16} className="ml-2" />
      </div>
    </Link>
  )
}
