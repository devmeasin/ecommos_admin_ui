import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Order } from '@/types/order'
import { Copy, Phone } from 'lucide-react'
import toast  from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, X, AlertCircle, Clock, Truck } from 'lucide-react'

interface OrderCardProps {
  order: Order
  onClick: () => void
  viewMode: 'grid' | 'list'
  hasMultipleOrders: boolean
  isPartOfGroup: boolean
  onStatusChange?: (orderId: string, status: string) => void
  isSelected?: boolean
  onSelect?: (orderId: string, selected: boolean) => void
}

const statusConfig = {
  PENDING: {
    color: "bg-yellow-50/30 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    hoverColor: "hover:bg-yellow-100/50 dark:hover:bg-yellow-900/40",
    icon: "🕒"
  },
  PROCESSING: {
    color: "bg-blue-50/30 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    hoverColor: "hover:bg-blue-100/50 dark:hover:bg-blue-900/40",
    icon: "⚙️"
  },
  IN_TRANSIT: {
    color: "bg-purple-50/30 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800",
    badge: "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    hoverColor: "hover:bg-purple-100/50 dark:hover:bg-purple-900/40",
    icon: "🚚"
  },
  DELIVERED: {
    color: "bg-green-50/30 dark:bg-green-950/40 border-green-200 dark:border-green-800",
    badge: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    hoverColor: "hover:bg-green-100/50 dark:hover:bg-green-900/40",
    icon: "✅"
  },
  CANCELLED: {
    color: "bg-red-50/30 dark:bg-red-950/40 border-red-200 dark:border-red-800",
    badge: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
    hoverColor: "hover:bg-red-100/50 dark:hover:bg-red-900/40",
    icon: "❌"
  }
}

const sourceConfig = {
  PHONE: {
    badge: "bg-slate-100 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800",
    icon: "📞"
  },
  WHATSAPP: {
    badge: "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    icon: "📱"
  },
  MESSENGER: {
    badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    icon: "💬"
  },
  WEBSITE: {
    badge: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    icon: "🌐"
  }
}

const statusIcons = {
  PENDING: <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
  APPROVED: <Check className="h-4 w-4 text-green-600 dark:text-green-400" />,
  CANCELLED: <X className="h-4 w-4 text-red-600 dark:text-red-400" />,
  REJECTED: <AlertCircle className="h-4 w-4 text-slate-600 dark:text-slate-400" />,
  IN_TRANSIT: <Truck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
}

export default function OrderCard({ 
  order, 
  onClick, 
  viewMode, 
  hasMultipleOrders,
  isPartOfGroup,
  onStatusChange,
  isSelected,
  onSelect
}: OrderCardProps) {
  const status = statusConfig[order.status] || statusConfig.PENDING
  
  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(order.customerPhone)
    toast.success("Phone number copied!")
  }

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `tel:${order.customerPhone}`
  }

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
  }

  const handleStatusChange = (newStatus: string) => {
    onStatusChange?.(order._id, newStatus)
  }

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect?.(order._id, !isSelected)
  }

  const StatusDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={handleStatusClick}>
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "flex items-center gap-2 w-full justify-start",
            status.badge
          )}
        >
          {statusIcons[order.status]} 
          {order.status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatusChange('PENDING')}>
          <Clock className="mr-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('APPROVED')}>
          <Check className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
          Approved
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('IN_TRANSIT')}>
          <Truck className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
          In Transit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('CANCELLED')}>
          <X className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
          Cancelled
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('REJECTED')}>
          <AlertCircle className="mr-2 h-4 w-4 text-slate-600 dark:text-slate-400" />
          Rejected
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <Card 
      className={cn(
        "relative transition-all cursor-pointer border",
        status.color,
        status.hoverColor,
        "hover:shadow-md hover:border-primary/20 dark:hover:border-primary/30",
        viewMode === 'list' && "flex flex-col sm:flex-row items-stretch w-full",
        hasMultipleOrders && !isPartOfGroup && "border-l-4 border-l-primary",
        isPartOfGroup && "pl-8"
      )}
      onClick={onClick}
    >
      {/* Selection Checkbox */}
      {onSelect && (
        <div className={cn(
          "absolute z-10",
          viewMode === 'list' ? "left-4 top-4 sm:top-1/2 sm:-translate-y-1/2" : "left-2 top-2"
        )}>
          <Checkbox 
            checked={isSelected} 
            onClick={handleSelect}
          />
        </div>
      )}

      <CardHeader className={cn(
        "flex-row items-center justify-between pb-2",
        viewMode === 'list' && "w-full sm:w-1/3 flex-grow-0",
        "p-3 sm:p-4",
        onSelect && viewMode === 'list' ? "pl-12 sm:pl-12" : onSelect && "pl-8" 
      )}>
        <div className="flex items-center gap-2">
          <Avatar className={cn("h-8 w-8 shrink-0", status.badge)}>
            <span className="text-base">{status.icon}</span>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate">#{order.internalId}</p>
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs whitespace-nowrap",
                  sourceConfig[order.source]?.badge
                )}
              >
                {sourceConfig[order.source]?.icon} {order.source}
              </Badge>
            </div>
          </div>
        </div>
        {(viewMode === 'grid' || window.innerWidth < 768) && (
          <div className="flex flex-col items-end gap-2">
            {order.deliveryPartner === 'PATHAO' && (
              <img 
                src="/pathao-logo.png" 
                alt="Pathao" 
                className="h-4 w-auto"
              />
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className={cn(
        "space-y-3 w-full",
        viewMode === 'list' && "sm:w-2/3 flex-grow flex items-center justify-between py-3",
        "p-3 sm:p-4"
      )}>
        {viewMode === 'list' ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <div className="w-full sm:w-auto">
                <span className="text-sm text-muted-foreground block">Customer</span>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground truncate">
                    {order.customerPhone}
                  </p>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={handleCopyPhone}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy number</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={handleCall}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Call customer</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <span className="text-sm text-muted-foreground block">Amount</span>
                <span className="font-medium">
                  ৳{order.amounts.total.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="w-full sm:w-auto flex-shrink-0">
              <span className="text-sm text-muted-foreground block">Status</span>
              <div className="w-full sm:w-auto">
                <StatusDropdown />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order Date:</span>
                <span className="font-medium">
                  {new Date(order.dates.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-medium truncate ml-2">{order.customerPhone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">
                  ৳{order.amounts.total.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <StatusDropdown />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}