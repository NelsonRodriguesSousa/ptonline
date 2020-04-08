import React, { Component } from 'react';
import { Col, Row, Card, Form, Image  } from 'react-bootstrap'


import { fire } from '../../config/Fire';
import Swal from 'sweetalert2'

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    uploadProfilePicture (file) {
        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };

        var uid = fire.auth().currentUser.uid;

        var storageRef = fire.storage().ref();
        // Upload file 
        var uploadTask = storageRef.child('fotosDePerfil/' + uid).put(file, metadata);

        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            
            
          }, function(error) {
            console.log(error.message)
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);

                    fire.firestore().collection("users").doc(uid).update({
                        imagemPerfil: downloadURL, 
                    })
                        .then(function () {
                  
                            Swal.fire({
                                icon: "success",
                                title: 'Foto atualizada com sucesso',
                                confirmButtonColor: 'rgba(206, 88, 20, 0.8)',
                            })
                        });

                });
          });
    }


    render() {
        return (
            <div>
                <Card className="shadow border-0">
                    <Card.Body>
                        <Card.Title className="font-weight-bold tab-title" >Perfil</Card.Title>
                        <Card.Text>

                            <Row className="text-center">
                                    <Image className="img-fluid p-0 profile-picture" width="200" src={this.props.atleta.imagemPerfil} roundedCircle />
                            </Row>

                            <Row className="p-5 text-center">

                                <Col sm={4}>

                                    <h1 class="font-weight-bold">10</h1>
                                    <p>Planos de treino</p>

                                </Col>

                                <Col sm={4}>

                                    <h1 class="font-weight-bold">5</h1>
                                    <p>Planos Alimentares</p>
                                </Col>

                                <Col sm={4}>

                                    <h1 class="font-weight-bold">10</h1>
                                    <p>Avaliações</p>
                                </Col>


                            </Row>

                      

                            <Row className="p-5">

                               
                                <Col sm={8}>

                                    <Form>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label className="font-weight-bold" column sm="3">
                                                Nome
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control type="text" value={this.props.atleta.nome} readOnly />
                                            </Col>
                                        </Form.Group>


                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label className="font-weight-bold" column sm="3">
                                                Email
                                            </Form.Label>
                                            <Col sm="9">
                                                <Form.Control type="text" value={this.props.atleta.email} readOnly />
                                            </Col>
                                        </Form.Group>

                                      

                                      


                                    </Form>

                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Perfil;