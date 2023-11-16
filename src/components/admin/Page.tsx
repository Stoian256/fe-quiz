import { Outlet } from "react-router-dom";

type Props = {
  mainTitle: string;
  title: string;
};

const Page = ({ mainTitle, title }: Props) => {
  return (
    <div className="bg-gray-200">
      <h2 className="text-lg font-semibold">{mainTitle}</h2>
      <h3 className="text-sm">{title}</h3>

      <div className="bg-white min-h-[calc(100vh-200px)] rounded-md mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Page;
