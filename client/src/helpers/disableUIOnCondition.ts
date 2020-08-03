import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const disableUIOnCondition = (condition: boolean): CSSProperties =>
  condition ? { pointerEvents: 'none', opacity: '50%' } : {};
