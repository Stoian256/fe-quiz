import { twMerge } from "tailwind-merge";

const App = () => (
  <div
    className={`bg-gray-100 h-screen flex flex-col items-center justify-center gap-y-14 px-10 ${twMerge(
      "lg:px-18",
      "lg:px-20"
    )}`}
  >
    <p className="text-6xl lg:text-8xl text-blue-900 font-bold text-center">
      Quiz Project
    </p>
  </div>
);

export default App;
