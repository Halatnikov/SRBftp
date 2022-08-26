// Строгий режим ECMAScript 5
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Класс плагина
cr.plugins_.AXLL_EncDecCaesar = function (runtime) {
	this.runtime = runtime;
};

(function () 
{
	var pluginProto = cr.plugins_.AXLL_EncDecCaesar.prototype;
	/////////////////////////////////////
	// Класс типа объекта
	pluginProto.Type = function (plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;
	typeProto.onCreate = function () {};
	/////////////////////////////////////
	// Класс экземпляра
	pluginProto.Instance = function (type) {
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;
	instanceProto.onCreate = function () {};
	//////////////////////////////////////
	// Условия
	function Cnds() {};
	pluginProto.cnds = new Cnds();
	//////////////////////////////////////
	// Действия
	function Acts() {};
	pluginProto.acts = new Acts();
	//////////////////////////////////////
	// Выражения
	function Exps() {};
	pluginProto.exps = new Exps();

	Exps.prototype.Encrypt = function (ret, str, shift) {
		str = unescape(encodeURIComponent(str));
		shift = unescape(encodeURIComponent(shift));
		var arr = str.split(""),res="",i,lenArr = arr.length; //сделали из строки массив
		for(i = 0; i < lenArr; i++)
		{
		  var Position = arr[i].charCodeAt(0); //узнали номер
		  Position += parseInt(shift); // сдвиг
		  if (Position > 65535) Position -= 65536; // проверка
		  res += String.fromCharCode(Position);// перевели из числа в символ
		};
		if (res == null) res = "";
		ret.set_string(decodeURIComponent(escape(res)));
	};
	Exps.prototype.Decrypt = function (ret, dat, shift) {
		dat = unescape(encodeURIComponent(dat));
		shift = unescape(encodeURIComponent(shift));
		var arr = dat.split(""),res="",i,lenArr = arr.length; //сделали из строки массив
		for(i = 0; i < lenArr; i++)
		{
		  var Position = arr[i].charCodeAt(0); //узнали номер
		  Position -= parseInt(shift); // сдвиг
		  if ( Position < 0) Position += 65536; // проверка
		  res += String.fromCharCode(Position);// перевели из числа в символ
		};
		if (res == null) res = "";
		ret.set_string(decodeURIComponent(escape(res)));
	};
}());