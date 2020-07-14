import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../store/store";
import {
    decAmount,
    getGoods,
    GoodsArrType,
    incAmount,
    priceSort,
    remGoods,
    totalAmount,
    amountSort, nameSort
} from "../reducers/goodsReducer";
import s from "../App.module.css";
import closeImg from '../assets/close.png'

export const BasketTable = () => {

    const dispatch = useDispatch();
    const goodsState = useSelector<AppRootState, GoodsArrType>(state => state.goodsReducer);
    const {goodsArr} = goodsState;

    useEffect(() => {
        const goodsAction = getGoods(goodsArr);
        dispatch(goodsAction);
        const totalAction = totalAmount();
        dispatch(totalAction)
    }, [dispatch, goodsArr]);

    const onRemoveClick = (userId: string) => {
        const remAction = remGoods(userId);
        dispatch(remAction)
    };

    const onClickIncrement = (goodsId: string) => {
        const incAmountAction = incAmount(goodsId);
        dispatch(incAmountAction);
    };
    const onClickDecrement = (goodsId: string, currentAmount: number) => {
        if (currentAmount > 1) {
            const decAmountAction = decAmount(goodsId);
            dispatch(decAmountAction);
        }
    };

    const priceSortOnClick = () => {
        const priceSortAction = priceSort();
        dispatch(priceSortAction);
    };

    const amountSortOnClick = () => {
        const amountSortAction = amountSort();
        dispatch(amountSortAction);
    };

    const nameSortOnClick = () => {
        const nameSortAction = nameSort();
        dispatch(nameSortAction);
    };

    const goodsMap = goodsArr.map(goods => {

        return (
            <div key={goods.id} className={s.tableRow}>
                <div className={`${s.tableCol} ${s.name}`}>{goods.name}</div>
                <div className={`${s.tableCol} ${s.amount}`}>
                    <button onClick={() => onClickDecrement(goods.id, goods.amount)}>-</button>
                        {goods.amount}
                    <button onClick={() => onClickIncrement(goods.id)}>+</button>
                </div>
                <div className={`${s.tableCol} ${s.price}`}>{goods.price}</div>
                <div className={`${s.tableCol} ${s.remove}`}><img src={closeImg} onClick={() => onRemoveClick(goods.id)}/></div>
            </div>
        );
    });
    return (
        <div className={s.table}>
            <div className={s.tableHeader}>
                <div className={`${s.tableRow} ${s.tableHeaderMod}`}>
                    <div className={`${s.tableCol} ${s.name}`} onClick={nameSortOnClick}>Название</div>
                    <div className={`${s.tableCol} ${s.amount}`} onClick={amountSortOnClick}>Количество</div>
                    <div className={`${s.tableCol} ${s.price}`} onClick={priceSortOnClick}>Цена</div>
                    <div className={`${s.tableCol} ${s.remove}`}>Удалить</div>
                </div>
            </div>
            <div className={s.tableContent}>
                {goodsMap}
            </div>
        </div>
    );
};