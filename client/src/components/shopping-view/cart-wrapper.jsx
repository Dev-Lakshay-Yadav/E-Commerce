import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {toast} = useToast()

  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, index) => (
              <UserCartItemsContent key={index} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        {
          isAuthenticated ? <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div> : 
        <div className="flex justify-center">
        <span className="font-semibold underline hover:text-blue-400 hover:cursor-pointer" onClick={()=>navigate('/auth')}>Login Here to access Cart</span>
      </div>
        }

      </div>
      <Button
        onClick={() => {
          isAuthenticated ? navigate("/shop/checkout") : toast({
            title : "Please Login First",
            variant : 'destructive'
          });
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
