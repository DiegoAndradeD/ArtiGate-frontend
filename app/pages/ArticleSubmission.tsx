import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  submissionSchema,
  type SubmissionFormData,
} from "~/Common/schemas/submission-schema";
import { ScrollArea } from "~/components/ui/scroll-area";

const ArticleSubmission = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      authors: [{ title: "", email: "", badgeUrl: "" }],
      summary: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "authors",
  });

  const onSubmit = (data: SubmissionFormData) => {
    console.log("Submissão:", data);
    reset();
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Submissão de Artigo
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Autores */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Autores</h3>
            <ScrollArea className="h-[120px] max-h-[300px] w-full">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-4 border p-4 rounded-md bg-gray-50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm">Título</label>
                      <input
                        {...register(`authors.${index}.title`)}
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                      {errors.authors?.[index]?.title && (
                        <p className="text-red-500 text-sm">
                          {errors.authors[index]?.title?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm">E-mail</label>
                      <input
                        {...register(`authors.${index}.email`)}
                        type="email"
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                      {errors.authors?.[index]?.email && (
                        <p className="text-red-500 text-sm">
                          {errors.authors[index]?.email?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm">Badge URL</label>
                      <input
                        {...register(`authors.${index}.badgeUrl`)}
                        type="url"
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                      {errors.authors?.[index]?.badgeUrl && (
                        <p className="text-red-500 text-sm">
                          {errors.authors[index]?.badgeUrl?.message}
                        </p>
                      )}
                    </div>
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
              onClick={() => append({ title: "", email: "", badgeUrl: "" })}
              className="text-sm text-blue-600"
            >
              + Adicionar autor
            </button>
          </div>
          {/* Resumo */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Resumo</label>
            <textarea
              {...register("summary")}
              rows={5}
              className="mt-1 w-full border rounded px-3 py-2"
            />
            {errors.summary && (
              <p className="text-red-500 text-sm">{errors.summary.message}</p>
            )}
          </div>
          {/* PDF */}
          <div className="mb-6">
            <label className="block text-sm font-medium">Arquivo (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              {...register("file")}
              className="mt-1 w-full"
            />
            {errors.file && (
              <p className="text-red-500 text-sm">
                {errors.file.message as string}
              </p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Enviar Artigo
          </button>
        </form>
      </div>
    </section>
  );
};

export default ArticleSubmission;
