import {v1} from "uuid";

export type GoodsType = {
    id: string
    name: string
    amount: number
    price: number
}
export type GoodsArrType = {
    goodsArr: Array<GoodsType>
    totalPrice: number
    priceSort: 'asc' | 'dec' | null
    amountSort: 'asc' | 'dec' | null
    nameSort: 'asc' | 'dec' | null
}

const GET_GOODS = 'GET_GOODS';
const ADD_GOODS = 'ADD_GOODS';
const REM_GOODS = 'REM_GOODS';
const INC_AMOUNT = 'INC_AMOUNT';
const DEC_AMOUNT = 'DEC_AMOUNT';
const SET_TOTAL = 'SET_TOTAL';
const PRICE_SORT = 'PRICE_SORT';
const AMOUNT_SORT = 'AMOUNT_SORT';
const NAME_SORT = 'NAME_SORT';

type GetGoodsACType = {
    type: typeof GET_GOODS
    goodsArr: Array<GoodsType>
}
type AddGoodsACType = {
    type: typeof ADD_GOODS
    goods: GoodsType
}
type RemGoodsACType = {
    type: typeof REM_GOODS
    goodsId: string
}
type IncAmountCType = {
    type: typeof INC_AMOUNT
    goodsId: string
}
type DecAmountACType = {
    type: typeof DEC_AMOUNT
    goodsId: string
}
type SetTotalACType = {
    type: typeof SET_TOTAL
}
type PriceSortACType = {
    type: typeof PRICE_SORT
}
type AmountSortACType = {
    type: typeof AMOUNT_SORT
}
type NameSortACType = {
    type: typeof NAME_SORT
}

export const getGoods = (goodsArr: Array<GoodsType>) => {
    return {
        type: GET_GOODS,
        goodsArr
    }
};
export const addGoods = (goods: GoodsType) => {
    return {
        type: ADD_GOODS,
        goods
    }
};
export const remGoods = (goodsId: string) => {
    return {
        type: REM_GOODS,
        goodsId
    }
};
export const incAmount = (goodsId: string) => {
    return {
        type: INC_AMOUNT,
        goodsId
    }
};
export const decAmount = (goodsId: string) => {
    return {
        type: DEC_AMOUNT,
        goodsId
    }
};
export const totalAmount = () => {
    return {
        type: SET_TOTAL,
    }
};
export const priceSort = () => {
    return {
        type: PRICE_SORT,
    }
};
export const amountSort = () => {
    return {
        type: AMOUNT_SORT,
    }
};
export const nameSort = () => {
    return {
        type: NAME_SORT,
    }
};

type ActionCreatorType = GetGoodsACType | AddGoodsACType | RemGoodsACType | IncAmountCType | DecAmountACType | SetTotalACType | PriceSortACType | AmountSortACType | NameSortACType;

const initGoodsId01 = v1();
const initGoodsId02 = v1();

const initState: GoodsArrType = {
    goodsArr: [
        {id: initGoodsId01, name: 'Goods_01', amount: 1, price: 400},
        {id: initGoodsId02, name: 'Goods_02', amount: 3, price: 100}
    ],
    totalPrice: 0,
    priceSort: null,
    amountSort: null,
    nameSort: null,
};

export const goodsReducer = (state: GoodsArrType = initState, action: ActionCreatorType) => {
    switch (action.type) {

        case GET_GOODS:
            return {...state, goodsArr: action.goodsArr};

        case ADD_GOODS:
            const newGoods = {
                id: v1(),
                name: action.goods.name,
                amount: action.goods.amount,
                price: action.goods.price
            };
            return {...state, goodsArr: [...state.goodsArr, newGoods]};

        case REM_GOODS:
            const remGoodsStateCopy = {...state};
            const innerArrCopy = remGoodsStateCopy.goodsArr.map(goods => goods).filter(goods => goods.id !== action.goodsId);
            remGoodsStateCopy.goodsArr = innerArrCopy;
            return remGoodsStateCopy;

        case INC_AMOUNT:
            const goodsStateCopy = {...state};
            let goodsArr = goodsStateCopy.goodsArr;
            goodsStateCopy.goodsArr = goodsArr.map(goods => goods.id === action.goodsId ? {...goods, amount: goods.amount + 1} : goods);
            return goodsStateCopy;

        case DEC_AMOUNT:
            return {...state, goodsArr: state.goodsArr.map(goods => goods.id === action.goodsId ? {...goods, amount: goods.amount - 1} : goods)};

        case SET_TOTAL:
            const total = state.goodsArr.reduce((a, b) => a + (b.price*b.amount), 0);
            return {...state, totalPrice: total};

        case PRICE_SORT:
            const priceSortStateCopy = {...state};
            if (priceSortStateCopy.priceSort === 'dec' || priceSortStateCopy.priceSort === null) {
                priceSortStateCopy.goodsArr.sort((a, b) => a.price - b.price);
                priceSortStateCopy.priceSort = 'asc';
            } else if (priceSortStateCopy.priceSort === 'asc') {
                priceSortStateCopy.goodsArr.sort((a, b) => a.price - b.price).reverse();
                priceSortStateCopy.priceSort = 'dec';
            }
            return priceSortStateCopy;

        case AMOUNT_SORT:
            const amountSortStateCopy = {...state};
            if (amountSortStateCopy.amountSort === 'dec' || amountSortStateCopy.amountSort === null) {
                amountSortStateCopy.goodsArr.sort((a, b) => a.amount - b.amount);
                amountSortStateCopy.amountSort = 'asc';
            } else if (amountSortStateCopy.amountSort === 'asc') {
                amountSortStateCopy.goodsArr.sort((a, b) => a.amount - b.amount).reverse();
                amountSortStateCopy.amountSort = 'dec';
            }
            return amountSortStateCopy;

        case NAME_SORT:
            const nameSortStateCopy = {...state};
            if (nameSortStateCopy.nameSort === 'dec' || nameSortStateCopy.nameSort === null) {
                nameSortStateCopy.goodsArr.sort((a, b) => a.name.localeCompare(b.name));
                nameSortStateCopy.nameSort = 'asc';
            } else if (nameSortStateCopy.nameSort === 'asc') {
                nameSortStateCopy.goodsArr.sort((a, b) => a.name.localeCompare(b.name)).reverse();
                nameSortStateCopy.nameSort = 'dec';
            }
            return nameSortStateCopy;

        default:
            return state;
    }
};