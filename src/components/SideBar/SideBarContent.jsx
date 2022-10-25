import SideBarList from './SideBarList';
import { useState, useEffect } from 'react';
import axios from "axios";

const apiGetListsCounts = 'http://localhost:3000/api/counts/lists/';

async function getListsCounts() {
    return await axios.get(apiGetListsCounts).then(res => res.data)
}

let lists;

const SideBarContent = ({handleClick, newListStatus, delFormStatus}) => {
    const [listArr, setListArr] = useState([]);

    const handleListClick = (id) => {
        handleClick(id);
    }

    useEffect(() => {
        getListsCounts().then((res) => setListArr(res));                  
    }, [newListStatus, delFormStatus]);

    if (listArr) {

        lists = listArr
            .map((list) => {
                return (<SideBarList handleListClick = {handleListClick} key = {list.id} list = {list}/>)
            });
    }

    return (
            <div className="sidebar__content">
                <ul className="sidebar__lists">    
                    {lists}         
                </ul>
            </div>
    );

}

export default SideBarContent;