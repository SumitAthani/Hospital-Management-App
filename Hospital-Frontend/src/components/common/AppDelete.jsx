import React from "react";
import "font-awesome/css/font-awesome.css";
//"fa fa-times" for cross
//"fa fa-trash-o" for trash
function AppDelete(props) {
	return (
		<div>
			<i
				style={{ color: "whitesmoke", fontSize: "1.5rem", zIndex: 2 }}
				onClick={props.onClick}
				className="fa fa-times"
				aria-hidden="true"
			></i>
		</div>
	);
}

export default AppDelete;
