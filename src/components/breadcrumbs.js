import React from 'react';
import { Link } from 'react-router-dom'

const capitaliseFirst = (str) => {
    let newStr = str[0].toUpperCase() + str.slice(1, str.length);
    return newStr
}


const Breadcrumb = (props) => {
    let crumbArr = props.location.pathname.split("/");
    let routeArr = [];
    let depth = crumbArr.length;
    for (let i = 0; i < depth; i++) {
        let newRoute = crumbArr.slice(0, i+1).join("/");
        routeArr = [...routeArr, newRoute]
    }

    let baseCrumb = (
        <div className="breadcrumb-home" key="item">
            <Link to="/home"><p>Home</p></Link>
        </div>
    )
    let breadInit = crumbArr.filter(item => item !== "")
    let bread = breadInit.map((item, key) => {
        let itemArr = item.split("-");
        let capitalItemArr = itemArr.map(s => {
            return capitaliseFirst(s)
        })
        let itemStr = capitalItemArr.join(" ")
        return (
            <div className="breadcrumb-item" key={item}>
                <i className="fas fa-caret-right"></i>
                <Link to={`${routeArr[key+1]}`}><p>{itemStr}</p></Link>
            </div>
        )
    })
    let fullCrumb = [baseCrumb, ...bread];
    return (
        
        <div className="section-wrapper bread">
            <div className="bread-wrapper">
                <div id="breadcrumbs">
                    {fullCrumb}
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb