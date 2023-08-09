import React, { useState, useEffect } from "react";
import AdsCard from "./AdsCard";
import adsService from "../services/adsServise";
import { useSelector } from "react-redux";

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [copyAds, setCopyAds] = useState([]);

  const { myCategory } = useSelector((state) => state.myCategory);

  //gautus duomenis is API, isideti i state
  const adsData = () => {
    adsService.getAllAdsData().then((res) => {
      if (res !== undefined) {
        setAds(res);
        setCopyAds(res);
      }
    });
  };

  useEffect(() => {
    // ifas pargrazinti visus duomenis be filtracijos
    if (myCategory !== "All") {
      // filtruojamos categorijos
      const filtered = copyAds.filter((items) =>
        items.category.includes(myCategory)
      );
      setAds(filtered);
    } else {
      // priskiriamos visos categorijos
      setAds(copyAds);
    }
  }, [copyAds, myCategory]);

  useEffect(() => {
    adsData();
  }, []);

  return (
    <div>
      <AdsCard ads={ads} />
    </div>
  );
};

export default AllAds;
