import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import useMarvelServices from '../../services/MarvelServices';
import {useState, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';



const SingleComic = (props) => {

    const [comic, setComic] = useState({});

    const {loading, error, getComic, clearError} = useMarvelServices();

    useEffect(() => {
        updateComic()
    }, [props.comicId])


    const updateComic = () => {
        const {comicId} = props
        if (!comicId) {
          return;
        }
        clearError();
        getComic(comicId)
            .then(onCharLoaded);
    }


    const onCharLoaded = (comic) => {
        setComic(comic);
    }

    const {thumbnail, title, descr, lang, price} = comic;
    const grid = true
    const errorMessage = error ? <ErrorMessage grid = {grid}/> : null;
    const spinner = loading ? <Spinner grid = {grid}/> : null;




    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">{`Language: ${lang}`}</p>
                <div className="single-comic__price">{`${price} $`}</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComic;