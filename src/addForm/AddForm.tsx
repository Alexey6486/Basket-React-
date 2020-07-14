import React, {ChangeEvent, FormEvent, useState} from "react";
import s from "../App.module.css";
import {useDispatch} from "react-redux";
import {addGoods, totalAmount} from "../reducers/goodsReducer";

export const AddForm = () => {

    const dispatch = useDispatch();

    const [nameValue, setNameValue] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [priceValue, setPriceValue] = useState("");

    const [errName, setErrName] = useState("");
    const [errAmount, setErrAmount] = useState("");
    const [errPrice, setErrPrice] = useState("");

    const [errAmountType, setErrAmountType] = useState("");
    const [errPriceType, setErrPriceType] = useState("");

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            setNameValue(e.currentTarget.value);
            setErrName("");
        }
    };
    const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            var re = /^[0-9]+$/;
            var found = e.currentTarget.value.match(re);
            if (found) {
                setAmountValue(e.currentTarget.value);
                setErrAmount("");
                setErrAmountType("");
            } else {
                setErrAmount("");
                setErrAmountType("Введите число большее 0");
            }

        }
    };
    const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget) {
            var re = /^[0-9]+$/;
            var found = e.currentTarget.value.match(re);
            if (found) {
                setPriceValue(e.currentTarget.value);
                setErrPrice("");
                setErrPriceType("");
            } else {
                setErrPrice("");
                setErrPriceType("Введите число большее 0");
            }
        }
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (nameValue && amountValue && priceValue && amountValue !== '0' && priceValue !== '0') {
            const goodsAction = addGoods({id: "", name: nameValue, amount: +amountValue, price: +priceValue});
            dispatch(goodsAction);
            const totalAction = totalAmount();
            dispatch(totalAction)
            setNameValue("");
            setAmountValue("");
            setPriceValue("");
            setErrName("");
            setErrAmount("");
            setErrPrice("");
        }
        if (!nameValue) {
            setErrName('Введите название товара')
        }
        if (!amountValue) {
            setErrAmount('Введите количество товара')
        }
        if (!priceValue) {
            setErrPrice('Введите цену товара')
        }
    };

    const errEmptyNameField = errName && <p className={s.err}>{errName}</p>;
    const errEmptyAmountField = errAmount && <p className={s.err}>{errAmount}</p>;
    const errEmptyPriceField = errPrice && <p className={s.err}>{errPrice}</p>;
    const errTypeAmount = errAmountType && <p className={s.err}>{errAmountType}</p>;
    const errTypePrice = errPriceType && <p className={s.err}>{errPriceType}</p>;

    return (
        <div className={s.addGoods}>
            <form className={s.addGoodsForm} onSubmit={(e) => onFormSubmit(e)}>

                <div className={`${s.fromGroup} ${s.name}`}>
                    <input id={s.nameInput}
                           type="text"
                           placeholder={"Название товара"}
                           value={nameValue}
                           onChange={(e) => onNameChange(e)}/>
                    {errEmptyNameField}
                </div>

                <div className={`${s.fromGroup} ${s.amount}`}>
                    <input id={s.amountInput}
                           type="text"
                           placeholder={"Количество товара"}
                           value={amountValue}
                           onChange={(e) => onAmountChange(e)}/>
                    {errEmptyAmountField}
                    {errTypeAmount}
                </div>

                <div className={`${s.fromGroup} ${s.price}`}>
                    <input id={s.priceInput}
                       type="text"
                       placeholder={"Цена товара"}
                       value={priceValue}
                       onChange={(e) => onPriceChange(e)}/>
                    {errEmptyPriceField}
                    {errTypePrice}
                </div>

                <button type="submit">Добавить</button>

            </form>
        </div>
    );
};