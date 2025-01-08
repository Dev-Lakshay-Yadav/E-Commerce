import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return; // Ensure image URL is available before dispatch
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDelete(id) {
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  // function handleImport(){}

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      {/* <Button onClick={handleImport}>Import Products +</Button> */}
      <p className="text-3xl font-bold text-center">Banner Images</p>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImageItem, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center bg-white p-5 shadow-xl rounded-[2vw] gap-[2vw]"
            >
              <img
                src={featureImageItem.image}
                className="w-full h-[300px] object-cover rounded-xl"
              />
              <Button className="w-full" onClick={() => handleDelete(featureImageItem?._id)}>
                Delete Product
              </Button>
            </div>
          ))
        ) : (
          <p>No feature images available</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
