import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { createAd, updateAd, reset } from "../features/adsSlice";
import { toast } from "react-toastify";
import { getCategories, resete } from "../features/categoriesSlice";

const AllAds = ({ item, setItem, setUpAd }) => {
  // steitas skelbimo lauku
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    img: "",
    category: "",
    status: "pending",
  });

//   console.log(item);

  const { title, description, price, img, category } = FormData;

  const [test, setTest] = useState("");

  // kategoriju gavimas is MB
  const { categories, isError, message } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCategories());
    return () => {
      dispatch(resete());
    };
  }, [isError, message, dispatch]);

  // formos issaugojimo funkcija
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // formData ir propsu isvalymas atsaukus forma
  const handleCleaning = () => {
    setItem("");
    setTest("");
    setFormData({
      title: "",
      description: "",
      price: "",
      img: "",
      category: "",
      status: "pending",
    });
  };

  // skelbimo ikelimas
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.price === "" ||
      formData.img === "" ||
      formData.category === ""
    ) {
      toast.error("Prasome uzpildyti visus laukus ir pasirinkti kategorija");
    } else {
      dispatch(createAd(formData));
      handleCleaning();
      e.target.reset();
      dispatch(reset());
      setUpAd("T");
      toast.success("Skelbimas patalpintas sekmingai");
    }
  };

  // funkcija paruosti fromDatai uzpildyti su apsaugomis
  if ((typeof item === "object") & (item._id !== test)) {
    setFormData({
      title: item.title,
      description: item.description,
      price: item.price,
      img: item.img,
      category: item.category,
      status: "pending",
    });
    setTest(item._id);
  }

  // skelbimo atnaujinimas
  const handleUpdate = (e) => {
    e.preventDefault();

    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.price === "" ||
      formData.img === "" ||
      formData.category === ""
    ) {
      toast.error("Prasome uzpildyti visus laukus ir pasirinkti kategorija");
    } else {
      dispatch(updateAd({ formData, test }));
      handleCleaning();
      e.target.reset();
      toast.success("Skelbimas atnaujintas sekmingai");
      setUpAd("T");
      return () => {
        dispatch(reset());
      };
    }
  };

//   console.log(formData);

  return (
    <div>
      <Container>
        {typeof item === "object" ? (
          <Form onSubmit={handleUpdate} className="w-50 m-auto">
            <h3 className="mt-4">Atnaujinti skelbima</h3>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Pavadinimas</Form.Label>
              <Form.Control
                type="text"
                name="title"
                defaultValue={item.title}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Aprasymas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="description"
                defaultValue={item.description}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Kaina</Form.Label>
              <Form.Control
                type="number"
                name="price"
                step="0.01"
                defaultValue={item.price}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Nuotrauka</Form.Label>
              <Form.Control
                type="text"
                name="img"
                defaultValue={item.img}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Label>Pasirinkite kategorija</Form.Label>
            {categories.length > 0 ? (
              <Form.Select
                className="mb-3"
                aria-label="Default select example"
                name="category"
                defaultValue={item.category}
                onChange={onChange}
              >
                <option value="">Kategorijos</option>
                {categories.map((items, index) => (
                  <option key={index} value={items._id}>
                    {items.name}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Select className="mb-3" aria-label="Default select example">
                <option>Nera kategoriju</option>
              </Form.Select>
            )}
            <Button className="me-3" variant="info" type="submit">
              Atnaujinti
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleCleaning()}
            >
              Atsaukti
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit} className="w-50 m-auto">
            <h3 className="mt-4">Prideti skelbima</h3>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Pavadinimas</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Aprasymas</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="description"
                value={description}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Kaina</Form.Label>
              <Form.Control
                type="number"
                name="price"
                step="0.01"
                value={price}
                onChange={onChange}
                placeholder="00.00"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Nuotrauka</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={img}
                onChange={onChange}
                placeholder="Url: https://img"
              />
            </Form.Group>
            <Form.Label>Pasirinkite kategorija</Form.Label>
            {categories.length > 0 ? (
              <Form.Select
                className="mb-3"
                aria-label="Default select example"
                name="category"
                value={category}
                onChange={onChange}
              >
                <option value="">Kategorijos</option>
                {categories.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Select className="mb-3" aria-label="Default select example">
                <option>Nera kategoriju</option>
              </Form.Select>
            )}
            <Button variant="primary" type="submit">
              Prideti
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default AllAds;
