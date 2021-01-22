import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill";
import styles from "./Editor.module.css";

class Editor extends Component {
	static propTypes = {
		prop: PropTypes
	};
	state = {
		theme: "snow",
		editorHtml: ""
	};
	handleChange = html => {
		this.setState({ editorHtml: html });
	};
	render() {
		console.log("sa", this.state.editorHtml);
		const createMarkup = () => {
			return { __html: this.state.editorHtml };
		};
		return (
			<div>
				<ReactQuill
					theme={this.state.theme}
					onChange={this.handleChange}
					value={this.state.editorHtml}
					modules={Editor.modules}
					formats={Editor.formats}
					placeholder={this.props.placeholder || "write...."}
					style={{
						minHeight: "200px"
					}}
				/>
			</div>
		);
	}
}
Editor.modules = {
	toolbar: [
		[{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
		[{ size: [] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" }
		],
		["link", "image", "video"],
		["clean"]
	]
};
Editor.formats = [
	"header",
	"font",
	"size",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"list",
	"bullet",
	"indent",
	"link",
	"image",
	"video"
];
export default Editor;
