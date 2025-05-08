"use client";
import CustomFormInput from "@/app/components/CustomFormInput";
import {
  SubmissionFormData,
  submissionSchema,
} from "@/app/schemas/submission-schema";
import { useArticleStore } from "@/app/stores/article.store";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

const ArticleSubmission = () => {
  const { submitArticle } = useArticleStore();
  const router = useRouter();
  const form = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      authors: [{ name: "", email: "", badgeUrl: "" }],
      summary: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "authors",
  });

  const onSubmit = async (data: SubmissionFormData) => {
    try {
      await submitArticle(data);
      router.push("/");
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  return (
    <section className="content-area flex items-center justify-center">
      <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Submissão de Artigo
        </h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Autores</h3>
              <ScrollArea className="h-full w-full flex-1 [&>[data-radix-scroll-area-viewport]]:max-h-[calc(100vh-600px)]">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="mb-4 border p-4 rounded-md bg-gray-50"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <CustomFormInput
                        name={`authors.${index}.name`}
                        label="Nome"
                        classNames={{
                          input: "mt-1 w-full border rounded px-3 py-2",
                          message: "text-red-500 text-sm",
                        }}
                      />
                      <CustomFormInput
                        name={`authors.${index}.email`}
                        label="E-mail"
                        type="email"
                        classNames={{
                          input: "mt-1 w-full border rounded px-3 py-2",
                          message: "text-red-500 text-sm",
                        }}
                      />
                      <CustomFormInput
                        name={`authors.${index}.badgeUrl`}
                        label="Badge URL"
                        type="text"
                        classNames={{
                          input: "mt-1 w-full border rounded px-3 py-2",
                          message: "text-red-500 text-sm",
                        }}
                        minLength={4}
                        maxLength={8}
                      />
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-sm text-red-500 mt-2"
                      >
                        Remover autor
                      </button>
                    )}
                  </div>
                ))}
              </ScrollArea>
              <button
                type="button"
                onClick={() => append({ name: "", email: "", badgeUrl: "" })}
                className="text-sm text-blue-600"
              >
                + Adicionar autor
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Resumo</label>
              <Textarea
                {...register("summary")}
                rows={5}
                className="mt-1 w-full border rounded px-3 py-2"
              />
              {errors.summary && (
                <p className="text-red-500 text-sm">{errors.summary.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Arquivo (PDF)
              </label>
              <div
                className="mt-1 flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2
              bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
              >
                <input
                  type="file"
                  accept=".pdf"
                  {...register("file")}
                  className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border
                  file:border-gray-300 file:bg-gray-50 file:text-gray-700 file:cursor-pointer focus:outline-none"
                />
                <span className="text-sm text-gray-500">Escolher arquivo</span>
              </div>
              {errors.file && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.file.message as string}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Enviar Artigo
            </button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ArticleSubmission;
