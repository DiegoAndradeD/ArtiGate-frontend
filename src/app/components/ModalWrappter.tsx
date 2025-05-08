"use client";
import useModalStore from "../stores/modal.store";
import EvaluateArticleModal from "./modals/EvaluateArticleModal";

const ModalWrapper = () => {
  const { isEvaluateArticleOpen } = useModalStore();

  return <>{isEvaluateArticleOpen && <EvaluateArticleModal />}</>;
};
export default ModalWrapper;
