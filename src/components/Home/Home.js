import React, { Component } from 'react';
import { Tab, Nav, Col, Row, Container, Card, Table, Button, Accordion, Image, Dropdown, Modal, Form , OverlayTrigger, Tooltip as TooltipReact} from 'react-bootstrap'
import FirebaseService from '../../config/FirebaseService';
import { IoMdLogOut, IoIosStats, IoIosAlbums, IoMdCafe, IoMdHeart , IoIosAddCircle} from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import SubemeterAvaliacao from './SubmeterAvaliacao'
import GraficoLinha from '../Graficos/GraficoLinha'
import GraficoArea from '../Graficos/GraficoArea'
import PlanosTreino from './PlanosTreino'
import PlanosAlmentares from './PlanosAlimentares';
import Avaliacao from './Avaliacao'
import Perfil from './Perfil';
import Axios from '../../config/Axios';

import { fire } from '../../config/Fire';
  
class Home extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            showModal: false,
            nome: "",
            apelido: "",
            email: "",
            password: "",
            atleta: ""
        }
    }

    componentDidMount = () => {


          // Carregar atleta
          Axios.get("users/" + fire.auth().currentUser.uid)
          .then(res => {
              this.setState({ atleta: res.data.userRecord })
              console.log(this.state.atleta);
          
            }).catch(error => {
              console.log(error.message)
          });
    }


    mostrarModal = () => {
        this.setState({ showModal: true })
    }

    fecharModal = () => {
        this.setState({ showModal: false })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div>
                <Container fluid={true}>

            
                    <Tab.Container id="left-tabs-example" defaultActiveKey="perfil">
                        <Row>
                            <Col sm={2} className="dashboard-sidebar py-5" >
                                
                            <center>
                                    <img width="100" className="rounded-circle mb-4" src={this.state.atleta.imagemPerfil} />   
                                    <p class="logo pb-3">{this.state.atleta.nome}</p>

                                </center>

                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="perfil"><FaUserAlt />&nbsp;&nbsp;&nbsp;Perfil</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="treino"><IoIosAlbums />&nbsp;&nbsp;&nbsp;Treino</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="alimentacao"><IoMdCafe />&nbsp;&nbsp;&nbsp;Alimentação</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="avaliacao"><IoMdHeart />&nbsp;&nbsp;&nbsp; Avaliações</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="evolucao"><IoIosStats />&nbsp;&nbsp;&nbsp;Evolução <sup>BETA</sup></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <br/>
                                      
                                    <Nav.Link onClick={FirebaseService.logout} ><IoMdLogOut/>&nbsp;&nbsp;&nbsp;Terminar Sessão
                                    

                                    </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={10} className="p-5 content">
                                <Tab.Content >

                                    <Row className="my-2">

                                        <Col>
                                        <SubemeterAvaliacao showModal={this.state.showModal} fecharModal={this.fecharModal} />

                                            <Button onClick={this.mostrarModal} className="m-4"><IoIosAddCircle/> Submeter Avaliação</Button>
                                            
                                        </Col>
                                        <Col>
                                        </Col>
                                        <Col>

                                        </Col>

                                        <Col>
                                          
                                        </Col>
                                    </Row>

                                    <Tab.Pane eventKey="perfil">

                                        <Perfil atleta={this.state.atleta}/>
                                        
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="treino">

                                        <PlanosTreino />
                                        
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="alimentacao">

                                        <PlanosAlmentares />
                                
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="avaliacao">

                                        <Avaliacao />

                                    </Tab.Pane>

                                    <Tab.Pane eventKey="evolucao">

                                        <Row>
                                            <Col sm={6}>
                                                <GraficoLinha
                                                    titulo="Percentagem de Massa Gorda"
                                                    ajuda="texto de ajuda" 
                                                    yDomain={[0,50]}
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
                                            <Col sm={6}>
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

                                        <br/>

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
                                                    yDomain={[0,100]}
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
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>

            </div>
        )
    }
}

export default Home;