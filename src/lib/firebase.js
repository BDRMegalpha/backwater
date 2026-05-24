// Firebase is loaded lazily so ad-blockers blocking firestore.googleapis.com
// don't crash the page on load. Mirrors the carbon-forge pattern.

const firebaseConfig = {
  apiKey: 'AIzaSyDzSVOCj7EH02yWXzhjq29zonA6BOTiQmI',
  authDomain: 'bdrmega-hub.firebaseapp.com',
  projectId: 'bdrmega-hub',
  storageBucket: 'bdrmega-hub.firebasestorage.app',
  messagingSenderId: '105622361048',
  appId: '1:105622361048:web:81f67344da3cebe53518ad',
};

let appPromise;

export async function getApp() {
  if (!appPromise) {
    appPromise = (async () => {
      const { initializeApp, getApps } = await import('firebase/app');
      const existing = getApps();
      return existing.length ? existing[0] : initializeApp(firebaseConfig);
    })();
  }
  return appPromise;
}

export async function getDb() {
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore(await getApp());
}
