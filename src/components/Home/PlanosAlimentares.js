import React, { Component, useState } from 'react';
import { Col, Row, Card, Accordion, Table, Image, Modal, Button } from 'react-bootstrap'

import Axios from '../../config/Axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { fire } from '../../config/Fire';
import Swal from 'sweetalert2';

class PlanosAlmentares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            refeicoes: []
        }
    }

    componentDidMount() {
        
        Axios.get("refeicoes/" + fire.auth().currentUser.uid)
        .then(res => {
            this.setState({ refeicoes: res.data.refeicoes })
            console.log(this.state.refeicoes);
        
          }).catch(error => {
            console.log(error.message)
        });
  }

  VerExercicios = (cell, row) => {
        
    return (
        <Button 
           variant="primary"
           onClick={() => 
           this.abrirPopUp(cell, row)}
        >
        Ver refeições            
    </Button>
     )
 }

 abrirPopUp = (cell, row) => {

    var html = "";

    html += `
    <div class="row text-left my-5 pop-up" >
   
    <div class="col">
        <h4>Observações</h4>
        `
    + row.observacoes +
    `
    </div>
    
    </div>`;
    
     Axios.get("refeicoes/refeicoes/" + row.id)
         .then(res => {

             this.setState({ refeicoes: res.data.exercicios }, () => {

                 html += '<table class="table plano-treino-individual-tabela">'
                 html += `
    <thead>
        <tr>
            <th>Refeição</th>
            <th>Opção 1</th>
            <th>Opção 2</th>
            <th>Observações</th>
        </tr>
    </thead>`

                 this.state.refeicoes.forEach(function (item) {

                     html += `
        <tbody>
            <tr>
                <td>` + item.refeicao + `</td>
                <td>` + item.alimentacaoOp1 + `</td>
                <td>` + item.alimentacaoOp2 + `</td>
                <td>` + item.suplementacao_observacoes + `</td>
            </tr>
        </tbody>`
                 });

                 html += "</table>"

                 Swal.fire({
                     html: html,
                     confirmButtonText: "Fechar",
                     customClass: 'swal-wide',
                 });

             });


    }).catch(error => {

        console.log(error.message)
    });


}

    render() {


        return (
            <div>
                <Card className="shadow border-0">
                    <Card.Body>
                        <Card.Title className="font-weight-bold tab-title" >Alimentação</Card.Title>
                        <Card.Text>
                            <BootstrapTable data={this.state.refeicoes}>
                                <TableHeaderColumn hidden={true} dataField='id'></TableHeaderColumn>
                                <TableHeaderColumn isKey width={'80%'} dataField='nomePlano'>Nome Plano</TableHeaderColumn>
                                <TableHeaderColumn width={'20%'} dataField="ecercicios" dataFormat={this.VerExercicios}></TableHeaderColumn>

                            </BootstrapTable>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default PlanosAlmentares;