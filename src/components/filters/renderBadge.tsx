import { Badge } from "../ui/badge";

type RenderBadgeProps = {
  selectedFilter: string;
  filterType: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  index: string;
};

const RenderBadge = ({
  selectedFilter,
  filterType,
  onClick,
  index
}: RenderBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className="cursor-pointer relative pr-4 hover:bg-red-100"
      onClick={onClick}
      title={selectedFilter}
      id={filterType}
      key={index}
    >
      {`${filterType}: ${selectedFilter}`}
      <div className="absolute right-1.5 -top-0.5 text-red-400">
        <span className="">x</span>
      </div>
    </Badge>
  );
};

export default RenderBadge;
