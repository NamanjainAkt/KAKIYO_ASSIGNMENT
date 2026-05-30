"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Briefcase, FileText, MessageSquare, ArrowRight, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Users,
  Briefcase,
  FileText,
  MessageSquare
}

interface StatItem {
  name: string
  value: string | number
  icon: string
  href: string
}

export function DashboardGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = iconMap[stat.icon]
        return (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
          >
            <Link href={stat.href} className="group block bg-white border border-[#E5E5E0] hover:border-[#1C1C1A] border-t-4 border-t-[#1C1C1A] p-8 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="text-[#575752] group-hover:text-amber-600 transition-colors">
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1C1C1A] group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-5xl font-serif font-black text-[#1C1C1A] mb-2">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-[#575752] uppercase tracking-widest">
                {stat.name}
              </p>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
