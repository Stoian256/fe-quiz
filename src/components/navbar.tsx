import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@shadcn/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@shadcn/components/ui/dropdown-menu";

import LogoutButton from "./auth/logoutButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth0();
  return (
    <div className="bg-gray-200 p-4 h-[50px] flex flex-row justify-end  gap-2 text-center ">
      <div className="flex  items-center gap-2 mr-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.picture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>{user?.name}</div>
      </div>
    </div>
  );
};

export default Navbar;
