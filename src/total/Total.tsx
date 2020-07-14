import React from "react";
import {AppRootState} from "../store/store";
import { useSelector } from "react-redux";
import {GoodsArrType} from "../reducers/goodsReducer";
import s from '../App.module.css'

export const Total = () => {

    const totalState = useSelector<AppRootState, GoodsArrType>(state => state.goodsReducer);
    const {totalPrice} = totalState;

    return (
        <div className={s.totalField}>Товаров на сумму: <span>{totalPrice}</span></div>
    );
};