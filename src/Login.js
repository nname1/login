import React, {Component} from 'react';
import {Button, Checkbox, Form, Icon, Input, Layout,Alert} from 'antd';
import './login.css';
import httpUtil from './httpUtil';
import {withRouter} from 'react-router-dom';
const FormItem = Form.Item;
const {Content} = Layout;

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            login_failed_display:'none'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {validateFields} = this.props.form;
        validateFields(async(err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let userInfo={username:values.userName,password:values.password};
                let redirect_url = window.location.href.split('redirect_url=')[1];
                let state = redirect_url.split('state=')[1];
                let result = await httpUtil.login(userInfo,state);
                console.log(JSON.stringify(result));
                if(result.status=="200") {
                    window.location.assign(redirect_url);
                }else{
                    this.setState({
                        login_failed_display:'inline-block'
                    });
                }
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout>
                <Content className="content">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {

                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </FormItem>
                        <Alert style={{display:this.state.login_failed_display}} message="username or password is incorrect" type="error" showIcon />
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </FormItem>
                    </Form>
                </Content>
            </Layout>
        );
    }

}

const Login = Form.create()(LoginForm);
export default withRouter(Login);

/*
function mapDispatchToProps(dispatch,ownProps) {
    return ({
        setLoggedInUser:(username)=>dispatch({type:"loggedIn",text:username})
    })
}
export default connect(null, mapDispatchToProps)(Login);*/
