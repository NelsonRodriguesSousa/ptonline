import React, { Component } from 'react';
import { Card , Alert} from 'react-bootstrap'
import Swal from 'sweetalert2';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import ptLocal from '@fullcalendar/core/locales/pt';

class Calendario extends Component {
    constructor() {
        super();
        this.state = {
        
        }
    }

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
      }

      handleEventClick = ({ event, el }) => {
        Swal.fire({
            title: event.title,
            html: "<img src='https://i.imgur.com/D11Q66u.png'  height='200' class='rounded-circle'/> <br/><br/><br/>" + this.obterDia(event.start) + " <br/> " + this.obterHora(event.start)
        })
      };

      obterDia(date) {
        var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];


        return date.getDate() + " de " + meses[date.getMonth()] + " de  " + date.getFullYear()
      }

     obterHora(date) {

       
        return  date.getHours() + ":" + date.getMinutes();
      }

    

    render() {

        return (
            <div>

                <Card className="shadow border-0">
                    <Alert variant="warning">
                        <b>Atenção: </b> 
                        <br/>
                        Os dados representados neste calendário são dados de teste , não reais e não estão diretamente associados á tua conta.
                        <br/>
                        Estamos a trabalhar para que o mesmo fique funcional o quanto antes.
                    </Alert>

                    <Card.Body>

                        <Card.Title className="font-weight-bold tab-title" >Calendário</Card.Title>

                        <Card.Text>
                            


                            <FullCalendar 
                                defaultView="dayGridMonth" 
                                plugins={[dayGridPlugin, interactionPlugin ]}
                                events={[
                                { title: 'Aula João', start: '2020-04-04T14:30:00' },
                                { title: 'Aula Margarida', start: '2020-04-05T16:30:00' },
                                { title: 'Aula Hugo Rocha', start: '2020-04-05T17:30:00' },
                                { title: 'Aula Ana', start: '2020-04-05T16:30:00' },
                                { title: 'Aula Margarida', start: '2020-04-07T18:30:00' },
                                { title: 'Aula Francisco', start: '2020-04-09T10:30:00' },
                                { title: 'Aula Pedro', start: '2020-04-10T09:30:00' },
                                { title: 'Aula Pedro', start: '2020-04-19T09:30:00' },
                                { title: 'Aula Pedro', start: '2020-04-19T09:30:00' },
                                { title: 'Aula Pedro', start: '2020-04-23T09:30:00' },
                                { title: 'Aula Pedro', start: '2020-04-28T09:30:00' },
                                { title: 'Aula Pedro', start: '2020-04-26T09:30:00' },
                            ]} 

                            dateClick={this.handleDateClick}
                            eventClick={this.handleEventClick}
                            height={650}
                            locale={ptLocal}
                            timeFormat={ 'H(:mm)' }
                            
                            /> 

                        </Card.Text>

                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default Calendario;