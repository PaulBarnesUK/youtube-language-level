export function getVideoElement(): HTMLVideoElement | null {
  return document.querySelector('.html5-video-player video.html5-main-video');
}

export function getTitleElement(): HTMLElement | null {
  return document.querySelector('h1.ytd-watch-metadata');
}

export function getChannelElement(): HTMLElement | null {
  return document.querySelector('#channel-name #text');
}

export function getVideoTitle(): string | null {
  const titleElement = getTitleElement();
  return titleElement?.textContent?.trim() || null;
}

export function getChannelName(): string | null {
  const channelElement = getChannelElement();
  return channelElement?.textContent?.trim() || null;
}
