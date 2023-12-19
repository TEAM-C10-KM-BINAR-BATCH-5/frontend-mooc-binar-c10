import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { LockKey, LockKeyOpen, Trash } from "@phosphor-icons/react";
import { PencilLine } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

export default function AccordionComponent({
  children,
  title,
  index,
  isLocked,
}) {
  const [open, setOpen] = useState(0);
  const [edit, setEdit] = useState(false);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <Accordion
      open={open === index}
      className="mb-2 rounded-lg border border-blue-gray-300 px-4 w-full"
    >
      <div className="flex flex-row justify-between items-center">
        {!edit ? (
          <AccordionHeader
            className={`border-b-0 transition-colors text-sm lg:text-base ${
              open === index ? "text-costumeBlue hover:!text-costumeBlue" : ""
            }`}
            onClick={() => handleOpen(index)}
          >
            {title}
          </AccordionHeader>
        ) : (
          <AccordionHeader>
            <input
              type="text"
              defaultValue={title}
              className="w-full border-2 p-2 border-gray-400 rounded-lg text-sm lg:text-base"
            />
          </AccordionHeader>
        )}

        <div className="flex flex-row items-center gap-2 font-extrabold">
          {isLocked != undefined &&
            (isLocked == true ? (
              <LockKey
                className="cursor-pointer hover:text-costumeBlue text-red-500"
                weight="bold"
              />
            ) : (
              <LockKeyOpen
                className="cursor-pointer hover:text-costumeBlue text-green-500"
                weight="bold"
              />
            ))}

          <PencilLine
            className="cursor-pointer hover:text-costumeBlue"
            onClick={() => setEdit(!edit)}
            weight="bold"
          />
          <Trash className="cursor-pointer hover:text-costumeBlue" />
        </div>
      </div>
      {open === index && (
        <AccordionBody className="pt-0 text-sm lg:text-base font-normal w-full h-full ">
          {children}
        </AccordionBody>
      )}
    </Accordion>
  );
}
