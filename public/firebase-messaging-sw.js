importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
import envJSON from '../env.json';

function onBackgroundMessage() {
  
  firebase.initializeApp({
    apiKey: envJSON.apiKey,
    authDomain: envJSON.authDomain,
    projectId: envJSON.projectId,
    storageBucket: envJSON.storageBucket,
    messagingSenderId: envJSON.messagingSenderId,
    appId: envJSON.appId,
    measurementId: envJSON.measurementId
  });
  const messaging = firebase.messaging();
  self.addEventListener('notificationclick', event => {
    var status = event.notification.data
    event.notification.close();
    event.waitUntil(
      clients
        .matchAll({
          type: 'window'
        })
        .then(clientList => {
          for (let i = 0; i < clientList.length; i++) {
            if (client.url === `/maintenance?status=${status}` && 'focus' in client) return client.focus();
          }
          if (clients.openWindow) return clients.openWindow('/maintenance?status=' + status);
        })
    );
  });
  
  messaging.setBackgroundMessageHandler( async (payload) => {
    const notification = payload.data;
    if (!notification) {  console.warn('[firebase-messaging-sw.js] Unknown notification on message ', payload);
      return
    }
    var status =  JSON.parse(notification.body).status;
    var body = JSON.parse(notification.body).message;
    var title =  notification.title;
    var icon = '/logo_stock_black1.png';

    self.registration.showNotification( title, { body: body, icon, data:  status } );

  });

}

onBackgroundMessage();