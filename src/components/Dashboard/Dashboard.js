import React, { Component } from 'react';
import { Tab, Nav, Col, Row, Container, Card, Alert, Button, Accordion, Image, Dropdown } from 'react-bootstrap'
import FirebaseService from '../../config/FirebaseService';
import { IoMdLogOut, IoIosStats, IoIosAlbums, IoIosAddCircleOutline, IoMdContacts, IoMdRefresh } from "react-icons/io";


import GraficoLinha from '../Graficos/GraficoLinha'
import GraficoArea from '../Graficos/GraficoArea'

import Atletas from './Atletas'
import Treino from './Treino';
import Alimentacao from './Alimentacao';
import Calendario from './Calendario';

import { TiArrowUnsorted } from "react-icons/ti";

import { FiCalendar} from 'react-icons/fi'
import  Swal  from 'sweetalert2';

import {MdRestaurant} from 'react-icons/md'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import Axios from '../../config/Axios';
import { fire } from '../../config/Fire';

import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'




class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.carregarAtletas = this.carregarAtletas.bind(this)
        this.state = {

            atletas: [],

            showModal: false,

            nome: "",
            apelido: "",
            email: "",
            password: "",

            active: "users"
        }
    }

    atletasMock() {
        var atletas = [

            {
                imagemPerfil: "https://i.imgur.com/XJYIwpd.png",
                nome: "Mafalda Silva",
                email: "mafalda@gmail.pt",
                tipo_atleta: "Online",


            },
            {
                imagemPerfil: "https://i.imgur.com/q7Hkkk8.png",
                nome: "Ana Dias",
                email: "anadias@hotmail.pt",
                tipo_atleta: "Online",


            },
            {
                imagemPerfil: "https://i.imgur.com/q2cYgYU.png",
                nome: "Hugo Rocha",
                email: "hugorocha@hotmail.pt",
                tipo_atleta: "Presencial",


            },
            {
                imagemPerfil: "https://i.imgur.com/pOkFyRf.png",
                nome: "Rui Santos",
                email: "ruisantos98@gmail.pt",
                tipo_atleta: "Presencial",
            },
            {
                imagemPerfil: "https://i.imgur.com/6r9e113.png",
                nome: "Filomena Silva",
                email: "fisilva@gmail.pt",
                tipo_atleta: "Presencial",
            },
            {
                imagemPerfil: "https://i.imgur.com/fvnxrNK.png",
                nome: "Artur Aragão",
                email: "fisilva@gmail.pt",
                tipo_atleta: "Presencial",
            },

        ]

        this.setState({ atletas :atletas})
    }

    carregarAtletas() {
        // carregar os users do admin

        Axios.get("users/byAdmin/" + fire.auth().currentUser.uid)
            .then(res => {


                this.setState({ atletas: res.data.users })

                console.log(this.state.atletas)

            }).catch(error => {

                console.log(error.message)
            });
    }
    
    componentDidMount() {
       this.carregarAtletas();
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

   

    showSection= (section) =>{

        this.setState({ active : section})
        
    }

    

    render() {


        return (
            <div>

                <Container fluid={true}>
                    
                
                    <Tab.Container id="left-tabs-example" defaultActiveKey="users">
                        <Row>
                            <Col className="dashboard-sidebar py-5" sm={2}>
                                
                                <center>
                                    <img width="100" className="rounded-circle mb-4" src={this.props.pt.imagem} />   
                                    <p class="logo pb-3">{this.props.pt.nome}</p>

                                </center>


                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link  onClick={() => this.showSection("users")} eventKey="users"><IoMdContacts />&nbsp;&nbsp;&nbsp;Atletas</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => this.showSection("treino")} eventKey="treino"><IoIosAlbums />&nbsp;&nbsp;&nbsp;Treino</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => this.showSection("alimentacao")} eventKey="alimentacao"><MdRestaurant />&nbsp;&nbsp;&nbsp;Alimentação</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item >
                                        <Nav.Link onClick={() => this.showSection("calendario")} eventKey="calendario">< FiCalendar />&nbsp;&nbsp;&nbsp;Calendário  <sup>BETA</sup></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => this.showSection("evolucao")} eventKey="evolucao"><IoIosStats />&nbsp;&nbsp;&nbsp;Evoluções <sup>BETA</sup></Nav.Link>
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


                                    {this.state.active == "users" && <Atletas /> }
                                        
                                   

                                    {this.state.active == "treino" && <Treino /> }      
                                    {this.state.active == "alimentacao" && <Alimentacao /> }                                    
                                    {this.state.active == "calendario" && <Calendario /> }                                    
                                    {this.state.active == "evolucao" && 
                                    
                                    <Card className="shadow border-0">

                                    <Alert variant="warning">
                                        <b>Atenção: </b>
                                        <br />
                Os dados representados nos gráficos são dados de teste , não reais e não estao diretamentos associados á tua conta.
                <br />
                Estamos a trabalhar para que o mesmo fique funcional o quanto antes.
            </Alert>


                                    <Card.Body>
                                        <Card.Title className="font-weight-bold tab-title" >Evoluções</Card.Title>
                                        <Card.Text>

                                    
                                                            <Card.Body>

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
                                                            </Card.Body>
                                                        
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                    
                                    
                                    }                                    
                              

                                    
                                 
                                
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>
        )
    }
}

export default Dashboard;