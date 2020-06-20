import React from "react";
import { IStorageDish } from "../../../../types";
import StorageDish from "./StorageDish";
import { Typography, makeStyles, createStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyle = makeStyles((theme) =>
  createStyles({
    storageCourse: { margin: theme.spacing(5, 0) },
  })
);

interface IStorageCourseProps {
  storageDishes: IStorageDish[];
  courseName: string;
}

const StorageCourse: React.FunctionComponent<IStorageCourseProps> = ({
  storageDishes,
  courseName,
}) => {
  const classes = useStyle();
  return (
    <div className={classes.storageCourse}>
      <Typography color="primary" variant="h5">
        {courseName}
      </Typography>
      {storageDishes.map((dish, i) => (
        <div key={dish.name}>
          <StorageDish storageDish={dish} />
          {i === storageDishes.length - 1 ? null : <Divider />}
        </div>
      ))}
    </div>
  );
};

export default StorageCourse;
