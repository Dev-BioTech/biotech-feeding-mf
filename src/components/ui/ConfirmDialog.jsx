import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export function ConfirmDialog({
  trigger,
  title,
  description,
  onConfirm,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  variant = "danger",
}) {
  const isDanger = variant === "danger";

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {trigger}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] z-50 w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-2xl focus:outline-none">
          <AlertDialog.Title className="text-xl font-bold font-roboto text-gray-900 mb-2">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-500 font-inter mb-8 text-sm md:text-base">
            {description}
          </AlertDialog.Description>
          <div className="flex flex-col-reverse md:flex-row gap-3 md:justify-end">
            <AlertDialog.Cancel asChild>
              <button className="min-h-[44px] px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium font-inter hover:bg-gray-200 transition-colors w-full md:w-auto flex items-center justify-center">
                {cancelText}
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className={`min-h-[44px] px-4 py-2.5 text-white rounded-xl font-medium font-inter transition-colors shadow-sm w-full md:w-auto flex items-center justify-center ${
                  isDanger
                    ? "bg-red-600 hover:bg-red-700 shadow-red-200"
                    : "bg-farm-green-600 hover:bg-farm-green-700 shadow-farm-green-200"
                }`}
              >
                {confirmText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
