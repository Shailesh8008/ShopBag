import { PiHairDryer } from "react-icons/pi";
import { ImMobile } from "react-icons/im";
import { CiCoffeeCup, CiShop } from "react-icons/ci";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaTv } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { TbHomeSpark } from "react-icons/tb";

const category = [
  { name: "All", icon: <CiShop /> },
  { name: "Cafe", icon: <CiCoffeeCup /> },
  { name: "Electronics", icon: <FaTv /> },
  { name: "Toys", icon: <IoGameControllerOutline /> },
  { name: "Mobile", icon: <ImMobile /> },
  { name: "Fresh", icon: <GiFruitBowl /> },
  { name: "Home", icon: <TbHomeSpark /> },
  { name: "Beauty", icon: <PiHairDryer /> },
];

export default function Category({ products, setFilteredProducts }) {
  return (
    <section className="mb-4 px-6">
      <div className="flex gap-4 md:gap-7 text-center md:justify-center overflow-x-auto md:overflow-visible bg-gray-100 py-2 px-2 rounded">
        {category.map((el, i) => {
          return (
            <div
              key={i}
              onClick={() =>
                setFilteredProducts(
                  el.name == "All"
                    ? products
                    : products.filter((el1) => el1.category == el.name)
                )
              }
              className="justify-items-center cursor-pointer text-gray-700 font-medium hover:text-purple-600 md:hover:scale-110"
            >
              <div className="text-xl mb-1">{el.icon}</div>
              <p className="">{el.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
