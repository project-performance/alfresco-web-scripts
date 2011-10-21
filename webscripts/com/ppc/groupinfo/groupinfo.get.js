var properties = []; // always give back something
var groupName = "";
var group = null;

if (url.templateArgs['group']) { groupName = url.templateArgs['group']};
if (args && args.group) { groupName = args.group; }

if (groupName.length > 0) { 
	try {
		group = people.getGroup(groupName);
	} catch (err) {
		model.errorMessage = "Problem with find group: " + err.description;
	}
}

// if we found something, build the json arrays we need
if (group) {
	var props = group.properties;
	
	if (props) {
		for (var name in props) {
			var val = props[name];
			properties.push({name: name.replace(/\{.*\}/,""), value: val+""});
		}
	}
}

// set up model
model.properties = properties;
model.name = groupName;