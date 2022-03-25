import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelServices from '../../services/MarvelServices';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';



const CharList = (props) => {

    const [charactersData, setCharactersData] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(650);
    const [charEnded, setCharEnded] = useState(false);


    const {loading, error, getAllCharacters} =  useMarvelServices();

    useEffect(() => {
        updateChars(offset, true);
    }, [])

    const onCharsLoaded = (charactersDataMore) => {
        let ended = false;
        if (charactersDataMore.length < 9) {
            ended = true;
        }
        setCharactersData(charactersData => [...charactersData, ...charactersDataMore]);
        setLoadingMore(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended)
    }

    const updateChars = (offset, initial) => {
        initial ? setLoadingMore(false) : setLoadingMore(true);
        getAllCharacters(offset)
            .then(onCharsLoaded);
    }


    const myRefs = useRef([])
 

    const focusOnItem = (index) => {
    
        myRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        myRefs.current[index].classList.add('char__item_selected');
        myRefs.current[index].focus();
    }


    function renderItems (arr) {
      
        
        const characters = arr.map(({thumbnail, name, id}, i) => {
            const imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            let styles = {}
            if (thumbnail === imgNotFound) {
                styles = {objectFit: 'contain'}
            }

            return (
                    <CSSTransition key={id} timeout={300} classNames="char__item">
                        <li 
                            ref={el => myRefs.current[i] = el} 
                            className="char__item"
                            tabIndex={0} 
                            
                            onClick={() => {
                                    props.getId(id);
                                    focusOnItem(i)}}
                            >
                                <img style={styles} src={thumbnail} alt="abyss"/>
                                <div className="char__name">{name}</div>
                        </li>

                    </CSSTransition>

                
            )
        })

        return (

            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {characters}
                </TransitionGroup>

            </ul>
        )
    }    
        
    const items = renderItems(charactersData)
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !loadingMore ? <Spinner/> : null;

        
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
            style={{'display': charEnded ? 'none' : 'block'}}
            disabled={loadingMore}
            onClick={() => updateChars(offset)} 
            className="button button__main button__long">
                <div className="inner">load more</div> 
            </button>
        </div>
    )
}

CharList.propTypes = {
    getId: PropTypes.func.isRequired

}


export default CharList;