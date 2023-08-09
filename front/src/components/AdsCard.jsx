import Card from "react-bootstrap/Card";
// import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

const AdsCard = ({ ads }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center mt-3">
      {ads.length > 0 ? (
        ads.map((item, index) =>
          item.status === "public" ? (
            <Card
              className="d-inline-flex m-2 h-50"
              key={index}
              style={{ width: "30rem" }}
            >
              <Card.Img
                className="img-fluid img-thumbnail"
                variant="top"
                src={item.img}
              />
              <Card.Body>
                <Card.Title className="border-bottom d-flex justify-content-center">
                  {item.title}
                </Card.Title>
                <Card.Text className="border-bottom mt-3">
                  <span className="fw-medium">Aprasymas:</span>{" "}
                  {item.description}
                </Card.Text>
                <Card.Text className="border-bottom">
                  <span className="fw-medium">Kaina:</span> {item.price} €
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <span key={index}></span>
          )
        )
      ) : (
        <h3>Skelbimu sistemoje nera</h3>
      )}
    </div>
  );
};

export default AdsCard;
