import React, { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';



class CharList extends Component {

    myRef = React.createRef();

    state = {
        charactersData: [],
        loading: true,
        error: false,
        loadingMore: false,
        offset: 650,
        charEnded: false
    }

    marvelService = new MarvelServices();

    onCharsLoaded = (charactersDataMore) => {
        this.setState(({offset, charactersData}) =>{ 
            let ended = false;
            if (charactersDataMore.length < 9) {
                ended = true;
            }
            return {
                charactersData: [...charactersData, ...charactersDataMore],
                loading: false,
                loadingMore: false,
                offset: offset + 9,
                charEnded:ended,
            }
        })
    }

    onError = () => {
        this.setState({ 
            loading:false,
            error: true
        })
    }

    updateChars = (offset) => {
        this.onCharLoading()
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }
    componentDidMount() {
        this.updateChars();
    }

    onCharLoading = () => {
        this.setState({
            loadingMore:true,
        })
    }

    myRefs = []
    onSetRef = elem => {
        this.myRefs.push(elem)
    }

    focusOnItem = (index) => {
    
        this.myRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.myRefs[index].classList.add('char__item_selected');
        this.myRefs[index].focus();
    }



    render () {
        const {charactersData, loading, error, loadingMore, charEnded, offset} = this.state
        
        const characters = charactersData.map(({thumbnail, name, id}, i) => {
            const imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            let styles = {}
            if (thumbnail === imgNotFound) {
                styles = {objectFit: 'contain'}
            }

            return (
                <li 
                ref={this.onSetRef} 
                className="char__item"
                tabIndex={0} 
                key={id} 
                onClick={() => {
                        this.props.getId(id);
                        this.focusOnItem(i)}}
                >
                    <img style={styles} src={thumbnail} alt="abyss"/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        const grid = true

        const errorMessage = error ? <ErrorMessage grid = {grid}/> : null;
        const spinner = loading ? <Spinner grid = {grid}/> : null;

        
    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {characters}
            </ul>
            <button 
            style={{'display': charEnded ? 'none' : 'block'}}
            disabled={loadingMore}
            onClick={() => this.updateChars(offset)} 
            className="button button__main button__long">
                <div className="inner">load more</div> 
            </button>
        </div>
    )
    }
}

CharList.propTypes = {
    getId: PropTypes.func.isRequired

}


export default CharList;