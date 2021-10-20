import React, { Component } from 'react';
import { clearCart } from '../actions/cartAction';
import { connect } from 'react-redux';
import util from '../currency';

/**
 * Order component represent the order page. It shows the ordered products and total price details
 */
class Order extends Component {
    handleTotalPrice = () => {
        let total = 0;
        this.props.cartItems.map((item) => (
            total += item.unit_price_incl_vat * item.count
        ))
        return util.formatCurrency(total);
    }
    render() {
        const { cartItems } = this.props;
        let noOfItems = cartItems.length;

        return (
            <div className="container px-8 py-24 mx-auto">
                <h1 className="title-font text-center">Thank you for your order</h1>
                {noOfItems === 0 ? <h3 className="text-center">Basket is empty</h3> :
                    cartItems.map((item) =>
                        <table className="table-auto w-auto mx-auto text-left whitespace-no-wrap" key={item.id}>
                            <tbody>
                                <tr htmlFor={item.id}>
                                    <td className="px-4 py-3 text-2xl">{item.count} X</td>
                                    <td className="px-4 py-3 text-2xl">{item.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                {noOfItems === 0 ? " " :
                    <p className="lg:w-2/3 mx-auto mt-10 leading-relaxed text-center text-3xl">Please send us the payment of <span className="text-3xl"><b>€ {this.handleTotalPrice()}</b></span> to our bitcoin address.</p>}
                <p className="text-center mt-20">
                    <a href="/" className="btn btn-primary" onClick={() => this.props.clearCart()}>Continue Shopping</a>
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => ({ cartItems: state.cart.items });
export default connect(mapStateToProps, { clearCart })(Order);