import React, {useState, useEffect} from 'react';
import styles from "./Search.module.css";

import { useDispatch, useSelector } from 'react-redux';
import { change } from '../actions';



function Like() {

    const [likedData, setLikedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);




    const addLike = (item) => {

        console.log(item);
        localStorage.setItem("liked", JSON.stringify([...likedData, item]));
        setLikedData([...likedData, item]);
    }
    const deleteLike = (item) => {

        let arr = likedData;
        console.log(arr);
        for(let i = 0; i < arr.length ; i++) {
            if (item.title === arr[i].title) {
                console.log("find one");
                arr.splice(i, 1);
            }
        }
        console.log(arr);
        setLikedData([...arr]);
        localStorage.setItem("liked", JSON.stringify(arr));
    }

    useEffect(() => {
        if(localStorage.liked !== undefined) {
            setLikedData(JSON.parse(localStorage.liked));
        }
        setIsLoading(false);
    },[])


  return (
    <div className={styles.SearchWrap}>
        <div className={styles.resultArea}>
            {isLoading &&
                <div style={{textAlign: "center"}}>Loading...</div>
            }
            {!isLoading && likedData.map((item, index)=> (
                <div className={styles.eachBox} key={index}>
                    <img className={styles.listImg} src={item.urlToImage} alt="" />
                    <button className={styles.clickBtn} onClick={() => window.open(item.url, '_blank')}>보기</button>
                    {likedData.find(i => i.title === item.title) !== undefined ?
                        <img className={styles.star} src="./img/star2.png" alt='' onClick={()=> deleteLike(item)}/>
                        :
                        <img className={styles.star} src="./img/star1.png" alt='' onClick={()=> addLike(item)}/>
                    }
                    <div className={styles.line}>제목: {item.title}</div>
                    <div className={styles.line}>내용: {item.description}</div>
                    <div className={styles.line}>작성자: {item.author}</div>
                    <div className={styles.line}>날짜: {item.publishedAt}</div>
                    <div className={styles.line}>출처: {item.url}</div>
                </div>
            ))}
            {likedData.length === 0 && !isLoading &&
                <div style={{textAlign: "center"}}>Like information not found</div>
            }
        </div>
    </div>
  );
}

export default Like;