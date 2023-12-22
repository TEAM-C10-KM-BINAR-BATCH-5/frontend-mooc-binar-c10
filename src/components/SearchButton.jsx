import React from "react";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchButton({ children }) {
  return (
    <>
      <Menu
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          <button>
            <MagnifyingGlass
              size={24}
              className="text-costumeBlue"
              weight="bold"
            />
          </button>
        </MenuHandler>
        <MenuList>{children}</MenuList>
      </Menu>
    </>
  );
}
