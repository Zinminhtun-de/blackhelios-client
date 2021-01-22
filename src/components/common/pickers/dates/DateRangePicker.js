import React, { Component, Fragment } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
class DateRangePicker extends Component {
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
			<Fragment>
				<div className="my-2 py-2 text-center container form-input">
					<Flatpickr
						options={{ mode: "range", enableTime: enableTime }}
						
						value={field.value}
						className="p-1 m-1"
						style={style}
						placeholder={placeholder}
						onChange={date => {
							field.onChange(date);
						}}
					/>
				</div>
			</Fragment>
		);
	}
}

export default DateRangePicker;
