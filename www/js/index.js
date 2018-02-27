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
var playgrounddetailsbackbtn = $('#playgrounddetailsbackbtn');

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
var playgroundpicturesdiv = $('#playgroundpicturesdiv');
var playgroundpicsdiv = $('#playgroundpicsdiv');
var loadingdiv = $('#loadingdiv');
var reservedate = $('#reservedate');
var pgpricespan = $('#pgpricespan');
var pgnamespan = $('#pgnamespan');
var pgadressspan = $('#pgadressspan');
var pgcpctyspan = $('#pgcpctyspan');
var pgpricepspan = $('#pgpricepspan');
var pgimg = $('#pgimg');
var pgpicture = $('#pgpicture');
var pgmaplink = $('#pgmaplink');
var mandoobselectdiv = $('#mandoobselectdiv');
var manadeebdiv = $('#manadeebdiv');
var choosemandoobbackbtn = $('#choosemandoobbackbtn');
var choosemandoob = $('#choosemandoob');
var mandoobordersdiv = $('#mandoobordersdiv');
var mandooborders = $('#mandooborders');
var userprofiletablnk = $('#userprofiletablnk');
var puserregisterbtn = $('#puserregisterbtn');
var prusernametb = $('#prusernametb');
var prpasswordtb = $('#prpasswordtb');
var premailtb = $('#premailtb');
var prphonetb = $('#prphonetb');
var changepasswordlnk = $('#changepasswordlnk');
var manadeebofferstablnk = $('#manadeebofferstablnk');
var manadeeborders = $('#manadeeborders');
var playground_id_pk;
var mandoobordersLst;
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
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function () {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "XXXXXXXX"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function (data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            //var parentElement = document.getElementById('registration');
            //var listeningElement = parentElement.querySelector('.waiting');
            //var receivedElement = parentElement.querySelector('.received');

            //listeningElement.setAttribute('style', 'display:none;');
            //receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function (e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function (data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        
        sessionStorage.clear();
    }
};


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
    reservedate.min = today;
    reservedate.val(today);
    playground_id_pk = id;
    loadingdiv.show();
    $.ajax({
        type: 'Get',
        url: 'http://clup.alatheertech.com/Api/StadiumDetails/' + id,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            if (data && data.length > 0) {
                pgpricespan.text(data[0].playground_cost);
                pgnamespan.text(data[0].playground_name);
                pgadressspan.text(data[0].playground_address);
                pgcpctyspan.text(data[0].playground_capacity);
                pgpricepspan.text(data[0].playground_cost);
                pgimg.attr('src', data[0].image_name);
                pgpicture.attr('src', data[0].image_name);
                pgmaplink.attr('href', 'https://www.google.com/maps/?q=' + data[0].playground_google_lat + ',' + data[0].playground_google_lng);
                playgroundsdiv.hide();
                playgrounddetailsdiv.show();

            } else {
                navigator.notification.alert('عذرا ولكن تعذر تحميل بيانات الملعب!', null, 'خطأ', 'موافق');
            }
        }, error: function (a, e, d) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            var err = a.responseText + ' ' + e + ' ' + d;
            alert(err);
        }
    });

    return false;
}
skipbtn.click(skiploginregister);
skipbtn2.click(skiploginregister);
skipbtn3.click(skiploginregister);

regbtn.click(function () {
    indexdiv.hide();
    rusernametb.val('');
    rpasswordtb.val('');
    remailtb.val('');
    rphonetb.val('');
    registerdiv.show();
    return false;
});
reservebtn.click(function () {
    
    if (sessionStorage.getItem("userid") != 'undefined') {
        if (reservedate.val()) {
            if (reservetime.val()) {
                var dt = reservedate.val();
                var tm = reservetime.val();
                var now = new Date();

                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);

                var today = now.getFullYear() + "-" + (month) + "-" + (day);
                if (dt < today) {
                    navigator.notification.alert('عذرا ولكن لا يمكنك اختيار تاريخ قديم!', null, 'خطأ', 'موافق');
                }
                if (dt == today) {
                    $.ajax({
                        type: 'POST',
                        url: 'http://clup.alatheertech.com/Api/AddOrederAdmin',
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                        dataType: 'json',
                        async: true,
                        data: { 'playground_id': playground_id_pk, 'date_reservation': dt, 'time_reservation': tm, 'user_id': sessionStorage.getItem("userid") },
                        success: function (data) {
                            //ProgressIndicator.hide();
                            loadingdiv.hide();
                            if (data && data.success == 1) {
                                if (data.time == 1) {
                                    navigator.notification.alert('تم حجز الملعب', null, 'تم', 'موافق');
                                } else {
                                    navigator.notification.alert('عذرا ولكن الملعب غير متاح في هذا الوقت الذي اخترته يرجى اختيار ميعاد آخر!', null, 'خطأ', 'موافق');
                                }
                            } else {
                                navigator.notification.alert('عذرا ولكن تعذر حجز الملعب!', null, 'خطأ', 'موافق');
                            }
                        }, error: function (a, e, d) {
                            //ProgressIndicator.hide();
                            loadingdiv.hide();
                            var err = a.responseText + ' ' + e + ' ' + d;
                            alert(err);
                        }
                    });
                } else {
                    playgrounddetailsdiv.hide();

                    loadingdiv.show();
                    $.ajax({
                        type: 'Get',
                        url: 'http://clup.alatheertech.com/Api/AllDelegate',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        async: true,
                        data: {},
                        success: function (data) {
                            //ProgressIndicator.hide();
                            loadingdiv.hide();
                            if (data && data.length > 0) {
                                var ht = '';
                                for (var i = 0; i < data.length; i++) {
                                    ht += '<div class="row"><div class="col-xs-12 col-sm-12 col-lg-12 mandoob"><input id="mandoob' + data[i].id + '" type="checkbox" class="mandoobchbx" value="' + data[i].id + '"/> <label for="mandoob' + data[i].id + '">' + data[i].user_name + '</label></div></div>';
                                }
                                manadeebdiv.html(ht);
                                mandoobselectdiv.show();
                            } else {
                                playgrounddetailsdiv.show();
                                navigator.notification.alert('عذرا ولكن تعذر تحميل بيانات الملعب!', null, 'خطأ', 'موافق');
                            }
                        }, error: function (a, e, d) {
                            //ProgressIndicator.hide();
                            playgrounddetailsdiv.show();
                            loadingdiv.hide();
                            var err = a.responseText + ' ' + e + ' ' + d;
                            alert(err);
                        }
                    });

                }

            }
        }
    } else {
        playgrounddetailsdiv.hide();
        usernametb.val('');
        passwordtb.val('');
        logindiv.show();
    }
    return false;
});


pgalbumlnk.click(function () {
    playgrounddetailsdiv.hide();
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
            if (data && data.length > 0) {
                var ht = '';
                for (var i = 0; i < data.length; i++) {
                    ht += '<div class="row"><div class="col-xs-12 col-sm-12 col-lg-12"><img src="' + data[i].img + '" class="pgimg2 col-lg-12" /></div></div>';
                }
                playgroundpicsdiv.html(ht);
                playgroundpicturesdiv.show();
                playgrounddetailsdiv.hide();
            } else {
                playgrounddetailsdiv.show();
                navigator.notification.alert('عذرا ولكن تعذر تحميل البوم صور الملعب!', null, 'خطأ', 'موافق');
            }
        }, error: function (a, e, d) {
            //ProgressIndicator.hide();
            playgrounddetailsdiv.show();
            loadingdiv.hide();
            var err = a.responseText + ' ' + e + ' ' + d;
            alert(err);
        }
    });
    return false;
});


choosemandoob.click(function () {
    if ($('.mandoobchbx:checked').length > 0) {
        var delegates = $('.mandoobchbx:checked').map(function () {
            return $(this).val();
        }).get();
        loadingdiv.show();
        var dt = reservedate.val();
        var tm = reservetime.val();
        
        $.ajax({
            type: 'POST',
            url: 'http://clup.alatheertech.com/Api/AddOred',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: true,
            data: { 'playground_id': playground_id_pk, 'date_reservation': dt, 'time_reservation': tm, 'user_id': sessionStorage.getItem("userid"), 'delegates': delegates },
            success: function (data) {
                //ProgressIndicator.hide();
                loadingdiv.hide();
                if (data && data.success == 1) {
                    if (data.time == 1) {
                        navigator.notification.alert('تم حجز الملعب', null, 'تم', 'موافق');
                        mandoobselectdiv.hide();
                        playgroundsdiv.show();
                    } else {
                        navigator.notification.alert('عذرا ولكن الملعب غير متاح في هذا الوقت الذي اخترته يرجى اختيار ميعاد آخر!', null, 'خطأ', 'موافق');
                    }
                } else {
                    navigator.notification.alert('عذرا ولكن تعذر حجز الملعب!', null, 'خطأ', 'موافق');
                }
            }, error: function (a, e, d) {
                //ProgressIndicator.hide();
                loadingdiv.hide();
                var err = a.responseText + ' ' + e + ' ' + d;
                alert(err);
            }
        });
    } else {
        navigator.notification.alert('لابد من اختيار مندوب واحد على الاقل', null, 'خطأ', 'موافق');
    }
    return false;
});

loginbtn.click(function () {
    indexdiv.hide();
    usernametb.val('');
    passwordtb.val('');
    logindiv.show();
    return false;
});
userloginbtn.click(function () {
    if (usernametb.val()) {
        if (passwordtb.val()) {
            //ProgressIndicator.showSimple(true);
            loadingdiv.show();
            sessionStorage.clear();
            $.ajax({
                type: 'POST',
                url: 'http://clup.alatheertech.com/Api/Login',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                async: true,
                data: { 'user_name': usernametb.val(), 'password': passwordtb.val() },
                success: function (data) {
                    //ProgressIndicator.hide();
                    loadingdiv.hide();
                    if (data.success == 1) {
                        sessionStorage.setItem("user_name", usernametb.val());
                        sessionStorage.setItem("userid", data.id);
                        sessionStorage.setItem("is_delegate", data.is_delegate);
                        logindiv.hide();
                        if (data.is_delegate == 0) {
                            ShowPlaygrounds();
                        } else if (data.is_delegate == 1) {
                            ShowMandoobPage();
                        }
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
            navigator.notification.alert('من فضلك أدخل كلمة المرور!', null, 'خطأ', 'موافق');

        }
    } else {
        navigator.notification.alert('من فضلك أدخل اسم المستخدم!', null, 'خطأ', 'موافق');


    }
    return false;
});
userregisterbtn.click(function () {
    if (rusernametb.val()) {
        if (rpasswordtb.val()) {
            //ProgressIndicator.showSimple(true);
            loadingdiv.show();
            $.ajax({
                type: 'POST',
                url: 'http://clup.alatheertech.com/Api/InsertRegistration',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                async: true,
                data: { 'user_name': rusernametb.val(), 'password': rpasswordtb.val(), 'email': remailtb.val(), 'mobile': rphonetb.val() },
                success: function (data) {
                    //ProgressIndicator.hide();
                    loadingdiv.hide();
                    if (data.success == 1) {
                        navigator.notification.alert('تم تسجيل حسابك بنجاح', null, 'تم', 'موافق');
                        sessionStorage.setItem("user_name", rusernametb.val());
                        sessionStorage.setItem("userid", data.id);
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
            navigator.notification.alert('من فضلك أدخل كلمة المرور!', null, 'خطأ', 'موافق');

        }
    } else {
        navigator.notification.alert('من فضلك أدخل اسم المستخدم!', null, 'خطأ', 'موافق');

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
playgrounddetailsbackbtn.click(function () {
    playgroundpicturesdiv.hide();
    playgrounddetailsdiv.show();
    return false;
});
choosemandoobbackbtn.click(function () {
    mandoobselectdiv.hide();
    playgrounddetailsdiv.show();
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
                    navigator.notification.alert('عذرا ولكن تعذر تحميل بيانات الملاعب!', null, 'خطأ', 'موافق');
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

function ShowMandoobPage() {
    loadingdiv.show();
    $.ajax({
        type: 'Get',
        url: 'http://clup.alatheertech.com/Api/OneDelegateOrder/' + sessionStorage.getItem("userid"),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            if (data && data.length > 0) {
                mandoobordersLst = data;
                var ht = '';
                for (var i = 0; i < data.length; i++) {
                    ht += '<div class="row"><div class="col-xs-12 col-sm-12 col-lg-12"><a href="#" onclick="return ShowMandoobOrderDetails(' + data[i].order_id + ')">' +
                            '<div class="mndblblcell col-xs-4 col-sm-4 col-lg-4"><span>الاسم</span></div>' +
                            '<div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].user_name + '</span></div>' +
                            '<div class="mndblblcell col-xs-4 col-sm-4 col-lg-4"><span>اسم الملعب</span></div>' +
                            '<div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].playground_name + '</span></div>' +
                            '<div class="mndblblcell col-xs-4 col-sm-4 col-lg-4"><span>التاريخ</span></div>' +
                            '<div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].date_order + '</span></div>' +
                            '<div class="mndblblcell col-xs-4 col-sm-4 col-lg-4"><span>الوقت</span></div>' +
                            '<div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].time + '</span></div></a></div></div>';
                }
                mandooborders.html(ht);
                mandoobordersdiv.show();
            } else {
                usernametb.val('');
                passwordtb.val('');
                logindiv.show();
                navigator.notification.alert('عذرا ولكن تعذر تحميل بيانات الطلبات!', null, 'خطأ', 'موافق');
            }
        }, error: function (a, e, d) {
            //ProgressIndicator.hide();
            usernametb.val('');
            passwordtb.val('');
            logindiv.show();
            loadingdiv.hide();
            var err = a.responseText + ' ' + e + ' ' + d;
            alert(err);
        }
    });


}
var order_id;
function ShowMandoobOrderDetails(id) {
    order_id = id;
    navigator.notification.prompt(
            'ادخل السعر:',  // message
            onPromptMandoobOrder,                  // callback to invoke
            'عرض سعر من المندوب',            // title
            ['موافق', 'الغاء الامر']              // buttonLabels
        );
    return false;
}
function onPromptMandoobOrder(results) {
    if (results.buttonIndex == 1) {
        var enteredVal = results.input1;
        loadingdiv.show();
        $.ajax({
            type: 'POST',
            url: 'http://clup.alatheertech.com/Api/OrderCost',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: true,
            data: { 'playground_cost': enteredVal, 'id': order_id },
            success: function (data) {
                //ProgressIndicator.hide();
                loadingdiv.hide();
                if (data.success == 1) {
                    navigator.notification.alert('تم اضافة عرض السعر بنجاح', null, 'تم', 'موافق');
                    ShowMandoobPage();
                } else {
                    navigator.notification.alert('عذرا ولكن حدث خطأ أثناء اضافة عرض السعر!', null, 'خطأ', 'موافق');
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

userprofiletablnk.click(function () {
    loadingdiv.show();
    $.ajax({
        type: 'Get',
        url: 'http://clup.alatheertech.com/Api/UpdateRegistration/' + sessionStorage.getItem("userid"),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            if (data) {
                prusernametb.val(data.user_name);
                premailtb.val(data.email);
                prphonetb.val(data.mobile);
            } else {
                prusernametb.val('');
                prpasswordtb.val('');
                premailtb.val('');
                prphonetb.val('');
                navigator.notification.alert('عذرا ولكن تعذر تحميل بيانات الملف الشخصي!', null, 'خطأ', 'موافق');
            }
        }, error: function (a, e, d) {
            //ProgressIndicator.hide();
            prusernametb.val('');
            prpasswordtb.val('');
            premailtb.val('');
            prphonetb.val('');
            var err = a.responseText + ' ' + e + ' ' + d;
            alert(err);
        }
    });
});

puserregisterbtn.click(function () {
    if (usrprofilestate == 'normal') {
        if (prusernametb.val()) {
            //ProgressIndicator.showSimple(true);
            loadingdiv.show();
            $.ajax({
                type: 'POST',
                url: 'http://clup.alatheertech.com/Api/UpdateRegistration/' + sessionStorage.getItem("userid"),
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                async: true,
                data: { 'user_name': prusernametb.val(), 'email': premailtb.val(), 'mobile': prphonetb.val() },
                success: function (data) {
                    //ProgressIndicator.hide();
                    loadingdiv.hide();
                    if (data.success == 1) {
                        navigator.notification.alert('تم حفظ بياناتك بنجاح', null, 'تم', 'موافق');
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
            navigator.notification.alert('من فضلك أدخل اسم المستخدم!', null, 'خطأ', 'موافق');
        }
    } else if (usrprofilestate == 'password') {
        if (prusernametb.val()) {
            //ProgressIndicator.showSimple(true);
            loadingdiv.show();
            $.ajax({
                type: 'POST',
                url: 'http://clup.alatheertech.com/Api/UpdatePassWord',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                dataType: 'json',
                async: true,
                data: { 'id': sessionStorage.getItem("userid"), 'password': prpasswordtb.val() },
                success: function (data) {
                    //ProgressIndicator.hide();
                    loadingdiv.hide();
                    if (data.success == 1) {
                        $('.passwordlbl').hide();
                        $('.userdata').show();
                        usrprofilestate = 'normal';
                        changepasswordlnk.text('تغيير كلمة المرور');
                        navigator.notification.alert('تم حفظ بياناتك بنجاح', null, 'تم', 'موافق');
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
            navigator.notification.alert('من فضلك أدخل اسم المستخدم!', null, 'خطأ', 'موافق');
        }
    }
    return false;
});
var usrprofilestate = 'normal';
changepasswordlnk.click(function () {
    if (usrprofilestate == 'normal') {
        prpasswordtb.val('');
        $('.passwordlbl').show();
        $('.userdata').hide();
        usrprofilestate = 'password';
        changepasswordlnk.text('الغاء الامر');
    } else if (usrprofilestate == 'password') {
        $('.passwordlbl').hide();
        $('.userdata').show();
        usrprofilestate = 'normal';
        changepasswordlnk.text('تغيير كلمة المرور');
    }
    return false;
});
manadeebofferstablnk.click(function () {
    showManadeebOffers();
    

});

function showManadeebOffers() {
    loadingdiv.show();
    $.ajax({
        type: 'Get',
        url: 'http://clup.alatheertech.com/Api/ClientDelegatesOrders/' + sessionStorage.getItem("userid"),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        data: {},
        success: function (data) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            if (data) {
                var ht = '';
                for (var i = 0; i < data.length; i++) {
                    ht += '<div class="row"><div class="col-xs-12 col-sm-12 col-lg-12"><div class="mndblblcell col-xs-4 col-sm-4 col-lg-4"><span>المندوب</span></div><div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].delegates_name + '</span></div>' +
                                '<div class="mndblblcell col-xs-4 col-sm-4 col-lg-4"><span>اسم الملعب</span></div><div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].playground_name + '</span></div><div class="mndblblcell col-xs-4 col-sm-4 col-lg-4">' +
                                    '<span>التاريخ</span></div><div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].date_order + '</span></div><div class="mndblblcell col-xs-4 col-sm-4 col-lg-4">' +
                                    '<span>الوقت</span></div><div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].time + '</span></div><div class="mndblblcell col-xs-4 col-sm-4 col-lg-4">' +
                                    '<span>عرض السعر</span></div><div class="mndbvalcell col-xs-8 col-sm-8 col-lg-8"><span>' + data[i].playground_cost + '</span></div><div class="mndbbtncell col-xs-12 col-sm-12 col-lg-12">' +
                                    '<a href="#" class="loginbtn" onclick="return SelectMandoobOffer(' + data[i].delegates_id_fk + ', ' + data[i].reservation_id_fk + ', ' + data[i].order_id + ')"><img src="img/select.png" /></a></div></div></div>';
                }
                manadeeborders.html(ht);
            } else {
                manadeeborders.html('');
            }
        }, error: function (a, e, d) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            var err = a.responseText + ' ' + e + ' ' + d;
            alert(err);
        }
    });
}

function SelectMandoobOffer(delegates_id_fk, reservation_id_fk, order_id) {
    loadingdiv.show();
    $.ajax({
        type: 'POST',
        url: 'http://clup.alatheertech.com/Api/SelectDelegates',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: true,
        data: { 'delegates_id_fk': delegates_id_fk, 'reservation_id_fk': reservation_id_fk, 'order_id': order_id },
        success: function (data) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            if (data.success == 1) {
                navigator.notification.alert('تم اختيار المندوب بنجاح', null, 'تم', 'موافق');
                showManadeebOffers();
            } else {
                navigator.notification.alert('عذرا ولكن حدث خطأ أثناء تنفيذ طلبك!', null, 'خطأ', 'موافق');
            }
        }, error: function (a, e, d) {
            //ProgressIndicator.hide();
            loadingdiv.hide();
            var err = a.responseText + ' ' + e + ' ' + d;
            alert(err);
        }
    });
}