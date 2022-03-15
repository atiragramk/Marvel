import './comicsList.scss';
import useMarvelServices from '../../services/MarvelServices';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {


    const [comicsData, setComicsData] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(20);
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


    const comics = comicsData.map(({price, title, thumbnail, homepage, id}, i) => {

        

        let priceValue = true

        if (price === 0) {
            priceValue = false 
        }
        
        return (
            <li key={id} className="comics__item">
                    <a href={homepage} target="blank">
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{priceValue ? `${price} $`: `FREE`}</div>
                    </a>
            </li>
        )
    })
    const grid = true
    const errorMessage = error ? <ErrorMessage grid = {grid}/> : null;
    const spinner = loading && !loadingMore ? <Spinner grid = {grid}/> : null;



    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {comics}
            </ul>
            <button 
            disabled={loadingMore}
            onClick={() => updateComics(offset)} 
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;