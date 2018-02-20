/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        document.getElementById('indexdiv').setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    }
};
var pglist = [];
var regbtn = $('#regbtn');
var loginbtn = $('#loginbtn');
var skipbtn = $('#skipbtn');
var skipbtn2 = $('#skipbtn2');
var skipbtn3 = $('#skipbtn3');
var pgalbumlnk = $('#pgalbumlnk');
var reservebtn = $('#reservebtn');

var userloginbtn = $('#userloginbtn');
var userregisterbtn = $('#userregisterbtn');
var playgroundsbackbtn = $('#playgroundsbackbtn');
var backtolistbackbtn = $('#backtolistbackbtn');

var usernametb = $('#usernametb');
var reservedate = $('#reservedate');
var reservetime = $('#reservetime');
var passwordtb = $('#passwordtb');
var rusernametb = $('#rusernametb');
var rpasswordtb = $('#rpasswordtb');
var remailtb = $('#remailtb');
var rphonetb = $('#rphonetb');
var indexdiv = $('#indexdiv');
var logindiv = $('#logindiv');
var registerdiv = $('#registerdiv');
var playgroundsdiv = $('#playgroundsdiv');
var playgrounddetailsdiv = $('#playgrounddetailsdiv');
var loadingdiv = $('#loadingdiv');
var reservedate = $('#reservedate');
var pgpricespan = $('#pgpricespan');
var pgnamespan = $('#pgnamespan');
var pgadressspan = $('#pgadressspan');
var pgcpctyspan = $('#pgcpctyspan');
var pgpricepspan = $('#pgpricepspan');
var pgimg = $('#pgimg');
var pgmaplink = $('#pgmaplink');
var playground_id_pk;


function skiploginregister() {
    indexdiv.hide();
    registerdiv.hide();
    logindiv.hide();
    ShowPlaygrounds();
    return false;
}
function displayPlaygroundDetails(id) {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    reservedate.val(today);

    for (var i = 0; i < pglist.length; i++) {
        if (pglist[i].playground_id_pk == id) {
            playground_id_pk = id;
            pgpricespan.text(pglist[i].playground_cost);
            pgnamespan.text(pglist[i].playground_name);
            pgadressspan.text(pglist[i].playground_address);
            pgcpctyspan.text(pglist[i].playground_capacity);
            pgpricepspan.text(pglist[i].playground_cost);
            pgimg.attr('src', pglist[i].image_name);
            pgmaplink.attr('href', 'https://www.google.com/maps/?q=' + pglist[i].playground_google_lat + ',' + pglist[i].playground_google_lng);
            playgroundsdiv.hide();
            playgrounddetailsdiv.show();

        }
    }
    return false;
}
skipbtn.click(skiploginregister);
skipbtn2.click(skiploginregister);
skipbtn3.click(skiploginregister);

regbtn.click(function () {
    indexdiv.hide();
    registerdiv.show();
    return false;
});
reservebtn.click(function () {
    if (reservedate.val()) {
        if (reservetime.val()) {

            navigator.notification.alert('تم حجز الملعب' + reservedate.val() + reservetime.val(), null, 'تم', 'موافق');
        }
    }
    return false;
});
pgalbumlnk.click(function () {
    loadingdiv.show();
    $.ajax({
        type: 'Get',
        url: 'http://clup.alatheertech.com/Api/StadiumImages/' + playground_id_pk,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            if (data) {
                location.href = data;
            } else {
                navigator.notification.alert(
'عذرا ولكن تعذر تحميل البوم صور الملعب!',  // message
null,         // callback
'خطأ',            // title
'موافق'                  // buttonName
);
            }
        }, error: function (a, e, d) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            var err = a.responseText + ' ' + e + ' ' + d;
            alert(err);
        }
    });
    return false;
});

loginbtn.click(function () {
    indexdiv.hide();
    logindiv.show();
    return false;
});
userloginbtn.click(function () {
    if (usernametb.val()) {
        if (passwordtb.val()) {
            //ProgressIndicator.showSimple(true);
            loadingdiv.show();
            $.ajax({
                type: 'Get',
                url: 'http://clup.alatheertech.com/Api/Login',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                data: { 'user_name': usernametb.val(), 'password': passwordtb.val() },
                success: function (data) {
                    //ProgressIndicator.hide();
                    loadingdiv.hide();
                    if (data.success == 1) {
                        sessionStorage["user_name"] = usernametb.val();
                        sessionStorage["userid"] = data.id;
                        sessionStorage["is_delegate"] = data.is_delegate;
                        logindiv.hide();
                        ShowPlaygrounds();
                    } else {
                        navigator.notification.alert(
    'عذرا ولكن البيانات التي قمت بادخالها غير صحيحة!',  // message
    null,         // callback
    'خطأ',            // title
    'موافق'                  // buttonName
);
                    }
                }, error: function (a, e, d) {
                    //ProgressIndicator.hide();
                    loadingdiv.hide();
                    var err = a.responseText + ' ' + e + ' ' + d;
                    alert(err);
                }
            });

        } else {
            navigator.notification.alert(
    'من فضلك أدخل كلمة المرور!',  // message
    null,         // callback
    'خطأ',            // title
    'موافق'                  // buttonName
);

        }
    } else {
        navigator.notification.alert(
    'من فضلك أدخل اسم المستخدم!',  // message
    null,         // callback
    'خطأ',            // title
    'موافق'                  // buttonName
);


    }
    return false;
});
userregisterbtn.click(function () {
    if (rusernametb.val()) {
        if (rpasswordtb.val()) {
            //ProgressIndicator.showSimple(true);
            loadingdiv.show();
            $.ajax({
                type: 'Get',
                url: 'http://clup.alatheertech.com/Api/InsertRegistration',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                async: true,
                data: { 'user_name': rusernametb.val(), 'password': rpasswordtb.val(), 'email': remailtb.val(), 'mobile': rphonetb.val() },
                success: function (data) {
                    //ProgressIndicator.hide();
                    loadingdiv.hide();
                    if (data.success == 1) {
                        navigator.notification.alert('تم تسجيل حسابك بنجاح', null, 'تم', 'موافق');
                        sessionStorage["user_name"] = rusernametb.val();
                        sessionStorage["userid"] = data.id;
                        registerdiv.hide();
                        ShowPlaygrounds();
                    } else {
                        navigator.notification.alert('عذرا ولكن البيانات التي قمت بادخالها غير صحيحة!', null, 'خطأ', 'موافق');
                    }
                }, error: function (a, e, d) {
                    //ProgressIndicator.hide();
                    loadingdiv.hide();
                    var err = a.responseText + ' ' + e + ' ' + d;
                    alert(err);
                }
            });

        } else {
            navigator.notification.alert('من فضلك أدخل كلمة المرور!',null,'خطأ','موافق');

        }
    } else {
        navigator.notification.alert('من فضلك أدخل اسم المستخدم!',  null,  'خطأ','موافق');

    }
    return false;
});
playgroundsbackbtn.click(function () {
    playgroundsdiv.hide();
    indexdiv.show();
    return false;
});
backtolistbackbtn.click(function () {
    playgrounddetailsdiv.hide();
    ShowPlaygrounds();
    return false;
});

function ShowPlaygrounds() {
    //$('#playgroundslistdiv').html('<span>loading ...</span>');
    if (pglist && pglist.length > 0) {
        playgroundsdiv.show();
    } else {

        loadingdiv.show();
        $.ajax({
            type: 'Get',
            url: 'http://clup.alatheertech.com/Api/AllStadium',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            data: { 'user_name': rusernametb.val(), 'password': rpasswordtb.val(), 'email': remailtb.val(), 'mobile': rphonetb.val() },
            success: function (data) {
                //ProgressIndicator.hide();
                loadingdiv.hide();
                if (data) {
                    pglist = data;
                    var ht = '';
                    for (var i = 0; i < data.length; i++) {
                        if (i == 0)
                        { ht += '<div  class="row pgrow">'; }
                        ht += '<div class="pgitem col-xs-3 col-sm-3 col-lg-3"><a href="#" onclick="return displayPlaygroundDetails(' + data[i].playground_id_pk + ')"><div class="col-xs-12 col-sm-4 col-md-3 col-lg-3"><span>' + data[i].playground_name + '</span></div></a></div>';
                        if ((i + 1) % 4 == 0 && i <= data.length - 1) {
                            ht += '</div><div  class="row pgrow">';
                        }
                        if (i == data.length - 1) {
                            ht += '</div>';
                        }
                    }
                    $('#playgroundslistdiv').html(ht);
                    playgroundsdiv.show();
                } else {
                    navigator.notification.alert(
    'عذرا ولكن تعذر تحميل بيانات الملاعب!',  // message
    null,         // callback
    'خطأ',            // title
    'موافق'                  // buttonName
    );
                }
            }, error: function (a, e, d) {
                //ProgressIndicator.hide();
                loadingdiv.hide();
                var err = a.responseText + ' ' + e + ' ' + d;
                alert(err);
            }
        });
    }


}