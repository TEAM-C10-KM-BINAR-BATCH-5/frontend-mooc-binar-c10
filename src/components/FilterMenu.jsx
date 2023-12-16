import { Button, Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { CaretDown } from "@phosphor-icons/react";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";

export default function FilterMenu({ title, children }) {
  return (
    <>
      <Menu
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          <Button className=" text-xs flex flex-row items-center gap-2 bg-transparent border-2 border-costumeBlue text-costumeBlue opacity-50 rounded-lg p-2">
            {title}
            <CaretDown size={14} className="hidden lg:block" />
          </Button>
        </MenuHandler>
        <MenuList className="max-h-48">{children}</MenuList>
      </Menu>
    </>
  );
}
