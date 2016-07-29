Websites = new Mongo.Collection("websites");

Websites.allow({
	update:function(userId, doc){
		return true;
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
