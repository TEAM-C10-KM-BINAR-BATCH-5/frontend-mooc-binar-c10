import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { LockKey, LockKeyOpen, Trash } from "@phosphor-icons/react";
import { PencilLine } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import { deleteModule, deleteVideo, editModule, editVideo } from "../libs/api";
import { useRecoilState } from "recoil";
import { triggerDataUpdateState } from "../atom/formAtom";
import { swalFireConfirm, swalFireResult } from "../libs/swalFire";

export default function AccordionComponent({
  id,
  children,
  title,
  index,
  isLocked,
  price,
  type,
}) {
  const [open, setOpen] = useState(0);
  const [edit, setEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [triggerDataUpdate, setTriggerDataUpdate] = useRecoilState(
    triggerDataUpdateState
  );

  const handleDelete = async () => {
    try {
      const response = await swalFireConfirm(
        "Apakah anda yakin?",
        `Anda akan menghapus ${title}`,
        "warning"
      );
      if (response.isConfirmed) {
        if (type == "module") {
          await deleteModule(id);
        } else if (type == "video") {
          await deleteVideo(id);
        }
        setTriggerDataUpdate(!triggerDataUpdate);
        swalFireResult("Berhasil!", `Berhasil menghapus ${title}`, "success");
      }
    } catch (error) {
      await swalFireResult("Gagal", `Gagal menghapus ${title}`, "error");
    }
  };

  const handleEditTitle = async () => {
    try {
      if (type == "module") {
        await editModule({ title: currentTitle }, id);
      } else if (type == "video") {
        await editVideo({ title: currentTitle }, id);
      }
      setTriggerDataUpdate(!triggerDataUpdate);
    } catch (error) {
      await swalFireResult("Gagal", `Gagal mengubah data`, "error");
    }
  };

  const handleEditIslocked = async () => {
    try {
      const text = isLocked ? "membuka" : "mengunci";
      const response = await swalFireConfirm(
        "",
        `Apakah anda ingin ${text} modul ini?`,
        "question"
      );
      if (response.isConfirmed) {
        await editModule({ isLocked: !isLocked }, id);
        setTriggerDataUpdate(!triggerDataUpdate);
        await swalFireResult("Berhasil", `Berhasil ${text} modul`, "success");
      }
    } catch (error) {
      await swalFireResult("Gagal", `Gagal ${text} modul`, "error");
    }
  };

  const handleKeyDown = (e) => {
    try {
      if (e.key === "Enter") {
        handleEditTitle();
        setEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <Accordion
      open={open === index}
      className={`mb-2 rounded-lg border border-blue-gray-300 px-4 w-full ${
        open === index ? "border-costumeBlue border-2" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-center">
        {!edit ? (
          <AccordionHeader
            className={`border-b-0 transition-colors text-sm lg:text-base ${
              open === index ? "text-costumeBlue hover:text-blue-700" : ""
            }`}
            onClick={() => handleOpen(index)}
          >
            {title}
          </AccordionHeader>
        ) : (
          <AccordionHeader>
            <input
              type="text"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              className="w-full border-2 p-2 border-gray-400 rounded-lg text-sm lg:text-base"
            />
          </AccordionHeader>
        )}

        <div className="flex flex-row items-center gap-2 font-extrabold">
          {isLocked != undefined &&
            price > 0 &&
            (isLocked == true ? (
              <LockKey
                className="cursor-pointer hover:text-costumeBlue text-red-500"
                weight="bold"
                onClick={() => {
                  handleEditIslocked();
                }}
                size={17}
              />
            ) : (
              <LockKeyOpen
                className="cursor-pointer hover:text-costumeBlue text-green-500"
                weight="bold"
                onClick={() => {
                  handleEditIslocked();
                }}
                size={17}
              />
            ))}

          <PencilLine
            className="cursor-pointer hover:text-costumeBlue"
            onClick={() => setEdit(!edit)}
            weight="bold"
            size={17}
          />
          <Trash
            onClick={handleDelete}
            className="cursor-pointer hover:text-costumeBlue"
            size={17}
          />
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
