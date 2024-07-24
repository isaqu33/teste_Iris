/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { City } from "@/types";
import { Paper } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function DrawerCity({ data }: { data: City }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        See more abolt {data.name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "90%",
            color: "black",
            borderRadius: 4,
            maxWidth: "1000px",
          }}
        >
          <div className=" w-full  flex overflow-x-auto">
            <h1 className="text-1xl font-bold mr-4 text-primary-foreground sm:text-3xl">
              {data.name}
            </h1>

            <Button variant="outlined" disabled={true}>
              {data.code}
            </Button>
          </div>

          <div className=" flex flex-wrap">
            <div className=" w-full md:w-[50%]">
              <Paper
                variant="outlined"
                sx={{
                  width: "200px",
                  background: "white",
                  borderRadius: 4,
                  overflow: "hidden",
                  marginTop: 4,
                }}
              >
                {data.image ? (
                  <img src={data.image} alt="Ontario facts" />
                ) : (
                  "carregando"
                )}
              </Paper>

              <p className="mt-4 text-sm text-muted-foreground">
                <span className=" font-bold">Did you know?</span>{" "}
                {data.did_you_know}
              </p>
            </div>
            <div className=" w-full md:w-[50%]">
              <h3 className="text-lg mb-2 font-bold mt-4">
                About New York City
              </h3>
              <p className="text-muted-foreground">
                New York City is a global center of finance, arts, media, and
                commerce. It is known for its iconic skyline, diverse
                neighborhoods, and vibrant culture. The city is home to numerous
                landmarks, including the Statue of Liberty, Central Park, and
                the Empire State Building.
              </p>
              <h3 className="text-lg mb-2 font-bold mt-4">Recent News</h3>

              {data.news.map((newsItem, index) => (
                <div key={index} className="mt-2">
                  <h3>{newsItem.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
