var groupNames = []; // always give back something

var userName = "";
var user = null;

if (url.templateArgs['user']) { userName = url.templateArgs['user']};
if (args && args.user) { userName = args.user; }
if (args && args.login) { userName = args.login; }

if (userName.length > 0) { 
	try {
		user = people.getPerson(userName);
	} catch (err) {
		model.errorMessage = "Problem with find user: " + err.description;
	}
}


if (user) {
	var mgroups = people.getContainerGroups(user);
	
	// output group membership
	if (mgroups) {
		for (var i=0; i < mgroups.length; i++) {
			groupNames.push(mgroups[i].properties["cm:authorityName"]);
		}
	}
}

// set up model
model.groups = groupNames;
model.name = userName;