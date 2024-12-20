import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/custom/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IAuthStore, useAuthStore } from "@/store";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { logOut } from "@/http/api";
import { useMutation } from "@tanstack/react-query";

const logOutUser = async () => {
    await logOut();
};

export function UserNav() {
    const { user, logout } = useAuthStore() as IAuthStore;
    const navigate = useNavigate(); // Initialize useNavigate

    const { mutate } = useMutation({
        mutationFn: logOutUser,
        onSuccess: () => {
            logout();
            navigate("/auth/login", { replace: true }); // Navigate to login
            window.location.reload(); // Reload the page
        },
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                        <AvatarFallback>
                            {user?.fullName.split(" ")[0][0]}
                            {user?.fullName.split(" ")[1][0]}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user?.fullName || " "}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email || " "}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <Link to="/billings">
                        <DropdownMenuItem>
                            Billings
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => mutate()}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
