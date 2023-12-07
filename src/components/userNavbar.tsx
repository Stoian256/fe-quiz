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
import logo from "../assets/header-logo-blue.svg";
import { ChevronDownIcon, UserIcon } from "lucide-react";

const UserNavbar = () => {
  const { user } = useAuth0();
  return (
    <div className="items-center">
      <div className="p-2 h-[80px] flex flex-row justify-between  gap-2 text-center ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-16 ml-8" />
        </Link>
        <div className="flex  items-center gap-2 mr-8">
          <UserIcon style={{ fill: "orange", strokeWidth: "0" }} />
          <ChevronDownIcon style={{ fill: "orange", strokeWidth: "0" }} />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.picture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <span className="text-dorange  font-semibold">
                  {user?.name}
                </span>
              </DropdownMenuLabel>
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
      <hr className="mx-8" />
    </div>
  );
};

export default UserNavbar;
