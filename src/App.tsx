import React from 'react';
import s from './App.module.css'
import {AddForm} from "./addForm/AddForm";
import { BasketTable } from './basketTable/BasketTable';
import {Total} from "./total/Total";


function App() {
  return (
    <div className={s.app}>
        <div className="container">
            <div className={s.basket}>
                <div className={s.basketLeft}>
                    <BasketTable />
                    <AddForm />
                </div>
                <div className={s.basketRight}>
                    <Total/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
