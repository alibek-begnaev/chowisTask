import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddNewProduct() {
  const [modal, setModal] = useState();
  const { register, handleSubmit, setValue, control } = useForm();

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const token = window.localStorage.getItem("token");

  const [{ data: response, loading, error }, executePost] = useAxios(
    {
      headers: { authorization: `Bearer ${token}` },
      url: `/products`,
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    if (response?.success) {
      alert("UPDATED SUCCESSFULLY");
    }
  }, response);
  useEffect(() => {
    if (error) {
      alert(error?.response?.data?.message);
    }
  }, [error]);
  const onSubmit = (data) => {
    console.log(data);
    executePost({
      data: {
        ...data,
      },
    });
  };
  const [image, setImage] = useState();

  const imgHandler = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const avatar = new FormData();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        avatar.append("avatar", e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <Button variant="contained" onClick={openModal}>
        New Product
      </Button>
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title">ADD New Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div
                  className="img-holder"
                  style={{
                    display: "grid",
                    width: "100%",
                    height: "350px",
                    justifyItems: "center",
                    alignItems: "center",
                    border: "3px solid lightgray",
                  }}
                >
                  <img
                    src={image}
                    style={{
                      width: "100%",
                      height: "350px",
                      objectFit: "cover",
                    }}
                    alt=""
                    id="img"
                    className="img"
                  />

                  <input
                    {...register("image", {
                      required: true,
                    })}
                    accept="image/*"
                    id="input"
                    type="file"
                    onChange={imgHandler}
                    style={{ display: "none" }}
                  />
                  <label
                    style={{ position: "absolute" }}
                    htmlFor="input"
                    className="img-upload"
                  >
                    <IconButton aria-label="upload picture" component="span">
                      <PhotoCamera style={{ color: "gray" }} />
                    </IconButton>
                  </label>
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("title", {
                    required: true,
                  })}
                  id="standard-required"
                  label="title"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("price", {
                    required: true,
                  })}
                  id="standard-required"
                  label="price"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("description", {
                    required: true,
                  })}
                  id="filled-required"
                  label="description"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  {...register("category", {
                    required: true,
                  })}
                  id="standard-required"
                  label="category"
                  variant="filled"
                />
              </Grid>
            </Grid>

            <Button type="submit" style={{ marginTop: 20 }} variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
