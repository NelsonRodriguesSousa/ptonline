import React, { Component } from 'react';
import { Tab, Nav, Col, Row, Container} from 'react-bootstrap'
import FirebaseService from '../../config/FirebaseService';
import { IoMdLogOut, IoIosStats, IoIosAlbums, IoMdCafe, IoMdHeart } from "react-icons/io";

import { FaUserAlt } from "react-icons/fa";

import PlanosTreino from './PlanosTreino'
import PlanosAlmentares from './PlanosAlimentares';
import Avaliacao from './Avaliacao'
import Evolucao from './Evolucao'
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
            atleta: "",

            active: "perfil"
        }
    }

    componentDidMount = () => {

          // Carregar atleta
          Axios.get("users/" + fire.auth().currentUser.uid)
          .then(res => {
              this.setState({ atleta: res.data.userRecord , loading : false})
              console.log(this.state.atleta);
          
            }).catch(error => {
              console.log(error.message)
          });

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

            
                    <Tab.Container id="left-tabs-example" defaultActiveKey="perfil">
                        <Row>
                            <Col sm={2} className="dashboard-sidebar py-5" >
                                
                            <center>
                                    <img width="100" className="rounded-circle mb-4" src={this.state.atleta.imagemPerfil} />   
                                    <p class="logo pb-3">{this.state.atleta.nome}</p>

                                </center>

                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link onClick={() => this.showSection("perfil")} eventKey="perfil"><FaUserAlt />&nbsp;&nbsp;&nbsp;Perfil</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => this.showSection("treino")} eventKey="treino"><IoIosAlbums />&nbsp;&nbsp;&nbsp;Treino</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => this.showSection("alimentacao")} eventKey="alimentacao"><IoMdCafe />&nbsp;&nbsp;&nbsp;Alimentação</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link  onClick={() => this.showSection("avaliacao")} eventKey="avaliacao"><IoMdHeart />&nbsp;&nbsp;&nbsp; Avaliações</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => this.showSection("evolucao")} eventKey="evolucao"><IoIosStats />&nbsp;&nbsp;&nbsp;Evolução <sup>BETA</sup></Nav.Link>
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

                                        
                                      
                                            
                                       
                                    </Row>

                                    
                                    {this.state.active == "perfil" && <Perfil /> }
                                    
                                    {this.state.active == "treino" && <PlanosTreino /> }
                                    
                                    {this.state.active == "alimentacao" && <PlanosAlmentares /> }
                                    
                                    {this.state.active == "avaliacao" && <Avaliacao /> }

                                    {this.state.active == "evolucao" && <Evolucao /> }
          
                               


                                                                       
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