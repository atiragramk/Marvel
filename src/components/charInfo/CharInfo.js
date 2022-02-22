import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import PropTypes from 'prop-types';


import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';
import { Fragment } from 'react';


class CharInfo extends Component {

    state = {
        character: null,
        loading: false,
        error: false
    }
    

    marvelService = new MarvelServices();

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    
    
    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
          return;
        }
        this.onCharLoading()
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoading = () => {
        this.setState({
            loading:true,
        })
    }
    onCharLoaded = (character) => {
        this.setState({
            character, 
            loading:false,
        })
    }
    onError = () => {
        this.setState({ 
            loading:false,
            error: true
        })
    }




    


    render () {
        const {character, loading, error} = this.state

        const skeleton = character || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !character) ? <View character={character}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            
        </div>
        )
    }
   
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;

const View = ({character}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = character
    const imgNotFound = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    let styles = {}
    if (thumbnail === imgNotFound) {
        styles = {objectFit: 'contain'}
    }
    const noDescr = 'There is no description about this character'


    return (
        <Fragment>
            <div className="char__basics">
                <img style={styles} src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href="/" className="button button__main" target="blank">
                            <div className="inner">homepage</div>
                        </a>
                        <a href="/" className="button button__secondary" target="blank">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description ? description : noDescr}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">


                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                               <a href="/" target="blank">{item.name}</a>
                            </li>
                        )
                    })
                }
                
            </ul>
        </Fragment>
            
        
    )
}
