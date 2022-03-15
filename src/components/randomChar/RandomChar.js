import {useEffect, useState} from 'react'
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [character, setCharacter] = useState({})
    
    const {loading, error, getCharacter, clearError} = useMarvelServices();

    useEffect(() => {
        updateChar();
    }, [])


    const onCharLoaded = (character) => {
        setCharacter(character);
    }
    
    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View character={character}/> : null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar}className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View = ({character}) => {

    const {name, description, thumbnail, homepage, wiki} = character
    const noDescr = 'There is no description about this character'
    const imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    let styles = {}
    if (thumbnail === imgNotFound) {
        styles = {objectFit: 'contain'}
    }

    return (
        <div className="randomchar__block">
        <img src={thumbnail} style={styles} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description ? `${description.slice(0, 190)}...` : noDescr}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main" target="blank">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary" target="blank">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;