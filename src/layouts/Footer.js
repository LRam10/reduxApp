import React from 'react';
import Container from 'react-bootstrap/Container';
const Footer= (props)=> {
    return (
        <Container fluid className="fixed-bottom bg-dark">
            <div>
                <h2 className='text-white py-4'>Footer</h2>
            </div>
        </Container>
    );
}

export default Footer;