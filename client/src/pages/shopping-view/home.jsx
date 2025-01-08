import { Button } from "@/components/ui/button";
import nikeLogo from "/nike.png";
import adidasLogo from "/adidas.jpg";
import pumaLogo from "/puma.png";
import levisLogo from "/levis.png";
import zaraLogo from "/zara.png";
import hmLogo from "/hm.png";

import {
  ArrowRight,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  PersonStanding,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: PersonStanding },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", img_Src: nikeLogo },
  { id: "adidas", label: "Adidas", img_Src: adidasLogo },
  { id: "puma", label: "Puma", img_Src: pumaLogo },
  { id: "levi", label: "Levi's", img_Src: levisLogo },
  { id: "zara", label: "Zara", img_Src: zaraLogo },
  { id: "h&m", label: "H&M", img_Src: hmLogo },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: `price-lowtohigh`,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const goToId = (id) => {
    navigate("/", { replace: true }); // Navigate to the desired page
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the element
      }
    }, 100); // Add a slight delay to ensure the page has loaded
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <div className="relative w-full h-screen -mt-[10vh] md:-mt-[4vw] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div
                key={index}
                className={`absolute h-full w-full top-[4vh] md:top-[2vw] ${
                  index === currentSlide ? `opacity-100` : `opacity-0`
                } transition-opacity duration-1000 flex flex-col md:flex-row bg-[#f9fafb] px-[5vw] items-center justify-between`}
              >
                <div className=" w-full md:w-1/3  h-1/2 md:h-full flex flex-col items-center md:items-start justify-center gap-[2vw] md:gap-[1vw]">
                  <h1 className=" text-[6vw] md:text-[4vw] font-bold">
                    Today Deals
                  </h1>
                  <p className=" text-[4vw] md:text-[2vw] font-normal">
                    Best Products To sale
                  </p>
                  <Button
                    className="flex items-center justify-center gap-2"
                    onClick={() => goToId("asd")}
                  >
                    <span>Buy Now </span>
                    <ArrowRight />
                  </Button>
                </div>
                <div className="w-full h-1/2 md:w-2/3 md:h-full flex items-center justify-center">
                  <div className="w-full -mt-[15vh] md:mt-0 h-[50vh] md:h-[40vw] overflow-hidden rounded-xl">
                    <img
                      src={slide?.image}
                      className={`w-full h-full object-cover object-center`}
                    />
                  </div>
                </div>
              </div>
            ))
          : null}

        {/* Left Move Btn */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        {/* Right Move Btn */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Shop by category */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem, index) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by brand */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem, index) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="w-12 h-12 mb-4 text-primary overflow-hidden" >
                  <img
                    src={brandItem.img_Src}
                    alt="Images"
                    className="w-full h-full object-cover object-center"
                  />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Products */}
      <section className="py-12 bg-gray-50" id="asd">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Sale Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList
                  .filter(
                    (productItem) => productItem?.salePrice && productItem.price > productItem.salePrice && productItem?.totalStock < 10
                  ) // Filter products
                  .map((productItem, index) => (
                    <ShoppingProductTile
                      key={index}
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddToCart={handleAddToCart}
                    />
                  ))
              : null}
          </div>
        </div>
      </section>

      {/* Modal Cofigs */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
