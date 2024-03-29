import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TOptionsDropdown = {
  title: string;
  options: any;
  onChange: (e: any) => void;
  value: any;
};

const OptionsDropdown: React.FC<TOptionsDropdown> = ({
  title,
  options,
  onChange,
  value = "",
}) => {
  return (
    <div className="border rounded px-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full" asChild>
          <span className="text-sm">{value || title}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {options.map((option: any) =>
              option.children.length > 0 ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-semibold">
                    {option.name}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {option.children.map((child: any) => (
                        <DropdownMenuItem onClick={() => onChange(child)}>
                          {child.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem
                  className="font-semibold"
                  onClick={() => onChange(option)}
                >
                  {option.name}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default OptionsDropdown;
