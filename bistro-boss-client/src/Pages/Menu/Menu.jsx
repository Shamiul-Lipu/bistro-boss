import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import menuImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'

import useMenu from "../../Hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const offered = menu.filter(item => item.category === 'offered')

    // console.log(offered)
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title={"Our Menu"}></Cover>
            <SectionTitle subHeading={"Don't Miss Todays Offer"} heading={"Today's Offer"}></SectionTitle>
            {/* todays offer */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert */}
            <MenuCategory items={dessert} title="dessert" coverImg={dessertImg}></MenuCategory>
            {/* pizza */}
            <MenuCategory items={pizza} title="pizza" coverImg={pizzaImg}></MenuCategory>
            {/* salad */}
            <MenuCategory items={salad} title="salad" coverImg={saladImg}></MenuCategory>
            {/* soup */}
            <MenuCategory items={soup} title="soup" coverImg={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;