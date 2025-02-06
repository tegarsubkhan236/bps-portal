import {useLocation} from "react-router-dom";
import {Button, Card, Col, Form, Panel, Row, SelectPicker} from "rsuite";
import {useStatisticDetailApi} from "../../hooks/useStatisticDetailApi.ts";
import useStatisticData from "../../hooks/useStatisticData.ts";
import StatisticChart from "./StatisticChart.tsx";
import {useState} from "react";

const StatisticDetail = () => {
    const location = useLocation();
    const { id, title } = location.state || {};

    const { data, isLoading } = useStatisticDetailApi({var_id: id});
    const { mutate, isPending } = useStatisticData();

    const [chartData, setChartData] = useState(null);

    const onSubmit = (formValue: any) => {
        const dataToSubmit = {
            var_id: id,
            turvar_id: formValue.turvar,
            th_id: formValue.th,
            turth_id: formValue.turth,
        };
        mutate(dataToSubmit, {
            onSuccess: (response) => {
                console.log('Data berhasil diterima:', response);
                setChartData(response)
            },
            onError: (err) => {
                console.error('Terjadi kesalahan saat mengambil data:', err);
            },
        });
    };

    return (
        <Panel header={title}>
            <Card shaded size="lg">
                <Card.Body>
                    <Form
                        fluid
                        id="statistic-form"
                        onSubmit={(formValue) => onSubmit(formValue)}
                    >
                        <Row gutter={16}>
                            <Col sm={24} style={{ marginBottom: '10px' }}>
                                <Form.Group>
                                    <Form.ControlLabel>Turunan Variable</Form.ControlLabel>
                                    <Form.Control
                                        name="turvar"
                                        placeholder="Select Turunan Variable"
                                        accepter={SelectPicker}
                                        loading={isLoading}
                                        data={data?.turVar}
                                        disabled={data?.turVar.length == 0}
                                        block
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Tahun</Form.ControlLabel>
                                    <Form.Control
                                        name="th"
                                        placeholder="Select Tahun"
                                        accepter={SelectPicker}
                                        loading={isLoading}
                                        data={data?.th}
                                        block
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Turunan Tahun</Form.ControlLabel>
                                    <Form.Control
                                        name="turth"
                                        placeholder="Select Turunan Tahun"
                                        accepter={SelectPicker}
                                        loading={isLoading}
                                        data={data?.turTh}
                                        disabled={data?.turTh.length == 1}
                                        block
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Button appearance="primary" type="submit" form="statistic-form" disabled={isPending}>
                        {isPending ? "Submitting..." : "Generate"}
                    </Button>
                    <Button appearance="subtle">Cancel</Button>
                </Card.Footer>
            </Card>
            <br/>
            {chartData && <StatisticChart responseData={chartData} />}
        </Panel>
    );
};

export default StatisticDetail;
