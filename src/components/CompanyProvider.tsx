'use client'

import { createContext, useContext } from 'react'
import { COMPANY_INFO, type CompanyInfo } from '@/lib/company'

const CompanyContext = createContext<CompanyInfo>(COMPANY_INFO)

export function CompanyProvider({ company, children }: { company: CompanyInfo; children: React.ReactNode }) {
  return <CompanyContext.Provider value={company}>{children}</CompanyContext.Provider>
}

export function useCompanyInfo() {
  return useContext(CompanyContext)
}
