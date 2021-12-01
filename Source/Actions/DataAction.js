import {
    DATA,
} from '../config/Config';

export const addData = (data) => {
    //  debugger;
    // console.log('cartList', cartList);
    // console.log('newItemForCart', newItemForCart);
    return async (dispatch) => {
        try {
            // let finalCartList = assignToCart(cartList, newItemForCart);
            //   debugger;
            dispatch({ type: DATA, payload: data });
        } catch (e) {
            // alert(e)
            alert('Error', JSON.stringify(e));

        }
    };
};

