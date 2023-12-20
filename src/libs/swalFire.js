import Swal from "sweetalert2";

export function swalFireResult(title, text, icon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    customClass: {
      popup: "rounded-lg",
      confirmButton:
        "bg-gray-200 text-costumeBlue rounded-lg p-3 hover:brightness-75 transition-all ease-linear w-1/4",
      actions: "flex flex-row gap-12 justify-center w-full",
    },
    buttonsStyling: false,
  });
}

export function swalFireConfirm(title, text, icon) {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    cancelButtonText: "Tidak",
    confirmButtonText: "Ya",
    customClass: {
      cancelButton:
        "bg-costumeBlue text-white rounded-lg p-3 hover:brightness-75 transition-all ease-linear w-1/4",
      confirmButton:
        "bg-gray-200 text-costumeBlue rounded-lg p-3 hover:brightness-75 transition-all ease-linear w-1/4",
      actions: "flex flex-row gap-12 justify-center w-full",
      popup: "rounded-lg",
    },
    buttonsStyling: false,
  });
}
