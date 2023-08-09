import React, { useEffect } from "react";
import UserAds from "../components/UserAds";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  return (
    <div>
      <UserAds />
    </div>
  );
};

export default User;
