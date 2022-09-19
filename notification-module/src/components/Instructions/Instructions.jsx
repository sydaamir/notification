import { Grid, Typography, Box } from "@material-ui/core";
const Instructions = () => {
  const styles = {
    boxMargin: {
      marginTop: "3rem",
      marginLeft: "3rem",
      marginRight: "3rem",
    },
  };
  return (
    <>
      <Box style={styles.boxMargin}>
        <Typography variant="h6">Instructions</Typography>

        <Grid direction="column" spacing={2}>
          <Grid item>
            <li>
              <Typography variant="caption">
                Notification field is mandatory to fill
              </Typography>
            </li>
          </Grid>
          <Grid item>
            <li>
              <Typography variant="caption">
                Please enter the variant from this list i-e,
                <i> (success, error, warning, info)</i>
              </Typography>
            </li>
          </Grid>
          <Grid item>
            <li>
              <Typography variant="caption">
                Please enter the timeout in milliseconds e.g{" "}
                <i>1000 for 1 second</i>
              </Typography>
            </li>
          </Grid>
          <Grid item>
            <li>
              <Typography variant="caption">
                Once you enter all the fields, Please hit the generate
                notification button to see the notification.
              </Typography>
            </li>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Instructions;
