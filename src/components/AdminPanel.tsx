import Image from "next/image";
import { api } from "~/utils/api";
import { FaTrashAlt } from "react-icons/fa";
import Dropzone from "./DropZone";

export default function AdminPanel() {
  const { data: products } = api.products.getAll.useQuery();
  const deleteMutation = api.products.deleteById.useMutation().mutateAsync;
  const utils = api.useContext();

  async function handleDelete(id: string) {
    await deleteMutation({ id });
    await utils.products.getAll.invalidate();
  }

  return (
    <>
      <section>
        <h2>Add new product</h2>

        <Dropzone />
      </section>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => {
            return (
              <tr key={product.id}>
                <td>
                  <Image alt={product.name} src={product.image} />
                </td>
                <td>
                  <span>{product.name}</span>
                </td>
                <td>
                  <span>{product.description}</span>
                </td>
                <td>
                  <span>{product.price}</span>
                </td>
                <td>
                  <FaTrashAlt onClick={handleDelete.bind(null, product.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
