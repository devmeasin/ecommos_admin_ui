import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { RemainingRequests } from "@/components/RemainingRequests";
import SkipToMain from "@/components/skip-to-main";
import { ThemeSwitch } from "@/components/theme-switch";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/search-context";
import { useIsVerified } from "@/hooks/use_isVerified";
import { cn } from "@/lib/utils";
import { IAuthStore, useAuthStore } from "@/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthDashboard = () => {
    const location = useLocation();
    const { user } = useAuthStore() as IAuthStore;
    const { isVerified } = useIsVerified();


    if (!user) {
        return (
            <Navigate
                to={`/auth/login?returnTo=${location.pathname}${location.search}`}
                replace
            />
        );
    }

    if (!isVerified(user)) {
        return <Navigate to="/onboarding/activate-profile" replace />;
    }



    return (
        <div>

            <SearchProvider>
                <SidebarProvider defaultOpen={true}>
                <SkipToMain />
                <AppSidebar />
                    <div
                        id='content'
                        className={cn(
                        'max-w-full w-full ml-auto',
                        'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon))]',
                        'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                        'transition-[width] ease-linear duration-200',
                        'h-svh flex flex-col'
                        )}
                    >
                    
                    {/* <Dashboard /> */}
                {/* ===== Top Heading ===== */}
                <Header >
                    {/* <Search /> */}
                    <div className='ml-auto flex items-center gap-4'>
                        <RemainingRequests/>
                        <ThemeSwitch />
                        <ProfileDropdown />
                    </div>
                </Header>

                        {/* this main part render component  */}
                    
                        <Outlet />

                </div>
                </SidebarProvider>
          </SearchProvider>

        </div>
    );
};
