import React, { Component } from "react";
import { Container, TextField, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { nanoid } from "nanoid";

export default class NewProductForm extends Component {
  state = {
    textValue: "",
  };

  inputChangeHandler = (e) => {
    this.setState({
      textValue: e.target.value,
    });
  };

  clearInputValue = () => {
    this.setState({
      textValue: "",
    });
  };

  formSubmitHandler = (e) => {
    e.preventDefault();

    this.props.onAddNewProduct({
      id: nanoid(),
      text: this.state.textValue,
      isDone: false,
    });

    this.clearInputValue();
  };

  render() {
    const { textValue } = this.state;

    return (
      <form onSubmit={this.formSubmitHandler}>
        <Container
          maxWidth={false}
          disableGutters={true}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            mt: "15px",
            p: "0px",
          }}
        >
          <TextField
            variant="outlined"
            sx={{
              width: "300px",
              mr: "25px",
            }}
            onChange={this.inputChangeHandler}
            value={textValue}
            label="Input product here"
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            endIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Container>
      </form>
    );
  }
}
