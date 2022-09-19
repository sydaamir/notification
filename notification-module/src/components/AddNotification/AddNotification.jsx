import { TextField, Box, Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { ADD_NOTIFIATION } from "../../redux/types";
const VariantValues = {
  success: "00FF00",
  error: "FF0000",
  info: "0000FF",
  unstyled: "000000",
  warning: "FFFF00",
};
const AddNotification = () => {
  const dispatch = useDispatch();

  const updateStore = (type, payload, defaultData) => {
    dispatch({
      type: type,
      payload: payload ? payload : defaultData,
    });
  };
  const [inputValues, setInputValues] = useState({
    notification: "",
    variant: "",
    timeout: "",
  });
  const styles = {
    boxMargin: {
      marginTop: "5rem",
      marginLeft: "3rem",
      marginRight: "3rem",
    },
    gap: {
      marginTop: "1rem",
    },
  };
  const checkIsDisabled = !inputValues.notification;

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    const selectedVariant = inputValues.variant.toLowerCase();
    let applyVariant = VariantValues[selectedVariant];
    if (!applyVariant) {
      applyVariant = "";
    }
    const dts = inputValues.timeout;
    const options = {
      body: inputValues.variant.toLowerCase(),
      timestamp: dts,
      icon: applyVariant
        ? `https://singlecolorimage.com/get/${applyVariant}/100x100`
        : "",
    };
    let notif;
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        notif = new Notification(inputValues.notification, options);
      }
      if (inputValues.timeout) {
        setTimeout(() => {
          notif.close();
        }, inputValues.timeout);
      }
      notif.closeNotification = notif.close;
      notif.id = Math.random();
      const addNotification = { notif };
      updateStore(ADD_NOTIFIATION, addNotification, {});
    });
    setInputValues({
      notification: "",
      variant: "",
      timeout: "",
    });
  };
  return (
    <Box style={styles.boxMargin}>
      <TextField
        name="notification"
        fullWidth
        label="NOTIFICATION"
        id="fullWidth"
        required
        onChange={handleChange}
        placeholder="Enter the notification here..."
        InputProps={{
          startAdornment: <></>,
        }}
        value={inputValues.notification}
      />
      <Box style={styles.gap}></Box>
      <TextField
        name="variant"
        fullWidth
        label="VARIANT"
        id="fullWidth"
        onChange={handleChange}
        placeholder="Enter the variant here..."
        InputProps={{
          startAdornment: <></>,
        }}
        value={inputValues.variant}
      />
      <Box style={styles.gap}></Box>
      <TextField
        type="number"
        name="timeout"
        fullWidth
        label="TIMEOUT"
        id="fullWidth"
        onChange={handleChange}
        placeholder="Enter the time here in milli seconds"
        InputProps={{
          startAdornment: <></>,
        }}
        value={inputValues.timeout}
      />
      <Box style={styles.gap}></Box>
      <Button
        color="primary"
        variant="contained"
        disabled={checkIsDisabled}
        onClick={onSubmit}
      >
        Generate Notification
      </Button>
    </Box>
  );
};
export default AddNotification;
