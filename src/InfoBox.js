import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total /* Destructuring the props*/ }) {
  return (
    <Card className="infoBox">
      <CardContent>
        {/* Title i.e Coronavirus Cases */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* No of cases i.e +120 number of cases*/}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* total cases i.e 1.2M total*/}
        <Typography className="infoBox__total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
