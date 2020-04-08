import React, { Component } from 'react';
import mockup1 from '../img/mockup1.png'
import mockup2 from '../img/mockup2.png'
import mockup3 from '../img/mockup3.png'
import mockup4 from '../img/mockup4.png'
import { Navbar, Nav, Button, Form, Container, Row, Col} from 'react-bootstrap';

class Corporativo extends Component {

  render() {
    return (
      <div>

        <Navbar bg="dark" className="py-3" expand="lg" variant="dark">
          <Container>

            <Navbar.Brand href="/login">PT ONLINE <sup>beta</sup></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">

              </Nav>
              <Form inline>
                <Button href="/login" variant="primary">Entrar</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <header>
          <div className="overlay"></div>
          <div className="container h-100">
            <div className="d-flex h-100 text-center align-items-center">
              <div className="w-100 text-white">
                <h1 className="logo-intro" >Plataforma de Gestão para Personal Trainers</h1>
                <br />
                <h1 className="mb-0 font-weight-light logo-desc">A ferramenta ideal para monitorizar os teus atletas</h1>
                <br />            
                  <a className="btn btn-primary m-2" >
                  Saber mais
                  </a>
              </div>
            </div>
          </div>
        </header>
        <div class="section-white" id="more" >
          <Container fluid> 
          <Row>
            <Col sm={8} >
              <img class="img-fluid" src={mockup1} data-aos="zoom-out-left" />
            </Col>
            <Col sm={4} className="my-auto" >
              <h1 >
                Gestão de atletas
              </h1>
              <p>
                O ponto de partida começa no principal foco: os atletas. Com a PT ONLINE é possível criar, editar e eliminar atletas de uma forma simples e rápida.
                <br/>
                Após criar um atleta, o mesmo receberá os dados de login no seu email, e rapidamente terá acesso a toda a informação que será atualizada pelo seu Personal Trainer.
              </p>
            </Col>
          </Row>
          </Container>
        </div>

        <div class="section-blue" >
          <Container fluid> 
          <Row>
          
            <Col sm={4} className="my-auto" data-aos="zoom-out-right">
              <h1 >
                Gestão de planos
              </h1>
              <p>
                Após a criação dos aletas está na hora de os colocar a mexer e realizar uma alimentação saudável. 
                <br/>
                Com isto, o módulo de planos permite gerir tanto planos de treino como planos alimentares. 
              </p>
            </Col>
            <Col sm={8} data-aos="zoom-out-left">
              <img class="img-fluid" src={mockup2} />
            </Col>
          </Row>
          </Container>
        </div>

        <div class="section-white" id="more">
          <Container fluid> 
          <Row>
            <Col sm={8} >
              <img class="img-fluid" src={mockup3} />
            </Col>
            <Col sm={4} className="my-auto">
              <h1 >
                Calendário para ligar atletas e planos
              </h1>
                <p>
                  Quando a quantidade de planos e atletas aumentam, o uso de um calendário torna-se mais que necessário. Uma vez tendo os planos e os atletas criados, está na hora de organizar toda essa informação num calendário.
                  Organize os seus planos ligados aos atletas num calendário simples e fácil de utilizar.
              </p>
            </Col>
          </Row>
          </Container>
        </div>

        <div class="section-blue" id="more">
          <Container fluid>
            <Row>

              <Col sm={4} className="my-auto">
                <h1 >
                  Avaliação e Evolução
              </h1>
                <p>
                  Está na hora de ver resultados, analisar e tomar as medidas certas para manter o ritmo da evoluçao crescente. Com o módulo de evoluções é possível analisar gráficos mensais relativos a diversos parâmetros do ser humano, tais como:<br />
                  <br/>
                  <ul>
                    <li>Percentagem de Massa Gorda</li>
                    <li>Percentagem de Água Corporal</li>
                    <li>Taxa Metabólica Basal</li>
                    <li>Idade Metabólica</li>
                    <li>Idade Metabólica</li>
                    <li>Perímetros (Cintura, Anca, Peito..)</li>
                  </ul>
                </p>
              </Col>
              <Col sm={8} >
                <img class="img-fluid" src={mockup4} />
              </Col>
          </Row>
          </Container>
        </div>


        <section className="footer py-5">
          <div className="container text-light text-center">
            <br />
            {(new Date().getFullYear())}  © Todos os direitos reservados / Desenvolvido por <b><a href="https://truetype.pt" >Truetype Digital Experience</a></b>
          </div>
        </section>
      </div>
    )
  }

}
export default Corporativo;
