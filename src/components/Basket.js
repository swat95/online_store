import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../actions/cartAction';
import { connect } from 'react-redux';
import util from '../currency';

/**
 * Basket component represents cart page. Cart page shows the products added to the cart
 */
class Basket extends Component {

    handleTotalPrice = () => {
        let total = 0;
        this.props.cartItems.map((item) => (
            total += item.unit_price_incl_vat * item.count
        ))
        return util.formatCurrency(total);
    }

    render() {
        const { cartItems, history } = this.props;
        console.log(cartItems);
        return (
            <div className="container px-5 py-24 mx-auto">
                <div className="container text-center">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="text-xx-large title-font mb-2 text-white">Cart</h1>
                    </div>
                    {cartItems.length === 0 ? <h3>Basket is empty</h3> : <div><h4><b>You have {cartItems.length} items in the basket </b></h4></div>}<br />
                    {cartItems.length > 0 &&
                        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                            <table className="table-auto w-full text-left whitespace-no-wrap">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 title-font text-2xl tracking-wider text-gray-900 text-8x-large bg-gray-100 rounded-tl rounded-bl">Item</th>
                                        <th className="px-4 py-3 title-font text-2xl tracking-wider text-gray-900 text-xx-large bg-gray-100">Quantity</th>
                                        <th className="px-4 py-3 title-font text-2xl tracking-wider text-gray-900 text-xx-large bg-gray-100 text-right">Unit Price incl. VAT</th>
                                        <th className="px-4 py-3 title-font text-2xl tracking-wider text-gray-900 text-xx-large bg-gray-100 text-right">VAT</th>
                                        <th className="px-4 py-3 title-font text-2xl tracking-wider text-gray-900 text-xx-large bg-gray-100 text-right">Total</th>
                                    </tr>
                                </thead>
                                {
                                    cartItems.map(item =>
                                        <tbody key={item.id}>
                                            <tr>
                                                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-2xl">{item.name}</td>
                                                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-2xl">{item.count}</td>
                                                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right text-2xl">€ {item.unit_price_incl_vat}</td>
                                                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right text-2xl">{item.vat_category}%</td>
                                                <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-right text-2xl">€ {(item.unit_price_incl_vat * item.count).toFixed(2)}</td>
                                                <td ><button className="btn btn-danger" onClick={() => this.props.removeFromCart(this.props.cartItems, item)}>Delete</button></td>
                                            </tr>

                                        </tbody>
                                    )
                                }
                                <tfoot>
                                    <tr>
                                        <th colspan="4" class="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right text-white text-2xl">Total excl. VAT</th>
                                        <th class="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg  text-right text-white text-2xl">€ {this.handleTotalPrice()-(2.79+2.18)}</th>
                                    </tr>
                                    <tr>
                                        <th colspan="4" class="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right text-white text-2xl">VAT 10%</th>
                                        <th class="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-right text-white text-2xl">€ 2.79</th>
                                    </tr>
                                    <tr>
                                        <th colspan="4" class="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right text-white text-2xl">VAT 20%</th>
                                        <th class="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-right text-white text-2xl">€ 2.18</th>
                                    </tr>
                                    <tr>
                                        <th colSpan="4" className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-right text-white text-3xl">Total</th>
                                        <th className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-white text-right text-3xl"><b>€ {this.handleTotalPrice()}</b></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    }
                    <div>
                        <button className="btn btn-primary float-left" onClick={() => history.push("/")}>Back</button>
                        <Link className="btn btn-primary float-right" to="/order">Send order</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ cartItems: state.cart.items })
export default connect(mapStateToProps, { removeFromCart })(Basket);