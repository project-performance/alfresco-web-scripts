var items = []; // always give back something

var sort1 =
{
 column: "@{http://www.alfresco.org/model/content/1.0}modified",
 ascending: false
};
var sort2 =
{
 column: "@{http://www.alfresco.org/model/content/1.0}created",
 ascending: false
};

var count = 100;
if (url.templateArgs['count']) { 
	count = parseInt(url.templateArgs['count']);
	if (isNaN(count)) count = 100;
}

var start = 0;
if (url.templateArgs['start']) { 
	start = parseInt(url.templateArgs['start']);
	if (isNaN(start)) start = 0;
}

var filter = "TYPE:\"cm:content\"";
if (url.templateArgs['filter']) { 
	filter = url.templateArgs['filter'];
}

var paging =
{
 maxItems: count,
 skipCount: start
};	
var def =
{
 query: filter,
 store: "workspace://SpacesStore",
 language: "fts-alfresco",
 sort: [sort1, sort2],
 page: paging
};

var results = [];
try {
	results = search.query(def);
} catch (err) {
	// pagination is improperly handled so we need this
	model.errorMessage = "Problem with search: " + err.description;
}

if (results) {
	for (var i in results) {
		var node = results[i];

		if (node) {
			var properties = [];
			var props = node.properties;
			
			if (props) {
				for (var name in props) {
					var val = props[name];
					properties.push({name: name.replace(/\{.*\}/,""), value: val+""});
				}
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

			items.push({id: node.id, name: node.name, properties: properties, permissions: permissions});
		}
	}
}
model.items = items;