Template.postEdit.helpers({
    post: function(){
        return Posts.findOne();
    }
});

Template.postEdit.events({
    'click #btn-post-edit': function(e){
        e.preventDefault();
        clearErrors();
        var title = $('#ta-post-title').val();
        var content = $('#ta-post-content').val();
        if(!validStringLength(title, 2, 28, throwError.bind(null, '标题的长度应该在2-28之间！')))
            return false;
        if(!validStringLength(content, 10, 10000, throwError.bind(null, '正文的长度应该在10-10000之间！')))
            return false;

        var postId = Posts.findOne()._id;
        Meteor.call('postEdit', title, content, postId, function(err){
            if(err)
                return throwError(err.reason);
            Router.go('post', {id: postId});
        });
    }
})