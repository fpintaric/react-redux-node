import React, { Component } from "react";
import "./App.css";
import { bindActionCreators } from "../../../../Users/Franjo/AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux";
import { connect } from "react-redux";

import { exampleAction } from "../actions/example_action";

class App extends Component {
  constructor(props) {
    super(props);
    console.log(props.examplePropOne[0].title);
    this.state = {};
  }

  render() {
    return <div className="App">Epic app (trust me)</div>;
  }
}

const mapStateToProps = state => {
  return {
    examplePropOne: state.example
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ exampleAction }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
