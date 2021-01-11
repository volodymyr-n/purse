import React from 'react';
import Filters from "./Filters";
import RightBlock from "./RightBlock";
import Alert from "../components/Alert";
import {Col, Container, Row} from "react-bootstrap";

export default function Index() {
    return <Container>
        <Row>
            <Col className="all-content">
                <Row>
                    <Col xs={12}>
                        <Alert/>
                    </Col>
                    <Col xs={12}>
                        <Row>
                            <Col xs={3}>
                                <Filters/>
                            </Col>
                            <Col className="offset-1" xs={8}>
                                <RightBlock/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}