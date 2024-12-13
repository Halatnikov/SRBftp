﻿function GetPluginSettings()
{
	return {
		"name":			"Extra Expressions",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"ExtraExps",				// this is used to identify this plugin and is saved to the project; never change it
        "version":      "1.1",
		"description":	"A collection of extra expressions. Release 30.10.2011",
		"author":		"Miha Petelin",
		"help url":		"http://www.scirra.com/forum/plugin-extra-expressions_topic45734.html",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				


////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
// AddStringParam("Message", "Enter a string to alert.");
// AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
// AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");
AddStringParam("Text", "Enter the text to search for.");
AddStringParam("Source", "Enter where to find the text in.");
AddExpression(0, ef_return_number, "Find", "Expressions", "find", "Case sensitive alternative to System's find expression");

AddStringParam("Character", "Enter the character you want to find the code for.");
AddExpression(1, ef_return_number, "Charcode", "Expressions", "char2code", "Returns code of the character."); 

AddNumberParam("Charcode", "Ender the character code.");
AddExpression(2, ef_return_string, "Character", "Expressions", "code2char", "Returns character based on code.");

AddNumberParam("a", "Start position");
AddNumberParam("b", "End position");
AddNumberParam("t", "Interpolation coeficent");
AddExpression(3, ef_return_number, "Cosine interpolation", "Math", "cosp", "Cosine interpolation between points a and b.");

AddNumberParam("X", "Source X position to calculate offset from.");
AddNumberParam("Angle", "Angle to calculate the offset at.");
AddNumberParam("Distance", "Distance or size of the offset in pixels.");
AddExpression(4, ef_return_number, "X offset", "Math", "offsetX", "Calculate X position at offset.");

AddNumberParam("Y", "Source Y position to calculate offset from.");
AddNumberParam("Angle", "Angle to calculate the offset at.");
AddNumberParam("Distance", "Distance or size of the offset in pixels.");
AddExpression(5, ef_return_number, "Y offset", "Math", "offsetY", "Calculate Y position at offset.");

AddNumberParam("number", "Number you want to snap.");
AddNumberParam("gridsize", "The grid size you want to snap the number to.");
AddExpression(6, ef_return_number, "Snap to grid", "Math", "snap", "Snap the number to grid size.");

AddStringParam("String", "String to encode to Base64.");
AddExpression(7, ef_return_string, "Encode to Base64", "Base64", "encode", "Encode the string to Base64.");

AddStringParam("String", "String to decode from Base64.");
AddExpression(8, ef_return_string, "Decode from Base64", "Base64", "decode", "Decode the string from Base64.");

AddStringParam("String", "String to search the token within","");
AddStringParam("Token", "Token to search for","");
AddStringParam("Delimiter", "Split the string with this delimiter",",");
AddNumberParam("Case sensitivity", "0 - not case sensitive, 1 - case sensitive search","0");
AddExpression(9, ef_return_number, "Find token", "Expressions", "findToken", "Returns the index of a token within delimited string. Returns -1 if the token is not found.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
//	new cr.Property(ept_integer, 	"My property",		77,		"An example property.")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}
