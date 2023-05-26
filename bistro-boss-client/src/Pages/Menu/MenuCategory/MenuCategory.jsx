import MenuItem from "../../Home/MenuItem/MenuItem";
import Cover from "../../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className="py-5">
            {title && <Cover img={coverImg} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 m-5">
                {
                    items.map((item, i) => <MenuItem key={i} item={item}></MenuItem>)
                }
            </div>
            <div className="text-center">
                <Link to={`/orders/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4 mt-4 rounded-none hover:rounded-md ">Order</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;