import { type Product } from "@prisma/client";
import Image from "next/image";
import { Carousel } from "react-bootstrap";

export default function ProductCarosel({ products }: { products: Product[] }) {
  return (
    <Carousel>
      {products.map((product) => {
        return (
          <Carousel.Item key={product.id}>
            <Image
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt={product.name}
            />
            <Carousel.Caption>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
