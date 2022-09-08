import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS } from "../apollo/products";

export default function withQuery(Component) {
    return function WrappedComponent(props) {
        const { data } = useQuery(ALL_PRODUCTS);
        return <Component {...props} dataValue={data} />;
    }
}