@echo OFF

set PATH=%cd%
cd C:\Windows\System32

title Custom Rerouter

cls
echo DNS rerouting init
netsh interface ip set dns "로컬 영역 연결" static 1.1.1.1 primary

echo.
echo flush dns
ipconfig /flushdns

echo.
echo hosts file backup
cd C:\Windows\System32\drivers\etc
attrib -r -h -s hosts

copy hosts C:\Windows\System32\drivers\etc\hosts.bak
echo hosts file backup complete

echo.
echo adding new dns to hosts file

rem add two blank lines to hosts
echo.>>hosts
echo.>>hosts

@echo OFF
rem google dns
echo 216.58.192.42 www.google.co.kr>>hosts
echo 216.58.192.42 google.co.kr>>hosts
echo 216.58.192.42 accounts.google.co.kr>>hosts
echo 216.58.192.42 accounts.google.com>>hosts
echo 216.58.192.42 www.google.com>>hosts
echo 216.58.192.42 developers.google.com>>hosts
echo 216.58.192.42 opensource.google.com>>hosts
echo 216.58.192.42 dl.google.com>>hosts
echo 216.58.192.42 cache.pack.google.com>>hosts
echo 216.58.192.42 code.google.com>>hosts
echo 216.58.192.42 tools.google.com>>hosts
echo 216.58.192.42 chrome.google.com>>hosts
echo 216.58.192.42 update.googleapis.com>>hosts
echo 216.58.192.42 trends.google.com>>hosts
echo 216.58.192.42 trends.google.co.kr>>hosts
echo 216.58.192.42 google.com>>hosts
echo 216.58.192.42 support.google.com>>hosts
echo 216.58.192.42 goo.gl>>hosts
echo 216.58.192.42 drive.google.com>>hosts
echo 216.58.192.42 drivers.google.com>>hosts
echo 216.58.192.42 store.google.com>>hosts
echo 216.58.192.42 api.google.com>>hosts
echo 216.58.192.42 play.google.com>>hosts
echo 216.58.192.42 mail.google.com>>hosts
echo 216.58.192.42 gmail.com>>hosts
echo 216.58.192.42 docs.google.com>>hosts
echo 216.58.192.42 analytics.google.com>>hosts
echo 216.58.192.42 fonts.google.apis.com>>hosts
echo 216.58.192.42 fonts.googleapis.com>>hosts
echo 216.58.192.42 fonts.gstatic.com>>hosts
echo 216.58.192.42 manifest.googlevideo.com>>hosts
echo 216.58.192.42 translate.google.com>>hosts
echo 216.58.192.42 maps.google.com>>hosts
echo 216.58.192.42 maps.google.co.kr>>hosts
echo 216.58.192.42 www.maps.google.com>>hosts
echo 216.58.192.42 www.maps.google.co.kr>>hosts
echo 216.58.192.42 www.blogger.com>>hosts
echo 216.58.192.42 blogger.com>>hosts
echo 216.58.192.42 www.blogspot.com>>hosts
echo 216.58.192.42 blogspot.com>>hosts
echo 216.58.192.42 clientservices.googleapis.com>>hosts
echo 216.58.192.42 ssl.google-anaytics.com>>hosts
echo 216.58.192.42 adservice.google.co.kr>>hosts
echo 216.58.192.42 www.googletagmanager.com>>hosts
echo 216.58.192.42 safebrowsing.googleapis.com>>hosts
echo 216.58.192.42 encrypted-tbn0.gstatic.com>>hosts
echo 216.58.192.42 beacons.gcp.gvt2.com>>hosts
echo 216.58.192.42 clients4.google.co.kr>>hosts
echo 216.58.192.42 mwultong.blogspot.com>>hosts
echo 216.58.192.42 fonts.google.com>>hosts
echo 216.58.192.42 ajax.googleapis.com>>hosts
echo 216.58.192.42 www.googleadservices.com>>hosts
echo 216.58.192.42 googleadservices.com>>hosts
echo 216.58.192.42 www.google-analytics.com>>hosts
echo 216.58.192.42 google-analytics.com>>hosts
echo 216.58.192.42 gstatic.com>>hosts
echo 216.58.192.42 www.gstatic.com>>hosts
echo 216.58.192.42 ssl.gstatic.com>>hosts
echo 216.58.192.42 myaccount.google.com>>hosts
echo 216.58.192.42 passwords.google.com>>hosts
echo 216.58.192.42 ogs.google.com>>hosts
echo 216.58.192.42 apis.google.com>>hosts
echo 216.58.192.42 clients.l.google.com>>hosts
echo 216.58.192.42 client1.google.com>>hosts
echo 216.58.192.42 client2.google.com>>hosts
echo 216.58.192.42 client3.google.com>>hosts
echo 216.58.192.42 client4.google.com>>hosts
echo 216.58.192.42 client5.google.com>>hosts
echo 216.58.192.42 client6.google.com>>hosts
echo 216.58.192.42 clients1.google.com>>hosts
echo 216.58.192.42 clients2.google.com>>hosts
echo 216.58.192.42 clients3.google.com>>hosts
echo 216.58.192.42 clients4.google.com>>hosts
echo 216.58.192.42 clients5.google.com>>hosts
echo 216.58.192.42 clients6.google.com>>hosts
echo 216.58.192.42 googlehosted.l.googleusercontent.com>>hosts
echo 216.58.192.42 clients1.googleusercontent.com>>hosts
echo 216.58.192.42 clients2.googleusercontent.com>>hosts
echo 216.58.192.42 clients3.googleusercontent.com>>hosts
echo 216.58.192.42 clients4.googleusercontent.com>>hosts
echo 216.58.192.42 clients5.googleusercontent.com>>hosts
echo 216.58.192.42 clients6.googleusercontent.com>>hosts
echo 216.58.192.42 ih1.googleusercontent.com>>hosts
echo 216.58.192.42 ih2.googleusercontent.com>>hosts
echo 216.58.192.42 ih3.googleusercontent.com>>hosts
echo 216.58.192.42 ih4.googleusercontent.com>>hosts
echo 216.58.192.42 ih5.googleusercontent.com>>hosts
echo 216.58.192.42 ih6.googleusercontent.com>>hosts
echo 216.58.192.42 notifications.google.com>>hosts
echo 216.58.192.42 chrome-devtools-frontend.appspot.com>>hosts
echo 216.58.192.42 googleapis.l.google.com>>hosts
echo 216.58.192.42 www.googleapis.com>>hosts
echo 216.58.192.42 ssl.google-analytics.com>>hosts
echo 216.58.192.42 plus.google.com>>hosts
echo 216.58.192.42 books.google.com>>hosts
echo 216.58.192.42 books.google.co.kr>>hosts
echo 216.58.192.42 maps.googleapis.com>>hosts
echo 216.58.192.42 lh1.googleusercontent.com>>hosts
echo 216.58.192.42 lh2.googleusercontent.com>>hosts
echo 216.58.192.42 lh3.googleusercontent.com>>hosts
echo 216.58.192.42 lh4.googleusercontent.com>>hosts
echo 216.58.192.42 lh5.googleusercontent.com>>hosts
echo 216.58.192.42 lh6.googleusercontent.com>>hosts
echo 216.58.192.42 maps.gstatic.com>>hosts
echo 216.58.192.42 incrementalwebfonts-pa.googleapis.com>>hosts
echo 216.58.192.42 hangouts.google.com>>hosts
echo 216.58.192.42 accounts.google.com.sg>>hosts

rem google career
echo 216.58.192.42 careers.google.com>>hosts
echo 216.58.192.42 withgoogle.com>>hosts
echo 216.58.192.42 summerofcode.withgoogle.com>>hosts

rem google drive
echo 216.58.192.42 drive-thirdparty.googleusercontent.com>>hosts
echo 216.58.192.42 doc-0g-2k-apps-viewer.googleusercontent.com>>hosts
echo 216.58.192.42 doc-0c-7o-docs.googleusercontent.com>>hosts
echo 216.58.192.42 www-ritzmove-opensocial.googleusercontent.com>>hosts

rem google drive download
for %%A in (a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9) do (
  for %%B in (a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9) do (
    for %%C in (a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9) do (
      for %%D in (a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9) do (
        216.58.192.42 doc-%A%%B%-%C%%D%-docs.googleusercontent.com>>hosts
        216.58.192.42 doc-%A%%B%-%C%%D%-drive-data-export.googleusercontent.com>>hosts
  ) 
  )
  )
)

rem google upload
echo 216.58.192.42 upload.docs.google.com>>hosts
echo 216.58.192.42 googleusercontent.com>>hosts
echo 216.58.192.42 www-onepick-opensocial.googleusercontent.com>>hosts
echo 216.58.192.42 www-fileupload-opensocial.googleusercontent.com>>hosts

rem gmail
echo 216.58.192.42 googleusercontent.com>>hosts
echo 216.58.192.42 mail-attachment.googleusercontent.com>>hosts

rem google calendar
echo 216.58.192.42 calendar.google.com>>hosts
echo 216.58.192.42 calendar-pa.clients6.google.com>>hosts

rem firebase
echo 216.58.192.42 cloud.google.com>>hosts
echo 216.58.192.42 console.firebase.google.com>>hosts
echo 216.58.192.42 firebase.google.com>>hosts

rem firebase dependencies
echo 216.58.192.42 cloudusersettings-pa.clients1.google.com>>hosts
echo 216.58.192.42 cloudusersettings-pa.clients2.google.com>>hosts
echo 216.58.192.42 cloudusersettings-pa.clients3.google.com>>hosts
echo 216.58.192.42 cloudusersettings-pa.clients4.google.com>>hosts
echo 216.58.192.42 cloudusersettings-pa.clients5.google.com>>hosts
echo 216.58.192.42 cloudusersettings-pa.clients6.google.com>>hosts
echo 216.58.192.42 appengine.clients1.google.com>>hosts
echo 216.58.192.42 appengine.clients2.google.com>>hosts
echo 216.58.192.42 appengine.clients3.google.com>>hosts
echo 216.58.192.42 appengine.clients4.google.com>>hosts
echo 216.58.192.42 appengine.clients5.google.com>>hosts
echo 216.58.192.42 appengine.clients6.google.com>>hosts
echo 216.58.192.42 servicemanagement.clients1.google.com>>hosts
echo 216.58.192.42 servicemanagement.clients2.google.com>>hosts
echo 216.58.192.42 servicemanagement.clients3.google.com>>hosts
echo 216.58.192.42 servicemanagement.clients4.google.com>>hosts
echo 216.58.192.42 servicemanagement.clients5.google.com>>hosts
echo 216.58.192.42 servicemanagement.clients6.google.com>>hosts
echo 216.58.192.42 cloudfunctions.clients1.google.com>>hosts
echo 216.58.192.42 cloudfunctions.clients2.google.com>>hosts
echo 216.58.192.42 cloudfunctions.clients3.google.com>>hosts
echo 216.58.192.42 cloudfunctions.clients4.google.com>>hosts
echo 216.58.192.42 cloudfunctions.clients5.google.com>>hosts
echo 216.58.192.42 cloudfunctions.clients6.google.com>>hosts
echo 216.58.192.42 cloudscheduler.clients1.google.com>>hosts
echo 216.58.192.42 cloudscheduler.clients2.google.com>>hosts
echo 216.58.192.42 cloudscheduler.clients3.google.com>>hosts
echo 216.58.192.42 cloudscheduler.clients4.google.com>>hosts
echo 216.58.192.42 cloudscheduler.clients5.google.com>>hosts
echo 216.58.192.42 cloudscheduler.clients6.google.com>>hosts
echo 216.58.192.42 mobilesdk-pa.clients1.google.com>>hosts
echo 216.58.192.42 mobilesdk-pa.clients2.google.com>>hosts
echo 216.58.192.42 mobilesdk-pa.clients3.google.com>>hosts
echo 216.58.192.42 mobilesdk-pa.clients4.google.com>>hosts
echo 216.58.192.42 mobilesdk-pa.clients5.google.com>>hosts
echo 216.58.192.42 mobilesdk-pa.clients6.google.com>>hosts
echo 216.58.192.42 monitoring.clients1.google.com>>hosts
echo 216.58.192.42 monitoring.clients2.google.com>>hosts
echo 216.58.192.42 monitoring.clients3.google.com>>hosts
echo 216.58.192.42 monitoring.clients4.google.com>>hosts
echo 216.58.192.42 monitoring.clients5.google.com>>hosts
echo 216.58.192.42 monitoring.clients6.google.com>>hosts
echo 216.58.192.42 mobilecrashreporting.clients1.google.com>>hosts
echo 216.58.192.42 mobilecrashreporting.clients2.google.com>>hosts
echo 216.58.192.42 mobilecrashreporting.clients3.google.com>>hosts
echo 216.58.192.42 mobilecrashreporting.clients4.google.com>>hosts
echo 216.58.192.42 mobilecrashreporting.clients5.google.com>>hosts
echo 216.58.192.42 mobilecrashreporting.clients6.google.com>>hosts
echo 216.58.192.42 cloudresourcemanager.clients1.google.com>>hosts
echo 216.58.192.42 cloudresourcemanager.clients2.google.com>>hosts
echo 216.58.192.42 cloudresourcemanager.clients3.google.com>>hosts
echo 216.58.192.42 cloudresourcemanager.clients4.google.com>>hosts
echo 216.58.192.42 cloudresourcemanager.clients5.google.com>>hosts
echo 216.58.192.42 cloudresourcemanager.clients6.google.com>>hosts
echo 216.58.192.42 iam.clients1.google.com>>hosts
echo 216.58.192.42 iam.clients2.google.com>>hosts
echo 216.58.192.42 iam.clients3.google.com>>hosts
echo 216.58.192.42 iam.clients4.google.com>>hosts
echo 216.58.192.42 iam.clients5.google.com>>hosts
echo 216.58.192.42 iam.clients6.google.com>>hosts
echo 216.58.192.42 firebasestorage.clients1.google.com>>hosts
echo 216.58.192.42 firebasestorage.clients2.google.com>>hosts
echo 216.58.192.42 firebasestorage.clients3.google.com>>hosts
echo 216.58.192.42 firebasestorage.clients4.google.com>>hosts
echo 216.58.192.42 firebasestorage.clients5.google.com>>hosts
echo 216.58.192.42 firebasestorage.clients6.google.com>>hosts
echo 216.58.192.42 firebaserules.clients1.google.com>>hosts
echo 216.58.192.42 firebaserules.clients2.google.com>>hosts
echo 216.58.192.42 firebaserules.clients3.google.com>>hosts
echo 216.58.192.42 firebaserules.clients4.google.com>>hosts
echo 216.58.192.42 firebaserules.clients5.google.com>>hosts
echo 216.58.192.42 firebaserules.clients6.google.com>>hosts
echo 216.58.192.42 firestore.clients1.google.com>>hosts
echo 216.58.192.42 firestore.clients2.google.com>>hosts
echo 216.58.192.42 firestore.clients3.google.com>>hosts
echo 216.58.192.42 firestore.clients4.google.com>>hosts
echo 216.58.192.42 firestore.clients5.google.com>>hosts
echo 216.58.192.42 firestore.clients6.google.com>>hosts
echo 216.58.192.42 firebase.clients1.google.com>>hosts
echo 216.58.192.42 firebase.clients2.google.com>>hosts
echo 216.58.192.42 firebase.clients3.google.com>>hosts
echo 216.58.192.42 firebase.clients4.google.com>>hosts
echo 216.58.192.42 firebase.clients5.google.com>>hosts
echo 216.58.192.42 firebase.clients6.google.com>>hosts
echo 216.58.192.42 firebasestorage.googleapis.com>>hosts

rem google cloud console dependencies
echo 216.58.192.42 console.cloud.google.com>>hosts
echo 216.58.192.42 cloudusersettings-pa.clients6.google.com>>hosts
echo 216.58.192.42 ssh.cloud.google.com>>hosts
echo 216.58.192.42 cloudconsole-pa.clients6.google.com>>hosts
echo 216.58.192.42 apikeys.clients6.google.com>>hosts
echo 216.58.192.42 googleads.g.doubleclick.net>>hosts
echo 216.58.192.42 clientauthconfig.clients6.google.com>>hosts
echo 216.58.192.42 identitytoolkit.clients6.google.com>>hosts
echo 216.58.192.42 csp.withgoogle.com>>hosts

rem other google dependencies
echo 216.58.192.42 cm.g.doubleclick.net>>hosts
echo 216.58.192.42 googleads.g.doubleclick.net>>hosts
echo 216.58.192.42 pagead2.googlesyndication.com>>hosts

rem airbnb dependencies
echo 216.58.192.42 googleads.g.doubleclick.net>>hosts
echo 216.58.192.42 4620401.fls.doubleclick.net>>hosts
echo 216.58.192.42 cm.g.doubleclick.net>>hosts

rem youtube dns
echo 216.58.192.42 www.youtube.com>>hosts
echo 216.58.192.42 www.youtube.co.kr>>hosts
echo 216.58.192.42 youtube.com>>hosts
echo 216.58.192.42 youtu.be>>hosts
echo 216.58.192.42 youtube.co.kr>>hosts
echo 216.58.192.42 accounts.youtube.com>>hosts
echo 216.58.192.42 studio.youtube.com>>hosts
echo 216.58.192.42 tv.youtube.com>>hosts
echo 216.58.192.42 music.youtube.com>>hosts
echo 216.58.192.42 gaming.youtube.com>>hosts
echo 216.58.192.42 kids.youtube.com>>hosts
echo 216.58.192.42 s.ytimg.com>>hosts
echo 216.58.192.42 i.ytimg.com>>hosts
echo 216.58.192.42 i9.ytimg.com>>hosts
echo 216.58.192.42 yt3.ggpht.com>>hosts
echo 216.58.192.42 lh3.googleusercontent.com>>hosts
echo 117.18.237.70 abs.twimg.com>>hosts
echo 117.18.237.70 pbs.twimg.com>>hosts
echo 117.18.232.102 video.twimg.com>>hosts

rem others
echo 216.58.192.42 browser-update.org>>hosts
echo 216.58.192.42 imasdk.googleapis.com>>hosts

rem mongodb atlas
echo 216.58.192.42 bizible.com>>hosts
echo 216.58.192.42 cdn.bizible.com>>hosts
echo 216.58.192.42 www.recaptcha.net>>hosts

@echo OFF

cd C:\Windows\System32

echo.
echo patch complete

ping 127.0.0.1 -n 2 >nul

start chrome --incognito "https://www.mozilla.org/ko/firefox/new/"
start chrome --incognito "https://www.google.com/search?q=seoul+weather&oq=seoul+weather&aqs=chrome..69i57.1919j0j1&sourceid=chrome&ie=UTF-8"

(goto) 2>nul & del "%~f0"