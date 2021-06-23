import React, { useContext } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { weatherContext } from "../App";
import { getTime } from "../Helpers/getTime";

const useStyles = makeStyles({
  tab: {
    minWidth: "76px",
  },
  indicator: {
    display: "none",
  },
  dividerTop: {
    margin: "1rem 0 0.6rem 0",
  },
  dividerBottom: {
    margin: "0.6rem 0 1rem 0",
  },
});
function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const HourlyWeather = () => {
  const { hourly, loading, timezone } = useContext(weatherContext);
  const classes = useStyles();
  return (
    <div className="hourly-display">
      <Divider classes={{ root: classes.dividerTop }} />
      {loading ? (
        <Skeleton variant="rect" height={80} animation="wave" />
      ) : (
        <Tabs
          classes={{ indicator: classes.indicator }}
          value={0}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Daily Weather Tabs"
        >
          {hourly.map((i) => (
            <Tab
              key={i.dt}
              classes={{ root: classes.tab }}
              disableRipple
              label={
                <>
                  <Typography variant="caption">
                    {getTime(
                      { hour: "2-digit", hourCycle: "h12" },
                      timezone,
                      i.dt
                    )}{" "}
                    / {getTime({ day: "2-digit" }, timezone, i.dt)}
                  </Typography>

                  <i
                    className={`wi wi-fw wi-owm-${i.weather[0].id} hourly-icon`}
                  ></i>
                  <Typography variant="button" color="inherit">
                    {Math.round(i.temp)}&deg;
                  </Typography>
                </>
              }
              {...a11yProps(0)}
            />
          ))}
        </Tabs>
      )}
      <Divider classes={{ root: classes.dividerBottom }} />
    </div>
  );
};

export default HourlyWeather;