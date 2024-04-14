import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearCart } from '../features/cart/cartSlice';

const Orders = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('payment') === 'done') {
          dispatch(clearCart());
        }

      }, [location.search]);

    return (
        <h1>Orders page</h1>
    );
}

export default Orders;