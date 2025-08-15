import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // fetch user Data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
        // console.log("User fetched successfully:", data.user);
      } else {
        // console.log("Fetch user failed:", data.message);
        toast.error(data.message || "Failed to fetch user");
        navigate("/");
      }
    } catch (err) {
      console.error("Fetch user error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Failed to fetch user"
      );
      // Don't navigate on error - might be temporary network issue
    }
  };

  // function to fetch all cars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/user/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message || "Failed to fetch cars");
      }
    } catch (err) {
      console.error("Fetch cars error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Failed to fetch cars"
      );
    }
  };
  console.log("all car from use context ", cars);
  // function to logout of user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    // Clear the authorization header
    delete axios.defaults.headers.common["Authorization"];
    toast.success("You have been Logged out");
  };

  // useEffect to retrieve token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    fetchCars();
  }, []);

  // useEffect to fetch user data when token is available
  useEffect(() => {
    if (token) {
      // Set the authorization header with the actual token
      axios.defaults.headers.common["Authorization"] = token;
      fetchUser();
    }
  }, [token]);

  // Optional: useEffect to log user when it changes
  useEffect(() => {
    if (user) {
      // console.log("User state updated:", user);
    }
  }, [user]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
