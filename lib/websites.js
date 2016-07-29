Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

Websites.allow({
	update:function(userId, doc){
		console.log("testing security on website update");
		if (Meteor.user()){
			return true;
		} else {
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on websites insert");
		  console.log("size: "+Websites.find().count());
			return true;
	},
	remove:function(userId, doc){
		return true;
	}

///	findOne:function(userId, doc){
	///	return true;
	//}
})

Comments.allow({
	update:function(userId, doc){
		console.log("testing security on website update");
		if (Meteor.user()){
			return true;
		} else {
			return false;
		}
	},

	insert:function(userId, doc){
			return true;
	},
	remove:function(userId, doc){
		return true;
	}

///	findOne:function(userId, doc){
	///	return true;
	//}
})
