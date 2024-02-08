import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import "./Modal.css";
import {
  greetingsArray,
  emojies,
  checkedInPhrases,
} from "../constants/constants";
import { getRandomElement } from "../utils/modalCopies";
import { useCheckInContext } from "../context/CheckInContext";

const Modal = () => {
  const { message } = useCheckInContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (message && message !== newMessage) {
      setNewMessage(message);
    }
  }, [message]);

  useEffect(() => {
    if (newMessage) {
      setIsModalVisible(true);

      const timeoutId = setTimeout(() => {
        setIsModalVisible(false);
        queryClient.invalidateQueries(["CheckInData"]);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [newMessage, queryClient]);

  const greeting = getRandomElement(greetingsArray);
  const emoji = getRandomElement(emojies);
  const summary = getRandomElement(checkedInPhrases);

  return (
    <div className={`modal-overlay ${isModalVisible ? "visible" : ""}`}>
      <div className="modal-content">
        <h1>{greeting}</h1>
        {newMessage && (
          <>
            <p>{newMessage.reward}</p>
            <h1 className="student-name">{newMessage.name}</h1>
          </>
        )}
        <h2>
          {summary} {emoji}
        </h2>
      </div>
    </div>
  );
};

export default Modal;
