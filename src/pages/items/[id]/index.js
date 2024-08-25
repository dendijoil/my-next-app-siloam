import ModalEdit from "@/components/items/ModalEdit";
import { fetchItems } from "@/store/items";
import { Button, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getUser } from "@/utils/getUser";

export default function ItemDetail() {
  const router = useRouter();
  const { id } = router.query;
  const user = getUser();
  const [editedItem, setEditedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: itemsList = [],
    isLoading,
    error,
  } = useQuery(["items"], fetchItems);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;

  const item = itemsList.find((item) => item.hospital_id === id);

  if (!item) return <div>Item not found</div>;

  const handleEditClick = () => {
    setEditedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditedItem(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <IconButton onClick={() => router.back()} className="mr-2">
          <ArrowBackIcon />
        </IconButton>
        <h1 className="text-2xl font-bold">{item.name}</h1>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-32 h-32 object-cover rounded"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-300 rounded"></div>
        )}
        <div>
          <p className="text-lg font-semibold">{item.alias}</p>
          <p className="text-gray-700">{item.address}</p>
          {item.phone_number_1 && (
            <p className="text-gray-700">Phone: {item.phone_number_1}</p>
          )}
          <p className="text-gray-700">Area: {item.area_name}</p>
          <p className="text-gray-700">Status: {item.hospital_status_id}</p>
          <p className="text-gray-700">SEO Key: {item.hospital_seo_key}</p>
        </div>
      </div>
      <div className="space-y-2">
        {item.is_tele_mysiloam && (
          <p className="text-green-500">Tele Mysiloam available</p>
        )}
        {item.is_tele_aido && (
          <p className="text-green-500">Tele Aido available</p>
        )}
        {!item.is_tele_mysiloam && !item.is_tele_aido && (
          <p className="text-red-500">No telemedicine services available</p>
        )}
      </div>
      {user.role === "admin" && (
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={handleEditClick}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Edit
          </Button>
        </div>
      )}
      {isModalOpen && (
        <ModalEdit item={editedItem} onClose={handleModalClose} />
      )}
    </div>
  );
}
