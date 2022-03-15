import {useState} from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";


import decoration from '../../resources/img/vision.png';



const App = () => {

    const [selectedId, setSelectedId] = useState(null);
    const [comicId, setComicId] = useState(null);

    const getId = (id) => {
        setSelectedId(id)
    }

    const getComicId = (id) => {
        setComicId(id)

    }

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    {/* <ComicsList/> */}
                    {/* <SingleComic comicId={getComicId}/> */}
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList getId={getId}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={selectedId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    
}

export default App;