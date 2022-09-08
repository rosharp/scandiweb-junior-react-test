import { Link } from 'react-router-dom'
import { ALL_PRODUCTS } from "../apollo/products";
import { useQuery } from '@apollo/client';

export default function Navbar() {
    const { data } = useQuery(ALL_PRODUCTS);
    return (
        <nav>
            {data.categories.map((item, index) => {
                return (
                    <Link key={index} to={"categories/" + item.name}>{item.name}</Link>
                )
            })}
        </nav>
    )
}
