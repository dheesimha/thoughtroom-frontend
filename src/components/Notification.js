import React from "react";
import "../App.css";

function Notification({ message, intent }) {
  if (message === null) return null;

  return (
    <div className={`${intent === "success" ? "successNote" : "failureNote"}`}>
      {message}
    </div>
  );
}

export default Notification;
