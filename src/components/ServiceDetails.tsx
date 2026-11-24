import Image from 'next/image'
import { Recycle, Truck } from 'lucide-react'
import { serviceAnchor, type ServiceContent } from '@/sanity/lib/content'
import { urlFor } from '@/sanity/lib/image'

export default function ServiceDetails({ services }: { services: ServiceContent[] }) {
  return services.map((service) => (
    <article key={service._id} id={serviceAnchor(service)} className="scroll-mt-24 mb-8">
      <div className="w-16 h-16 bg-royal-blue rounded-2xl flex items-center justify-center text-white mb-6">
        {service.category === 'scrap' ? <Recycle size={32} /> : <Truck size={32} />}
      </div>
      {service.image && (
        <Image src={urlFor(service.image).width(800).height(600).url()} alt={service.title || 'Our service'}
          width={800} height={600} sizes="(min-width: 768px) 33vw, 100vw" className="w-full rounded-2xl object-cover mb-6" />
      )}
      <h2 className="text-3xl font-bold text-charcoal mb-4">{service.title || 'Our Service'}</h2>
      <p className="text-deep-grey mb-6 whitespace-pre-line">{service.description}</p>
    </article>
  ))
}
