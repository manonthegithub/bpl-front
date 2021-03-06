/**
 * Администрирование заказов
 */
require('expose?$!expose?jQuery!jquery');
require('bootstrap-webpack!../../bootstrap.config.js');
require('../../styles/style.less');

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {connect} from 'react-redux'
import {AdminOrderList} from '../components/productViewComponent'


const initialState = {
    data: []
}

const ordersReducer = (state = initialState, action)=> {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch (action.type) {
        case 'ADD':
            return Object.assign({}, state, {
                data: [
                    ...state.data,
                    action.item
                ]
            })
        case 'REMOVE':
            return Object.assign({}, state, {
                data: state.data.filter((x) => x.id != action.id)
            })
        case 'SET_NEW_DATA':
            return Object.assign({}, state, {
                data: action.array
            })
        case 'UPDATE_ELEMENT':
            return Object.assign({}, state, {
                data: state.data.map((elem) => {
                    if (elem.id === action.item.id) {
                        return Object.assign({}, elem, action.item)
                    }
                    return elem
                })
            })
        default:
            return state
    }

}


let store = createStore(ordersReducer, initialState)

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderAction: (action) => dispatch(action)
    }
}

const OrdersList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminOrderList)

render(
    <Provider store={store}>
        <OrdersList url="/api/adm/orders"/>
    </Provider>,
    document.getElementById('orders-list')
)