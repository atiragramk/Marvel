import { useParams, Link } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';
import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';



const SingleComicPage = () => {

    const {comicId} = useParams()
    
    const [comic, setComic] = useState({});

    const {loading, error, getComic, clearError} = useMarvelServices();

    useEffect(() => {
        updateComic()
    }, [comicId])


    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded);
    }


    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const View = () => {
        return (
            <div className="single-comic">
                <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{descr}</p>
                    <p className="single-comic__descr">{pages}</p>
                    <p className="single-comic__descr">{`Language: ${lang}`}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    }

    const {thumbnail, title, descr, lang, price, pages} = comic;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View/> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
        
    )
}

export default SingleComicPage;