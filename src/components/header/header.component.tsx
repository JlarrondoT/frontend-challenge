import './header.component.css';

function HeaderComponent () {
    return (
        <div className="header-container">
            <div className='header-wrapper'>
                <div className='meli-logo'></div>
                <div className='mock-search'>
                    <input disabled type="text" placeholder='Buscar productos, marcas y más...'/>
                </div>
                <div className='meli-profile-level'>
                    Ya eres nivel 6
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;