import React, { useState } from "react";
import Dropzone from "react-dropzone";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import Button from "@material-ui/core/Button";
export default function Photos({
  form,
  field,
  name,
  maxFiles,
  description,
  title = "img_url",
}) {
  const [files, setFiles] = useState([]);

  return (
    <Dropzone
      onDrop={(acceptedFiles, fileRejections) => {
        form.setFieldValue(title, acceptedFiles[0]);
      }}
      maxFiles={maxFiles}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          style={{
            // border: "1px solid grey",
            // borderStyle: "dashed",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <div>
            <Button
              variant="contained"
              color="default"
              className="m-1"
              style={{}}
              startIcon={<CloudUploadOutlinedIcon />}
            >
              {description || "Upload Photo"}
            </Button>

            <input {...getInputProps()} />
          </div>
        </div>
      )}
    </Dropzone>
  );
}
