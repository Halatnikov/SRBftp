function GetPluginSettings()
{
	return {
		"name":			"CreateObjectByVal",
		"id":			"CreateObjectByVal",
		"version":		"1.0",
		"description":	"Create family object by family instance variable.",
		"author":		"Francesco Iafulli (aka fiaful)",
		"help url":		"https://fiaful.itch.io/createobjectbyval-construct-2-and-3-addon",
		"category":		"System",
		"type":			"object",			// not in layout
		"rotatable":	false,
		"flags":		pf_singleglobal
	};
};

//////////////////////////////////////////////////////////////
// Conditions
AddStringParam("Tag", "Tag for event handling.", "");
AddCondition(0,	cf_trigger, "On instance variable not found", "CreateObjectByVal", "On instance variable not found with <b>{0}</b> tag", "On Instance variable not found.", "OnVariableNotFound");

AddStringParam("Tag", "Tag for event handling.", "");
AddCondition(1,	cf_trigger, "On create by instance variable", "CreateObjectByVal", "On create by instance variable with <b>{0}</b> tag", "On create by instance variable.", "OnCreateByInstanceVariable");

AddObjectParam("Family object", "Family object to pick object by UID.");
AddNumberParam("UID", "Unique ID of family object to pick.", "0");
AddComboParamOption("without container objects");
AddComboParamOption("with container objects");
AddComboParam("Picking mode", "Pick with or without container related objects", "without container objects");
AddCondition(2,	0, "Pick family by UID", "CreateObjectByVal", "Pick family <b>{0}</b> by UID <b>{1}</b>, <i>{2}</i>", "Pick family by UID, with or without container objects.", "PickFamilyByUID");

//////////////////////////////////////////////////////////////
// Actions
AddObjectParam("Family object", "Family object containing object to found.");
AddNumberParam("Variable ID", "Index of the instance variable to compare.", "");
AddCmpParam("Comparison", "How to compare the value.");
AddAnyTypeParam("Value", "The value to compare the instance variable value to.", "");
AddLayerParam("Layer", "The layer name or number to create the instance on.");
AddNumberParam("X", "The X co-ordinate to create the instance on, in pixels.", "0");
AddNumberParam("Y", "The Y co-ordinate to create the instance on, in pixels.", "0");
AddStringParam("Tag", "Tag for event handling.", "");
AddAction(0, 0, "Create family object", "CreateObjectByVal", "Create object from family <b>{0}</b> by instance variable <b>{1}</b> {2} <b>{3}</b>, on layer <b>{4}</b>, at (<b>{5}</b>, <b>{6}</b>), with <b>{7}</b> tag", "Create family object by family instance value.", "CreateObjectByInstanceValue");

AddComboParamOption("First only");
AddComboParamOption("Random one");
AddComboParamOption("All");
AddComboParam("More than one", "More than one creation mode", "First only");
AddAction(1, 0, "Set more-than-one", "CreateObjectByVal", "Set more-than-one creation mode to <b>{0}</b>", "Set more-than-one creation mode.", "SetMoreThanOne");

//////////////////////////////////////////////////////////////
// Expressions

AddExpression(0, ef_return_number, "More than one", "CreateObjectByVal", "MoreThanOne", "Returns more than one creation mode.");

AddExpression(1, ef_return_number, "Instance UID", "CreateObjectByVal", "InstanceUID", "Returns current instance UID.");

AddExpression(2, ef_return_number, "Match count", "CreateObjectByVal", "MatchCount", "Returns how many instances occurred in comparison.");

AddExpression(3, ef_return_number, "Variable ID", "CreateObjectByVal", "VariableID", "Returns compared variable ID.");

AddExpression(4, ef_return_number, "Comparison", "CreateObjectByVal", "Comparison", "Returns how value as been compared.");

AddExpression(5, ef_return_string, "Value", "CreateObjectByVal", "Value", "Returns last value compared.");

AddExpression(6, ef_return_string, "Plugin version", "Info", "PluginVersion", "Plugin version.");

AddExpression(7, ef_return_string, "Plugin info", "Info", "PluginInfo", "Plugin info.");

AddExpression(8, ef_return_string, "Plugin license", "Info", "PluginLicense", "Plugin license.");

AddExpression(9, ef_return_number, "Instance IID", "CreateObjectByVal", "InstanceIID", "Returns current instance IID.");

ACESDone();

// Property grid properties for this plugin
var property_list = [
	new cr.Property(ept_combo,	"More than one",	"First only",	"if found more results have to create", "First only|Random one|All")
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
	return new IDEInstance(instance, this);
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
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
}

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
	
// Called by the IDE to draw this instance in the editor
IDEInstance.prototype.Draw = function(renderer)
{
}

// Called by the IDE when the renderer has been released (ie. editor closed)
// All handles to renderer-created resources (fonts, textures etc) must be dropped.
// Don't worry about releasing them - the renderer will free them - just null out references.
IDEInstance.prototype.OnRendererReleased = function()
{
}
