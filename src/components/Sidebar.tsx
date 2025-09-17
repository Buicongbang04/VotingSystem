"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Megaphone,
  History,
  Trophy,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type SidebarItemKey = "all" | "history" | "top10" | "top10-2025" | "top10-2024"

export interface SidebarProps {
  selectedKey?: SidebarItemKey
  defaultSelectedKey?: SidebarItemKey
  onSelect?: (key: SidebarItemKey) => void
  className?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
}

const items: Array<{
  key: SidebarItemKey
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  href?: string
  hasSubmenu?: boolean
  submenu?: Array<{ key: SidebarItemKey; label: string; href: string }>
}> = [
  { key: "all", label: "Tất cả chương trình", icon: Megaphone, href: "/all-show" },
  { key: "history", label: "Lịch sử hoạt động", icon: History, href: "/lich-su-hoat-dong" },
  { 
    key: "top10", 
    label: "Top 10 các năm", 
    icon: Trophy, 
    hasSubmenu: true,
    submenu: [
      { key: "top10-2025", label: "2025", href: "/top-10-2025" },
      { key: "top10-2024", label: "2024", href: "/top-10-2024" }
    ]
  },
]

export default function Sidebar(props: SidebarProps) {
  const {
    selectedKey,
    defaultSelectedKey = "all",
    onSelect,
    className,
    collapsible = true,
    defaultCollapsed = false,
  } = props

  const [internalSelected, setInternalSelected] = React.useState<SidebarItemKey>(defaultSelectedKey)
  const [collapsed, setCollapsed] = React.useState<boolean>(defaultCollapsed)
  const [expandedSubmenu, setExpandedSubmenu] = React.useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const activeKey = selectedKey ?? internalSelected

  function handleSelect(key: SidebarItemKey, href?: string) {
    setInternalSelected(key)
    onSelect?.(key)
    if (href) router.push(href)
  }

  function toggleSubmenu(itemKey: string) {
    setExpandedSubmenu(expandedSubmenu === itemKey ? null : itemKey)
  }

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen z-50 bg-[#AF4C6A] text-white flex flex-col border-r border-[#A01A42] relative",
        "transition-[width] duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className={cn(
        "relative flex items-center justify-between px-4 py-4 border-b border-[#A01A42]"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-[#8B1538] font-bold text-sm">FPT</span>
          </div>
          <span
            className={cn(
              "text-white text-sm font-medium",
              "transform-gpu transition-all duration-900",
              collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
            )}
          >
            Education
          </span>
        </div>
      </div>

      {collapsible && (
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-[60] rounded p-2 transition-colors hover:bg-[#7A1232]"
          )}
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      )}

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.href ? pathname === item.href : activeKey === item.key
          const isSubmenuExpanded = expandedSubmenu === item.key
          
          return (
            <div key={item.key}>
              <button
                type="button"
                onClick={() => {
                  if (item.hasSubmenu) {
                    toggleSubmenu(item.key)
                  } else {
                    handleSelect(item.key, item.href)
                  }
                }}
                className={cn(
                  "w-full flex items-center px-3 py-2 rounded-lg transition-colors",
                  isActive ? "bg-[#6B0F2A] text-white" : "text-white/90 hover:bg-[#7A1232] hover:text-white",
                  collapsed ? "gap-0" : "gap-3"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    "font-medium whitespace-nowrap overflow-hidden",
                    "transform-gpu transition-all duration-500",
                    collapsed ? "max-w-0 opacity-0 -translate-x-2" : "max-w-[200px] opacity-100 translate-x-0"
                  )}
                >
                  {item.label}
                </span>
                {item.hasSubmenu && !collapsed && (
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 ml-auto transition-transform duration-200",
                      isSubmenuExpanded && "rotate-90"
                    )} 
                  />
                )}
              </button>
              
              {/* Submenu */}
              {item.hasSubmenu && !collapsed && isSubmenuExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.submenu?.map((subItem) => {
                    const isSubActive = pathname === subItem.href
                    return (
                      <button
                        key={subItem.key}
                        type="button"
                        onClick={() => handleSelect(subItem.key, subItem.href)}
                        className={cn(
                          "w-full flex items-center px-3 py-2 rounded-lg transition-colors text-sm",
                          isSubActive ? "bg-[#6B0F2A] text-white" : "text-white/80 hover:bg-[#7A1232] hover:text-white"
                        )}
                      >
                        <span className="font-medium">{subItem.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}


