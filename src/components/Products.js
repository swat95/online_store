import React, { Component } from 'react';
import util from '../currency';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productAction';
import { addToCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

/**
   * Products page to show the list of products from products.json file
   */
class Products extends Component {
    componentDidMount() {
        this.props.fetchProducts();
        this.msgToastAdd = this.msgToastAdd.bind(this);
    }

    /**
     * Function to show success message to user after adding product to cart
     */
    msgToastAdd = (product) => {
        toast.info("The " + product + " is successfully added to the cart!", { position: toast.POSITION.TOP_RIGHT })
    }
    render() {
        const productItems = this.props.products.map(product => {
            return (
                <div className="col-md-3" key={product.id}>
                    <div >
                        <div className="thumbnail text-center text-2xl">
                            <a href={`#${product.id}`} onClick={() => { this.props.addToCart(this.props.cartItems, product); this.msgToastAdd(product.name); }}>
                                <img src={product.image} alt={product.name}></img>
                                <p className="text-white"><b>{product.name}</b></p>
                            </a>
                            <ToastContainer />
                            <div>
                                <b>€ {util.formatCurrency(product.unit_price_incl_vat)}</b>
                                <button className="btn btn-primary"
                                    onClick={() => {
                                        this.props.addToCart(this.props.cartItems, product);
                                        this.msgToastAdd(product.name);
                                    }}>Add To Cart</button><ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
        )

        return (
            <div className="container">
                <h1 className="title-font text-center">Online Shopping Store</h1>
                <div>
                    <Link className="btn btn-primary" to="/basket">Go to cart</Link>
                </div><br />
                <div >
                    {productItems}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        products: state.products.filteredItems,
        cartItems: state.cart.items
    });
export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);