
require('../../sass/dropdown/_default.scss');

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

function each(obj, callback){
	return (Array.isArray(obj))? forArray(obj, callback):forObject(obj, callback);
}
function forArray(obj, callback){
	return obj.map(callback);
}
function forObject(obj, callback){
	return Object.keys(obj).map(callback);
}

function isFirstKeyString(obj){
	var strFirstKey = Object.keys(obj)[0];
	var innerObject = obj[strFirstKey];
	return (typeof innerObject === 'string')
}


class Dropdown extends React.Component {	

	constructor /* function */ (props) {
		super(props);	

		this.state = {
			selectedValue:this.props.selectedValue,
			selectedText: this.props.selectedText,
			ulState: '',
			pState:'on'
		}
	}

	_onSelectBoxChange (event){// handle ENTER KEY.....
		var target = event.nativeEvent.target;
		var index = target.selectedIndex;
		var selectedText = target[index].text;
		var selectedValue =  target[index].value;

		return this.setState({
			selectedValue: selectedValue,
			selectedText: selectedText,
			ulState: ''
		})
	}

	_onSelectedItemClick (event){// handle ENTER KEY.....
		return this.setState({
			ulState:'on',
			pState:''
		})
	}

	_onLiClick (strOptionKey, strOptionText, event){// handle ENTER KEY.....

		//ReactDOM.findDOMNode(this.refs.mySelect).dispatchEvent(new Event('change', { 'bubbles': true }));
		return this.setState({
			selectedValue: strOptionKey,
			selectedText: strOptionText,
			ulState:'',
			pState:'on'
		});
	}

	render () {    

		var options = this.props.options;		
		var selectBoxId = this.props.selectBoxId;

		// states
		var selectedValue = this.state.selectedValue;
		var selectedText = this.state.selectedText;
		var ulState = this.state.ulState; // 'on' || ''
		var pState = this.state.pState;

		return (
			<div className="dropdown">
				<label htmlFor={this.props.selectBoxId}>{this.props.selectBoxLabel}</label>

				<select 
					id={selectBoxId}		
					onChange={this._onSelectBoxChange.bind(this)} 									
					name={this.props.selectBoxName}
					className={this.props.selectBoxClassName}
					value={selectedValue}								
					>
					{do{
						if(Array.isArray(options)){							
							each(options, (objOptGroup) => (
								each(objOptGroup, (strOptGroupKey) => (	
									<optgroup label={strOptGroupKey} key={strOptGroupKey}>
										{each(objOptGroup[strOptGroupKey], (strOptionKey) => (																						
											<option value={strOptionKey} key={strOptGroupKey + strOptionKey}>{objOptGroup[strOptGroupKey][strOptionKey]}</option>																						
										))}
									</optgroup>
								))					
							))							
						}else{
							each(options, (strOptionKey) => (
								<option value={strOptionKey} key={strOptionKey}>
									{options[strOptionKey]}
								</option>
							))						
						}
					}}

				</select>

				<p 
					role="presentation"
					onClick={this._onSelectedItemClick.bind(this)} 
					className="selectedItem" 
					data-state={pState}
					>					
					{selectedText}
				</p>

				<ul 
					role="presentation"
					data-state={ulState} 
					className="ulSelect">
					{
						each(options, (strOptionKey) => (
							<li 
								className="liSelect"
								onClick={this._onLiClick.bind(this, strOptionKey, options[strOptionKey])} 
								data-state={strOptionKey == selectedValue?'on':''}
								key={selectBoxId + '-' + strOptionKey}
								>
								{options[strOptionKey]}
							</li>
						))
					}
				</ul>
			</div>
    	)
  	} 	
}

Dropdown.propTypes = {	
	selectBoxId: 		React.PropTypes.string.isRequired,
	selectBoxLabel: 	React.PropTypes.string.isRequired,		
	selectBoxName:		React.PropTypes.string.isRequired,
	selectBoxClassName: React.PropTypes.string.isRequired,			
	/*options: 			React.PropTypes.array.isRequired || React.PropTypes.object.isRequired,*/
	selectedValue: 		React.PropTypes.string.isRequired,
	selectedText: 		React.PropTypes.string.isRequired
}


Dropdown.defaultProps = {

	selectBoxId: 'selectComponent',

	selectBoxLabel:'I am a dropdown',
	selectBoxName: 'selectComponent',	
	selectBoxClassName: 'selectBoxDropDown',
	selectedValue:'',
	selectedText:'Please select',
	options:{
		'':'Please select',	
		'apple':'Lovely green apple',
		'orange':'juicy orange',
		'banana':'fat banana'		
	},
	/* OR 
	optGroups:[
		{
			'groupX':{	
				'':'Please select',	
				'apple':'Lovely green apple',
				'orange':'juicy orange',
				'banana':'fat banana'
			}
		},
		{
			'groupY':{	
				'':'Please select',	
				'apple':'Lovely green apple',
				'orange':'juicy orange',
				'banana':'fat banana'
			}		
		}
	],*/
}

export default Dropdown;