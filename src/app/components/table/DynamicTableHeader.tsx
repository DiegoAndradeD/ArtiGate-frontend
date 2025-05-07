import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
// Components
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

interface Props<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  isSorteable?: boolean;
  extraHeaderContent?: React.ReactNode;
  handleGlobalSort?: () => void;
}

const DynamicTableHeader = <TData, TValue>({
  column,
  title,
  className,
  isSorteable,
  extraHeaderContent,
  handleGlobalSort,
}: Props<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const toggleSorting = () => {
    if (handleGlobalSort) {
      handleGlobalSort();
    } else {
      column.toggleSorting(column.getIsSorted() === "asc");
    }
  };

  return (
    <div className={cn(className)}>
      <Button
        variant="ghost"
        size="sm"
        className={`h-8 w-full hover:bg-transparent justify-start px-0
          ${isSorteable ? "cursor-pointer" : "cursor-default"}`}
        onClick={isSorteable ? toggleSorting : undefined}
      >
        <span className="text-black font-bold text-sm">{title}</span>
        {isSorteable && <ChevronsUpDown className="h-4 w-4" />}
        {extraHeaderContent}
      </Button>
    </div>
  );
};

export default DynamicTableHeader;
