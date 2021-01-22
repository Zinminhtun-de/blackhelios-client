import React, { Component } from "react";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

class SinglePicker extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			style,
			enableTime,
			label,
			type,
			field,
			form,
			placeholder
		} = this.props;
		return (
			<Flatpickr
				options={{ mode: "single", enableTime: enableTime }}
				value={field.value}
				className="p-1 m-1"
				style={style}
				placeholder={placeholder}
				onChange={date => {
					field.onChange(date);
				}}
			/>
		);
	}
}

export default SinglePicker;
