import { Button, Container, Paper, Typography, Collapse } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import React, { Component } from "react";
import NewProductForm from "./NewProductForm/NewProductForm";
import ProductsList from "./ProductsList/ProductsList";

export default class ShoppingList extends Component {
  state = {
    isOpenAddForm: false,
    shoppingItems: [],
  };

  addFormToggler = () => {
    this.setState((prevState) => ({
      isOpenAddForm: !prevState.isOpenAddForm,
    }));
  };

  addProductHandler = (product) => {
    this.setState((prevState) => ({
      shoppingItems: [...prevState.shoppingItems, product],
    }));

    this.addFormToggler();
  };

  deleteProductHandler = (id) => {
    this.setState((prevState) => ({
      shoppingItems: prevState.shoppingItems.filter((el) => el.id !== id),
    }));
  };

  editProductHandler = (id, newProductDescr) => {
    this.setState((prevState) => ({
      shoppingItems: prevState.shoppingItems.map((el) =>
        el.id !== id ? el : { ...el, text: newProductDescr }
      ),
    }));
  };

  statusChangeHandler = (e, id) => {
    this.setState((prevState) => ({
      shoppingItems: prevState.shoppingItems.map((el) =>
        el.id !== id ? el : { ...el, isDone: e.target.checked }
      ),
    }));
  };

  render() {
    const { isOpenAddForm, shoppingItems } = this.state;

    return (
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: "10px",
        }}
      >
        <Typography variant="h4">Shopping List</Typography>

        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={{
              lineHeight: 0,
              width: "155px",
            }}
            onClick={this.addFormToggler}
          >
            Add product
          </Button>

          <Collapse in={isOpenAddForm}>
            <NewProductForm onAddNewProduct={this.addProductHandler} />
          </Collapse>
        </Container>

        <Typography variant="h5">Product list</Typography>

        <ProductsList
          productsArray={shoppingItems}
          onDelete={this.deleteProductHandler}
          onEdit={this.editProductHandler}
          onStatusChange={this.statusChangeHandler}
        />
      </Paper>
    );
  }
}
