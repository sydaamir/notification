import { useState } from "react";
import {
  Grid,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Box,
  makeStyles,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_NOTIFICATION } from "../../redux/types";

const styles = makeStyles((theme) => ({
  appBarBackground: {
    backgroundColor: "#555",
  },
  errorBox: {
    border: "solid 1px red",
    marginTop: "2rem",
    width: "30vw",
    textAlign: "center",
    background: "#FF9494",
    borderRadius: "10px",
  },
  successBox: {
    border: "solid 1px #4BB543",
    marginTop: "2rem",
    width: "30vw",
    textAlign: "center",
    background: "#4BB543",
    borderRadius: "10px",
  },
}));
const Header = () => {
  const storedNotifications = useSelector(
    (state) => state.HandleNotification.notification
  );
  const classes = styles();
  const dispatch = useDispatch();

  const updateStore = (type, payload, defaultData) => {
    dispatch({
      type: type,
      payload: payload ? payload : defaultData,
    });
  };
  const [notificationNotFound, setNotificationNotFound] = useState(false);
  const [notificationRemoved, setNotificationRemoved] = useState(false);

  const hideNotification = (name = "") => {
    const notification = storedNotifications.find(
      (notification) => notification.notif.body === name
    );
    if (notification) {
      notification.notif.closeNotification();
      const leftNotifications = storedNotifications.filter(
        (item) => item.notif.id !== notification.notif.id
      );
      updateStore(REMOVE_NOTIFICATION, leftNotifications);
      setNotificationRemoved(true);
      setTimeout(() => {
        setNotificationRemoved(false);
      }, 2500);
    } else {
      setNotificationNotFound(true);
      setTimeout(() => {
        setNotificationNotFound(false);
      }, 2500);
    }
  };
  return (
    <>
      <AppBar position="static" className={classes.appBarBackground}>
        <Toolbar variant="dense">
          <Grid container spacing={2}>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => hideNotification("success")}
              >
                <Typography variant="caption">HIDE SUCCESS</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => hideNotification("error")}
              >
                <Typography variant="caption">HIDE ERROR</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => hideNotification("warning")}
              >
                <Typography variant="caption">HIDE WARNING</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => hideNotification("info")}
              >
                <Typography variant="caption">HIDE INFO</Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => hideNotification()}
              >
                <Typography variant="caption">HIDE UNSTYLED</Typography>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {notificationNotFound ? (
        <Box align="center">
          <Box className={classes.errorBox}>
            <Typography variant="h6">Notification Not found!!!</Typography>
          </Box>
        </Box>
      ) : null}
      {notificationRemoved ? (
        <Box align="center">
          <Box className={classes.successBox}>
            <Typography variant="h6">Notification Removed...</Typography>
          </Box>
        </Box>
      ) : null}
    </>
  );
};
export default Header;
