import React from "react";
import Joi from "joi-browser";

class Form extends React.Component {
	initialMed = {
		id: 0,
		morning: 0,
		afternoon: 0,
		evening: 0,
		night: 0,
		af_bf: "AF",
		medicineType: "",
		medicineName: "",
		medicineComposition: "",
		quantity: "",
		quantityUnit: "",
		dosageUnit: "",
	};

	state = {
		data: {
			inputs: {
				bloodPressure: "",
				oxygen: "",
				temperature: "",
				weight: "",
				impression: "",
				followUp: "",
			},
			medList: {
				medicines: [this.initialMed],
			},
		},
		errors: {
			medErrorList: [],
		},
		searches: {
			seachList: null,
		},
		print: false,
		user: {},
	};

	validate = async () => {
		const { error } = Joi.validate(this.state.data.inputs, this.Schema, {
			abortEarly: false,
		});
		const medErrorList = [];
		const { medicines } = this.state.data.medList;
		// console.log("bsdk meds", medicines);
		medicines.forEach((med) => {
			const { error: medError } = Joi.validate(med, this.medSchema, {
				abortEarly: false,
				allowUnknown: true,
			});
			// console.log("alldetails", medError.details);
			const array = [];
			if (medError) {
				medError.details.forEach((detail) => {
					array.push(detail.message);
				});
				medErrorList.push(array);
			} else medErrorList.push(null);
		});

		// console.log("All Errors", medErrorList);
		await this.setState(
			{ errors: { ...this.state.errors, medErrorList } }
			// () => {
			//   console.log(this.state);
			// }
		);

		// console.log("Schema", this.state);
		if (!error) return null;
		const errorList = {};
		for (let item of error.details) {
			errorList[item.path[0]] = item.message;
		}
		return errorList;
	};

	validateProperty = (name, value) => {
		const obj = { [name]: value };
		// console.log("obj", obj);
		const FieldSchema = { [name]: this.Schema[name] };

		const { error } = Joi.validate(obj, FieldSchema);

		// console.log("" error)

		return error ? error.details[0].message : null;
	};

	handleSubmit = async (values) => {
		// console.log("here submit", this.state);
		const errorList = this.validate();
		var valid = true;
		await errorList.then((s, e) => {
			if (e) {
				valid = true;
				alert("an Error Occred");
			} else {
				if (s != null) {
					// console.log("erererer", s);
					valid = false;
					this.setState(
						{
							errors: {
								...this.state.errors,
								...s,
							},
						},
						() => {}
					);
				} else {
					valid = true;
					// console.log("in else");
				}
			}
		});

		this.state.errors.medErrorList.forEach((d) => {
			if (d != null) {
				valid = false;
			}
		});

		// console.log("VALID", valid);
		if (!valid) {
			// console.log("NOT VALID HERE");
			return null;
		}

		this.doSubmit(values);
	};

	handleInputChange = (e) => {
		const { name, value } = e.target;
		// console.log(e.target);
		const message = this.validateProperty(name, value);
		const errorList = {};
		errorList[name] = message;
		// console.log(e.target.value);
		this.setState({
			data: {
				...this.state.data,
				inputs: { ...this.state.data.inputs, [name]: value },
			},
		});

		// console.log("Daga login", this.state);
		// console.log("Eror List", errorList);
		if (errorList)
			this.setState({ errors: { ...this.state.errors, ...errorList } });
	};
}

export default Form;
