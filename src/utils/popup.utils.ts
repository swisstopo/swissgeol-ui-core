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
  let positionOverwrite: SgcPopupPosition | null = null;
  let alignOverwrite: SgcPopupAlignment | null = null;

  const popup = options.popup.getBoundingClientRect();

  const isLeftOverflowing = popup.x < 0;
  const isRightOverflowing = popup.x + popup.width > window.innerWidth;
  const isTopOverflowing = popup.y < 0;
  const isBottomOverflowing = popup.y + popup.height > window.innerHeight;

  switch (options.position) {
    case 'top':
      if (isTopOverflowing) {
        positionOverwrite = 'bottom';
      }
      break;
    case 'bottom':
      if (isBottomOverflowing) {
        positionOverwrite = 'top';
      }
      break;
    case 'left':
      if (isLeftOverflowing) {
        positionOverwrite = 'right';
      }
      break;
    case 'right':
      if (isRightOverflowing) {
        positionOverwrite = 'left';
      }
      break;
  }
  switch (options.align) {
    case 'start':
      if (isRightOverflowing) {
        alignOverwrite = 'end';
      }
      break;
    case 'end':
      if (isLeftOverflowing) {
        alignOverwrite = 'start';
      }
      break;
    case 'center':
      if (isRightOverflowing) {
        alignOverwrite = 'end';
      } else if (isLeftOverflowing) {
        alignOverwrite = 'start';
      }
      break;
  }

  if (positionOverwrite !== null || alignOverwrite !== null) {
    updatePopupPosition({
      ...options,
      position: positionOverwrite ?? options.position,
      align: alignOverwrite ?? options.align,
      shouldCheckOutOfBounds: false,
    });
  }
};
export type SgcPopupPosition = 'top' | 'bottom' | 'left' | 'right';

export type SgcPopupAlignment = 'start' | 'end' | 'center';
