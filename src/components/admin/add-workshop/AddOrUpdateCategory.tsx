"use client";
import React, { useState } from "react";
import { categoryType } from "@/types/workshop";
import { Input, TextField } from "@mui/material";
import { MdUpdate, MdDelete } from "react-icons/md";
import { GiSave } from "react-icons/gi";
import "./a.css";
import { set } from "react-hook-form";
import {
  createnewCategory,
  deleteWorkshopCategory,
  updateWorkshopCategoryName,
} from "@/components/server/admin/workshops";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
type Props = {
  category: categoryType[] | [];
  setupdateCategories: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddOrUpdateCategory: React.FC<Props> = ({
  category,
  setupdateCategories,
  setUpdate,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedCategories, setUpdatedCategories] = useState(category);
  const [newCategory, setNewCategory] = useState<categoryType | null>(null);

  const [createNewCategory, setCreateNewCategory] = useState<string>("");

  const handleUpdate = (id: string, newValue: string) => {
    setUpdatedCategories((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, categoryName: newValue } : item
      )
    );
    setNewCategory({
      _id: id,
      categoryName: newValue,
    });
  };

  const handleSave = () => {
    if (newCategory !== null) {
      const name = { category: newCategory.categoryName };
      updateWorkshopCategoryName(newCategory._id, name)
        .then((data) => {
          toast.success("Category updated successfully!");
          setEditingId(null);
        })
        .catch((err) => {
          toast.error("Failed to update category!");
        });
    }
  };

  const handleDelete = (id: string) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Deleting category will also delete all the related workshops",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            deleteWorkshopCategory(id)
              .then((data) => {
                toast.success("Category deleted successfully!");
                setupdateCategories(true);
                setUpdatedCategories((prev) =>
                  prev.filter((item) => item._id !== id)
                );
                setUpdate((prev) => !prev);
              })
              .catch((err) => {
                toast.error("Failed to delete category!");
              });
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const createNewCategoryForWorkshop = () => {
    confirmAlert({
      title: "Add a new Category",
      message: "Create a new Category",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            createnewCategory({ category: createNewCategory })
              .then((data) => {
                toast.success("Category added successfully!");
                setupdateCategories(true);
                // setUpdatedCategories(data);
                setUpdate((prev) => !prev);
              })
              .catch((err) => {
                toast.error("Failed to create category!");
              });
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <div className="w-100 h-100 position-absolute top-0 start-0 bg-white z-3">
      <div className="d-flex flex-row justify-content-between bg-dark">
        <button
          className="btn btn-danger mx-2 my-3 rounded-2"
          onClick={() => setupdateCategories(false)}
        >
          Close
        </button>
        <section className="text-black d-flex flex-row gap-4 py-2 bg-dark justify-content-center rounded-2 align-items-center px-4">
          <TextField
            id="outlined-basic"
            label="Add Category"
            variant="outlined"
            value={createNewCategory}
            onChange={(e) => setCreateNewCategory(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={createNewCategoryForWorkshop}
          >
            Add Category
          </button>
        </section>
      </div>
      <ul>
        {updatedCategories.map((item) => (
          <li key={item._id} className="w-100 mx-2 my-3 rounded-2">
            <div className="text-black d-flex flex-row gap-4 py-2 bg-dark justify-content-center rounded-2 align-items-center">
              <Input
                type="text"
                value={item.categoryName}
                onChange={(e) => handleUpdate(item._id, e.target.value)}
                disabled={editingId !== item._id}
              />
              {editingId === item._id ? (
                <GiSave
                  style={{
                    fontSize: "1.6rem",
                    color: "green",
                    cursor: "pointer",
                  }}
                  onClick={handleSave}
                />
              ) : (
                <MdUpdate
                  style={{
                    fontSize: "1.6rem",
                    color: "cyan",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditingId(item._id);
                    setNewCategory(null);
                  }}
                />
              )}

              <MdDelete
                style={{
                  fontSize: "1.6rem",
                  color: "#d91717",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddOrUpdateCategory;
