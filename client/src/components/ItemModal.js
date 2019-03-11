import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input } from 'reactstrap';
import { connect } from 'react-redux';

import { addItem } from '../actions/itemActions';


class ItemModal extends Component {

	state = {
      modal: false,
      name: ''
    };

	toggle = () => {
	    this.setState({
	      modal: !this.state.modal
	    });
	};


	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	};

	onSubmit = e => {
		e.preventDefault();
		const newItem = {
			name: this.state.name
		}

		// Add Item Via addItem action
		this.props.addItem(newItem);
		this.toggle();
	}

	render() {
		return (
			<div>
				{this.props.isAuthenticated ? <Button
				color="dark"
				style={{marginBottom : '2rem'}}
				onClick={this.toggle}>Add Item</Button> : <h4 className='mb-3 mr-4'>Please Login To Manage Items</h4>}

				<Modal
				isOpen={this.state.modal}
				toggle={this.toggle} >
		          <ModalHeader
		          toggle={this.toggle}>Add To Shopping List</ModalHeader>
		          <ModalBody>
		          	<Form onSubmit={this.onSubmit}>
				        <FormGroup>
				          <Label for="item">Item</Label>
				          <Input
				          type="text"
				          name="name"
				          id="item"
				          placeholder="Add Shopping Item"
				          onChange={this.onChange} />
				        </FormGroup>
				        <Button
				        color="dark"
				        style={{ marginTop: '2rem'}}
				        block
				        >Add Item</Button>
				    </Form>
		          </ModalBody>

		        </Modal>
			</div>
		);
	}
}


ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}


const mapStateToProps = (state) => ({
	item: state.item,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{addItem})(ItemModal)

