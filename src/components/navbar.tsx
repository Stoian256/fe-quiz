import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@shadcn/components/ui/avatar";

const details = {
  path: "https://github.com/shadcn.png",
  name: "Jane Doe"
};

const Navbar = () => {
  return (
    <div className="bg-gray-200 p-4 h-[50px] flex flex-row justify-end  gap-2 text-center">
      <div className="flex  items-center gap-2">
        <Avatar>
          <AvatarImage src={details.path} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>{details.name}</div>
      </div>
    </div>
  );
};

export default Navbar;
