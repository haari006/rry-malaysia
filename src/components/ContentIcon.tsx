import { icons, ShieldCheck } from 'lucide-react'

// This server component resolves icons without shipping the icon registry to the browser.
export default function ContentIcon({ name, size = 20 }: { name?: string; size?: number }) {
  const Icon = name && Object.hasOwn(icons, name) ? icons[name as keyof typeof icons] : ShieldCheck
  return <Icon size={size} aria-hidden="true" />
}
