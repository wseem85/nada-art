import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useCurrentUser } from "../contexts/CurrentUserProvider";

import { addItem, getCart } from "../features/cart/cartSlice";

export default function useAddToCart(imageId) {
  const { currentUser } = useCurrentUser();
  const userId = currentUser?.id || "";
  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  function handleAddToCart() {
    if (cart.find((el) => el.image_id === imageId)) {
      toast("This Product is Already in Your Cart");
      return;
    }

    const newProduct = { image_id: imageId, user_id: userId };

    dispatch(addItem(newProduct));
  }
  return { handleAddToCart };
}
