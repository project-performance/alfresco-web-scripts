var properties = []; // always give back something
var permissions = [];

// load noderef from url
var node = null;
var id = "";

if (url.templateArgs['noderef']) { id = url.templateArgs['noderef']};
if (args && args.id) { id = args.id; }
if (args && args.noderef) { id = args.noderef; }

if (id.length > 0) {
	try {
		node = search.findNode(id);
	} catch (err) {
		model.errorMessage = "Problem with find node: " + err.description;
	}
}

// if we found something, build the json arrays we need
if (node) {
	var props = node.properties;
	
	if (props) {
		for (var name in props) {
			var val = props[name];
			properties.push({name: name.replace(/\{.*\}/,""), value: val+""});
		}
	}
	
	// add some special properties here
	if (node.size) {
		properties.push({name: "size", value: node.size});
	}
	
	var permissions = [];
	var perms = node.getPermissions();
	if (perms) {
		for (idx in perms) {
			var vals = perms[idx].split(";");
			var p = {permission: "", principal: "", role: ""};
			if (vals.length > 0) p.permission = vals[0];
			if (vals.length > 1) p.principal = vals[1];
			if (vals.length > 2) p.role = vals[2];
			permissions.push(p);
		}
	}

}

// populate the model
model.properties = properties;
model.permissions = permissions;