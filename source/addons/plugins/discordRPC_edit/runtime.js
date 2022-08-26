// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

cr.plugins_.eren_DiscordRPC_edit = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.eren_DiscordRPC_edit.prototype;
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};
	var typeProto = pluginProto.Type.prototype;
	typeProto.onCreate = function()
	{
	};
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	
	};
	var instanceProto = pluginProto.Instance.prototype;
	instanceProto.onCreate = function()
	{
		//this.client_id = this.properties[0];
		this.preview_mode = !!this.properties[1];
		if (!this.preview_mode && this.runtime.isNWjs){
		  	this.client = require('discord-rich-presence/')(this.client_id);
			this.rpc = this.client.first;
			this.avatar = null;
			this.id = null;
			this.username = null;
			this.premium = null;
			this.usertag = null;
		}
		
	};
	function Cnds() {};
	Cnds.prototype.onpresence = function ()
	{
		return true;
	};
	pluginProto.cnds = new Cnds();
	function Acts() {};
	
	Acts.prototype.client_id = function (_client_id)
	{
		this.client_id = _client_id;
		if (!this.preview_mode && this.runtime.isNWjs){
		  	this.client = require('discord-rich-presence/')(this.client_id);
			this.rpc = this.client.first;
		}
	};
	
	////////////////////////////////////////////////////////////
	Acts.prototype.setactivity = function (_state,_details,_largeimagekey,_largimagetext,_smallimagekey,_smallimagetext,_starttimestamp,_partyid,_partysize,_partymax)
	{
		if (!this.preview_mode && this.runtime.isNWjs)
		{
			if (this.client == null)
			{
				this.client = require('discord-rich-presence/')(this.client_id);
			};
		
			if (this.username == null && this.client.second.user != null)
			{
				this.username = this.client.second.user.username;
				this.avatar = "https://cdn.discordapp.com/avatars/"+this.client.second.user.id+"/"+this.client.second.user.avatar+".png";
				this.id = this.client.second.user.id;
				this.premium = this.client.second.user.premium_type;
				this.usertag = this.client.second.user.username+"#"+this.client.second.user.discriminator;
			};
			this.rpc.updatePresence({
				details: _details,
				state: _state,
				smallImageKey:_smallimagekey,
				smallImageText:_smallimagetext,
				largeImageKey:_largeimagekey,
				largeImageText: _largimagetext,
				startTimestamp: _starttimestamp,
				partyId: _partyid,
				partySize: _partysize,
				partyMax: _partymax
			});
			this.runtime.trigger(cr.plugins_.eren_DiscordRPC_edit.prototype.cnds.onpresence, this);
		};
	};
	
	////////////////////////////////////////////////////////////
	Acts.prototype.setactivity_endtime = function (_state,_details,_largeimagekey,_largimagetext,_smallimagekey,_smallimagetext,_starttimestamp,_endtimestamp,_partyid,_partysize,_partymax)
	{
		if (!this.preview_mode && this.runtime.isNWjs)
		{
			if (this.client == null)
			{
				this.client = require('discord-rich-presence/')(this.client_id);
			};
		
			if (this.username == null && this.client.second.user != null)
			{
				this.username = this.client.second.user.username;
				this.avatar = "https://cdn.discordapp.com/avatars/"+this.client.second.user.id+"/"+this.client.second.user.avatar+".png";
				this.id = this.client.second.user.id;
				this.premium = this.client.second.user.premium_type;
				this.usertag = this.client.second.user.username+"#"+this.client.second.user.discriminator;
			};
			this.rpc.updatePresence({
				details: _details,
				state: _state,
				smallImageKey:_smallimagekey,
				smallImageText:_smallimagetext,
				largeImageKey:_largeimagekey,
				largeImageText: _largimagetext,
				startTimestamp: _starttimestamp,
				endTimestamp: _endtimestamp,
				partyId: _partyid,
				partySize: _partysize,
				partyMax: _partymax
			});
			this.runtime.trigger(cr.plugins_.eren_DiscordRPC_edit.prototype.cnds.onpresence, this);
		};
	};
	
	////////////////////////////////////////////////////////////
	Acts.prototype.setactivity_stateonly = function (_state,_largeimagekey,_largimagetext,_smallimagekey,_smallimagetext,_starttimestamp,_partyid,_partysize,_partymax)
	{
		if (!this.preview_mode && this.runtime.isNWjs)
		{
			if (this.client == null)
			{
				this.client = require('discord-rich-presence/')(this.client_id);
			};
		
			if (this.username == null && this.client.second.user != null)
			{
				this.username = this.client.second.user.username;
				this.avatar = "https://cdn.discordapp.com/avatars/"+this.client.second.user.id+"/"+this.client.second.user.avatar+".png";
				this.id = this.client.second.user.id;
				this.premium = this.client.second.user.premium_type;
				this.usertag = this.client.second.user.username+"#"+this.client.second.user.discriminator;
			};
			this.rpc.updatePresence({
				state: _state,
				smallImageKey:_smallimagekey,
				smallImageText:_smallimagetext,
				largeImageKey:_largeimagekey,
				largeImageText: _largimagetext,
				startTimestamp: _starttimestamp,
				partyId: _partyid,
				partySize: _partysize,
				partyMax: _partymax
			});
			this.runtime.trigger(cr.plugins_.eren_DiscordRPC_edit.prototype.cnds.onpresence, this);
		};
	};
	
	pluginProto.acts = new Acts();
	function Exps() {};
	Exps.prototype.username = function (ret)
	{
		ret.set_string(this.username);
	};
	Exps.prototype.avatar = function (ret)
	{
		ret.set_string(this.avatar);
	};
	Exps.prototype.usertag = function (ret)
	{
		ret.set_string(this.usertag);
	};
	Exps.prototype.id = function (ret)
	{
		ret.set_string(this.id);
	};
	Exps.prototype.premium = function (ret)
	{
		ret.set_string(this.premium);
	};
	pluginProto.exps = new Exps();
}());