import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { KeyboardArrowUp } from "@mui/icons-material";
import "../App.css";

const Togglable = forwardRef((props, refs) => {
  Togglable.displayName = "Togglable";

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = {
    display: visible ? "none" : "",
  };
  const showWhenVisible = { display: visible ? "" : "none" };

  const showWhenVisibleSpecial = {
    display: visible ? "" : "none",
    border: "2px solid black",
  };

  const toggleVisbility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return toggleVisbility;
  });

  if (props.type === "normalToggle") {
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisbility}>{props.buttonLabel}</button>
        </div>

        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toggleVisbility}>Cancel</button>
        </div>
      </div>
    );
  } else if (props.type === "divToggle") {
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisbility}>{props.buttonLabel}</button>
        </div>

        <div style={showWhenVisibleSpecial}>
          {props.children}
          <KeyboardArrowUp
            className="arrowUp"
            color="primary"
            onClick={toggleVisbility}
          />
        </div>
      </div>
    );
  }
});

export default Togglable;
