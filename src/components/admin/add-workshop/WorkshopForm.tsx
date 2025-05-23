"use client";
import React, { useEffect, useState } from "react";
import {
  addNewWorkshop,
  getAllWorkshopCategories,
} from "../../server/admin/workshops";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { log } from "console";
import { toast } from "react-toastify";
import "../blog/quil.css";
import { categoryType } from "@/types/workshop";
import AddOrUpdateCategory from "./AddOrUpdateCategory";
// Dynamically import react-quill-new to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface WorkshopFormData {
  title: string;
  shortDec: string;
  longDec: string;
  image: File | null;
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

const WorkshopForm: React.FC = () => {
  const { control, handleSubmit, reset, setValue } =
    useForm<WorkshopFormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [updateCategories, setupdateCategories] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const [categories, setCategories] = useState<categoryType[]>([]);
  useEffect(() => {
    // fetch all the categories
    getAllWorkshopCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        toast.error("Failed to fetch categories!");
      });
  }, [update]);
  const onSubmit = async (data: WorkshopFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("shortDec", data.shortDec);
      formData.append("longDec", data.longDec); // Rich text content
      formData.append("categoryId", data.categoryId);
      // formData.append("offerPrice", data.offerPrice.toString());

      if (data.image) {
        formData.append("image", data.image);
      }

      addNewWorkshop(formData)
        .then((data: unknown) => {
          reset();
          setImagePreview(null);
          toast.success("Workshop uploaded successfully");
        })
        .catch((err: unknown) => {
          toast.error("Failed to upload workshop");
        });
    } catch (error) {
      console.error("Error uploading course:", error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        className="container mt-4 my-5 position-relative"
        style={{
          marginTop: "5em",
        }}
      >
        <Paper elevation={5} className="p-4 shadow-lg rounded">
          <Typography
            variant="h5"
            className="mb-3 text-primary d-flex flex-row gap-4 justify-content-between"
          >
            <span>Upload New Workshop</span>
            <button
              className="btn btn-primary"
              onClick={() => setupdateCategories(true)}
            >
              Add or Update Category
            </button>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <div className="mb-3">
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Workshop Title"
                    fullWidth
                    required
                    variant="outlined"
                  />
                )}
              />
            </div>

            {/* Short Description */}
            <div className="mb-3">
              <Controller
                name="shortDec"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Short Description"
                    fullWidth
                    required
                    multiline
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
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
            </div>

            {/* Long Description - Rich Text Editor */}
            <div className="mb-3">
              <Typography variant="body1" className="text-secondary mb-2">
                Long Description
              </Typography>
              <Controller
                name="longDec"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    theme="snow"
                    onChange={(value) => field.onChange(value)}
                    className="bg-white text-black rounded"
                    style={{ minHeight: "150px" }}
                  />
                )}
              />
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  }
                  setValue("image", file);
                }}
                className="form-control"
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="img-fluid rounded shadow"
                  width={200}
                  height={150}
                />
              </div>
            )}

            {/* Submit Button */}
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Upload Workshop
            </Button>
          </form>
        </Paper>
        {updateCategories && (
          <AddOrUpdateCategory
            category={categories}
            setupdateCategories={setupdateCategories}
            setUpdate={setUpdate}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default WorkshopForm;
