import { Button, Menu, MenuHandler, MenuList } from "@material-tailwind/react";

export default function FilterMenu({ title, children }) {
  return (
    <>
      <Menu
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          <Button className="bg-transparent border-2 border-costumeBlue text-costumeBlue opacity-50 rounded-lg p-2">
            {title}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-48">{children}</MenuList>
      </Menu>
    </>
  );
}
