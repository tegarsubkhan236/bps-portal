import {
    Container,
    Content,
    Form,
    Button,
    Panel,
    Stack,
    Input,
    InputGroup
} from 'rsuite';
import React from "react";
import {EyeClose, Visible} from "@rsuite/icons";
import {Link} from "react-router-dom";

const Password = React.forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);

    const handleChange = () => {
        setVisible(!visible);
    };
    return (
        <InputGroup inside ref={ref} {...props}>
            <Input type={visible ? 'text' : 'password'}/>
            <InputGroup.Button onClick={handleChange}>
                {visible ? <Visible/> : <EyeClose/>}
            </InputGroup.Button>
        </InputGroup>
    );
});

const Login = () => {
    return (
        <Container>
            <Content>
                <Stack alignItems="center" justifyContent="center" style={{height: '100vh'}}>
                    <Panel header="Sign in" bordered style={{width: 400}}>
                        <Form fluid>
                            <Form.Group>
                                <Form.ControlLabel>Email address</Form.ControlLabel>
                                <Form.Control name="name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.ControlLabel>Password</Form.ControlLabel>
                                <Form.Control name="password" autoComplete="off" accepter={Password}/>
                            </Form.Group>

                            <Link to="/home" replace>
                                <Button appearance="primary" block>
                                    Sign in
                                </Button>
                            </Link>
                        </Form>
                    </Panel>
                </Stack>
            </Content>
        </Container>
    )
}

export default Login
