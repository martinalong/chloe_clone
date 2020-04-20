import React, { Component } from 'react'

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            submitted: false,
            error: false,
            value: "",
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let emailRegex = /^[a-z0-9.-]+@[a-z]+\.[a-z]+$/i;
        if (emailRegex.test(this.state.value)) {
            this.setState({submitted: true});
        } else {
            this.setState({error: true});
        }
    }

    render() {
        return (
            <div className="footer-container">
                <div className="newsletter">
                    <h4 className="newsletter-title">Newsletter</h4>
                    {this.state.submitted ? 
                    <h5 className="newsletter-text">Thanks for signing up!</h5> : 
                    (
                        <div>
                            <h5 className="newsletter-text">Join our circle of Chloé girls and be among the first to hear about new products and events</h5>
                            <div className="underline">
                                <form className="newsletter-form" action="/newsletter-signup">
                                    <input className="newsletter-input" type="text" placeholder="Enter your email address" name="email" onChange={this.handleChange}/>
                                    <button className="newsletter-button" type="submit" onClick={this.handleSubmit}>Subscribe</button>
                                </form>
                            </div>
                            {this.state.error ?
                            <h5 className="newsletter-text red">Please enter a valid email address</h5> :
                            <div/>
                            }
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }
}
