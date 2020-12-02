import React from "react";
import classes from './Posts.module.css';

const Posts = (props)=>{
    return(
        <div className={classes.item}>
            {props.messen}
            <button>Нравится {props.like}</button>
            <button>Удалить</button>
        </div>
        );
}

export default Posts;