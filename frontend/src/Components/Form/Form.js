import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";

const MyForm = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [openModel, setOpenModel] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const resetForm = () => {
    setFile(null);
    setData(null);
    setError(null);
    setOpenModel(false);
    setImagePreview(null);

    // Reset the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function submitForm() {
    if (file === null) {
      setError("First select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        let responseData = await response.json();
        setData(responseData);
        setOpenModel(true);
      } else {
        setError("Failed to upload and predict the image.");
      }
    } catch (e) {
      setError("An error occurred while processing the request.");
    }
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a data URL for image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  function hideError() {
    setError(null);
  }

  function closeModel() {
    resetForm();
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose an image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} ref={fileInputRef} />
        </Form.Group>
        {error && (
          <div className="row error d-flex">
            <div className="alert alert-danger d-flex justify-content-between" role="alert">
              {error}
              <button type="button" className="btn btn-danger" onClick={hideError}>
                Dismiss
              </button>
            </div>
          </div>
        )}
        <button className="btn btn-success" onClick={submitForm} type="button" disabled={file === null}>
          Predict
        </button>
      </Form>
      <Modal show={openModel} onHide={closeModel} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>The Prediction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data && (
            <>
              <p>The Quality of the Cabbage You Gave is: {data} Quality</p>
              {imagePreview && <img src={imagePreview} alt="inputImage" style={{ maxWidth: "100%" }} />}
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyForm;
