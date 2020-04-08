import React, { Component } from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { IoIosHelpCircle } from "react-icons/io";
import 'react-vis/dist/style.css';

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineMarkSeries,
} from 'react-vis';



class GraficoLinha extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <Card className="shadow border-0">
                    <Card.Body>
                        <Card.Title className="font-weight-bold my-3">
                            {this.props.titulo}
                            <OverlayTrigger

                                key={"right"}
                                placement={"right"}
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        {this.props.ajuda}
                                    </Tooltip>
                                }
                            >
                                <IoIosHelpCircle className="mx-1" />
                            </OverlayTrigger>


                        </Card.Title>
                        <Card.Text>

                            <XYPlot width={500} height={300}
                                xType="ordinal"
                                yDomain={this.props.yDomain}
                            >
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis title="Tempo" />
                                <YAxis title="Percentagem" />
                                <LineMarkSeries
                                    className="linemark-series-example"
                                    style={{
                                        strokeWidth: '3px',
                                    }}
                                    curve={'curveMonotoneX'}
                                    lineStyle={{ stroke: '#1d86a0' }}
                                    markStyle={{ stroke: '#1d86a0' }}
                                    data={this.props.dados}
                                />
                            </XYPlot>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default GraficoLinha;