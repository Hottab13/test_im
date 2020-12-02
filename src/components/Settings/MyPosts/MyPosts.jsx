import React from "react";
import classes from './MyPosts.module.css';
import Posts from './Posts/Posts';

const MyPosts = ()=>{
    return(
        <div className={classes.item}>
            Мой пост
            <div >
                <textarea></textarea>
                <button>Добавить пост</button>
            </div>
          <Posts messen='Тестируем первый пост' like='15'/>
          <Posts messen='Как дела юзер?' like='20'/>
          <Posts/>
          <Posts/>
          <Posts/>
          <Posts/>
        </div>
    );
}

export default MyPosts;