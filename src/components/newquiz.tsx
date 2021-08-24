import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import NotifyContext from "../context/notify";
import { FirestoreNewQuestion } from "../firebase/firestore";

interface newquizProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewQuestionBox: React.FC<newquizProps> = ({ isOpen, onClose }) => {
  const [quiz, setquiz] = useState<string>();
  const [submitting, setsubmitting] = useState<boolean>(false);

  const notify = useContext(NotifyContext);

  const HandleNewQuizSubmit = async () => {
    setsubmitting(true);
    if (!quiz) {
      notify.NewAlert({ msg: "Question cannot be empty", status: "error" });
      setsubmitting(false);
      return;
    }

    try {
      await FirestoreNewQuestion(quiz);
      notify.NewAlert({ msg: "Question submitted", status: "success" });
    } catch (error) {
      notify.NewAlert({
        msg: "Error occured while submitting the quiz",
        description: error,
        status: "error",
      });

      // close the modal if success
      onClose();
    } finally {
      setsubmitting(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ask a new question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={quiz}
              onChange={(e) => setquiz(e.target.value)}
              placeholder="Ask your question under 250 letters"
              maxLength={250}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={HandleNewQuizSubmit}>
              {submitting ? <Spinner /> : "Submit"}
            </Button>
            <Button variant="ghost" onClick={onClose} disabled={submitting}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewQuestionBox;
