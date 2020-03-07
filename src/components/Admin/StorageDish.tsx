import React, { useContext, useState } from 'react';
import { IStorageDish } from '../../../types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { StorageContext } from '../../context/StorageContext';
import CheckIcon from '@material-ui/icons/Check';

interface IStorageDishProps {
  storageDish: IStorageDish;
  startingDishQt: number | undefined;
}

const StorageDish: React.FunctionComponent<IStorageDishProps> = ({
  storageDish,
  startingDishQt
}) => {
  const { name, price, storageQt, shortName, isInMenu } = storageDish;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  console.log(isMobile);

  const { storageCourses, storageRef } = useContext(StorageContext);

  const [editing, setEditing] = useState(false);
  const [inputPrice, setInputPrice] = useState(price);
  const [inputQt, setInputQt] = useState(storageQt);

  const changeInMenu = () => {
    storageCourses
      .find(course => course.dishes.some(dish => dish.name === name))
      .dishes.find(dish => dish.name === name).isInMenu = !isInMenu;

    storageRef.set({ storageCourses });
  };

  const setQtAndPrice = () => {
    console.log('qt', inputQt);
    storageCourses
      .find(course => course.dishes.some(dish => dish.name === name))
      .dishes.find(dish => dish.name === name).price = inputPrice;
    storageCourses
      .find(course => course.dishes.some(dish => dish.name === name))
      .dishes.find(dish => dish.name === name).storageQt = inputQt;
    console.log('courses', storageCourses);

    storageRef.set({ storageCourses });
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
      {editing ? (
        <TextField
          size="small"
          style={{ flex: 2 }}
          inputProps={{ min: 0, style: { textAlign: 'center' } }}
          value={inputQt}
          variant="outlined"
          onChange={e => setInputQt(Number(e.target.value))}
        />
      ) : (
        <Typography align="center" variant="body1" style={{ flex: 2 }}>
          {storageQt}
        </Typography>
      )}
      <Divider orientation="vertical" />
      {editing ? (
        <TextField
          size="small"
          style={{ flex: 2 }}
          inputProps={{ min: 0, style: { textAlign: 'center' } }}
          value={inputPrice}
          variant="outlined"
          onChange={e => setInputPrice(Number(e.target.value))}
        />
      ) : (
        <Typography align="center" variant="body1" style={{ flex: 2 }}>
          € {price}
        </Typography>
      )}
      <Divider orientation="vertical" />
      {startingDishQt ? (
        <Typography
          align="center"
          variant="body1"
          color="primary"
          style={{ flex: 2 }}
        >
          {startingDishQt - storageQt}
        </Typography>
      ) : null}
      <Divider orientation="vertical" />
      {editing ? (
        <CheckIcon
          alignmentBaseline="text-after-edge"
          color="secondary"
          style={{ flex: 2 }}
          onClick={() => {
            setEditing(!editing);
            setQtAndPrice();
          }}
        />
      ) : (
        <EditIcon
          alignmentBaseline="text-after-edge"
          color="secondary"
          style={{ flex: 2 }}
          onClick={() => setEditing(!editing)}
        />
      )}
      <Checkbox style={{ flex: 1 }} checked={isInMenu} onClick={changeInMenu} />
    </div>
  );
};

export default StorageDish;
