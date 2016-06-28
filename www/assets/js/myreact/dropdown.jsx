
require('../../sass/dropdown/_default.scss');

import React from 'react';

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
	}

	_onSelectedBoxChange (event){// handle ENTER KEY.....
		return;
	}

	_onSelectedItemClick (event){// handle ENTER KEY.....
		return;
	}

	_onLiClick (event){// handle ENTER KEY.....
		return;
	}

	render () {    
		var props = this.props;
		var options = props.options;
		var selectBoxId = props.selectBoxId;
		var selectedValue = props.selectedValue;
		return (
			<div className="dropdown">
				<label htmlFor={this.props.selectBoxId}>{this.props.selectBoxLabel}</label>

				<select 
					name={this.props.selectBoxName}
					className={this.props.selectBoxClassName}
					id={selectBoxId}
					onChange={this._onSelectBoxChange} 
					defaultValue={selectedValue}
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

				<p onClick={this._onSelectedItemClick} className="selectedItem">{this.props.selectedText}</p>

				<ul>


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

	options:{
		'':'Please select',	
		'apple':'Lovely green apple',
		'orange':'juicy orange',
		'banana':'fat banana'		
	},
	/*
	options:[{
		'':'Please select',	
		'apple':'Lovely green apple',
		'orange':'juicy orange',
		'banana':'fat banana'
	}],	
	*/
	/*
	options:[
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
	selectedValue:'',
	selectedText:'Please select'
}

export default Dropdown;