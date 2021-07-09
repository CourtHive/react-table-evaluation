import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { TMXBaseInput } from './TMXBaseInput';

export const useStyles = makeStyles((theme) => ({
  selector: {
    background: theme.palette.background.paper,
    '&:hover': {
      borderColor: '#fff'
    }
  }
}));

const TMXSelect = ({ children, ...props }) => {
  const classes = useStyles();
  const renderIcon = (props) => <ExpandMoreIcon {...props} fontSize="small" style={{ top: 'unset' }} />;
  return (
    <Select
      className={`${classes.selector}${props.className && ` ${props.className}`}`}
      input={<TMXBaseInput />}
      IconComponent={renderIcon}
      {...props}
    >
      {children}
    </Select>
  );
};

export default TMXSelect;
