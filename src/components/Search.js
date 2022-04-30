import React, {useState, useEffect} from 'react';
import styles from "./Search.module.css";
import axios from 'axios';

import { useSelector } from 'react-redux';



function Search() {
    
    const [words, setWords] = useState("");
    const [data, setData] = useState([]);
    const [likedData, setLikedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const status = useSelector(state => state.status);

    //updating words for a search bar
    const handleChange = (e) => {
        setWords(e.target.value);
    }

    //clicking search button
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const dataResult = await axios.get(`https://newsapi.org/v2/everything?apiKey=181dd3339697459ab6e7d102051d5099&q=${words}`);
            setData(dataResult.data.articles);
            setIsLoading(false);
        } catch (e) {
            console.log(e.response.data?.message || e.message);
        }
    }

    
    const addLike = (item) => {
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
    },[])

    
  return (
    <div className={styles.SearchWrap}>
        <div className={styles.searchBox}>
            <form onSubmit={handleSubmit}>
                <input className={styles.searchInput} onChange={handleChange}></input>
                <button type="submit" className={styles.seachBtn}>Search</button>
            </form>
        </div>
        <div className={styles.resultArea}>
            {isLoading &&
                <div style={{textAlign: "center"}}>Loading...</div>
            }
            {!isLoading && data.map((item, index)=> (
                <div className={styles.eachBox} key={index}>
                    <img className={styles.listImg} src={item.urlToImage} alt="" />
                    <button className={styles.clickBtn} onClick={() => window.open(item.url, '_blank')}>Detail</button>
                    {status &&
                        <>  
                            {likedData.find(i => i.title === item.title) !== undefined ?
                            <img className={styles.star} src="./img/star2.png" alt='' onClick={()=> deleteLike(item)}/>
                            :
                            <img className={styles.star} src="./img/star1.png" alt='' onClick={()=> addLike(item)}/>
                            }
                        </>
                    }
                    <div className={styles.line}>TITLE: {item.title}</div>
                    <div className={styles.line}>DESC: {item.description}</div>
                    <div className={styles.line}>AUTHOR: {item.author}</div>
                    <div className={styles.line}>DATE: {item.publishedAt}</div>
                    <div className={styles.line}>REF: {item.url}</div>
                </div>
            ))}
            {data.length === 0 && !isLoading &&
                <div style={{textAlign: "center"}}>No Search Result</div>
            }
        </div>
    </div>
  );
}

export default Search;