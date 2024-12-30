import {
  IconBrandAppgallery,
  IconCodeAsterisk,
  IconGitCherryPick,
  IconHelp,
  IconLayoutDashboard,
  IconPoo,
  IconSettings,
  IconShoppingBagPlus,
  IconTool,
  IconTruckDelivery,
  IconUserCog,
  IconUsers
} from '@tabler/icons-react'
import {
  Command,
  KeyRound,
  ReceiptIndianRupee,
  ReceiptText,
  ShieldCheck,
  ShipWheel
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'eCommOS',
      logo: Command,
      plan: 'free + plan',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Fraud Check',
          url: '/fraud_checker',
          icon: ShieldCheck,
        },
        {
          title: 'Orders',
          url: '/sales-orders',
          icon: IconShoppingBagPlus,
        },
        {
          title: 'Products',
          url: '/products',
          icon: IconBrandAppgallery,
        },
        {
          title: 'Customers',
          url: '/customers',
          icon: IconUsers,
        },
        {
          title: 'Channels',
          icon: IconGitCherryPick,
          items: [
            {
              title: 'eCommerce CH+',
              url: '/intigations/ecommerce-channels',
              icon: IconCodeAsterisk,
            },
            {
              title: 'Delivery Partners',
              url: '/intigations/delivery-partners',
              icon: IconTruckDelivery,
            },
            {
              title: 'API & Plugins',
              url: '/api_key',
              icon: KeyRound,
            },
          ],
        },
        // {
        //   title: 'Channels',
        //   icon: IconPlugConnected,
        //   items: [
        //     {
        //       title: 'Apps',
        //   url: '/intigations/delivery-partners',
        //   icon: IconPackages,
        //     }
        //   ]
        // },
      ],
    },
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Auth',
    //       icon: IconLockAccess,
    //       items: [
    //         {
    //           title: 'Sign In',
    //           url: '/sign-in',
    //         },
    //         {
    //           title: 'Sign In (2 Col)',
    //           url: '/sign-in-2',
    //         },
    //         {
    //           title: 'Sign Up',
    //           url: '/sign-up',
    //         },
    //         {
    //           title: 'Forgot Password',
    //           url: '/forgot-password',
    //         },
    //         {
    //           title: 'OTP',
    //           url: '/otp',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Errors',
    //       icon: IconBug,
    //       items: [
    //         {
    //           title: 'Unauthorized',
    //           url: '/401',
    //           icon: IconLock,
    //         },
    //         {
    //           title: 'Forbidden',
    //           url: '/403',
    //           icon: IconUserOff,
    //         },
    //         {
    //           title: 'Not Found',
    //           url: '/404',
    //           icon: IconError404,
    //         },
    //         {
    //           title: 'Internal Server Error',
    //           url: '/500',
    //           icon: IconServerOff,
    //         },
    //         {
    //           title: 'Maintenance Error',
    //           url: '/503',
    //           icon: IconBarrierBlock,
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
          ],
        },
        {
          title: 'Packages',
          url: '/packages',
          icon: IconPoo,
        },
        {
          title: 'Billings',
          icon: ReceiptIndianRupee,
          items: [
            {
              title: 'Payment & Invoices',
              url: '/billings',
              icon: ReceiptText,
            },
            {
              title: 'Current Active Plan',
              url: '/current_active_plan',
              icon: ShipWheel,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
