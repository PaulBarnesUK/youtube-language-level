import React from 'react';
import { createRoot } from 'react-dom/client';
import { DifficultyIndicator } from '../../../components/DifficultyIndicator';
import { VideoFullData } from '../../../types';

/**
 * Finds all thumbnails for a specific video ID
 */
export function findThumbnailsForVideoId(videoId: string): HTMLElement[] {
  const thumbnails = document.querySelectorAll(`a[href*="${videoId}"] img`);
  return Array.from(thumbnails)
    .map(img => img.closest('a') as HTMLElement)
    .filter(element => {
      if (!element) return false;

      const isVideoPreview = element.closest('ytd-video-preview');

      return !isVideoPreview;
    });
}

/**
 * Determines if a video should have a difficulty indicator displayed
 */
export function shouldDisplayIndicator(videoData: VideoFullData): boolean {
  return (
    videoData.difficulty.score > 0 &&
    (videoData.difficulty.confidence > 0.5 || videoData.bypassSigmaCheck)
  );
}

/**
 * Creates a container for the difficulty indicator
 */
export function createIndicatorContainer(thumbnail: HTMLElement): HTMLDivElement | null {
  if (thumbnail.getAttribute('data-difficulty-indicator')) return null;

  const container = document.createElement('div');
  container.className = 'difficulty-indicator-container';

  const parent = thumbnail.parentElement;
  if (!parent) return null;

  parent.insertBefore(container, thumbnail);
  container.appendChild(thumbnail);

  return container;
}

/**
 * Renders the difficulty indicator component
 */
export function renderIndicator(mountPoint: HTMLElement, videoData: VideoFullData): void {
  const root = createRoot(mountPoint);

  if (!videoData.language) {
    return;
  }

  root.render(
    React.createElement(DifficultyIndicator, {
      score: videoData.difficulty.score,
      language: videoData.language.primary
    })
  );
}

/**
 * Marks a thumbnail as having an indicator
 */
export function markThumbnailWithIndicator(thumbnail: HTMLElement): void {
  thumbnail.setAttribute('data-difficulty-indicator', 'true');
}

/**
 * Injects a difficulty indicator into a thumbnail
 */
export function injectIndicator(thumbnail: HTMLElement, videoData: VideoFullData): void {
  const container = createIndicatorContainer(thumbnail);
  if (!container) return;

  const mountPoint = document.createElement('div');
  container.appendChild(mountPoint);

  renderIndicator(mountPoint, videoData);
  markThumbnailWithIndicator(thumbnail);
}

/**
 * Cleans up all difficulty indicators from the page
 * This reverses the changes made by injectIndicator
 */
export function cleanAllIndicators(): void {
  const containers = document.querySelectorAll('.difficulty-indicator-container');

  if (containers.length === 0) {
    return;
  }

  containers.forEach(container => {
    const thumbnail = container.querySelector('a');

    if (thumbnail && container.parentElement) {
      thumbnail.removeAttribute('data-difficulty-indicator');
      container.parentElement.insertBefore(thumbnail, container);
      container.remove();
    }
  });
}
