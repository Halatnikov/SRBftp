// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.CreateObjectByVal = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.CreateObjectByVal.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};
	
	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;
	
	instanceProto.onCreate = function()
	{
		this.moreThanOne = this.properties[0] === 0;	// 0 = solo il primo; 1 = uno a caso; 2 = tutti
		
		this.tag = "";
		this.instance_uid = -1;
		this.instance_iid = -1;
		this.matchCount = 0;
		this.var_id = "";
		this.comparison = 0;
		this.value = "";
	};
	
	instanceProto.onDestroy = function ()
	{
	};
		
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		var mto = "First only";
		if (this.moreThanOne === 1) mto = "Random one";
		else if (this.moreThanOne === 2) mto = "All";
		
		var op = ["=", "!=", "<", "<=", ">", ">="];
		var lse = "VarID(" + this.var_id + ") " + op[this.comparison] + " " + this.value;
		
		propsections.push({
			"title": "CreateObjectByVal",
			"properties": [
				{"name": "More than one", "value": mto, "readonly": true},
				{"name": "Last tag", "value": this.tag, "readonly": true},
				{"name": "Last instance UID", "value": this.instance_uid, "readonly": true},
				{"name": "Last instance IID", "value": this.instance_iid, "readonly": true},
				{"name": "Last match Count", "value": this.matchCount, "readonly": true},
				{"name": "Last search expression", "value": lse, "readonly": true}
			]
		});			
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
	};
	/**END-PREVIEWONLY**/
	
	instanceProto.createInstanceByVal = function (type, variable, cmp, val, layer, sx, sy)
	{
		// posso cercare solo se ho passato come oggetto una famiglia
		if (!type.is_family)
			return null;
		
		var members_to_create = [];
		
		for (var i = 0, mlen = type.members.length; i < mlen; i++)
		{
			var curr_member = type.members[i];
			var default_instance = curr_member.default_instance;
			if (default_instance)
			{
				var vars = default_instance[3];
				if (vars)
				{
					var var_ = vars[variable];
					var result = cr.do_cmp(var_[0], cmp, val);
					if (result)
					{
						members_to_create.push(curr_member);
						if (this.moreThanOne === 0)		// solo il primo
							return members_to_create;
					}
				}
			}
		}
		
		if (this.moreThanOne === 1 && members_to_create.length > 0) // solo uno a caso
		{
			var i = cr.floor(Math.random() * members_to_create.length);
			var ret = [];
			ret.push(members_to_create[i])
			return ret;
		}
		
		return members_to_create.length > 0 ? members_to_create : null;
	};
	
	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.OnVariableNotFound = function (tag)
	{
		return (tag == this.tag);
	};

	Cnds.prototype.OnCreateByInstanceVariable = function (tag)
	{
		return (tag == this.tag);
	};

	Cnds.prototype.PickFamilyByUID = function (obj, uid, mode)
	{
		if (!obj || !obj.is_family)
			return false;

		var inst = obj.runtime.getObjectByUID(uid);
		
		if (!inst)
			return false;
			
		var osol = obj.getCurrentSol();
		osol.select_all = false;
		cr.clearArray(osol.instances);
		osol.instances[0] = inst;
		
		var sol = this.type.getCurrentSol();
		sol.select_all = false;
		cr.clearArray(sol.instances);
		sol.instances[0] = inst;
		
		if (inst.is_contained && mode === 1)
		{
			for (var i = 0, len = inst.siblings.length; i < len; i++)
			{
				var s = inst.siblings[i];
				
				var ssol = s.type.getCurrentSol();
				ssol.select_all = false;
				cr.clearArray(ssol.instances);
				ssol.instances[0] = s;
			}
		}
		
		return true;
	};

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

    Acts.prototype.CreateObjectByInstanceValue = function (obj, variable, cmp, val, layer, x, y, tag)
    {
        if (!layer || !obj)
            return;

		this.var_id = variable;
		this.comparison = cmp;
		this.value = val;
		this.matchCount = 0;
		this.tag = tag;
		this.instance_uid = -1;
		this.instance_iid = -1;
		
        var inst_list = this.createInstanceByVal(obj, variable, cmp, val, layer, x, y);
		
		if (inst_list)
		{
			this.matchCount = inst_list.length;
			
			for (var i = 0, ilen = inst_list.length; i < ilen; i++)
			{
				var tmp_inst = inst_list[i];

				var inst = this.runtime.createInstance(tmp_inst, layer, x, y);
				
				this.instance_uid = inst.uid;
				this.instance_iid = inst.iid;
				
				this.runtime.isInOnDestroy++;

				var s = null, sol = null;
				this.runtime.trigger(Object.getPrototypeOf(obj.plugin).cnds.OnCreated, inst);
				
				if (inst.is_contained)
				{
					for (var ii = 0, len = inst.siblings.length; ii < len; ii++)
					{
						s = inst.siblings[ii];
						this.runtime.trigger(Object.getPrototypeOf(s.type.plugin).cnds.OnCreated, s);
					}
				}
				
				sol = obj.getCurrentSol();
				sol.select_all = false;
				cr.clearArray(sol.instances);
				sol.instances[0] = inst;

				this.runtime.trigger(cr.plugins_.CreateObjectByVal.prototype.cnds.OnCreateByInstanceVariable, this);
				
				this.runtime.isInOnDestroy--;

			}
		}
			
		if (!inst)
		{
			this.runtime.trigger(cr.plugins_.CreateObjectByVal.prototype.cnds.OnVariableNotFound, this);
			return;
		}
		
    };

    Acts.prototype.SetMoreThanOne = function (param)
	{
		this.moreThanOne = param;
	};

	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.MoreThanOne = function (ret)
	{
		ret.set_int(this.moreThanOne);
	};

	Exps.prototype.InstanceUID = function (ret)
	{
		ret.set_int(this.instance_uid);
	};

	Exps.prototype.InstanceIID = function (ret)
	{
		ret.set_int(this.instance_iid);
	};
	
	Exps.prototype.MatchCount = function (ret)
	{
		ret.set_int(this.matchCount);
	};

	Exps.prototype.VariableID = function (ret)
	{
		ret.set_int(this.var_id);
	};

	Exps.prototype.Comparison = function (ret)
	{
		ret.set_int(this.comparison);
	};

	Exps.prototype.Value = function (ret)
	{
		ret.set_string(this.value);
	};

	Exps.prototype.PluginVersion = function(ret)
	{
		const PLUGIN_VERSION = "1.0.0.1";
		ret.set_string(PLUGIN_VERSION);
	}

	Exps.prototype.PluginInfo = function(ret)
	{
		const PLUGIN_VERSION = "1.0.0.1";
		const PLUGIN_INFO = "CreateObjectByVal. Created by Francesco Iafulli for AtlasGames (2019). Version " + PLUGIN_VERSION + " .";
		ret.set_string(PLUGIN_INFO);
	}

	Exps.prototype.PluginLicense = function(ret)
	{
		const PLUGIN_LICENSE = "The license is the popular WTF license, so 'do what the fukk you want with this code'. :) - THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
		ret.set_string(PLUGIN_LICENSE);
	}
	
	pluginProto.exps = new Exps();

}());