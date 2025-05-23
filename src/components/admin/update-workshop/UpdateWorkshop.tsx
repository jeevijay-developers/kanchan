"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  Box,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  getWorkshopById,
  updateWorkshop,
  deleteWorkshopById,
  getAllWorkshopCategories,
} from "../../server/admin/workshops";
import { categoryType } from "@/types/workshop";
import ImageUpdate from "./ImageUpdate";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface WorkshopFormData {
  title: string;
  shortDec: string;
  longDec: string;
  image: string;
  categoryId: string;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#b0bec5" },
  },
});

type Props = {
  id?: string;
};

const UpdateWorkshopForm: React.FC<Props> = ({ id }) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<WorkshopFormData>({
      defaultValues: {
        title: "",
        shortDec: "",
        longDec: "",
        categoryId: "",
      },
    });

  const router = useRouter();

  const [categories, setCategories] = useState<categoryType[]>([]);
  const [updateImage, setUpdateImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      const fetchWorkshopData = async () => {
        try {
          const workshop = await getWorkshopById(id);
          const cate = await getAllWorkshopCategories();
          setCategories(cate);
          if (workshop) {
            setValue("title", workshop.title);
            setValue("shortDec", workshop.shortDec);
            setValue("longDec", workshop.longDec);
            setValue("categoryId", workshop.WorkshopCategory);
            setImageUrl(workshop.image);
          }
        } catch (error) {
          console.error("Error fetching workshop:", error);
        }
      };
      fetchWorkshopData();
    }
  }, [id, setValue]);

  const longDecValue = watch("longDec");

  const onSubmit = async (data: WorkshopFormData) => {
    confirmAlert({
      message: "Are you sure you want to update this workshop?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const formData = new FormData();
              formData.append("title", data.title);
              formData.append("shortDec", data.shortDec);
              formData.append("longDec", data.longDec);
              formData.append("categoryId", data.categoryId);

              await updateWorkshop(id, data);
              toast.success("Workshop updated successfully!");
              router.push("/workshop");
            } catch (error) {
              console.error("Error updating workshop:", error);
              toast.error("Failed to update workshop.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const deleteWorkshop = async () => {
    confirmAlert({
      message: "Are you sure you want to delete this workshop?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteWorkshopById(id);
              toast.success("Workshop deleted successfully!");
              router.push("/workshop");
            } catch (error) {
              toast.error("Failed to delete workshop.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="position-relative">
        <Box className="container mt-4 my-5">
          <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, color: "primary.main" }}>
              {id ? "Update Workshop" : "Upload New Workshop"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: "Workshop title is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Workshop Title"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="shortDec"
                    control={control}
                    rules={{ required: "Short description is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Short Description"
                        fullWidth
                        required
                        multiline
                        rows={2}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ color: "secondary.main", mb: 1 }}
                  >
                    Long Description
                  </Typography>
                  <Controller
                    name="longDec"
                    control={control}
                    render={({ field }) => (
                      <ReactQuill
                        theme="snow"
                        value={longDecValue}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{ color: "secondary.main", mb: 1 }}
                  >
                    Category
                  </Typography>
                  <Controller
                    name="categoryId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        {...field}
                        fullWidth
                        required
                        variant="outlined"
                        value={field.value} // Correct binding
                        onChange={(event) => field.onChange(event.target.value)} // Ensure state updates
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.categoryName}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>

                <div className="d-flex justify-content-center w-100 gap-5 my-3">
                  <Button type="submit" variant="contained" color="primary">
                    {id ? "Update" : "Upload"}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={deleteWorkshop}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setUpdateImage(true);
                    }}
                  >
                    Update Image
                  </Button>
                </div>
              </Grid>
            </form>
          </Paper>
        </Box>
        {updateImage && (
          <ImageUpdate
            id={id || ""}
            url={imageUrl}
            setUpdateImage={setUpdateImage}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default UpdateWorkshopForm;
