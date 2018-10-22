import React, { Component } from "react";
import axios from "axios";
import { reduxForm } from "redux-form";

class Form extends Component {
  onSubmit(values) {
    axios
      .post(" http://localhost:8080/locations", values)
      .then(response => console.log(response));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {this.props.children}

        <button type="submit">Submit</button>
      </form>
    );
  }
}

Form = reduxForm({
  form: "test"
})(Form);

export default Form;
