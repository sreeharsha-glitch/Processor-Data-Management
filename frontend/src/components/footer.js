import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "#1870CAff",
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >

            <Container maxWidth="x">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12} >
                        <Typography color="textSecondary" variant="subtitle1" >
                           <b> {`${new Date().getFullYear()} | © Intel Corporation | Terms of Use | *Trademarks | Cookies | Privacy | Supply Chain Transparency | Site Map | Your Privacy Choices | Notice at Collection | Recycling`}</b>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
};

export default Footer;