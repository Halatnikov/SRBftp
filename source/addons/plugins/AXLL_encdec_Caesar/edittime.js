function GetPluginSettings()
{
	return {
		"name":			"Caesar Encryption",
		"id":			"AXLL_EncDecCaesar",
		"version":		"0.1",        
		"description":	"Шифрование и дешифрование с помощью алгоритма шифрования Цезарь",
		"author":		"AXLL",
		"help url":		"",
		"category":		"AXLL - String",
		"type":			"object",			// не отображается как объект
		"rotatable":	false,
		"flags":		pf_singleglobal //доступный во всем проекте и возможен только один экземпляр объекта
	};
};
//////////////////////////////////////////////////////////////
// Выражения
AddStringParam("Источник", "Исходная строка для шифрования", '""');
AddStringParam("Сдвиг", "Строка сдвига (вправо)", '""');
AddExpression(1, ef_return_string, "Encrypt", "Шифровать", "Encrypt", "Зашифровать строку сдвигом вправо.");
AddStringParam("Результат", "Строка результата для расшифровки", '""');
AddStringParam("Сдвиг", "Строка сдвига (вправо)", '""');
AddExpression(2, ef_return_string, "Decrypt", "Дешифровать", "Decrypt", "Дешифровать строку сдвигом вправо.");

ACESDone();
// Таблица свойств этого плагина
var property_list = [];
// Вызывается IDE при создании нового типа объекта
function CreateIDEObjectType()
{
	return new IDEObjectType();
}
// Класс, представляющий тип объекта в среде IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Конструктор вызывается как функция");
}
// Вызывается IDE при создании нового экземпляра объекта этого типа
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
}
// Класс, представляющий отдельный экземпляр объекта в среде IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Конструктор вызывается как функция");
	// Сохранить параметры конструктора
	this.instance = instance;
	this.type = type;
	// Задаем значения свойств по умолчанию из таблицы свойств
	this.properties = {};
	for (var i = 0; i < property_list.length; i++) this.properties[property_list[i].name] = property_list[i].initial_value;
}
// Вызывается средой IDE после завершения инициализации этого экземпляра
IDEInstance.prototype.OnCreate = function()
{
}
// Вызывается средой IDE после изменения свойства
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}
// Вызывается в среде IDE для рисования этого экземпляра в редакторе
IDEInstance.prototype.Draw = function(renderer)
{
}
// Вызывается средой IDE при выпуске рендерера (т.е. Редактор закрыт)
// Все дескрипторы ресурсов, созданных визуализатором (шрифты, текстуры и т. Д.), Должны быть удалены.
IDEInstance.prototype.OnRendererReleased = function()
{
}