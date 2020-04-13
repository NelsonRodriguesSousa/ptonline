import React, { Component } from 'react';
import { Col, Row, Card, Alert } from 'react-bootstrap'
import GraficoLinha from '../Graficos/GraficoLinha'
import GraficoArea from '../Graficos/GraficoArea'

class Evolucao extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Card className="shadow border-0">

                <Alert variant="warning">
                        <b>Atenção: </b> 
                        <br/>
                        Os dados representados nesta página são dados de teste , não reais e não estão diretamente associados á tua conta.
                        <br/>
                        Estamos a trabalhar para que o mesmo fique funcional o quanto antes.
                    </Alert>

                    <Card.Body>
                        <Card.Title className="font-weight-bold tab-title" >Evolução</Card.Title>

                        <Card.Text>
                        A avaliação consiste numa recolha de dados sobre a composição corporal (peso, IMC, percentagem de massa gorda e percentagem de massa muscular), estilo de vida e experiência de treino, patologias cardíacas e pulmonares, problemas articulares ou musculares e, ainda, sobre os objetivos do treino da pessoa em questão
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Row>
                    <Col sm={12}>
                        <GraficoLinha
                            titulo="Percentagem de Massa Gorda"
                            ajuda="texto de ajuda"
                            yDomain={[0, 50]}
                            dados={
                                [
                                    { x: '01/2018', y: 30 },
                                    { x: '02/2018', y: 28 },
                                    { x: '03/2018', y: 27, },
                                    { x: '04/2018', y: 27, },
                                    { x: '05/2018', y: 25, },
                                    { x: '06/2018', y: 25, },
                                    { x: '07/2018', y: 25, },
                                    { x: '08/2018', y: 18, },
                                ]
                            }
                        />

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={6}>
                        <GraficoArea
                            titulo="Idade Metabólica"
                            ajuda="texto de ajuda"
                            yDomain={[0, 50]}
                            dados={[
                                { x: '01/2018', y: 40 },
                                { x: '02/2018', y: 38 },
                                { x: '03/2018', y: 36, },
                                { x: '04/2018', y: 30, },
                                { x: '05/2018', y: 28, },
                                { x: '06/2018', y: 25, },
                                { x: '07/2018', y: 24, }

                            ]} />

                    </Col>
                    <Col sm={6}>
                        <GraficoLinha
                            titulo="Percentagem Água Corporal"
                            ajuda="texto de ajuda"
                            yDomain={[0, 100]}
                            dados={
                                [
                                    { x: '01/2018', y: 50 },
                                    { x: '02/2018', y: 55 },
                                    { x: '03/2018', y: 60, },
                                    { x: '04/2018', y: 65, },
                                    { x: '05/2018', y: 50, },
                                    { x: '06/2018', y: 60, },
                                    { x: '07/2018', y: 59, },
                                    { x: '08/2018', y: 50, },
                                ]
                            }
                        />

                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <GraficoArea
                            titulo="Taxa Metabólica Basal"
                            ajuda="texto de ajuda"
                            yDomain={[0, 2000]}
                            dados={[
                                { x: '01/2018', y: 1500 },
                                { x: '02/2018', y: 1600 },
                                { x: '03/2018', y: 1600, },
                                { x: '04/2018', y: 1400, },
                                { x: '05/2018', y: 1500, },
                                { x: '06/2018', y: 1300, },
                                { x: '07/2018', y: 1000, }

                            ]} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Evolucao;