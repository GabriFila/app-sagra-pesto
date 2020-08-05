import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const disableUIOnCondition = (
  condition: boolean,
  alsoTouch: boolean
): CSSProperties =>
  condition
    ? { pointerEvents: alsoTouch ? 'none' : 'auto', opacity: '50%' }
    : {};
