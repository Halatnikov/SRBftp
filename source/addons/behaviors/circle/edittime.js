function GetBehaviorSettings()
{
	return {
		"name":			"Circle",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"Circle",			// this is used to identify this behavior and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"Move an object in a circular or elliptical path.",
		"author":		"Mutuware",
		"help url":		"",
		"category":		"Movements",				// Prefer to re-use existing categories, but you can set anything here
		"flags":		0						// uncomment lines to enable flags...
					//	| bf_onlyone			// can only be added once to an object, e.g. solid
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
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>, and {my} for the current behavior icon & name
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
AddCondition(0, cf_none, "Is enabled", "", "{my} is enabled", "Is the behavior enabled? ", "IsEnabled");

AddCmpParam("Comparison", "Choose the way to compare the current speed.");
AddNumberParam("Speed", "The speed, in pixels per second, to compare the current speed to.");
AddCondition(1, cf_none, "Compare speed", "", "{my} speed {0} {1}", "Compare the current speed of the object.", "CompareSpeed");

AddCmpParam("Comparison", "Choose the way to compare the X radius.");
AddNumberParam("RadiusX", "The value to compare the current X radius to.");
AddCondition(2, cf_none, "Compare X radius", "", "{my} x radius {0} {1}", "Compare the current X radius of the object.", "CompareRadiusX");

AddCmpParam("Comparison", "Choose the way to compare the Y radius.");
AddNumberParam("RadiusY", "The value to compare the current Y radius to.");
AddCondition(3, cf_none, "Compare Y radius", "", "{my} y radius {0} {1}", "Compare the current Y radius of the object.", "CompareRadiusY");

AddCmpParam("Comparison", "Choose the way to compare the X origin.");
AddNumberParam("OriginX", "The value to compare the current X origin to.");
AddCondition(4, cf_none, "Compare X origin", "", "{my} x origin {0} {1}", "Compare the current X origin of the object.", "CompareOriginX");

AddCmpParam("Comparison", "Choose the way to compare the Y origin.");
AddNumberParam("OriginY", "The value to compare the current Y origin to.");
AddCondition(5, cf_none, "Compare Y origin", "", "{my} y origin {0} {1}", "Compare the current Y origin of the object.", "CompareOriginY");

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
AddComboParamOption("Disabled");
AddComboParamOption("Enabled");
AddComboParam("State", "Set whether to enable or disable the behavior.");
AddAction(5, 0, "Set enabled", "", "Set {my} <b>{0}</b>", "Set whether this behavior is enabled.", "SetEnabled");

AddNumberParam("RadiusX", "The X radius")
AddAction(6, 0, "Set X radius", "", "Set {my} X radius to <i>{0}</i>", "Set X radius.", "SetRadiusX");
AddNumberParam("RadiusY", "The Y radius")
AddAction(7, 0, "Set Y radius", "", "Set {my} Y radius to <i>{0}</i>", "Set Y radius.", "SetRadiusY");

AddNumberParam("OriginX", "The X origin")
AddAction(8, 0, "Set X origin", "", "Set {my} X origin to <i>{0}</i>", "Set X origin.", "SetOriginX");
AddNumberParam("OriginY", "The Y origin")
AddAction(9, 0, "Set Y origin", "", "Set {my} Y origin to <i>{0}</i>", "Set Y origin.", "SetOriginY");

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
AddExpression(1, ef_return_number, "Radius X", "", "RadiusX", "Return the X radius.");
AddExpression(2, ef_return_number, "Radius Y", "", "RadiusY", "Return the Y radius.");
AddExpression(3, ef_return_number, "Origin X", "", "OriginX", "Return the X origin.");
AddExpression(4, ef_return_number, "Origin Y", "", "OriginY", "Return the Y origin.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)

var property_list = [
	new cr.Property(ept_float, 	"Speed",		50,		"The speed, in pixels per second, the object travels at."),
	new cr.Property(ept_float, 	"Acceleration",		0,		"The rate of acceleration, in pixels per second per second.  Negative values decelerate."),
	new cr.Property(ept_float, 	"Angle",		0,		"The angle of the path, in degrees."),
	new cr.Property(ept_float, 	"RadiusX",		50,		"The radius of X axis, in pixels"),
	new cr.Property(ept_float, 	"RadiusY",		50,		"The radius Y axis, in pixels"),
	new cr.Property(ept_combo, "Initial state", "Enabled", "Whether to initially have the behavior enabled or disabled.", "Disabled|Enabled")
	];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}

// Class representing an individual instance of the behavior in the IDE
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
		
	// any other properties here, e.g...
	// this.myValue = 0;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
