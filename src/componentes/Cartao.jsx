import thumbnailImg from '@assets/thumbnail.png';

const Cartao = ({ img = {}, titulo, texto = '', botoes= [] }) => {
    return (
        <div className='card'>
            <img 
                src={img.src} 
                alt="" 
                onError={(e) => { e.target.onerror = null; e.target.src = thumbnailImg; }}
                className='card-img-top'
            />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p>{texto}</p>
            </div>
        </div>
    )
};

export default Cartao;