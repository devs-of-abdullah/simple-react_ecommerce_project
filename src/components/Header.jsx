import "../css/Header.css";
import { CiShoppingBasket, CiLight } from "react-icons/ci";
import { IoIosMoon } from "react-icons/io";
import { BiLogoShopify } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const {products} = useSelector((store) => store.basket)
  

  return (
    <header
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="flex-row">
        <BiLogoShopify style={{ fontSize: 50 }} />

        <p className="logo-text" onClick={() => navigate("/")}>
          Abdullah Shop Center
        </p>
      </div>

      <div className="flex-row">
        <input className="search-input" type="text" placeholder="Search here" />

        <div className="flex-row">
          
          <Badge
            onClick={() => dispatch(setDrawer(true))} 
            badgeContent={products.length}
          >
            <ShoppingCartIcon style={{ marginRight: 1 }} className="icon" />
          </Badge>
        </div>
      </div>
    </header>
  );
}

export default Header;
