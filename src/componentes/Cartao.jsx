import SmartImage from "@ui/SmartImage";

const Cartao = ({ img = {}, titulo, texto = '', botoes= [] }) => {
    return (
        <div className='card d-flex flex-row'>
            <SmartImage
                src={img.src}
                alt=""
                className='card-img-left'
                style={{
                        height: '200px',
                        width: '150px',
                        borderRadius: '4%'
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p>{texto}</p>
            </div>
        </div>
    )
};

export default Cartao;