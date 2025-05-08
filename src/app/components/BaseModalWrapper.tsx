"use client";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import styleClassName from "../utils/styleClassName";

interface Props<T extends FieldValues> {
  isOpen: boolean;
  toggleModal: () => void;
  title: string;
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isLoading?: boolean;
  isValid?: boolean;
  dismissText?: string;
  submitText?: string;
  classNames?: {
    content?: string;
    header?: string;
    title?: string;
    body?: string;
    footer?: string;
  };
}

const BaseModalWrapper = <T extends FieldValues>({
  isOpen,
  toggleModal,
  title,
  children,
  form,
  onSubmit,
  isLoading,
  isValid,
  dismissText = "Cancelar",
  submitText = "Salvar",
  classNames,
}: Props<T>) => {
  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent
        className={styleClassName(
          "min-w-[650px] !p-0 border border-gray-300 rounded-lg gap-0 bg-white shadow-lg",
          classNames?.content
        )}
      >
        <DialogHeader
          className={styleClassName(
            "flex py-4 px-6 flex-initial text-large font-semibold bg-gray-100 rounded-t-lg",
            classNames?.header
          )}
        >
          <DialogTitle
            className={styleClassName(
              "text-2xl font-bold text-gray-900",
              classNames?.title
            )}
          >
            {title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={styleClassName(
              "w-full flex flex-1 flex-col gap-3 bg-white rounded-b-lg",
              classNames?.body
            )}
          >
            {children}
            <DialogFooter
              className={styleClassName(
                "flex flex-row gap-2 justify-end p-2 px-6 bg-gray-100 rounded-b-lg",
                classNames?.footer
              )}
            >
              <>
                <Button
                  className="text-gray-700 border-gray-300 bg-white hover:bg-gray-50 rounded-lg"
                  onClick={toggleModal}
                  variant="outline"
                  disabled={isLoading}
                >
                  {dismissText}
                </Button>
                <Button
                  variant="default"
                  type="submit"
                  disabled={isLoading || !isValid}
                  isLoading={isLoading}
                >
                  {submitText}
                </Button>
              </>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BaseModalWrapper;
