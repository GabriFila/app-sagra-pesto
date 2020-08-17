import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const disableUIOnCondition = (
  condition: boolean,
  preventTouch: boolean
): CSSProperties =>
  condition
    ? { pointerEvents: preventTouch ? 'none' : 'auto', opacity: '50%' }
    : {};
