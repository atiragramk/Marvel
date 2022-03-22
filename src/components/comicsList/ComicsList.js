import useMarvelServices from '../../services/MarvelServices';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {


    const [comicsData, setComicsData] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(50);
    const [comicEnded, setComicEnded] = useState(false);

    const {loading, error, getComics} =  useMarvelServices();

    useEffect(() => {
        updateComics(offset, true);
    }, [])

    const onComicsLoaded = (comicsDataMore) => {
        let ended = false;
        if (comicsDataMore.length < 8) {
            ended = true;
        }
        setComicsData(comicsData => [...comicsData, ...comicsDataMore]);
        setLoadingMore(false);
        setOffset(offset => offset + 8);
        setComicEnded(ended)
    }

    const updateComics = (offset, initial) => {
        initial ? setLoadingMore(false) : setLoadingMore(true);
        getComics(offset)
            .then(onComicsLoaded);
    }

    function renderItems (arr) {
        const comics = arr.map(({price, title, thumbnail, homepage, id}, i) => {

        
            return (
                <li key={i} className="comics__item">
                        <Link to={`./${id}`}>
                            <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{price}</div>
                        </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {comics}
            </ul>

        )
    }
    
    const items = renderItems(comicsData);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loadingMore ? <Spinner/> : null;



    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            
            <button 
            tyle={{'display' : comicEnded ? 'none' : 'block'}}
            disabled={loadingMore}
            onClick={() => updateComics(offset)} 
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;