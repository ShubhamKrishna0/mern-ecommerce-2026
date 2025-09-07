import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  // Local state for selected image
  const [imageFile, setImageFile] = useState(null); // Actual File object
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // Preview URL
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // Upload handler
  function handleUploadFeatureImage() {
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    dispatch(addFeatureImage(imageFile)).then((data) => {
      if (data?.payload?.success) {
        // Refresh images after successful upload
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  // Fetch feature images on mount
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="p-5">
      {/* Image upload component */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />

      {/* Upload button */}
      <Button
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full"
        disabled={imageLoadingState}
      >
        {imageLoadingState ? "Uploading..." : "Upload"}
      </Button>

      {/* Display uploaded feature images */}
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem) => (
            <div key={featureImgItem._id} className="relative">
              <img
                src={featureImgItem.image}
                alt="Feature"
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No feature images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
