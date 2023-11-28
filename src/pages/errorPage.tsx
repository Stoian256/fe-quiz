import { Link, useLocation } from "react-router-dom";
import arrowRight from "../assets/regular-arrow.svg";
import lightning from "../assets/glitter-light-removebg-preview.png";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface ErrorPageProps {
  errorStatus?: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorStatus }) => {
  const location = useLocation();
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className=" bg-dblue min-h-screen flex flex-col items-center gap-2">
      <div className="h-[200px] w-[200px]">
        <img
          src={lightning}
          alt="lightning"
          className={cn(
            "transform",
            "transition",
            "duration-2000",
            "ease-in-out",
            showImage ? "grow-animation" : "scale-0",
            "disappear-reappear-animation"
          )}
        />
      </div>
      <span className="font-semibold text-4xl text-gray-500 p-4">
        &gt; {errorStatus !== undefined ? errorStatus : ""}  ERROR &lt;{" "}
      </span>

      <span className="font-semibold text-8xl text-gray-200 p-4 text-center">
        DOES NOT COMPUTE
      </span>
      <p className="text-gray-500 text-lg">
        Sorry, the page at "{location.pathname}" does not exist.
      </p>
      <p className="text-gray-500 text-lg">
        Please reboot me back to the homepage.
      </p>
      <Link
        to={"/"}
        className="bg-dyellow hover:bg-dorange text-dblue rounded-full mt-6 p-4"
      >
        <div className="flex gap-4">
          <img src={arrowRight} alt="arrow" className="rotate-90 h-8 w-16" />
          <span className="text-lg">Back Home</span>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;
