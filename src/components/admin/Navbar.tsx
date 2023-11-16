import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@shadcn/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="bg-gray-200 p-4 h-[50px] flex flex-row justify-end  gap-2 text-center">
      <div className="flex  items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>Jane Doe</div>
      </div>
    </div>
  );
};

export default Navbar;
