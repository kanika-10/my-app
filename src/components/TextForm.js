import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleOnClickUp = () => {
    let newText = text.toUpperCase();
    setText(newText);
    if (text.length > 0) props.showAlert("Converted to Uppercase", "success");
    else
      props.showAlert("Please write something to use this feature", "warning");
  };
  const handleOnClickLr = () => {
    let newText = text.toLowerCase();
    setText(newText);
    if (text.length > 0) props.showAlert("Converted to Lowercase", "success");
    else
      props.showAlert("Please write something to use this feature", "warning");
  };

  const handleOnClickClear = () => {
    let newText = "";
    setText(newText);
    if (text.length > 0) props.showAlert("Text is cleared", "success");
    else
      props.showAlert("Please write something to use this feature", "warning");
  };

  const handleOnClickUndo = () => {
    let i = text.length;
    while (text[i] !== " " && i >= 0) i--;

    let newText = text.substring(0, i);
    setText(newText);
    if (text.length === 0)
      props.showAlert("Please write something to use this feature", "warning");
  };

  const handleOnClickCopy = () => {
    let box = document.getElementById("myBox");
    box.select();
    navigator.clipboard.writeText(box.value);
    if (text.length > 0) props.showAlert("Text copied", "success");
    else
      props.showAlert("Please write something to use this feature", "warning");
  };

  const handleOnClickExtraSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    if (text.length > 0) props.showAlert("Removed Extra spaces", "success");
    else
      props.showAlert("Please write something to use this feature", "warning");
  };

  const words = () => {
    if (text.length === 0) return 0;
    let newText = text.split(/[ ]+/);
    newText = newText.join(" ");
    let spaces = newText.split(" ").length - 1;
    if (newText[newText.length - 1] === " ") spaces--;
    return spaces;
  };

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "light" ? "black" : "white" }}
      >
        <h1>{props.heading}</h1>
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="8"
          style={{
            backgroundColor: props.mode === "light" ? "white" : "#1b2741",
            color: props.mode === "light" ? "black" : "white",
          }}
        ></textarea>
        <button className="btn btn-primary my-3" onClick={handleOnClickUp}>
          Convert to uppercase
        </button>
        <button className="btn btn-primary my-3 mx-3" onClick={handleOnClickLr}>
          Convert to lowercase
        </button>
        <button className="btn btn-primary my-3" onClick={handleOnClickClear}>
          Clear Text
        </button>
        <button
          className="btn btn-primary my-3 mx-3"
          onClick={handleOnClickUndo}
        >
          Undo
        </button>
        <button className="btn btn-primary my-3" onClick={handleOnClickCopy}>
          Copy Text
        </button>
        <button
          className="btn btn-primary my-3 mx-3"
          onClick={handleOnClickExtraSpace}
        >
          Remove Extra Spaces
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "light" ? "black" : "white" }}
      >
        <h1>Your text Summary</h1>
        <p>
          {words()} words & {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minuites read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter something to preview it here"}</p>
      </div>
    </>
  );
}
