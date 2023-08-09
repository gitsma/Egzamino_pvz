import React, { useEffect, useState } from "react";
import CategoryForm from "../components/CategoryForm";
import AdminAds from "../components/AdminAds";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
  resete,
} from "../features/categoriesSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import adsService from "../services/adsServise";

const Admin = () => {
  const [copyAds, setCopyAds] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCategories());
    return () => {
      dispatch(resete());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.role !== "admin") {
        navigate("/user");
      }
    }
  }, [user, navigate, dispatch]);

  // prideti apsauga kategorijos trynimui

  //gautus duomenis is API, isideti i state
  const adsData = () => {
    adsService.getAllAdsData().then((res) => {
      if (res !== undefined) {
        setCopyAds(res);
      }
    });
  };

  // skelbimo istrynimui su vartotojo informacija
  const onClick = (item) => {
    const filtered = copyAds.filter((items) => items.category.includes(item));
    // console.log(filtered);

    if (filtered.length > 0) {
      toast.error(
        "Kategorijos istrinti negalima, nes yra panaudota skelbimuose"
      );
    } else {
      dispatch(deleteCategory(item));
      toast.success("Kategorija istrinta");
    }
  };

  useEffect(() => {
    adsData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <CategoryForm />

      <h3 className="ms-5 m w-50 ">Kategorijos</h3>
      {categories !== undefined && categories.length > 0 ? (
        <ListGroup className="ms-5 m w-50 ">
          {categories.map((cat, index) => (
            <ListGroup.Item
              as="li"
              key={index}
              className="d-flex align-items-center justify-content-between"
            >
              <div className="fw-bold ">{cat.name}</div>
              <Button variant="danger" onClick={() => onClick(cat._id)}>
                Istrinti
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <ListGroup variant="flush">
          <ListGroup.Item>Nera pridetu kategoriju</ListGroup.Item>
        </ListGroup>
      )}

      <AdminAds />
    </div>
  );
};

export default Admin;
