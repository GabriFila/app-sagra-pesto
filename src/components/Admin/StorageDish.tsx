import React, { useContext } from 'react';
import { IStorageDish } from '../../../types';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import getCurrentStorageRef from '../../helpers/getStorageRef';
import { StorageContext } from '../../context/StorageContext';

interface IStorageDishProps {
  storageDish: IStorageDish;
  startingDishQt: number;
}

const StorageDish: React.FunctionComponent<IStorageDishProps> = ({
  storageDish,
  startingDishQt
}) => {
  const { name, price, storageQt, shortName, isInMenu } = storageDish;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { storageCourses } = useContext(StorageContext);

  const changeInMenu = () => {
    storageCourses
      .find(course => course.dishes.some(dish => dish.name === name))
      .dishes.find(dish => dish.name === name).isInMenu = !isInMenu;

    getCurrentStorageRef().set({ storageCourses });
  };
  return (
    <div
      style={{
        marginLeft: isMobile ? 5 : 20,
        display: 'flex',
        height: 40,
        alignItems: 'center'
      }}
    >
      <Typography variant="body1" style={{ flex: 4 }}>
        {isMobile ? shortName : name}
      </Typography>
      <Divider orientation="vertical" />
      <Typography align="center" variant="body1" style={{ flex: 2 }}>
        {345}
      </Typography>
      <Divider orientation="vertical" />
      <Typography align="center" variant="body1" style={{ flex: 2 }}>
        € {price}
      </Typography>
      <Divider orientation="vertical" />
      <Typography align="center" variant="body1" style={{ flex: 2 }}>
        {storageQt}
      </Typography>
      <Divider orientation="vertical" />
      <EditIcon
        alignmentBaseline="text-after-edge"
        color="secondary"
        style={{ flex: 2 }}
      />
      <Checkbox style={{ flex: 1 }} checked={isInMenu} onClick={changeInMenu} />
    </div>
  );
};

export default StorageDish;
