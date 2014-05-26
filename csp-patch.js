#!/usr/bin/env node

var ArgumentParser = require('argparse').ArgumentParser;
var xml2json = require('xml2json');
var fs = require('fs');

var argParser = new ArgumentParser({
  version: '0.1.0',
  addHelp: true,
  description: 'Simple csproj-file patcher'
});
argParser.addArgument(
  [ '-csp', '--csproj' ],
  {
    help: 'csproj-file path'
  }
);
argParser.addArgument(
  [ '-c', '--config' ],
  {
    help: 'Project configuration to patch. \'Release\|iPhone\' for example'
  }
);
argParser.addArgument(
  [ '-val', '--values' ],
  {
    help: 'Project configuration values in JSON'
  }
);


var args;
args = argParser.parseArgs();

var options = {
    object: true,
    reversible: true,
    coerce: false,
    sanitize: true,
    trim: true,
    arrayNotation: false
};

var csproj = xml2json.toJson(fs.readFileSync(args.csproj), options);

var targetCondition =  ' \'$(Configuration)|$(Platform)\' == \''+ args.config +'\' ';

for (var i = 0; i < csproj.Project.PropertyGroup.length; i++) {
	var propertyGroup = csproj.Project.PropertyGroup[i];

	if (propertyGroup.Condition === targetCondition) {
		var values = JSON.parse(args.values);
		
		for(var key in values){
			propertyGroup[key] = {"$t": values[key]};
		}

    break;
	};
}
var xmlHeader = '<?xml version="1.0" encoding="utf-8"?>';
fs.writeFileSync(args.csproj, xmlHeader + xml2json.toXml(csproj, options).replace('[object Object]',''));
