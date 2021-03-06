import { Upload, message } from "antd";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const ProductImageUploads = (props) => {
  const [loading, setLoading] = useState(false);

  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt6M = file.size / 1024 / 1024 < 5;
    if (!isLt6M) {
      message.error("Image must smaller than 6MB!");
    }
    return isJpgOrPng && isLt6M;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (event) => {
    props.setImage(event.file.originFileObj);
  };
  console.log(props.image);
  return (
    <div style={{ padding: "20px 0" }}>
      {" "}
      <Upload
        name="avatar"
        listType="picture-card"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        fileList={[]}
        method="get"
      >
        {props.image ? (
          <img src={URL.createObjectURL(props.image)} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default ProductImageUploads;
