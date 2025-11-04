export default function CartItems({ pname, img, price }) {
  return (
    <li className="flex gap-2 items-center font-semibold py-2">
      <img className="w-20" src={img} alt="" />

      <h2 className="flex-1">{pname}</h2>

      <p className="text-green-600">${price}</p>
      <div className="flex gap-2">
        <button className="bg-purple-500/80 rounded w-6 cursor-pointer active:bg-purple-500">
          +
        </button>
        <button className="bg-purple-500/80 rounded w-6 cursor-pointer active:bg-purple-500">
          -
        </button>
      </div>
    </li>
  );
}
