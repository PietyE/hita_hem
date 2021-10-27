import React, { useCallback } from "react";
import Modal from "components/ui/Modal";
import Button from "components/ui/Button";
import { addFaqAnswer } from "redux/actions/companies";
import { useDispatch } from "react-redux";
import {filterComments} from "../../utils/restrictInput";

const FaqResponseModalWindow = ({ show, handleClose, postId }) => {
  const dispatch = useDispatch();

  const _addFaqAnswer = useCallback(
    (id) => {
      dispatch(addFaqAnswer(id));
    },
    [dispatch]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    _addFaqAnswer({ post: filterComments(e.target[0].value), id: postId });
    handleClose(null);
  };
  return (
    <Modal
      show={show}
      onHide={() => handleClose(null)}
      backdrop={true}
      keyboard={false}
      className="faq_answer_modal"
      dialogClassName="faq_answer_modal_dialog"
      bodyClassName="faq_answer_modal_body"
      centered={true}
    >
      <form className="faq_answer_modal_form" onSubmit={handleSubmit}>
        <textarea
          className="faq_answer_modal_input"
          autoFocus={true}
        ></textarea>
        <Button
          type="submit"
          colorStyle="dark-green"
          className="faq_answer_modal_button"
        >
          Send
        </Button>
      </form>
    </Modal>
  );
};

export default FaqResponseModalWindow;
