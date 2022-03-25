import Error from './error.gif'

const ErrorMessage = (props) => {
    return (
        // <img src={process.env.PUBLIC_URL + '/Error.gif'} alt="" /> //редко используется
        <img 
        style={{margin: '0 auto', background: 'none', display: 'block', maxHeight: '260px'}} 
        src={Error} alt="" />

    )
}

export default ErrorMessage