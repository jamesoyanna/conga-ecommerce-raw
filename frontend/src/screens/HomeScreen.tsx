import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader.";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { AppDispatch } from "../store";
import { Product as ProductType } from "../types";
import { ReduxState } from "../types/ReduxState";

interface MatchParams {
  keyword: string;
  pageNumber: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const HomeScreen = ({ match }: Props) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || "1";

  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error, page, pages } = useSelector(
    (state: ReduxState) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <Container>
        <div className="d-flex">
          {Array.from(
            [
              "conga blog",
              "Pay bills",
              "Free delivery",
              "Offline store",
              "brand stores",
              "book flights",
            ],
            (text, index) => (
              <div
                key={index}
                style={{
                  background: "#fff",
                  border: "0.0625rem solid rgba(0,0,0,.05)",
                  borderRadius: "0.3125rem",
                  boxShadow: "0 0 0.5rem rgba(0,0,0,.05)",
                  height: "3.5rem",
                  marginRight: "0.9375rem",
                  padding: "0.8125rem 1.5625rem",
                  width: "calc(16.66667% - 0.9375rem)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Icon */}
                <i className="fas fa-icon-name" style={{ marginRight: "0.5rem" }}></i>
                {/* Text */}
                {text}
              </div>
            )
          )}
        </div>
        <div
          className="d-flex align-items-center"
          style={{
            backgroundColor: "#94004f",
            height: "3.125rem",
            borderRadius: "3px 3px 0 0",
            paddingLeft: "1rem",
            color: "white",
            marginTop: "15px",
          }}
        >
          <h2 style={{ marginRight: "1rem", color: "#fff", fontWeight: "bold" }}>
            Today's Deals
          </h2>
          <p>See all items</p>
        </div>
      </Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !products ? (
        <Message variant="danger">No Products Currently Available</Message>
      ) : (
        <>
          <Row>
            {products.map((product: ProductType) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {pages && page && (
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
