import React from 'react';

export default class ProductsList extends React.Component {
  state = {
    products: [
      {
        _id: '34rg',
        name: 'iPhone X',
        price: 799.99,
        inStock: true
      },
      {
        _id: '36gu',
        name: 'iron',
        price: 29.99,
        inStock: false
      },
      {
        _id: '97ux',
        name: 'coffee mug',
        price: 9.0,
        inStock: true
      }
    ]
  };

  addProduct = newProd => {
    // console.log('button hit', newProd);
    const prodCopy = [...this.state.products];
    prodCopy.push(newProd);
    // console.log(prodCopy);
    this.setState({
      products: prodCopy
    });

    // because setState method is async, we need to set the state this way
    // to make sure it is set before render() method executes
    // this.setState(prevState => ({
    //  products: [...prevState.products, newProd]
    // }));
  };

  deleteProduct = indx => {
    const prodCopy = [...this.state.products];
    prodCopy.splice(indx, 1);
    this.setState({
      products: prodCopy
    });
  };

  render() {
    const { products } = this.state;
    // console.log('---', products);

    const list = products.map((product, index) => {
      return (
        <li key={product._id}>
          <h3>
            {product.name} - {product.price}
          </h3>
          {(product.inStock && <p> In stock </p>) || <p> Out of stock </p>}

          <button onClick={() => this.deleteProduct(index)}> Delete </button>
        </li>
      );
    });

    return (
      <>
        <ul>{list}</ul>
        <button onClick={() => this.addProduct({ _id: 'pou', name: 'ironShirt', price: 19, inStock: true })}>
          Add product
        </button>
      </>
    );
  }
}

// {/* (product.inStock && <li key={product._id}> {product.name} In stock</li>) || (
//      <li key={product._id}> {product.name} Out of stock</li>
// ) */}
