//
// POST
//

function Login_Post(user, pass) {
    //init loading animation
    //LoadingAnimation();
    startLoader();
    $('#login_div').fadeOut();

    console.log("Login("+user+pass+")");
    
    $.ajax({
           type: "POST",
           url: LOGIN_URL,
           data: JSON.stringify({ 
                              email: user, 
                              password: pass,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization:Login_Post', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
                        stopLoader();
                        $('#login_div').fadeIn();
                        
                        console.log("Cliq Login ---> Internet connection not found");
           },
           success: function ($objJSON) {
                console.log("server response ---> " + $objJSON);
                if($objJSON)
                {
                  console.log("Cliq Login ---> Succesfully");
                    //
                    // SAVING USER LOGGED SESSION
                    //
                    var csv = $objJSON.AccountID + ',' + $objJSON.Email + ',' + $objJSON.FirstName + ',' + $objJSON.LastName + ',' + $objJSON.BirthDate + ',' + $objJSON.CreationDate;
                    SAVE_LOGGED_USER(csv);
                    SAVE_ACTUAL_PAGE(VIEW_MY_CLIQS);         
                    //
                    // Bind cliqs
                    //
                    GetCliqs($objJSON.AccountID,$objJSON.Email);

                }
                else
                {
                    console.log("Cliq Login Failed ---> $objJSON => "+$objJSON);
                    $('#login_div').fadeIn();
                    //
                    // LOADING SCREEN REMOVAL
                    //
                    stopLoader();
                }
                //
                //prevent keyboard push up webview at iOS app using phonegap
                //
                window.scrollTo(0,0); //the second 0 marks the Y scroll pos. Setting this to i.e. 100 will push the screen up by 100px.
            }
           });
}

function AddCliqPost(_cliqId, _user, _userEmail, _deviceType, _postContent,_hasImage, _postImage){
    //init loading animation
    //LoadingAnimation();
    startLoader();
    $('#view_cliq_div').fadeOut();

    console.log("AddCliqPost("+_cliqId+_user+_userEmail+_deviceType+_postContent+")");
    /*console.log(JSON.stringify({ 
                              cliqId: _cliqId, 
                              userId: _user,
                              userEmail: _userEmail,
                              deviceType:_deviceType, 
                              postContent:_postContent,
                              hasImage: _hasImage,
                                }));*/
    $.ajax({
           type: "POST",
           url: CREATE_CLIQ_POST_URL,
           data: JSON.stringify({ 
                              cliqId: _cliqId, 
                              userId: _user,
                              userEmail: _userEmail,
                              deviceType:_deviceType, 
                              postContent:_postContent,
                              hasImage: _hasImage,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
           },
           success: function (data) {
                console.log("server response success ---> " + data);
                if(data != false)
                {
                  var cliqPostId = data;
                  console.log("new cliq chat post added : "+data);
                  if(_hasImage)
                  	uploadChatImageDATA(_cliqId,cliqPostId, _postImage);
                  else
                  	onViewCliq(_cliqId);
                  //
                  //
                  //
                  closeCreateCliqPostMpodalPopup();
                  clearCreateCliqPostFields();
                }
                else
                {
                  console.log("server response error ---> " + data);
                }
           }
           });
}

function CreateCliq﻿(_userId, _categoryId, _name, _description, _isPublic){

                var _hasImage = false;//#txtUsername').val();
                var image = document.getElementById('imgMyNewCliq');
                //console.log("image.src ---> " + image.src);
                if(image.src != "")
                    _hasImage = true;
                    
	console.log("CreateCliq("+_userId+_categoryId+_name+_description+_hasImage+")");

  $.ajax({
           type: "POST",
           url: CREATE_CLIQ_URL,
           data: JSON.stringify({ 
                              userId: _userId, 
                              categoryId: _categoryId,
                              name: _name,
                              description:_description,
                              isPublic: _isPublic,
                              hasImage:_hasImage,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
				      stopLoader();
                $('#create_cliq_div').fadeIn();
           },
           success: function (data) {
                console.log("server response success RAW ---> " + data);
                
                if(data != false)
                {
                  var _cliqId = data;
                  console.log("new cliq added : "+_cliqId);
                    
                  if(_hasImage)
                  	uploadCreateCliqImageDATA(_cliqId, image.src);
                }
                else
                {
                  console.log("server response error ---> " + data);
                }
                
                clearCreateCliqFields();
                stopLoader();
                $('#create_cliq_div').fadeIn();
                iPadAlert("Cliq App", "Your Cliq \""+_name+"\" has been succesfully created.", "Ok");
           }
     });
}


function CreateCliqShareAndAnonymousUser(_cliqId, _cliqName, _invitedBy, _targetEmail){
  //console.log("CreateCliqShareAndAnonymousUser("+_cliqId+_cliqName+_invitedBy+_targetEmail+")");

  $.ajax({
           type: "POST",
           url: CREATE_ANONYMOUS_URL,
           //url: "http://cliq.aeonitgroup.com/Service1.svc/﻿create-cliq-anonymous-user-access",
           data: JSON.stringify({ 
                              cliqId: _cliqId, 
                              cliqName: _cliqName,
                              invitedBy: _invitedBy,
                              targetEmail:_targetEmail,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
           },
           success: function (data) {
                console.log("server response success RAW ---> " + data);
                //
                    // SERVER RESPONSE?
                    //
                          if (data== null) {
                              $('#sendInvitationLoader').fadeOut();
                              $('#submit_button_invite_cliq').fadeIn();
                              $('#display-error').fadeIn();
                              console.log("Server Details: ---> "+data);
                              
                              return false;
                            }
                        
                        //
                        // ELSE SERVER RESPONSE IS VALID
                        //
                     if (data==true){

                                $('#sendInvitationLoader').fadeOut();
                                  console.log("CreateCliqInvitation Success---> " + data);
                                  
                                  $('#display-success').fadeIn();

                                  setTimeout(function() {
                                                                      $('#display-success').fadeOut();
                                                                      $('#submit_button_invite_cliq').fadeIn();
                                                                      $('#txtEmailInvite').val("");
                                                              }, 4444);
                                //
                                //prevent keyboard push up webview at iOS app using phonegap
                                //
                                window.scrollTo(0,0); //the second 0 marks the Y scroll pos. Setting this to i.e. 100 will push the screen up by 100px.
                                
                                return true;
                      }
                     else
                    {
                        console.log("CreateCliqInvitation Failed ---> $objJSON => "+data);
                        $('#submit_button_invite_cliq').fadeIn();
                        $('#display-error').fadeIn();
                        $('#sendInvitationLoader').fadeOut();
                    }
           }
     });
}

function RespondFriendRequest(_friendrequestId, _friendshipAccepted){
    //init loading animation
    //LoadingAnimation();
    
    console.log("RespondFriendRequest("+_friendrequestId+_friendshipAccepted+")");
    $.ajax({
           type: "POST",
           url: CREATE_FRIENDSHIP_URL,
           data: JSON.stringify({ 
                              friendInvitationId: _friendrequestId, 
                              friendshipAccepted: _friendshipAccepted,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
           },
           success: function (data) {
                console.log("server response success ---> " + data);
                if(data != false)
                {
                  var cliqPostId = data;
                  console.log("new friendship has being created : "+data);
                    //refresh
                  reloadApp(VIEW_MY_PROFILE);
                }
                else
                {
                  console.log("server response error ---> " + data);
                }
           }
           });    
}

function ReplyToCliqFriendShareInvitation(_invitationId, _isAccepted){
    //init loading animation
    //LoadingAnimation();
    
    console.log("ReplyToCliqFriendShareInvitation("+_invitationId+_isAccepted+") URL ---> " + REPLY_TO_CLIQ_SHARE_REQUEST);
    $.ajax({
           type: "POST",
           url: "http://cliq.aeonitgroup.com/Service1.svc/reply-cliq-share-request",
           data: JSON.stringify({ 
                              ﻿cliqShareInvitationId: _invitationId, 
                              ﻿cliqShareInviteAccepted: _isAccepted,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
           },
           success: function (data) {
                console.log("server response success ---> " + data);
                if(data != false)
                {
                  var cliqPostId = data;
                  console.log("new member has being added to this cliq, also cliq posts permissions were granted from owner of this cliq to this user : "+data);
                  reloadApp(VIEW_MY_PROFILE);
                }
                else
                {
                  console.log("server response error ---> " + data);
                }
           }
           });


    
           
}

function CreateCliqFriendShareInvitation(_cliqId, _userId, _userInvited){
    //init loading animation
    //LoadingAnimation();
    
    //console.log("CreateCliqShareInvitation("+_cliqId+_userId+_userInvited+")");
    $.ajax({
           type: "POST",
           url: CREATE_CLIQ_FRIEND_SHARE_URL,
           data: JSON.stringify({ 
                              cliqId: _cliqId, 
                              ﻿userSharingId: _userId,
                              ﻿userInvitedId: _userInvited,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
           },
           success: function (data) {
                console.log("server response success ---> " + data);
                if(data != false)
                {
                  console.log("new cliq share invite has being created : "+data);
                }
                else
                {
                  console.log("server response error ---> " + data);
                }
           }
           });    
}

function ForwardCliqPost(_cliqId, _cliqPostId, _userId, _deviceType){
    //init loading animation
    //LoadingAnimation();
    
    console.log("ForwardCliqPost("+_cliqId+" - "+_cliqPostId+")");
    console.log("ws call ---> "+FORWARD_CLIQ_POST_URL);
    $.ajax({
           type: "POST",
           url: FORWARD_CLIQ_POST_URL,
           data: JSON.stringify({ 
                              cliqPostId: _cliqPostId,
                              userId: _userId,
                              deviceType: _deviceType,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
           },
           success: function (data) {
                console.log("server response success ---> " + data);
                if(data != false)
                {
                  var cliqPostId = data;
                  console.log("forward created : "+data);
                    //refresh
                    onViewCliq(_cliqId);
                }
                else
                {
                  console.log("server response error ---> " + data);
                  stopLoader();
                  $('#view_cliq_div').fadeIn();
                }
           }
    });    
}

function ReplyCliqPost(_cliqId, _postParentId, _user, _userEmail, _deviceType, _postContent,_hasImage, _postImage){
    //init loading animation
    //LoadingAnimation();
    startLoader();
    $('#view_cliq_div').fadeOut();

    console.log("ReplyCliqPost("+_cliqId+_postParentId+_user+_userEmail+_deviceType+_postContent+")");
    /*console.log(JSON.stringify({ 
                              cliqId: _cliqId, 
                              userId: _user,
                              userEmail: _userEmail,
                              deviceType:_deviceType, 
                              postContent:_postContent,
                              hasImage: _hasImage,
                                }));*/
    $.ajax({
           type: "POST",
           url: REPLY_CLIQ_POST_URL,
           data: JSON.stringify({ 
                              cliqId: _cliqId,
                              postParentId: _postParentId,
                              userId: _user,
                              userEmail: _userEmail,
                              deviceType:_deviceType, 
                              postContent:_postContent,
                              hasImage: _hasImage,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
           },
           success: function (data) {
                console.log("server response success ---> " + data);
                if(data != false)
                {
                  var cliqPostId = data;
                  console.log("new cliq chat post added : "+data);
                  if(_hasImage)
                    uploadChatImageDATA(_cliqId,cliqPostId, _postImage);
                  else
                    onViewCliq(_cliqId);
                  //
                  //
                  //
                  closeCreateCliqPostMpodalPopup();
                  clearCreateCliqPostFields();
                }
                else
                {
                  console.log("server response error ---> " + data);
                }
           }
           });
}

function DeleteCliq﻿(_cliqId){                 
  console.log("DeleteCliq﻿("+_cliqId+")");

  $.ajax({
           type: "POST",
           url: DELETE_CLIQ_URL,
           data: JSON.stringify({ 
                              cliqId: _cliqId, 
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log('DeleteCliq﻿: Trying to connect webservice --> ' + DELETE_CLIQ_URL);
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
              stopLoader();
                $('#demo').fadeIn();
           },
           success: function (data) {
                console.log("server response success RAW ---> " + data);
                
                /*if(data != false)
                {
                  var _cliqId = data;
                  console.log("new cliq added : "+_cliqId);
                    
                  if(_hasImage)
                    uploadCreateCliqImageDATA(_cliqId, image.src);
                }
                else
                {
                  console.log("server response error ---> " + data);
                }*/
                
                //clearCreateCliqFields();
                //stopLoader();
                //$('#demo').fadeIn();
                reloadApp(VIEW_MY_CLIQS);//bug refresh page required in order to redraw carousel//TODO:find fix on internet
                //iPadAlert("Cliq App", "Cliq has been succesfully deleted.", "Ok");
                var user_id = GET_LOGGED_USER().split(',')[0];
                GetCliqs(user_id,"");
           }
     });
}

function LeaveCliq﻿(_cliqId,_userId){                 
  console.log("LeaveCliq﻿("+_cliqId+_userId+")");

  $.ajax({
           type: "POST",
           url: LEAVE_CLIQ_URL,
           data: JSON.stringify({ 
                              cliqId: _cliqId, 
                              userId: _userId,
                                }),
           contentType: 'application/json; charset=utf-8',
           dataType: 'json',
           beforeSend: function (xhr) {
            console.log("//xhr.setRequestHeader('Authorization', 'username password');");
           //Possible to set any required headers here
           //xhr.setRequestHeader('Authorization', 'username password');
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log("FAIL :(" + XMLHttpRequest + " ... " + textStatus + " ... " + errorThrown);
              stopLoader();
                $('#demo').fadeIn();
           },
           success: function (data) {
                console.log("server response success RAW ---> " + data);
                
                /*if(data != false)
                {
                  var _cliqId = data;
                  console.log("new cliq added : "+_cliqId);
                    
                  if(_hasImage)
                    uploadCreateCliqImageDATA(_cliqId, image.src);
                }
                else
                {
                  console.log("server response error ---> " + data);
                }*/
                
                //clearCreateCliqFields();
                //stopLoader();
                //$('#demo').fadeIn();
                reloadApp(VIEW_MY_CLIQS);//bug refresh page required in order to redraw carousel//TODO:find fix on internet
                //iPadAlert("Cliq App", "Cliq has been succesfully deleted.", "Ok");
                var user_id = GET_LOGGED_USER().split(',')[0];
                GetCliqs(user_id,"");
           }
     });
}
/*function CreateCliqInvitation(cliq, email) {
    
    var urlParams = "/" + cliq + "/" + email;
    var $type = 'GET',
    $url = CREATE_INVITE_CLIQ_URL + urlParams,
    $data = "",
    $objJSON;

    //console.log('Login: Trying to connect webservice --> ' + LOGIN_URL);
    
    $objJSON = getJSONData($type, $url, $data);
    
    //
    // SERVER RESPONSE?
    //
    if ($objJSON == null) {
        $('#sendInvitationLoader').fadeOut();
        $('#submit_button_invite_cliq').fadeIn();
        $('#display-error').fadeIn();
        console.log("Cliq Login ---> Internet connection not found");
        
        return false;
        
        //
        // ELSE SERVER RESPONSE IS VALID
        //
    } else {

        $('#sendInvitationLoader').fadeOut();

        if($objJSON)
        {
          console.log("Cliq Login Success---> " + $objJSON);
          
          $('#display-success').fadeIn();

          setTimeout(function() {
                                              $('#display-success').fadeOut();
                                              $('#submit_button_invite_cliq').fadeIn();
                                              $('#txtEmailInvite').val("");
                                      }, 4444);
        }
        else
        {
            console.log("Cliq Login Failed ---> $objJSON => "+$objJSON);
            $('#submit_button_invite_cliq').fadeIn();
            $('#display-error').fadeIn();
        }
        //
        //prevent keyboard push up webview at iOS app using phonegap
        //
        window.scrollTo(0,0); //the second 0 marks the Y scroll pos. Setting this to i.e. 100 will push the screen up by 100px.
        
        return true;
    }
}*/