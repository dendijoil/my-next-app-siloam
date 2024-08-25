import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeUpdatedItemData } from "@/store/items";
import Swal from "sweetalert2";
import { getUser } from "@/utils/getUser";

const ModalEdit = ({ item, onClose }) => {
  const [formData, setFormData] = useState(item);
  const queryClient = useQueryClient();
  const user = getUser();

  const mutation = useMutation(
    (updatedItem) => storeUpdatedItemData(updatedItem),
    {
      onMutate: async (updatedItem) => {
        if (user.role !== "admin") {
          onClose();
          throw {
            message: "You do not have permission to update this item.",
          };
        } else {
          await queryClient.cancelQueries(["items"]);
          const previousData = queryClient.getQueryData(["items"]);
          queryClient.setQueryData(["items"], (oldData) =>
            oldData.map((i) =>
              i.hospital_id === updatedItem.hospital_id ? updatedItem : i
            )
          );
          return { previousData };
        }
      },
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Item updated successfully. Only temporary and save in session store. If go back, the data will be lost.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          onClose(); // Close modal on success
        });
      },
      onError: (error, updatedItem, context) => {
        Swal.fire({
          title: "Error!",
          text:
            error.message || "Failed to update item. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
        queryClient.setQueryData(["items"], context.previousData);
      },
      onSettled: () => {},
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(formData);
      sessionStorage.setItem("updatedItem", JSON.stringify(formData));
      onClose();
    } catch (error) {}
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Alias"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phone_number_1"
              value={formData.phone_number_1 || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Area Name"
              name="area_name"
              value={formData.area_name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Hospital SEO Key"
              name="hospital_seo_key"
              value={formData.hospital_seo_key}
              onChange={handleChange}
              fullWidth
            />
            {/* Add other fields as needed */}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEdit;
