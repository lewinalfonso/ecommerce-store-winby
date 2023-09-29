import { keyframes } from 'styled-components'

export const animFirst = keyframes`
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`
export const animFadeInDown = keyframes`
   from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`
export const animFadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`
export const fadeIn = keyframes `
from {
  opacity: 0;
}

to {
  opacity: 1;
}
`
export const fadeCenter = keyframes`
from {
  transform-origin: center;
  transform: scaleX(1);
}
`