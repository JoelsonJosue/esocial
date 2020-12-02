import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'

ReactDOM.render(
    <React.StrictMode>
      <Container>
        <Routes />
      </Container>
    </React.StrictMode>,
    document.getElementById('root')
);

