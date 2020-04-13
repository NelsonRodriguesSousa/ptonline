import React, { Component } from 'react';
import { fire } from '../config/Fire';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap'
import { traduzirErro } from '../utils/erros'


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      houveErro: false,
      mensagemErro: '',
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = (e) => {
    e.preventDefault();

    this.setState({
      houveErro: false,
    })

    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
    }).catch((error) => {

      let mensagem = traduzirErro(error.code);

      this.setState({
        houveErro: true,
        mensagemErro: mensagem,
      })
    });
  }

  render() {


    return (

      <div>

        <div className="login-page">
          <div class="container d-flex h-100">
            <div class="row align-self-center w-100">
              <Col md={6} className="my-auto">
                <h1 className="logo-intro" >PT ONLINE</h1>
                <p class="slogan">Plataforma de Gestão para Personal Trainers</p>
              </Col>

              <Col md={6}>

                <Card className="border-0 shadow p-5 login-card">
                  <h3>Faça login</h3>
                  <hr />

                  {this.state.houveErro && <div class="alert alert-danger" role="alert">
                    {this.state.mensagemErro}
                  </div>

                  }

                  <Form>
                    <Form.Group>
                      <Form.Control placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" type="email" required />
                    </Form.Group>

                    <Form.Group>
                      <Form.Control placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" type="password" required />
                    </Form.Group>

                    <Button type="submit" onClick={this.login} className="btn btn-lg btn-primary font-weight-bold mb-2 text-right" variant="primary" >
                      Login
                  </Button>

                    <p>
                      <small>
                        <a href="/reset">Esqueci-me da password</a>
                      </small>
                    </p>

                  </Form>

                  <hr />

                  <p>
                    <small>
                      Protegido por reCAPTCHA e sujeito à <a href="#">Política de privacidade</a> e aos <a href="#">Termos de serviço do Google</a>.
                  </small>
                  </p>

                </Card>


              </Col>

              <div class="col-6 ">


              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default Login;