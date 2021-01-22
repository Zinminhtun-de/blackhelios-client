import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import styles from "./Editor.module.css";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class EditorComponent extends Component {
  // initializing empty editor state
  state = {
    editorState: EditorState.createEmpty(),
  };

  componentWillReceiveProps(prevProps) {
    const html = prevProps.description;
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    if (this.props.description !== prevProps.description) {
      this.setState({
        editorState: editorState,
      });
    }
  }
  componentDidMount = () => {
    const html = this.props.description || "";
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    if (this.props.description) {
      this.setState({
        editorState: editorState,
      });
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="">
          <div className="col-12">
            <Editor
              editorClassName={`${styles.editor}`}
              editorState={this.state.editorState}
              onEditorStateChange={this.onEditorStateChange}
              onChange={(contentState) => {
                let htmlContents = draftToHtml(
                  convertToRaw(this.state.editorState.getCurrentContent())
                );
                this.props.setFieldValue("details.description", htmlContents);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditorComponent;
