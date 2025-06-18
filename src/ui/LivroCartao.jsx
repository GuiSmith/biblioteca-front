// Componentes
import BotaoLink from '@componentes/BotaoLink';
import SmartImage from '@componentes/SmartImage';

const LivroCartao = ({ livro = {}, nomeCategoria = '' }) => {
    const titulo = livro.titulo ? livro.titulo.slice(0, 17) + (livro.titulo.length > 17 ? '...' : '') : '';

    return (
        <div className='card d-flex flex-row' style={{ minHeight: '150px' }}>
            <SmartImage
                src={livro.foto}
                alt={`Foto ${titulo}`}
                className='card-img-left'
                style={{
                    maxWidth: '100px',
                    objectFit: 'cover',
                    borderRadius: '4%'
                }}
            />
            <div className='card-body'>
                <h5 className='card-title'>{titulo}</h5>
                <div className='card-text'>
                    <p>{nomeCategoria}</p>
                    <div className='d-flex flex-wrap justify-content-around gap-2'>
                        <BotaoLink label='Detalhes' to={`/livro/view/${livro.id}`} className='btn-dark' />
                        <BotaoLink label='Emprestar' to = '/emprestimo/form/novo' className='btn-success' state={{ livro }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LivroCartao;