const FIXED_OFFSET_PX = 4;

interface PopupPositionUpdateOptions {
  target: HTMLElement;
  popup: HTMLElement;
  position: SgcPopupPosition;
  align: SgcPopupAlignment;
  shouldCheckOutOfBounds?: boolean;
}

export const updatePopupPosition = (
  options: PopupPositionUpdateOptions,
): void => {
  const { position, align } = options;

  const target = options.target.getBoundingClientRect();
  const popup = options.popup.getBoundingClientRect();

  const popupStyle = options.popup.style;

  popupStyle.top = '';
  popupStyle.bottom = '';
  popupStyle.left = '';
  popupStyle.right = '';

  // Update x axis
  switch (position) {
    case 'top':
    case 'bottom':
      switch (align) {
        case 'center':
          popupStyle.left = `${target.x + target.width * 0.5 - popup.width * 0.5}px`;
          break;
        case 'start':
          popupStyle.left = `${target.x}px`;
          break;
        case 'end':
          popupStyle.left = `${target.x + target.width - popup.width}px`;
          break;
      }
      break;
    case 'left':
      popupStyle.left = `${target.x - popup.width - FIXED_OFFSET_PX}px`;
      break;
    case 'right':
      popupStyle.left = `${target.x + target.width + FIXED_OFFSET_PX}px`;
      break;
  }

  // Update y axis
  switch (position) {
    case 'top':
      popupStyle.bottom = `${window.innerHeight - target.y + FIXED_OFFSET_PX}px`;
      break;
    case 'bottom':
      popupStyle.top = `${target.y + target.height + FIXED_OFFSET_PX}px`;
      break;
    case 'left':
    case 'right':
      switch (align) {
        case 'center':
          popupStyle.top = `${target.y + target.height * 0.5 - popup.height * 0.5}px`;
          break;
        case 'start':
          popupStyle.top = `${target.y}px`;
          break;
        case 'end':
          popupStyle.bottom = `${window.innerHeight - target.y - target.height}px`;
          break;
      }
      break;
  }

  if (options.shouldCheckOutOfBounds) {
    adjustPositionToViewport(options);
  }
};

const adjustPositionToViewport = (
  options: PopupPositionUpdateOptions,
): void => {
  const update = (position: SgcPopupPosition): void =>
    updatePopupPosition({
      ...options,
      position,
      shouldCheckOutOfBounds: false,
    });

  const popup = options.popup.getBoundingClientRect();
  switch (options.position) {
    case 'top':
      if (popup.y < 0) {
        update('bottom');
      }
      break;
    case 'bottom':
      if (popup.y + popup.height > window.innerHeight) {
        update('top');
      }
      break;
    case 'left':
      if (popup.x < 0) {
        update('right');
      }
      break;
    case 'right':
      if (popup.x + popup.width > window.innerWidth) {
        update('left');
      }
      break;
  }
};
export type SgcPopupPosition = 'top' | 'bottom' | 'left' | 'right';

export type SgcPopupAlignment = 'start' | 'end' | 'center';
