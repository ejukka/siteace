


/// routing

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('websites', {
    to:"main"
  });
});

Router.route('/detail/:_id', function () {
  this.render('website_details_form', {
    to:"main",
		data:function(){
      return Websites.findOne({_id:this.params._id});
    }
  });
});

	/////
	// template helpers
	/////

	// helper function that returns all available websites


	Template.website_list.helpers({
		websites:function(){
			return Websites.find({}, {sort:{upvote: -1, downvote: -1}});
		}
	});

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_AND_EMAIL"
	});


	/////
	// template events
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);

			var website = Websites.findOne({_id:website_id});

			// put the code in here to add a vote to a website!
			Websites.update({_id:website_id},
							{$set: {upvote:website.upvote + 1}});

			return false;// prevent the button from reloading the page
		},
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);

			var website = Websites.findOne({_id:website_id});
			// put the code in here to remove a vote from a website!
			Websites.update({_id:website_id},
							{$set: {downvote:website.downvote +1}});

			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		},
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			var description = event.target.description.value;
			var title = event.target.title.value;
			console.log("size: "+Websites.find().count());

			Websites.insert({
					title:title,
					url:url,
					description:description,
					upvote:0,
					downvote:0,
					comments:["Test comment1", "test comment2"],
					createdOn:new Date()
				});

			  console.log("size: "+Websites.find().count());

			//  put your website saving code in here!

			return false;// stop the form submit from reloading the page

		}
	});

	Template.website_details_form.events({
		"submit .js-save-details-form":function(event){

			console.log("submit details...");

			// here is an example of how to get the url out of the form:
			var name = event.target.name.value;
			var comment = event.target.comment.value;
			console.log("comment..." + comment);

			var websiteId = this._id;
			console.log(websiteId);

			var website = Websites.findOne({_id:websiteId});
			console.log(website.comments);

			Websites.update({_id:websiteId},
              {"$addToSet": {comments:comment}});

			//  put your website saving code in here!

			return false;// stop the form submit from reloading the page

		}
	});
