// const url = new URL(window.location.href);
const searchParams = new URLSearchParams(window.location.href.split("?")[1]);
const accessToken = searchParams.get('access_token');
window.postMessage(accessToken);

