/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import logo from '../img/esocial.jpg';
import Abas from '../components/Abas/index';
import { Row, Col, Image } from 'react-bootstrap'

export default function Home() {
    return (
        <> 
            <Row>
                <Col sm={12}>
                    <Image src={logo} rounded style={{display: "block", 
                            marginLeft: 'auto', 
                            marginRight: 'auto'}}  />
                    <Abas/>
                </Col>
            </Row>
        </>
    )
}