import {
  ReviewFormData,
  reviewSchema,
} from "@/app/schemas/evaluate-article-schema";
import useModalStore from "@/app/stores/modal.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import BaseModalWrapper from "../BaseModalWrapper";
import { Modal } from "@/app/enums/Modal";
import { useArticleStore } from "@/app/stores/article.store";
import { useUserStore } from "@/app/stores/user.store";
import CustomFormInput from "../CustomFormInput";
import { Textarea } from "@/components/ui/textarea";
import { useReviewStore } from "@/app/stores/review.store";

const EvaluateArticleModal = () => {
  const { toggleModal, isEvaluateArticleOpen } = useModalStore();
  const { selectedArticle } = useArticleStore();
  const { user } = useUserStore();
  const { submitReview } = useReviewStore();
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewerId: user?.id || "",
      articleId: selectedArticle?.id || "",
    },
  });

  const {
    register,
    formState: { errors, isValid },
    setValue,
  } = form;

  const onSubmit = async (data: ReviewFormData) => {
    if (!user?.id) return;
    await submitReview(data);
  };

  return (
    <BaseModalWrapper<ReviewFormData>
      isOpen={isEvaluateArticleOpen}
      toggleModal={() => toggleModal(Modal.EvaluateArticle)}
      title="Avaliar Artigo"
      submitText="Avaliar"
      isValid={isValid}
      form={form}
      onSubmit={onSubmit}
      classNames={{
        body: "!rounded-none",
        content: "!min-w-[800px]",
      }}
    >
      <section className="py-8 px-6 flex flex-col gap-4">
        <CustomFormInput
          name={"score"}
          label={"Nota (0 a 5)"}
          type="number"
          step="0.1"
          min="0"
          max="5"
          onChange={(e) => {
            const value = e.target.value;
            setValue("score", value === "" ? 0 : parseFloat(value));
          }}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comentário
          </label>
          <Textarea
            {...register("commentary")}
            className="mt-1 block min-w-[750px] w-[750px] max-w-[750px] rounded border-gray-300 shadow-sm"
            rows={4}
          />
          {errors.commentary && (
            <p className="text-sm text-red-500">{errors.commentary.message}</p>
          )}
        </div>
      </section>
    </BaseModalWrapper>
  );
};
export default EvaluateArticleModal;
