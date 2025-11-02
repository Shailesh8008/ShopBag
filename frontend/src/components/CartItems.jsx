export default function CartItems({ pname, img, price, pid }) {
  const [quant, setQuant] = useState([{ id: pid, quantity: 1 }]);

  return (
    <li className="flex gap-2 items-center font-semibold py-2" id={pid}>
      <img className="w-20" src={img} alt="" />
      <div className="flex-1 flex gap-2">
        <h2>{pname}</h2>
        <p>{quant}</p>
      </div>
      <p className="text-green-600">${price}</p>
      <div className="flex gap-2">
        <button
          id={pid}
          className="bg-purple-500 rounded w-6 cursor-pointer active:bg-purple-600"
          onClick={(e) => setQuant(quant + 1)}
        >
          +
        </button>
        <button
          id={pid}
          className="bg-purple-500 rounded w-6 cursor-pointer active:bg-purple-600"
          onClick={(e) => {
            console.log(pid);
            console.log(e.target.id);
          }}
        >
          -
        </button>
      </div>
    </li>
  );
}
