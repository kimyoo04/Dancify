export const getFullScreen = () => {
  if (document.documentElement.requestFullscreen) return document.documentElement.requestFullscreen();
  if (document.documentElement.webkitRequestFullscreen) return document.documentElement.webkitRequestFullscreen();
  if (document.documentElement.mozRequestFullScreen) return document.documentElement.mozRequestFullScreen();
  if (document.documentElement.msRequestFullscreen) return document.documentElement.msRequestFullscreen();
};

export const exitFullScreen = () => {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitCancelFullscreen) return document.webkitCancelFullscreen();
  if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
  if (document.msExitFullscreen) return document.msExitFullscreen();
};
